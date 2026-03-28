import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import * as yup from "yup";
import { Formik } from "formik";

type Props = {
    onNext: () => void
}

export default function RegisterForm({onNext}: Readonly<Props>){
    const [iconPassword, setIconPassword] = useState(true);
    const [iconPasswordConfirm, setIconPasswordConfirm] = useState(true);
    const navigator = useNavigate()


    const schema = yup.object().shape({
        name: yup.string().required("El nombre es requerido"),
        cc: yup.string().required("La cedula es requerida"),
        phone: yup.string().required("El telefono es requerido"),
        password: yup.string().required("La contraseña es requerida"),
        verifyPassword: yup.string().oneOf([yup.ref("password")], "Las contraseñas no coinciden").required("Requerido"),
    })

    return(
        <Card style={{ width: '22rem' }} className="d-flex align-items-center justify-content-center">
            <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <img src={logo} alt="logo" style={{ height: "180px", width: "180px", marginRight: "20px"}}  className="img-fluid" />
                    <p className="fw-bold fs-3 mb-0" style={{color: "var(--color-text-primary)"}}>UrNextJob</p>
                    <p className="fw-bold mb-0" style={{color: "var(--color-text-secondary)"}}>Usuario</p>
                </div>
                <Formik
                    validationSchema={schema} 
                    onSubmit={(values) =>{
                        console.log(values)
                        onNext()
                    }}
                    initialValues={{
                        name: "",
                        cc: "",
                        phone: "",
                        password: "",
                        verifyPassword: ""
                    }}
                >
                {({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
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
                    <Form.Group className="mb-3" controlId="cc">
                        <Form.Label className="fw-bold">Cedula</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="CC"
                            name="cc" 
                            value={values.cc} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            isInvalid={touched.cc && !!errors.cc}
                        />
                        <Form.Control.Feedback type="invalid">{errors.cc}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label className="fw-bold">Numero de telefono</Form.Label>
                        <Form.Control 
                            type="tel" 
                            name="phone" 
                            value={values.phone} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            isInvalid={touched.phone && !!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="fw-bold">Contraseña</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control 
                                type={iconPassword ? "password" : "text"} 
                                placeholder="Contraseña..." 
                                name="password" 
                                value={values.password} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.password && !!errors.password}
                            />
                            <Button type="button" id="showPassword" onClick={() => setIconPassword(!iconPassword)}>{(iconPassword ? <IoEyeOff color="black" /> : <IoMdEye color="black" /> )}</Button>
                        </InputGroup>
                        <Form.Control.Feedback 
                            type="invalid" 
                            style={{ display: "block" }}
                        >
                            {touched.password && errors.password ? errors.password : ""}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="verifyPassword">
                        <Form.Label className="fw-bold">Confirmar contraseña</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control 
                                type={iconPasswordConfirm ? "password" : "text"} 
                                placeholder="Confirme contraseña" 
                                name="verifyPassword" 
                                value={values.verifyPassword} 
                                onChange={handleChange} 
                                onBlur={handleBlur}
                                isInvalid={touched.verifyPassword && !!errors.verifyPassword}
                            />
                            <Button type="button" id="showPassword" onClick={() => setIconPasswordConfirm(!iconPasswordConfirm)}>{(iconPasswordConfirm ? <IoEyeOff color="black" /> : <IoMdEye color="black" /> )}</Button>
                        </InputGroup>
                        <Form.Control.Feedback 
                            type="invalid" 
                            style={{ display: "block" }}
                        >
                            {touched.verifyPassword && errors.verifyPassword ? errors.verifyPassword : ""}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary w-100" disabled={!isValid}>Registrarse</Button>
                </Form>
                )}
                
                
                </Formik>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <p className="mb-0">¿Ya tienes una cuenta?</p>
                    <button type="button" className="btn btn-link p-0" onClick={() => navigator("/login/user")}>Inicia sesion aqui</button>
                </div>
            </Card.Body>
        </Card>
    );
}