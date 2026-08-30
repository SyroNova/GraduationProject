import { Button, Card, Form, InputGroup } from "react-bootstrap";
import logo from "../../assets/Logo.png"
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { isAxiosError } from "axios";
import UseSms from "../../hooks/UseSms";

const CODE_SEND_URL = "/auth/send-code/registration";
const CODE_VERIFY_URL = "/auth/verify-code/registration";


type Props = {
    onBack: () => void
}

export default function VerifyRegisterSMS({onBack}: Readonly<Props>){
    const { phone } = UseSms()

    const [smsCode, setSmsCode] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutos = 120 segundos

    const navigator = useNavigate();
    
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
            const response = await axios.post(CODE_SEND_URL, JSON.stringify({ phone: phone ?? 325 }), { // cambiar por phone una vez hago un registro normal y recordar hacer protected routes
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });
            const code = response?.data?.code;
            console.log(code);
            setTimeLeft(120);
            setSent(true);
        } catch (error) {
            if(isAxiosError(error)){
                console.log(error.response?.data?.error)
                //setError(error.response?.data?.error)
            } else{
                setError("Error desconocido")
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(!smsCode.trim()){
            setError("El codigo es obligatorio")
            return;
        }
        
        try {
            const verify = await axios.post(CODE_VERIFY_URL, JSON.stringify({ phone, code: smsCode }), {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });
            const message = verify?.data?.message;
            console.log(message)
        } catch (error) {
            if(isAxiosError(error)){
                setError(error.response?.data?.error)
            } else{
                setError("Error desconocido")
            }
            
        }
        navigator("/curriculum");
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