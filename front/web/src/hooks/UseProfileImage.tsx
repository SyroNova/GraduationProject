import { useContext } from "react";
import ProfileImageContext from "../context/ProfileImageProvider";

export default function UseProfileImage() {
    const context = useContext(ProfileImageContext);
    if(!context) throw new Error("useProfileImage must be inside ProfileImageProvider")
    return context
}