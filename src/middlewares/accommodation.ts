import { paramSchema } from "../schemas/accommodation.schemas"
import type { Request, Response, NextFunction } from "express"
import { ApiResponse } from "../utils/response"
import { prisma } from "../database/db"

class AccommodationMiddleware {

    static async validate(req:Request, res:Response, next:NextFunction) {
        try {

            const { id } = paramSchema.parse(req.params)
            const accomodation = await prisma.accommodations.findUnique({
                where:{
                    id,
                    ownerId:req.user?.id
                }
            })

            if (!accomodation) throw new Error('Accommodation Not Found')

            req.accommodation = accomodation;
            next();
            

        } catch (error) {
            console.log(error)
            return res.status(201).json(
                ApiResponse.error("Bad Request")
            )
        }
    }
}


export { AccommodationMiddleware }