import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap"
import logo from "../../assets/Logo.png";
import { GoAlert } from "react-icons/go";
import { Formik } from "formik";
import type AcademicExperience from "../../types/Curriculum/AcademicExperience";
import UseResume from "../../hooks/UseResume";
import * as yup from "yup";
import { CiTrash } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


type Props = {
    onNext: () => void
    onBack: () => void
}

export default function AcademicExperienceCard({onNext, onBack}: Readonly<Props>) {
    const navigator = useNavigate()

    const { resume, setResume } = UseResume()

    const experiences: AcademicExperience[] = resume?.academicExperience ?? [];

    const schema = yup.object().shape({
        degree: yup.string().required("Porfavor ingrese el titulo obtenido"),
        institution: yup.string().required("Ingrese una institución"),
        dateStart: yup.string().required("Fecha de inicio requerida"),
        dateEnd: yup.string(),
        description: yup.string()
    })

    const handleBack = () => {
        try {
            if(experiences != resume?.academicExperience){
                setResume(prev => ({
                    ...prev!,
                    academicExperience: experiences
                }))
            }
            onBack()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (index: number) => {
        setResume(prev => ({
            ...prev!,
            academicExperience: experiences.filter((_, i) => i !== index)
        }))
    }

    return (
        <Card style={{ maxWidth: '50rem'}}>
            <Card.Body className="d-flex align-items-center flex-column h-100">
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <img src={logo} alt="logo" style={{ height: "110px", width: "110px", objectFit: "cover" }}  className="img-fluid" />
                    <p className="fw-bold fs-3" style={{color: "var(--color-text-primary)"}}>Experiencia academica</p>
                </div>
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
                        const newExperience: AcademicExperience = {
                            degree: values.degree,
                            institution: values.institution,
                            dateStart: values.dateStart,
                            dateEnd: values.dateEnd || null,
                            description: values.description || null
                        }

                        setResume(prev => ({
                            ...prev!,
                            academicExperience: [...(prev?.academicExperience ?? []), newExperience]
                        }))
                    }}
                    initialValues={{
                        degree: "",
                        institution: "",
                        dateStart: "",
                        dateEnd: "",
                        description: ""
                    }}
                >{({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid}) => (
                    <Form noValidate onSubmit={handleSubmit} className="w-75 p-2">
                        <Row className="justify-content-end">
                            <Col xs="auto">
                                <Button type="submit" variant="link" className="text-decoration-none" disabled={!isValid}>+ Agregar experiencia</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Titulo</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="degree"
                                        placeholder="Ingresa el titulo obtenido"
                                        value={values.degree}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.degree && !!errors.degree}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.degree}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Institución</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="institution"
                                        placeholder="Ingresa la institución"
                                        value={values.institution}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.institution && !!errors.institution}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.institution}</Form.Control.Feedback>
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
                                            <strong>{exp.degree}</strong> · {exp.institution}
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
                            <button type="button" className="btn-link" style={{background: 'none', border: 'none'}} onClick={() => navigator("/dashboard/home")}>Guardar y salir</button>
                            <Button type="button" className="btn btn-primary" onClick={onNext}>Siguiente</Button>
                        </div>
                    </Form>
                )}
                </Formik>
            </Card.Body>
        </Card>
        
    )
} 