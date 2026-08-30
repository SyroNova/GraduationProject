import { Formik, useFormikContext } from "formik"
import { Button, Col, Form, Row } from "react-bootstrap"
import * as yup from "yup";
import type Skill from "../../../../../types/Curriculum/Skill";
import type Curriculum from "../../../../../types/Curriculum/Curriculum";
import axios from "../../../../../api/axios";
import type { SkillEsco } from "../../../../../types/Curriculum/Esco";
import { Typeahead } from "react-bootstrap-typeahead";
import { useEffect } from "react";
import { isAxiosError } from "axios";

type Props = {
    idResume?: string
    data: Skill | null
    escoSkills: SkillEsco[]
    setCurriculum: React.Dispatch<React.SetStateAction<Curriculum | null>>
    onSaveSuccess: () => void
    onError: () => void,
    onCancel?: () => void
    onDirtyChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SkillForm({ idResume, data, escoSkills, setCurriculum, onSaveSuccess, onError, onDirtyChange, onCancel }: Readonly<Props>){
    const schema = yup.object().shape({
        skill: yup.object().nullable().required("La habilidad es requerida"),
        level: yup.string().required("El nivel de la habilidad es requerido")
    })

    const DirtyWatcher = ({
        onDirtyChange
    }: {
        onDirtyChange: (dirty: boolean) => void
    }) => {
        const { dirty } = useFormikContext();

        useEffect(() => {
            onDirtyChange(dirty)
        }, [dirty, onDirtyChange])

        return null
    }

    if(data === null){
        return (
            <Formik
                validationSchema={schema}
                onSubmit={async (values) => {
                    try {
                        const newSkill: Skill = {
                            idSkill: values.skill?.idSkill ?? "",
                            name: values.skill?.name ?? "",
                            level: values.level
                        }

                        const response = await axios.post(`/resume/add/${idResume}/skill`, newSkill)

                        setCurriculum(prev => {
                            if(!prev) return prev

                            const prevSkills = prev.skills.filter(experience => experience.idSkill !== response.data.skill.idSkill)

                            return {
                                ...prev,
                                skills: [
                                    ...prevSkills,
                                    response.data.skill
                                ]
                            }
                        })
                        onSaveSuccess()
                    } catch (error) {
                        console.log(error)
                        onError()
                    }
                }}
                initialValues={{
                    skill: null as SkillEsco | null,
                    level: ""
                }}
            >{({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, setFieldValue, dirty}) => (
                <Form  noValidate onSubmit={handleSubmit} className="mt-3">
                    <DirtyWatcher onDirtyChange={onDirtyChange}/>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Añade habilidades</Form.Label>
                        <Typeahead 
                            id="skills"
                            options={escoSkills}
                            labelKey="name"
                            selected={values.skill ? [values.skill] : []}
                            placeholder="Selecciona tus habilidades..."
                            onChange={(selected) => setFieldValue("skill", selected[0] ?? null)}
                            maxResults={10}
                            paginationText="Mostrar más resultados..."
                            emptyLabel="No se encontraron mas habilidades."
                            isInvalid={touched.skill && !!errors.skill}
                        />
                        <small className="text-muted">Este servicio usa la <a href="https://ec.europa.eu/esco" target="_blank" rel="noopener noreferrer">clasificación ESCO</a> de la Comisión Europea</small>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Selecciona el nivel de la habilidad</Form.Label>
                        <Form.Select
                            name="level"
                            value={values.level}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.level && !!errors.level}
                        >
                            <option value="">Selecciona un nivel</option>
                            <option value="principiante">Principiante</option>
                            <option value="intermedio">Intermedio</option>
                            <option value="avanzado">Avanzado</option>
                        </Form.Select>
                    </Form.Group>
                    <Row className="justify-content-around">
                        <Col sm="auto">
                            <Button type="submit" className="btn-link bg-transparent" disabled={!isValid || !dirty}>Guardar cambios</Button>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
        )
    }

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    const response = await axios.patch(`/resume/patch/${idResume}/skill/${values.skill?.idSkill}`, {
                        level: values.level
                    })

                    setCurriculum(prev => {
                        if(!prev) return prev

                        return {
                            ...prev,
                            skills: prev.skills.map(skill => 
                                skill.idSkill === response.data.skill.idSkill ? response.data.skill : skill
                            )
                        }
                    })

                    onSaveSuccess()
                } catch (error) {
                    if(isAxiosError(error)){
                        console.log(error.response?.data)
                    }
                    onError()
                }
            }}
            initialValues={{
                skill: escoSkills.find(skill => skill.idSkill === data.idSkill) ?? null,
                level: data.level
            }}
        >{({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, setFieldValue, dirty}) => (
            <Form className="mt-3 mb-3" noValidate onSubmit={handleSubmit}>
                <DirtyWatcher onDirtyChange={onDirtyChange}/>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Añade habilidades</Form.Label>
                    <Typeahead 
                        id="skills"
                        options={escoSkills}
                        labelKey="name"
                        selected={values.skill ? [values.skill] : []}
                        placeholder="Selecciona tus habilidades..."
                        onChange={(selected) => setFieldValue("skill", selected[0] ?? null)}
                        maxResults={10}
                        paginationText="Mostrar más resultados..."
                        emptyLabel="No se encontraron mas habilidades."
                        isInvalid={touched.skill && !!errors.skill}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Selecciona el nivel de la habilidad</Form.Label>
                    <Form.Select
                        name="level"
                        value={values.level}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.level && !!errors.level}
                    >
                        <option value="">Selecciona un nivel</option>
                        <option value="principiante">Principiante</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                    </Form.Select>
                </Form.Group>
                <Row className="justify-content-around">
                    <Col sm="auto">
                        <Button type="submit" className="btn-link bg-transparent" disabled={!isValid || !dirty}>Guardar cambios</Button>
                    </Col>
                    <Col sm="auto">
                        <Button type="button" className="btn-link bg-transparent" onClick={onCancel}>Cancelar</Button>
                    </Col>
                </Row>
            </Form>
        )}
        </Formik>
    )
}