import { useState } from "react"
import LoginForm from "../components/LoginUser/LoginForm";
import VerifyPasswordLost from "../components/LoginUser/VerifyPasswordLost";
import ResetPassword from "../components/LoginUser/ResetPassword";

export default function LoginUser(){
    const [step, setStep] = useState("login");

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        {step === "login" && (
            <LoginForm onLost={() => setStep("lost")}/>
        )}
        {step === "lost" && (
            <VerifyPasswordLost onVerify={() => setStep("reset")}/>
        )}
        {step === "reset" && (
            <ResetPassword />
        )}
        </div>
    )
}