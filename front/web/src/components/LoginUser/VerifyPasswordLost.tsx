import { isAxiosError } from "axios";
import { useState, useEffect } from "react";
import { Card, InputGroup, Button, Form, Alert } from "react-bootstrap";
//import { IoMdArrowBack } from "react-icons/io";
import logo from "../../assets/Logo.png"
import axios from "../../api/axios";

type Props = {
    onVerify: () => void;
    setDocument: React.Dispatch<React.SetStateAction<string>>;
}


export default function VerifyPasswordLost(props: Readonly<Props>){
    const [smsCode, setSmsCode] = useState("");
    const [document, setDocument] = useState("")
    const [message, setMessage] = useState(false)
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutos = 120 segundos
    
    // Formato mm:ss
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    useEffect(() => {
        if(!sent) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if(prev <= 1){
                    clearInterval(interval)
                    setSent(false)
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // limpieza importante
    }, [sent]);


    const handleSend = async () => {
        // Recordar cambiar en el backend el sms, para que cambie a isValidated a 1
        try {
            console.log(document)
            const response = await axios.post("/auth/send-code", { document });
            const code = response.data.code;
            console.log(code);
            setTimeLeft(120);
            setSent(true);
            setMessage(true)

            setTimeout(() => {
                setMessage(false)
            }, 4000)
        } catch (error) {
            if(isAxiosError(error)){
                console.log(error.response?.data)
                //setError(error.response?.data?.error)
            } else{
                setError("Error desconocido")
            }
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(!smsCode.trim()){
            setError("El codigo es obligatorio")
            return;
        }

        console.log(document)
        
        try {
            const verify = await axios.post("/auth/verify-code", { document, code: smsCode });
            const message = verify.data.message;
            console.log(message)
            props.setDocument(document)
            props.onVerify()
        } catch (error) {
            if(isAxiosError(error)){
                setError(error.response?.data)
                console.log(error.response?.data)
            } else{
                setError("Error desconocido")
            }
            
        }
    }


    return(
        <Card style={{ width: '22rem' }} className="d-flex align-items-center justify-content-center">
            <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <img src={logo} alt="logo" style={{ height: "180px", width: "180px", marginRight: "20px"}}  className="img-fluid" />
                    <p className="fw-bold fs-3 mb-0" style={{color: "var(--color-text-primary)"}}>UrNextJob</p>
                    <p  style={{color: "var(--color-text-secondary)"}}>El codigo sera enviado a su telefono</p>
                </div>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="document">
                            <Form.Label className="fw-bold">Ingrese el documento de identidad</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    type="text" 
                                    name="document"
                                    value={document}
                                    onBlur={(e) => {if(e.target.value != ""){setError("")}}} 
                                    onChange={(e) => setDocument(e.target.value)}
                                    isInvalid={!!error}
                                />
                                <Button variant="outline-secondary" id="button-addon2" disabled={sent} onClick={handleSend}>
                                    {sent ? <div>Reenviar en: <br />{minutes}:{seconds.toString().padStart(2, "0")}</div> : "Enviar"}
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sms">
                            <Form.Label className="fw-bold">Ingrese el codigo</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="sms_cod"
                                    value={smsCode}
                                    onBlur={(e) => {if(e.target.value != ""){setError("")}}} 
                                    onChange={(e) => setSmsCode(e.target.value)}
                                    isInvalid={!!error}
                                />
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary w-100" disabled={!!error}>Validar y continuar</Button>
                    </Form>
                    {message && (
                        <Alert variant="success" className="mt-3">
                            Si el documento de identidad pertenece a alguna cuenta, se le enviara un codigo de verificacion. Por favor, revise su telefono.
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