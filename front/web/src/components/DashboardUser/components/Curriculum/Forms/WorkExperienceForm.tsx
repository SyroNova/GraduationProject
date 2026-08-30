import { Button, Card, Col, Form, Row } from "react-bootstrap"
import type Curriculum from "../../../../../types/Curriculum/Curriculum"
import type { OccupationEsco } from "../../../../../types/Curriculum/Esco"
import type WorkExperience from "../../../../../types/Curriculum/WorkExperience"
import * as yup from "yup"
import { Formik, useFormikContext } from "formik"
import { Typeahead } from "react-bootstrap-typeahead"
import type { Option } from "react-bootstrap-typeahead/types/types";
import axios from "../../../../../api/axios"
import { useEffect } from "react"
import { isAxiosError } from "axios"
import { getDateClean } from "../../../../../utils/dateUtils"

type Props = {
    idResume?: string
    data: WorkExperience | null
    escoData: OccupationEsco[]
    onSaveSuccess: () => void
    onError: () => void
    onCancel?: () => void
    setCurriculum: React.Dispatch<React.SetStateAction<Curriculum | null>>
    onDirtyChange: React.Dispatch<React.SetStateAction<boolean>>

}


export default function WorkExperienceForm({ idResume, data, escoData, onSaveSuccess, onCancel, onError, setCurriculum, onDirtyChange }: Readonly<Props>){
    const schema = yup.object().shape({
        occupation: yup.object().nullable().required("Este campo es obligatorio"),
        company: yup.string().required("Este campo es obligatorio"),
        dateStart: yup.string().required("Este campo es obligatorio"),
        dateEnd: yup.string(),
        description: yup.string()
    })

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
                        const response = await axios.post(`/resume/add/${idResume}/workEx`, {
                            position: values.occupation?.name ?? "",
                            company: values.company,
                            dateStart: values.dateStart.toString(),
                            dateEnd: values.dateEnd || null,
                            description: values.description || null
                        })

                        setCurriculum(prev => {
                            if(!prev) return prev

                            return {
                                ...prev,
                                workExperience: [
                                    ...prev.workExperience,
                                    response.data.workExperience
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
                    occupation: null as OccupationEsco | null,
                    company: "",
                    dateStart: "",
                    dateEnd: "",
                    description: ""
                }}
            >{({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, setFieldValue, dirty }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <DirtyWatcher onDirtyChange={onDirtyChange}/>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Cargo</Form.Label>
                                <Typeahead
                                    id="occupations"
                                    options={escoData}
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
                                <small className="text-muted">Este servicio usa la <a href="https://ec.europa.eu/esco" target="_blank" rel="noopener noreferrer">clasificación ESCO</a> de la Comisión Europea</small>
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
                            const response = await axios.patch(`/resume/patch/${data.idWorkExperience}/workEx`, {
                                position: values.occupation?.name ?? "",
                                company: values.company,
                                dateStart: values.dateStart.toString(),
                                dateEnd: values.dateEnd || null,
                                description: values.description || null
                            })

                            setCurriculum(prev => {
                                if(!prev) return prev

                                return {
                                    ...prev,
                                    workExperience: prev.workExperience.map(experience => 
                                        experience.idWorkExperience === response.data.workExperience.idWorkExperience ? response.data.workExperience : experience
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
                        occupation: escoData.find(occupation => occupation.name === data.position) ?? null,
                        company: data.company,
                        dateStart: getDateClean(data.dateStart),
                        dateEnd: data.dateEnd || "",
                        description: data.description || ""
                    }}
                >{({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, setFieldValue, dirty }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <DirtyWatcher onDirtyChange={onDirtyChange}/>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Cargo</Form.Label>
                                    <Typeahead
                                        id="occupations"
                                        options={escoData}
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