import { isAxiosError } from "axios"
import { useEffect } from "react"
import axios from "../../../api/axios"

export default function DashboardCandidates(){
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('/users/get/all')

                console.log(response.data)
            } catch (error) {
                if(isAxiosError(error)){
                    console.log(error.response?.data)
                }
            }
        }

        void fetchCandidates()
    }, [])
    
    return (
        <></>
    )
}