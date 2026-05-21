import {useQuery} from "@tanstack/react-query"
import { getHomepage } from "./functions"

export function GetHomePageData(){
    return useQuery({
        queryKey:['homepage'],
        queryFn:()=>getHomepage(),
    })
}

