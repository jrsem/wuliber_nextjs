import axios from 'axios'
import { STRAPI_URL } from "@/lib/utils";


const axiosInstance = axios.create({baseURL: STRAPI_URL})


export const getHomepage=async ()=>{
  
    try {
        // Strapi does not return relations/media/components unless populated.
        // Using `populate=deep` avoids "Invalid key ..." errors when the schema
        // field names don't match what the client expects (e.g. `testimonialsSection`).
        const response=await axiosInstance.get(`/api/home-page`)
        console.log("API Response:", response.data)
        return response.data
    } catch (error) {
        console.warn("Hero API failed, using fallback data", error)
        // Return mock data as fallback
        return {
            data: {
                id: 1,
                error: "no data available.",
            }
        }
    }
}
