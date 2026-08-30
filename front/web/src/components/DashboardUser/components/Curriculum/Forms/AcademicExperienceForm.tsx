import type AcademicExperience from "../../../../../types/Curriculum/AcademicExperience"
import type Curriculum from "../../../../../types/Curriculum/Curriculum"
import * as yup from "yup"
import { Formik, useFormikContext } from "formik"
import { useEffect } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import axios from "../../../../../api/axios"
import { isAxiosError } from "axios"
import { getDateClean } from "../../../../../utils/dateUtils"

type Props = {
    idResume?: string
    data: AcademicExperience | null
    onSaveSuccess: () => void
    onError: () => void
    onCancel?: () => void
    setCurriculum: React.Dispatch<React.SetStateAction<Curriculum | null>>
    onDirtyChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AcademicExperienceForm({ idResume, data, onSaveSuccess, onCancel, onError, setCurriculum, onDirtyChange }: Readonly<Props>){
    const schema = yup.object().shape({
        degree: yup.string().required("Porfavor ingrese el titulo obtenido"),
        institution: yup.string().required("Ingrese una institución"),
        dateStart: yup.string().required("Fecha de inicio requerida"),
        dateEnd: yup.string(),
        description: yup.string()
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
                        const response = await axios.post(`/resume/add/${idResume}/academicEx`, {
                            degree: values.degree,
                            institution: values.institution,
                            dateStart: values.dateStart.toString(),
                            dateEnd: values.dateEnd || null,
                            description: values.description || null
                        })

                        setCurriculum(prev => {
                            if(!prev) return prev

                            return {
                                ...prev,
                                academicExperience: [
                                    ...prev.academicExperience,
                                    response.data.academicExperience
                                ]
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
                    degree: "",
                    institution: "",
                    dateStart: "",
                    dateEnd: "",
                    description: ""
                }}
            >{({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, dirty }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <DirtyWatcher onDirtyChange={onDirtyChange}/>
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
                    <Row className="justify-content-end">
                        <Button type="submit" className="btn-link bg-transparent" disabled={!isValid || !dirty}>Guardar cambios</Button>
                    </Row>
                </Form>
            )}
            </Formik>
        )
    }
    
    return (
        <Card>
            <Card.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={async (values) => {
                        try {
                            const response = await axios.patch(`/resume/patch/${data.idAcademicExperience}/academicEx`, {
                                degree: values.degree,
                                institution: values.institution,
                                dateStart: values.dateStart.toString(),
                                dateEnd: values.dateEnd || null,
                                description: values.description || null
                            })

                            setCurriculum(prev => {
                                if(!prev) return prev

                                return {
                                    ...prev,
                                    workExperience: prev.academicExperience.map(experience => 
                                        experience.idAcademicExperience === response.data.academicExperience.idAcademicExperience ? response.data.academicExperience : experience
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
                        degree: data.degree,
                        institution: data.institution,
                        dateStart: getDateClean(data.dateStart),
                        dateEnd: data.dateEnd || "",
                        description: data.description || ""
                    }}
                >{({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, dirty }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <DirtyWatcher onDirtyChange={onDirtyChange}/>
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
            </Card.Body>
        </Card>
    )
}