import { Button, Card, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap"
import logo from "../../assets/Logo.png";
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import * as yup from "yup"
import { Formik } from "formik";
import UseAuth from "../../hooks/UseAuth";
import { useEffect, useState } from "react";
import type User from "../../types/User";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import { isEqual } from "lodash";


type Props = {
    onNext: () => void
    onBack: () => void
}

export default function PersonalInfoCard({onNext, onBack}: Readonly<Props>) {
    const { auth } = UseAuth()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`/users/get/id/${auth?.id ?? 5}`)//TODO: Recordar quitar el 5
            setUser(response.data)
        }

        fetchUser()
    }, [auth?.id])

    if(!user){
        return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
    }

    const maxBirthDate = new Date();
    maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18);
    const minDate = new Date(1900, 0, 1)
    const regex = /^\d+$/

    const schema = yup.object().shape({
        name: yup.string().required("El nombre es obligatorio"),
        document: yup.string().required("El documento es obligatorio").matches(regex, "Solo se permiten numeros"),
        typeDoc: yup.string(),
        phone: yup.string()
                .required("El telefono es obligatorio")
                .test(
                    "is-valid-phone", 
                    "Numero de telefono invalido", 
                    value => !!value && isValidPhoneNumber(value)
                ),
        birthDate: yup.date()
                    .required("La fecha de nacimiento es obligatoria")
                    .min(minDate, "La fecha no es valida")
                    .max(maxBirthDate, "Debes ser mayor de 18 años"),
        email: yup.string().email("Ingrese un correo valido"),
        city: yup.string()
    })

    return (
        <Card style={{ width: '50rem', maxWidth: '50rem'}}>
            <Card.Body className="d-flex align-items-center flex-column mb-5">
                <div className="d-flex justify-content-center pt-3 flex-column align-items-center pb-3">
                    <img src={logo} alt="logo" style={{ height: "120px", width: "120px", objectFit: "cover" }}  className="img-fluid" />
                    <p className="fw-bold fs-3" style={{color: "var(--color-text-primary)"}}>Información Personal</p>
                </div>
                <Formik
                    validationSchema={schema}
                    enableReinitialize
                    onSubmit={async (values) => {
                        try {
                            const initialValues = {
                                name: user.name,
                                document: user.document,
                                documentType: user.documentType,
                                phone: user.phone,
                                birthDate: user.birthDate
                                            ? user.birthDate.split("T")[0]
                                            : "",
                                email: user.email ?? "",
                                actualCity: user.actualCity ?? ""
                            }

                            if(isEqual(values, initialValues)){
                                onNext()
                                return;
                            }

                            const response = await axios.patch(`/users/update/${auth?.id ?? 5}`, {
                                name: values.name,
                                document: values.document,
                                documentType: values.documentType,
                                email: values.email,
                                phone: values.phone,
                                birthDate: values.birthDate,
                                actualCity: values.actualCity,
                            })

                            console.log(response)
                            onNext()
                        } catch (error) {
                            const arr = error as AxiosError
                            console.log(arr.response?.data)
                        }
                    }}
                    initialValues={{
                        name: user.name,
                        document: user.document,
                        documentType: user.documentType,
                        phone: user.phone,
                        birthDate: user.birthDate
                                    ? user.birthDate.split("T")[0]
                                    : "",
                        email: user.email ?? "",
                        actualCity: user.actualCity ?? ""
                    }}
                >{({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, setFieldValue, setFieldTouched}) => (
                    <Form noValidate onSubmit={handleSubmit} className="w-75">
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Nombre</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.name && !!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Documento</Form.Label>
                                    <InputGroup>
                                        <Form.Select 
                                            style={{ maxWidth: '80px' }}
                                            name="documentType"
                                            value={values.documentType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.documentType && !!errors.documentType}
                                        >
                                            <option>CC</option>
                                            <option>TI</option>
                                            <option>CE</option>
                                        </Form.Select>
                                        <Form.Control
                                            type="text"
                                            placeholder="Número de documento"
                                            name="document"
                                            value={values.document}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.document && !!errors.document}
                                        />
                                    </InputGroup>
                                    
                                    {touched.documentType && errors.documentType && (
                                        <div className="text-danger">{errors.documentType}</div>
                                    )}

                                    {touched.document && errors.document && (
                                        <div className="text-danger">{errors.document}</div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Numero de telefono</Form.Label>
                                    <PhoneInput
                                        international
                                        defaultCountry="CO"
                                        value={values.phone}
                                        onChange={(value) => setFieldValue("phone", value)}
                                        onBlur={() => setFieldTouched("phone", true)}
                                        numberInputProps={{
                                            className:"form-control"
                                        }}
                                    />
                                    {touched.phone && errors.phone && (
                                        <div className="invalid-feedback d-block">
                                            {errors.phone}
                                        </div>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Fecha de nacimiento</Form.Label>
                                    <Form.Control 
                                        type="date"
                                        name="birthDate"
                                        value={values.birthDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.birthDate && !!errors.birthDate}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.birthDate}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Correo electronico</Form.Label>
                                    <Form.Control 
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Ciudad</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="actualCity"
                                        value={values.actualCity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.actualCity && !!errors.actualCity}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.actualCity}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-around">
                            <button type="button" className="btn btn-secondary" onClick={onBack} style={{ border: 0}}>Anterior</button>
                            <Button type="submit" className="btn btn-primary" disabled={!isValid}>Siguiente</Button>
                        </div>
                        
                    </Form>
                )}
                </Formik>
            </Card.Body>
        </Card>
    )
} 