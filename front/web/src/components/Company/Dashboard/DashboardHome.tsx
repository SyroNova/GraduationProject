import { isAxiosError } from "axios"
import { useEffect } from "react"
import axios from "../../../api/axios"

export default function DashboardHome(){

    useEffect(() => {
        const fetchOffers = async () =>{
            try {
                const response = await axios.get(`/offers/get/company/${1}`)

                console.log(response.data)
            } catch (error) {
                if(isAxiosError(error)){
                    console.log(error.response?.data)
                }
            }
        }

        void fetchOffers()
    }, [])


    return (
        <>
        </>
    )
}