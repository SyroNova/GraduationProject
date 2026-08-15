import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap"
import logo from "../../assets/Logo.png";
import { GoAlert } from "react-icons/go";
import * as yup from "yup";
import { Formik } from "formik";
import UseResume from "../../hooks/UseResume";
import type { OccupationEsco } from "../../types/Curriculum/Esco";
import type WorkExperience from "../../types/Curriculum/WorkExperience";
import { CiTrash } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Typeahead } from "react-bootstrap-typeahead";
import type { Option } from "react-bootstrap-typeahead/types/types";
import { useNavigate } from "react-router-dom";

type Props = {
    onNext: () => void
    onBack: () => void
}

export default function WorkExperienceCard({onNext, onBack}: Readonly<Props>) {
    const navigator = useNavigate()

    const { resume, setResume } = UseResume()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [occupations, setOccupations] = useState<OccupationEsco[]>([])
    
    const experiences: WorkExperience[] = resume?.workExperience ?? [];

    useEffect(() => {
        const fetchOccupations = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await axios.get<OccupationEsco[]>('/esco/occupations')

                setOccupations(response.data)
            } catch (error) {
                console.log(error)
                setError("Error loading occupations")
            } finally{
                setLoading(false)
            }
        }

        fetchOccupations()
    }, [])

    const schema = yup.object().shape({
        occupation: yup.object().nullable().required("Porfavor ingrese un cargo"),
        company: yup.string().required("Ingrese una empresa"),
        dateStart: yup.date().required("Fecha de inicio requerida"),
        dateEnd: yup.date(),
        description: yup.string()
    })

    const handleBack = () => {
        try {
            setResume(prev => ({
                ...prev!,
                workExperience: experiences 
            }))
            onBack()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (index: number) => {
        setResume(prev => ({
            ...prev!,
            workExperience: experiences.filter((_, i) => i !== index)
        }))
    }

    const childRender = (option: Option) => {
        const occupation = option as OccupationEsco
        return (
            <div
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%"
                }}
                title={occupation.name}
            >
                {occupation.name}
            </div>
        )
    }

    return (
        <>
            {loading ? 
                <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
                    :
                <Card style={{ maxWidth: '50rem'}}>
                    <Card.Body className="d-flex align-items-center flex-column h-100">
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <img src={logo} alt="logo" style={{ height: "110px", width: "110px", objectFit: "cover" }}  className="img-fluid" />
                            <p className="fw-bold fs-3" style={{color: "var(--color-text-primary)"}}>Experiencia Laboral</p>
                        </div>
                        {error && 
                            <Alert variant="warning">
                                {error}
                            </Alert>
                        }
                        <Alert variant="warning" className="pt-2 pb-0">
                            <Row>
                                <Col sm={1}>
                                    <GoAlert size={30}/>
                                </Col>
                                <Col>
                                    <p>En esta primera etapa te permitimos registrar un maximo de 2 experiencias, despues podras acceder a tu hoja de vida y añadir un maximo de 5.</p>
                                </Col>
                            </Row>
                        </Alert>
                        <Formik
                            validationSchema={schema}
                            onSubmit={ (values) => {
                                const newExperience: WorkExperience = {
                                    position: values.occupation?.name ?? "",
                                    company: values.company,
                                    dateStart: values.dateStart.toString(),
                                    dateEnd: values.dateEnd ?? null,
                                    description: values.description ?? null
                                }

                                setResume(prev => ({
                                    ...prev!,
                                    workExperience: [...(prev?.workExperience ?? []), newExperience]
                                }))
                            }}
                            initialValues={{
                                occupation: null as OccupationEsco | null,
                                company: "",
                                dateStart: "",
                                dateEnd: "",
                                description: ""
                            }}
                        >{({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, setFieldValue}) => (
                            <Form noValidate onSubmit={handleSubmit} className="w-75 p-2">
                                <Row className="justify-content-end">
                                    <Col xs="auto">
                                        <Button type="submit" variant="link" className="text-decoration-none" disabled={!isValid}>+ Agregar experiencia</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Cargo</Form.Label>
                                            <Typeahead
                                                id="occupations"
                                                options={occupations}
                                                labelKey="name"
                                                selected={values.occupation ? [values.occupation] : []}
                                                placeholder="Selecciona tu ocupacion..."
                                                onChange={(selected) => setFieldValue("occupation", selected[0] ?? null)}
                                                maxResults={10}
                                                paginationText="Mostrar más resultados..."
                                                emptyLabel="No se encontraron mas ocupaciones."
                                                renderMenuItemChildren={childRender}    
                                                isInvalid={touched.occupation && !!errors.occupation}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.occupation}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Empresa</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="company"
                                                placeholder="Ingresa la empresa"
                                                value={values.company}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.company && !!errors.company}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Fecha de inicio</Form.Label>
                                            <Form.Control 
                                                type="date"
                                                name="dateStart"
                                                value={values.dateStart}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.dateStart && !!errors.dateStart}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.dateStart}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Fecha de Fin</Form.Label>
                                            <Form.Control 
                                                type="date"
                                                name="dateEnd"
                                                value={values.dateEnd}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.dateEnd && !!errors.dateEnd}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Especificaciones</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={4} 
                                        style={{ resize: 'none' }}
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.description && !!errors.description}
                                    />
                                </Form.Group>
                                {experiences.length > 0 &&
                                    <div className="p-2 mt-4" style={{ border: "1px solid gray", borderRadius: "5px" }}>
                                        {experiences.map((exp, index) => (
                                            <div
                                                key={index}
                                                className="d-flex justify-content-between align-items-center py-1"
                                                style={{ fontSize: "0.9rem" }}
                                            >
                                                <div>
                                                    <strong>{exp.position}</strong> · {exp.company}
                                                </div>

                                                <div>
                                                    <small className="text-muted me-2">
                                                        {exp.dateStart} - {exp.dateEnd || "Actual"}
                                                    </small>
                                                    <CiTrash size="20" color="black" onClick={() => handleDelete(index)}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                                <div className="d-flex justify-content-around mt-3">
                                    <button type="button" className="btn btn-secondary" onClick={handleBack} style={{ border: 0}}>Anterior</button>
                                    <button type="button" className="btn-link" style={{background: 'none', border: 'none'}} onClick={() => navigator("/dashboard/home")}>Guardar  y salir</button>
                                    <Button type="button" className="btn btn-primary" onClick={onNext}>Siguiente</Button>
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