import { useContext } from "react"
import AuthContext from "../context/AuthProvider";

export default function UseAuth() {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be inside AuthProvider")
    return context
}