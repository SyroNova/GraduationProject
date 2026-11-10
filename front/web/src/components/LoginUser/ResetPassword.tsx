import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import axios from "../../api/axios";
import logo from "../../assets/Logo.png"
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";

type Props = {
    document: string;
    onChanged: () => void;
}

export default function ResetPassword(props: Readonly<Props>){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();

            if(!password.trim() || !confirmPassword.trim()){
                setError("Por favor, complete todos los campos");
                return;
            }
        
            try {
                await axios.patch("/users/reset-password", {
                    document: props.document,
                    newPassword: password
                })
                setMessage(true)

                setTimeout(() => {
                    setMessage(false)
                }, 4000)
            } catch (error) {
                setError("Error al cambiar la contraseña. Por favor, inténtelo de nuevo.");
                if(isAxiosError(error)){
                    console.log(error.response?.data)
                }
            }
        }

    return(
        <Card style={{ width: '22rem' }} className="d-flex  justify-content-center">
            <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <img src={logo} alt="logo" style={{ height: "180px", width: "180px", marginRight: "20px"}}  className="img-fluid" />
                    <p className="fw-bold fs-3 mb-0" style={{color: "var(--color-text-primary)"}}>UrNextJob</p>
                </div>
                <Form className="ms-4 mt-4" style={{width: "85%"}} onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="fw-bold">Contraseña nueva</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password"
                                value={password}
                                onBlur={(e) => {
                                    if(e.target.value != ""){
                                        setError("")
                                    }
                                }} 
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!error}
                            />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="confirm_password">
                        <Form.Label className="fw-bold">Confirmar contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="confirm_password"
                                value={confirmPassword}
                                onBlur={(e) => {
                                    if(e.target.value != ""){
                                        setError("")
                                    }
                                    if(confirmPassword !== password){
                                        setError("Las contraseñas no coinciden")
                                    }
                                }} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                isInvalid={!!error}
                            />
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary w-100 mb-2" disabled={!!error}>Confirmar</Button>
                </Form>

                <div className="d-flex align-items-center justify-content-center gap-2">
                    <Link to="/login/user" className="btn btn-link link-underline-light p-0">Volver al inicio</Link>
                </div>
                {message && (
                    <Alert variant="success" className="mt-3">
                        Su contraseña ha sido cambiada correctamente. Por favor, inicie sesión con su nueva contraseña.
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
}