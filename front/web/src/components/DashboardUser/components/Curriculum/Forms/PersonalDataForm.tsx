import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import type User from "../../../../../types/User"
import * as yup from "yup"
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input';
import { Formik, useFormikContext } from "formik";
import axios from "../../../../../api/axios";
import { isAxiosError } from "axios";
import { useEffect } from "react";

type Props = {
    personalData: User,
    onSaveSuccess: () => void
    onError: () => void,
    setPersonalData: React.Dispatch<React.SetStateAction<User | null>>,
    onDirtyChange: React.Dispatch<React.SetStateAction<boolean>>,
}
export default function PersonalDataForm({ personalData, onSaveSuccess, onError, setPersonalData, onDirtyChange }: Readonly<Props>){

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

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    const response = await axios.patch(`/users/patch/${personalData.idUser}`, values)

                    setPersonalData(response.data.user)
                    onSaveSuccess()
                } catch (error) {
                    if(isAxiosError(error)){
                        console.log(error.response?.data)
                    }
                    console.log(error)
                    onError()
                }
            }}
            initialValues={{
                name: personalData.name,
                document: personalData.document,
                documentType: personalData.documentType,
                phone: personalData.phone,
                birthDate: personalData.birthDate
                            ? personalData.birthDate.split("T")[0]
                            : "",
                email: personalData.email ?? "",
                actualCity: personalData.actualCity ?? ""
            }}
        >{({ handleSubmit, handleChange, handleBlur, values, touched, errors, isValid, setFieldValue, setFieldTouched, dirty }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <DirtyWatcher onDirtyChange={onDirtyChange} />
                <Row className="mb-2">
                    <Col>
                        <Form.Group>
                            <Form.Label className="text-muted mb-1">Nombre completo</Form.Label>
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
                        <Form.Group >
                            <Form.Label className="text-muted mb-1">Documento</Form.Label>
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
                <Row className="mb-2">
                    <Col>
                        <Form.Group >
                            <Form.Label className="text-muted mb-1">Email</Form.Label>
                            <Form.Control 
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.email && !!errors.email}
                                defaultValue={personalData.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label className="text-muted mb-1">Telefono</Form.Label>
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
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted mb-1">Fecha de nacimiento</Form.Label>
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
                    <Col>
                        <Form.Group >
                            <Form.Label className="text-muted mb-1">Ciudad</Form.Label>
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
                <Row className="justify-content-end">
                    <Button type="submit" className="btn-link bg-transparent" disabled={!isValid || !dirty}>Guardar cambios</Button>
                </Row>
            </Form>
        )}
        </Formik>
    )
}