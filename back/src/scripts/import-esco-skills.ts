import fs from "node:fs";
import { parse } from "csv-parse";
import pool from "../config/Database.js";

interface Skills {
    uri: string,
    name: string, 
    type: string | null
}

interface Occupations{
    uri: string,
    name: string
}

interface Relation{
    uriOccupation: string,
    uriSkill: string,
    relationType: string
}


const importSkills = async () => {
    const skills: Skills[] = []
    const BATCH_SIZE = 1000

    const parserSkills = fs
        .createReadStream("./data/esco/skills_es.csv")
        .pipe(
            parse({
                columns: true,           // La primera fila son los nombres de las columnas
                skip_empty_lines: true,
            })
        );

    for await (const row of parserSkills) {
        const name = row.preferredLabel as string
        const conceptUri = row.conceptUri as string
        const type = row.skillType === "" ? null: row.skillType as string

        const uri = conceptUri.split('/').pop()!
        
        skills.push({
            name,
            uri,
            type
        })

        if(skills.length === BATCH_SIZE){
            await insertSkill(skills)
            skills.length = 0
        }
    }

    if(skills.length > 0){
        await insertSkill(skills)
    }
}

const insertSkill = async (skills: Skills[]) => {
    const placeholders = skills.map(() => '(?, ?, ?)').join(', ')

    const values = skills.flatMap(skill => [
        skill.uri,
        skill.name,
        skill.type
    ])

    await pool.execute(
        `INSERT INTO 
            skills (idSkill, name, type) 
            VALUES ${placeholders}
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                type = VALUES(type)`,
        values
    )
}

const importOccupations = async () => {
    const occupations: Occupations[] = []
    const BATCH_SIZE = 1000

    const parserSkills = fs
        .createReadStream("./data/esco/occupations_es.csv")
        .pipe(
            parse({
                columns: true,           // La primera fila son los nombres de las columnas
                skip_empty_lines: true,
            })
        );

    for await (const row of parserSkills) {
        const name = row.preferredLabel as string
        const conceptUri = row.conceptUri as string

        const uri = conceptUri.split('/').pop()!

        occupations.push({
            name,
            uri
        })

        if(occupations.length === BATCH_SIZE){
            await insertOccupations(occupations)
            occupations.length = 0
        }
    }

    if(occupations.length > 0){
        await insertOccupations(occupations)
    }
}

const insertOccupations = async (occupations: Occupations[]) => {
    const placeholders = occupations.map(() => '(?, ?)').join(', ')

    const values = occupations.flatMap(occupation => [
        occupation.uri,
        occupation.name
    ])

    await pool.execute(
        `INSERT INTO 
            occupations (idOccupation, name) 
            VALUES ${placeholders}
            ON DUPLICATE KEY UPDATE
                name = VALUES(name)`,
        values
    )
}

const importOccupationsSkills = async () => {
    const occupationsSkills: Relation[] = []
    const BATCH_SIZE = 1000
    let count = 0

    const parserSkills = fs
        .createReadStream("./data/esco/occupationSkillRelations_es.csv")
        .pipe(
            parse({
                columns: true,           // La primera fila son los nombres de las columnas
                skip_empty_lines: true,
            })
        );

    for await (const row of parserSkills) {
        count++;
        const conceptUriOccupation = row.occupationUri as string
        const conceptUriSkill = row.skillUri as string
        const relationType = row.relationType as string

        const uriOccupation = conceptUriOccupation.split('/').pop()!
        const uriSkill = conceptUriSkill.split('/').pop()!
        
        occupationsSkills.push({
            uriSkill,
            uriOccupation,
            relationType
        })

        if(occupationsSkills.length === BATCH_SIZE){
            await insertRelation(occupationsSkills)
            occupationsSkills.length = 0
        }
    }

    if(occupationsSkills.length > 0){
        await insertRelation(occupationsSkills)
    }
    console.log("Filas leídas:", count);
}

const insertRelation = async (occupationsSkills: Relation[]) => {
    const placeholders = occupationsSkills.map(() => '(?, ?, ?)').join(', ')

    const values = occupationsSkills.flatMap(relation => [
        relation.uriSkill,
        relation.uriOccupation,
        relation.relationType === '' ? 'na' : relation.relationType
    ])

    await pool.execute(
        `INSERT INTO 
            skills_occupations (idSkills, idOccupations, relationType) 
            VALUES ${placeholders} 
            ON DUPLICATE KEY UPDATE 
                relationType = VALUES(relationType)`,
        values
    )
}

async function main(){
    await importSkills()
    await importOccupations()
    await importOccupationsSkills()

    console.log("Importacion de datos ESCO completada")
}

main().catch(console.error).finally(() => console.log("Completado")) 





