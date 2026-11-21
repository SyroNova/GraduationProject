import { isAxiosError } from "axios"
import { useEffect } from "react"
import axios from "../../../api/axios"

export default function DasboardMe(){
    
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await axios.get(`/company/get/id/${1}`)

                console.log(response.data)
            } catch (error) {
                if(isAxiosError(error)){
                    console.log(error.response?.data)
                }
            }
        }

        void fetchMe()
    }, [])


    return(
        <></>
    )
}