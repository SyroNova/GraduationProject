import { useState } from "react";
import LoginForm from "../../components/Company/LoginCompany/LoginForm";
import ContactInfo from "../../components/Company/LoginCompany/ContactInfo";

export default function LoginUser(){
    const [step, setStep] = useState("login");

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        {step === "login" && (
            <LoginForm onContact={() => setStep("contact")}/>
        )}
        {step === "contact" && (
            <ContactInfo onDone={() => setStep("login")}/>
        )}
        </div>
    )
}