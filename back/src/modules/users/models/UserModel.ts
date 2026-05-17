import { RegisterUserDTO } from "../dto/RegisterUserDTO.js";
import pool from "../../../config/Database.js";
import UserDB from "../types/UserDB.js";
import { ResultSetHeader } from "mysql2";

export default class UserModel{

    public async create(user: RegisterUserDTO) {
        
        const query = `
            INSERT INTO user (cc, typeCC, name, phone, passwordHash, role_idrole)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [user.cc, user.typeCC, user.name, user.phone, user.password, user.rol];
        const [result] = await pool.execute<ResultSetHeader>(query, values);

        return result;
    }

    public async findById(id: number) {
        const query = `
            SELECT * FROM user WHERE idUser = ?
        `;
        const [result] = await pool.execute<UserDB[]>(query, [id]);

        return result[0] ?? null;
    }

    public async findByCC(cc: string) {
        const query = `
            SELECT 
                u.idUser,
                u.name,
                u.cc,
                u.typeCC,
                u.passwordHash,
                u.phone,
                r.name role
            FROM user u
            INNER JOIN role r on r.idRole = u.role_idRole
            WHERE cc = ?
        `;
        const [result] = await pool.execute<UserDB[]>(query, [cc]);

        return result[0] ?? null;
    }

    public async updatePassword(ccUser: string, newPasswordHash: string){
        const query = `
            UPDATE 
                USER
            SET passwordHash = ?
            WHERE cc = ?
        `;
        const [result] = await pool.execute<ResultSetHeader>(query, [newPasswordHash, ccUser]);

        return result.affectedRows > 0;
    }
}