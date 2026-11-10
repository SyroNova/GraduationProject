import { createContext, useEffect, useState } from "react"
import axios from "../api/axios"

type ProfileImageContextType = {
    profileImage: string | null
    setProfileImage: (image: string | null) => void
}

const ProfileImageContext = createContext<ProfileImageContextType | null>(null)

export const ProfileImageProvider = ({ children }: {children: React.ReactNode}) => {
    const [profileImage, setProfileImage] = useState<string | null>(null)

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get("/users/get/image")

                //console.log(response.data.result.imageData.data)

                const buffer = response.data.result.imageData

                const blob = new Blob(
                    [new Uint8Array(buffer.data)],
                    { type: response.data.result.mimeType }
                )

                const imageUrl = URL.createObjectURL(blob)
                
                setProfileImage(imageUrl)
            } catch (error) {
                console.error("Error al obtener la imagen de perfil:", error)
            }
        }

        void fetchProfileImage()
    }, [])

    return (
        <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </ProfileImageContext.Provider>
    )
}

export default ProfileImageContext