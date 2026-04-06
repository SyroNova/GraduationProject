import { Button, Card, Form, InputGroup } from "react-bootstrap";
import logo from "../../assets/Logo.png"
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

type Props = {
    onBack: () => void
}

export default function VerifyRegisterSMS({onBack}: Props){
    const [smsCode, setSmsCode] = useState("");
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


    const handleSend = () => {
        setTimeLeft(120); // 🔥 reinicia contador
        setSent(true);

        // aquí iría tu lógica real de envío SMS
    };

    const handleSubmit = (e: any) =>{
        e.preventDefault();

        if(!smsCode.trim()){
            setError("El codigo es obligatorio")
            return;
        }
        
        setError("");
    }


    return(
         <Card style={{ width: '22rem' }} className="d-flex align-items-center justify-content-center">
            <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <img src={logo} alt="logo" style={{ height: "180px", width: "180px", marginRight: "20px"}}  className="img-fluid" />
                    <p className="fw-bold fs-3 mb-0" style={{color: "var(--color-text-primary)"}}>UrNextJob</p>
                    <p  style={{color: "var(--color-text-secondary)"}}>El codigo ha sera enviado a su telefono</p>
                </div>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="sms">
                            <Form.Label className="fw-bold">Ingrese el codigo</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    type="text" 
                                    name="sms_cod"
                                    value={smsCode}
                                    onBlur={(e) => {if(e.target.value != ""){setError("")}}} 
                                    onChange={(e) => setSmsCode(e.target.value)}
                                    isInvalid={!!error}
                                />
                                <Button variant="outline-secondary" id="button-addon2" disabled={sent} onClick={handleSend}>
                                    {sent ? <div>Reenviar en: <br />{minutes}:{seconds.toString().padStart(2, "0")}</div> : "Enviar"}
                                </Button>
                            </InputGroup>
                            {error && <div className="text-danger mt-1">{error}</div>}
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary w-100" disabled={!!error}>Validar y continuar</Button>
                    </Form>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <button type="button" className="btn btn-link p-0" onClick={onBack}><IoMdArrowBack color="black" /></button>
                    <p className="mb-0">Retroceder</p>
                </div>
            </Card.Body>
        </Card>
    );
}