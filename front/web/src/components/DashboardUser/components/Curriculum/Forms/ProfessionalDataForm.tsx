import { Formik, useFormikContext } from "formik"
import type Curriculum from "../../../../../types/Curriculum/Curriculum"
import type ProfessionalProfile from "../../../../../types/Curriculum/ProfessionalProfile"
import { useEffect } from "react"
import * as yup from "yup"
import { Col, Row, Form, Button } from "react-bootstrap"
import axios from "../../../../../api/axios"

type Props = {
    professionalProfile: ProfessionalProfile,
    setCurriculum: React.Dispatch<React.SetStateAction<Curriculum | null>>,
    onSaveSuccess: () => void
    onError: () => void,
    onDirtyChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProfessionalDataForm({ professionalProfile, setCurriculum, onSaveSuccess, onError, onDirtyChange }: Readonly<Props>){
    
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

    const schema = yup.object().shape({
        title: yup.string().required("El titulo es obligatorio"),
        resume: yup.string().required("El resumen es obligatorio")
    })
    
    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    const response = await axios.patch(`/resume/patch/${professionalProfile.idProfessionalProfile}/professionalP`, values)

                    setCurriculum(prev => {
                        if(!prev) return prev

                        return {
                            ...prev,
                            professionalProfile: response.data.professionalProfile
                        }
                    })

                    onSaveSuccess()
                } catch (error) {
                    console.log(error)
                    onError()
                }}
            }
            initialValues={{
                title: professionalProfile.title ?? "",
                resume: professionalProfile.resume ?? ""
            }}
        >{({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, dirty}) => (
            <Form noValidate onSubmit={handleSubmit}>
                <DirtyWatcher onDirtyChange={onDirtyChange} />
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Titulo Profesional</Form.Label>
                            <Form.Control 
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.title && !!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Resumen Profesional</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={4} 
                                style={{ resize: 'none' }}
                                name="resume"
                                value={values.resume}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.resume && !!errors.resume}
                            />
                            <Form.Control.Feedback type="invalid">{errors.resume}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-end">
                    <Button type="submit" className="btn-link bg-transparent" disabled={!isValid || !dirty}>Guardar cambios</Button>
                </Row>
            </Form>
        )}
        </Formik>
    )
}