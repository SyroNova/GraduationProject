import { useContext } from "react"
import ResumeContext from "../context/ResumeProvider";

export default function UseResume() {
    const context = useContext(ResumeContext);
    if(!context) throw new Error("useResume must be inside ResumeProvider")
    return context
}