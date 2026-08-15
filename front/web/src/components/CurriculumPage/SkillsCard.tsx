import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap"
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { GoAlert } from "react-icons/go";
import UseResume from "../../hooks/UseResume";
import { CiTrash } from "react-icons/ci";
import * as yup from "yup";
import { Formik } from "formik";
import type Skill from "../../types/Curriculum/Skill";
import type { SkillEsco } from "../../types/Curriculum/Esco";
import UseAuth from "../../hooks/UseAuth";

type Props = {
    onBack: () => void
}

export default function SkillsCard({onBack}: Readonly<Props>) {
    const navigator = useNavigate()

    const { auth } = UseAuth()

    const schema = yup.object().shape({
        skill: yup.object().nullable().required("La habilidad es requerida"),
        level: yup.string().required("El nivel de la habilidad es requerido")
    })

    const { resume, setResume, setStep } = UseResume()

    const skillSelected: Skill[] = resume?.skills ?? []
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [skills, setSkills] = useState<SkillEsco[]>([])

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await axios.get<SkillEsco[]>('/esco/skills')

                setSkills(response.data)
            } catch (error) {
                console.log(error)
                setError("Error loading skills")
            } finally{
                setLoading(false)
            }
        }

        fetchSkills()
    }, [])

    const handleBack = () => {
        try {
            setResume(prev => ({
                ...prev!,
                skills: skillSelected
            }))
            onBack()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (index: string) => {
        setResume(prev => ({
            ...prev!,
            skills: skillSelected.filter((skill: Skill) => skill.idSkill !== index)
        }))
    }

    const handleFinish = async () => {
        try {
            setLoading(true)
            setError("")

            const response = await axios.post(`/resume/create/${auth?.resumeId ?? 1}`, {
                professionalProfile: resume?.professionalProfile,
                academicExperience: resume?.academicExperience,
                workExperience: resume?.workExperience,
                skills: skillSelected
            })

            console.log(response.data?.message)

            localStorage.removeItem("resumeDraft")

            setResume(null)
            setStep("start")

            navigator('/dashboard/home')
        } catch (error) {
            console.log(error)
            setError("Error saving resume")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
        {loading ? 
            <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                <span className="visually-hidden">Loading...</span>
            </Spinner> 
                :
            <Card style={{maxWidth: '50rem'}}>
                <Card.Body className="d-flex align-items-center flex-column mb-5">
                    <div className="d-flex justify-content-center pt-3 flex-column align-items-center">
                        <img src={logo} alt="logo" style={{ height: "120px", width: "120px", objectFit: "cover" }}  className="img-fluid" />
                        <p className="fw-bold fs-3" style={{color: "var(--color-text-primary)"}}>Habilidades y Documentos</p>
                    </div>
                    <Alert variant="warning" className="pt-2 pb-0">
                        <Row>
                            <Col sm={1}>
                                <GoAlert size={30}/>
                            </Col>
                            <Col>
                                <p>En esta primera etapa te permitimos registrar un maximo de 4 habilidades, despues podras acceder a tu hoja de vida y añadir más.</p>
                            </Col>
                        </Row>
                    </Alert>
                    {error && 
                        <Alert variant="warning">
                            {error}
                        </Alert>
                    }
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values) => {
                            const newSkill: Skill = {
                                idSkill: values.skill?.idSkill ?? "",
                                name: values.skill?.name ?? "",
                                level: values.level
                            }

                            setResume(prev => ({
                                ...prev!,
                                skills: [...(prev?.skills ?? []), newSkill]
                            }))
                        }}
                        initialValues={{
                            skill: null as SkillEsco | null,
                            level: ""
                        }}
                    >{({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, setFieldValue}) => (
                        <Form noValidate onSubmit={handleSubmit} className="w-75">
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <Button type="submit" variant="link" className="text-decoration-none" disabled={!isValid}>+ Agregar habilidad</Button>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Añade habilidades</Form.Label>
                                <Typeahead 
                                    id="skills"
                                    options={skills}
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
                            {skillSelected.length > 0 &&
                                <Row className="mb-3">
                                    {skillSelected.map((skill) => (
                                        <Col
                                            key={skill.idSkill}
                                            className="py-1 text-primary fw-bold"  
                                            style={{ fontSize: "0.9rem"}}
                                            xs={12} 
                                            md={6}
                                        >
                                            <div className="justify-content-center p-1" style={{border: '1px solid black', borderRadius: '5px'}}>
                                                <Row>
                                                        <Col
                                                        className="text-truncate"
                                                        title={skill.name}
                                                    >
                                                        {skill.name}
                                                    </Col>
                                                    <Col xs="auto">
                                                        {"-"}
                                                    </Col>
                                                    <Col xs="auto">
                                                        {skill.level}
                                                        {" "}
                                                        <CiTrash onClick={() => handleDelete(skill.idSkill)} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            }
                            <div className="d-flex justify-content-around">
                                <button type="button" className="btn btn-secondary" onClick={handleBack} style={{ border: 0}}>Anterior</button>
                                <button type="button" className="btn-link" style={{background: 'none', border: 'none'}} onClick={() => navigator("/dashboard/home")}>Guardar temporalmente y salir</button>
                                <Button type="button" className="btn btn-primary" onClick={handleFinish}>Finalizar</Button>
                            </div>
                        </Form>
                    )}
                    </Formik>
                </Card.Body>
            </Card>
        }
        </>
    )
} 