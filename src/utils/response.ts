import type { ResponseApi } from "../types"

export class ApiResponse {
    static success<T>(message:string, data?:T) : ResponseApi<T> {
        return {
            success:true,
            message:message,
            ...(data && { data })
        }    
    }

    static error(message:string) : ResponseApi {
        return {
            success:false,
            message:message
        }
    }
}
