import type { Response, Request } from "express"
import PlaceModel from "../../database/models/places.model.js"
import type { Place } from "../../types/hosts.js";

export class HostController {
    static async getPlaces(_:Request, res:Response) {
        try {
            const places = await PlaceModel.getAll() as Place[]

            const response = []

            for (const place of places) {
                response.push({
                    id:place.id,
                    title:place.title,
                    default_value:place.default_value,
                    image:(await PlaceModel.getMediasByID(place.id))?.[0]?.url,
                    city:place.city,    
                    type:place.type
                })
            }

            return res.status(200).json(response);

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status:500,
                message:"Internal Server Error"
            })
        }
    }
}

