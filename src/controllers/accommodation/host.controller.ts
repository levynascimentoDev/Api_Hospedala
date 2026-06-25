import { type Response, type Request, response } from "express"
import { ApiResponse } from "../../utils/response.js";
import { paramSchema, queryParamSchema } from "../../schemas/accommodation.schemas.js";
import { prisma } from "../../database/db.js";

export class AccomodationController {
    static async getPlaces(_: Request, res: Response) {
        try {
            const accommodations = await prisma.accommodations.findMany({
                where:{
                    currentStep:"COMPLETED",
                    available:true
                },
                include:{
                    address:true,
                }
            });

            if (!accommodations) return res.status(404).json(ApiResponse.error("Not Found, Accommodations"));

        
            const response = [];

            for (const accommodation of accommodations!) {
                response.push({
                    id: accommodation.id,
                    title: accommodation.title,
                    pricePerNight: accommodation.pricePerNight,
                    cover_image: `https://cnd.hospedala.com/${(await prisma.photos.findMany({
                        where:{
                            accommodationId:accommodation.id,
                            cover:true
                        }
                    }))[0]?.key}`,
                    city: accommodation.address?.city,
                    propertyType:accommodation.propertyType
                })
            }

            return res.status(200).json(
                ApiResponse.success("All Accomodations", response)
            );

        } catch (err) {
            console.log(err)
            return res.status(500).json(ApiResponse.error("Internal Server Error"))
        }
    }

    static async getByID(req:Request, res:Response) {
        
        const accommodation = req.accommodation!
        const accomodationResponse = {
            ...accommodation,
            address:await prisma.addressAccommodation.findUnique({
                where:{
                    accommodationId:accommodation.id
                }
            }),
            services:await prisma.services.findUnique({
                where:{
                    accommodationId:accommodation.id
                }
            }),
            rules:await prisma.rules.findUnique({
                where:{
                    accommodationId:accommodation.id
                }
            }),
            photos:await prisma.photos.findMany({
                where:{
                    accommodationId:accommodation.id
                }
            }) ?? null,
        }

        return res.status(200).json(
            ApiResponse.success("Authorized", accomodationResponse)
        )
    }
}

