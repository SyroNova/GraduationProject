import { Button, Card, Form } from "react-bootstrap"
import logo from "../../assets/Logo.png";
import UseResume from "../../hooks/UseResume";
import { Formik } from "formik";

type Props = {
    onNext: () => void
    onBack: () => void
}

export default function ProfessionalInfoCard({onNext, onBack}: Readonly<Props>) {
    const { resume, setResume } = UseResume()

    return (
        <Card style={{ width: '50rem', maxWidth: '50rem'}}>
            <Card.Body className="d-flex align-items-center flex-column mb-5">
                <div className="d-flex justify-content-center pt-3 flex-column align-items-center pb-3">
                    <img src={logo} alt="logo" style={{ height: "120px", width: "120px", objectFit: "cover" }}  className="img-fluid" />
                    <p className="fw-bold fs-3" style={{color: "var(--color-text-primary)"}}>Información Profesional</p>
                </div>
                <Formik
                    validate={(values) => {
                        const errors: {
                            title?: string
                            resume?: string
                        } = {}

                        const hasTitle = values.title.trim() !== ""
                        const hasResume = values.resume.trim() !== ""

                        if(hasTitle && !hasResume){
                            errors.resume = "Debes ingresar un resumen profesional.";
                        }

                        if(hasResume && !hasTitle){
                            errors.title = "Debes ingresar un titulo profesional.";
                        }

                        return errors
                    }}
                    onSubmit={(values) => {
                        setResume(prev => ({
                            ...(prev ?? {
                                academicExperience: [],
                                workExperience: [],
                                skills: [],
                            }),
                            professionalProfile: values
                        }))

                        console.log(resume)
                        onNext()
                    }}
                    initialValues={{
                        title: resume?.professionalProfile?.title ?? "",
                        resume: resume?.professionalProfile?.resume ?? ""
                    }}
                >{({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                    <Form noValidate onSubmit={handleSubmit} className="w-75">
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
                        <div className="d-flex justify-content-around">
                            <button type="button" className="btn btn-secondary" onClick={onBack} style={{ border: 0}}>Anterior</button>
                            <Button type="submit" className="btn btn-primary">Siguiente</Button>
                        </div>
                    </Form>
                )}
                </Formik>
            </Card.Body>
        </Card>
    )
} 