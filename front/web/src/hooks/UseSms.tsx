import { useContext } from "react"
import SmsContext from "../context/SmsProvider";

export default function UseSms() {
    const context = useContext(SmsContext);
    if(!context) throw new Error("useSms must be inside SmsProvider")
    return context
}