import { useState } from "react"
import LoginForm from "../../components/User/LoginUser/LoginForm";
import VerifyPasswordLost from "../../components/User/LoginUser/VerifyPasswordLost";
import ResetPassword from "../../components/User/LoginUser/ResetPassword";

export default function LoginUser(){
    const [step, setStep] = useState("login");
    const [document, setDocument] = useState("")

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        {step === "login" && (
            <LoginForm onLost={() => setStep("lost")}/>
        )}
        {step === "lost" && (
            <VerifyPasswordLost onVerify={() => setStep("reset")} onBack={() => setStep("login")} setDocument={setDocument} />
        )}
        {step === "reset" && (
            <ResetPassword document={document} onChanged={() => setStep("login")} />
        )}
        </div>
    )
}