import type { Response, Request } from "express"
import { AccommodationModel } from "../../database/models/accommodation.model.js"
import type { Accommodations } from "../../types/accommodation.js";
import { ApiResponse } from "../../utils/response.js";

export class AccomodationController {
    static async getPlaces(_: Request, res: Response) {
        try {
            const accommodations = await AccommodationModel.getAll()

            if (!accommodations) return res.status(404).json(ApiResponse.error("Not Found, Accommodations"));

        
            const response = [];

            for (const accommodation of accommodations!) {
                response.push({
                    id: accommodation.id,
                    title: accommodation.title,
                    pricePerNight: accommodation.pricePerNight,
                    cover_image: `https://cnd.hospedala.com/${(await AccommodationModel.getMediasByID(accommodation.id))?.[0]?.key}`,
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
}

