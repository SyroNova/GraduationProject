import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { IoEyeOff } from "react-icons/io5";
import "../../css/LoginUser/LoginPage.css";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { Formik } from "formik";

type Props = {
    onLost: () => void
}

export default function LoginForm({onLost}: Readonly<Props>){
    const [icon, setIcon] = useState(true);
    const navigator = useNavigate()

    const schema = yup.object().shape({
        cc: yup.string().required("La cedula es requerida"),
        password: yup.string().required("La contraseña es requerida"),
    })

    return(
        <Card style={{ width: '22rem' }} className="d-flex align-items-center justify-content-center">
            <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <img src={logo} alt="logo" style={{ height: "180px", width: "180px", marginRight: "20px"}}  className="img-fluid" />
                    <p className="fw-bold fs-3 mb-0" style={{color: "var(--color-text-primary)"}}>UrNextJob</p>
                    <p className="fw-bold" style={{color: "var(--color-text-secondary)"}}>Usuario</p>
                </div>
                <Formik
                    validationSchema={schema} 
                    onSubmit={console.log}
                    initialValues={{
                        cc: "",
                        password: "",
                    }}
                >{({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Inicia sesion en tu cuenta</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="CC"
                                name="cc"
                                value={values.cc}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.cc && !! errors.cc}
                            />
                            <Form.Control.Feedback type="invalid">{errors.cc}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Contraseña</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    type={icon ? "password" : "text"} 
                                    placeholder="Contraseña..."
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.password && !!errors.password}
                                />
                                <Button id="showPassword" onClick={() => setIcon(!icon)}>{(icon ? <IoEyeOff color="black" /> : <IoMdEye color="black" /> )}</Button>
                            </InputGroup>
                            <Form.Control.Feedback 
                                type="invalid" 
                                style={{ display: "block"}}
                            >
                                {touched.password && errors.password ? errors.password : ""}
                            </Form.Control.Feedback>
                            <Form.Text className="text-primary"><button type="button" className="btn btn-link p-0" onClick={onLost}>¿Olvidaste tu contraseña?</button></Form.Text>
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary w-100" disabled={!isValid}>Iniciar sesión</Button>
                    </Form>
                )}
                </Formik>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <p className="mb-0">¿Aun no tienes cuenta?</p>
                    <button type="button" className="btn btn-link p-0" onClick={() => navigator("/register/user")}>Registrate aqui</button>
                </div>
            </Card.Body>
        </Card>
        
    );
}