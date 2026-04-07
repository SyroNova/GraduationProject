import { useState } from "react"
import RegisterForm from "../components/RegisterUser/RegisterForm";
import VerifyRegisterSMS from "../components/RegisterUser/VerifyRegisterSMS";

export default function RegisterPage(){
    const [step, setStep] = useState("verify");

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        {step === "register" && (
            <RegisterForm onNext={() => setStep("verify")}/>
        )}
        {step === "verify" && (
            <VerifyRegisterSMS onBack={() => setStep("register")}/>
        )}
        </div>
    )
}