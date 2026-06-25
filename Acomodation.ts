import type { NextFunction, Request, Response } from "express";
import { paramSchema } from "./src/schemas/accommodation.schemas";
import { ApiResponse } from "./src/utils/response";
import { prisma } from "./src/database/db";


class AccommodationMiddleware {
    
    static async getAccomodation(req:Request, res:Response, next:NextFunction) {
        try {
            const { id } = req.user!;

            const params = paramSchema.parse(req.params);

            const accommodation = await prisma.accommodations.findUnique({
                where:{
                    id:params.id,
                    ownerId:id
                }
            })

            if (!accommodation) return res.status(201).json(ApiResponse.error("Bad Request"))

            req.accommodation= accommodation;
        } catch (error) {
            console.log(error)
            return res.status(201).json(ApiResponse.error("Bad Request"))
        }

    }
}