import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { IoEyeOff } from "react-icons/io5";
import "../../../css/Login/LoginPage.css";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import logo from "../../../assets/Logo.png";
//import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { Formik } from "formik";
import axios from "../../../api/axios";
import UseAuth from "../../../hooks/UseAuth";
import { Link } from "react-router-dom";

type Props = {
    onContact: () => void
}

const LOGIN_URL = "/auth/login/company";

export default function LoginForm(props: Readonly<Props>){
    const { setAuth } = UseAuth()
    const [icon, setIcon] = useState(true);
    //const navigator = useNavigate()

    const schema = yup.object().shape({
        NIT: yup.string().required("El NIT es requerido"),
        password: yup.string().required("La contraseña es requerida"),
    })

    return(
        <Card style={{ width: '25rem' }} className="d-flex align-items-center justify-content-center">
            <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <img src={logo} alt="logo" style={{ height: "180px", width: "180px", marginRight: "20px"}}  className="img-fluid" />
                    <p className="fw-bold fs-3 mb-0" style={{color: "var(--color-text-primary)"}}>UrNextJob</p>
                    <p className="fw-bold" style={{color: "var(--color-text-secondary)"}}>Empresa</p>
                </div>
                <Formik
                    validationSchema={schema} 
                    onSubmit={ async (values, {setSubmitting}) =>{
                        try {
                            const response = await axios.post(LOGIN_URL, JSON.stringify(values), {
                                headers: {"Content-Type": "application/json"},
                                withCredentials: true
                            });
                            const accessToken = response?.data?.accessToken;
                            const role = response?.data?.role;
                            const companyId = response?.data?.idCompany;
                            console.log(accessToken, role, companyId);
                            setAuth({ accessToken, role, id: companyId });
                            //await navigator("/dashboard");
                        } catch (error) {
                            console.log(error);
                        } finally{
                            setSubmitting(false);
                        }
                    }
                    }
                    initialValues={{
                        NIT: "",
                        password: "",
                    }}
                >{({handleSubmit, handleChange, handleBlur, values, touched, errors, isValid}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Inicia sesion en tu cuenta</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ingrese su NIT"
                                name="NIT"
                                value={values.NIT}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.NIT && !! errors.NIT}
                            />
                            <Form.Control.Feedback type="invalid">{errors.NIT}</Form.Control.Feedback>
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
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary w-100" disabled={!isValid}>Iniciar sesión</Button>
                    </Form>
                )}
                </Formik>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <p className="mb-0">¿Aun no tienes cuenta?</p>
                    <button type="button" className="btn btn-link p-0" onClick={props.onContact}>Comunicate con nosotros</button>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                    <Link to="/" className="btn btn-link link-underline-light p-0">Volver al inicio</Link>
                </div>
            </Card.Body>
        </Card>
    );
}