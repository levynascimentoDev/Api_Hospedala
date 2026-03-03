import type { Response, Request } from "express"
import { getAllPlaces, getPlaceMedia } from "../../database/models/places.model"
import type { Place } from "../../utils/types/hosts";

export async function getPlaces(_:Request, res:Response) {
    try {
        const places = await getAllPlaces() as Place[]

        const response = []

        for (const place of places) {
            response.push({
                id:place.id,
                title:place.title,
                default_value:place.default_value,
                image:(await getPlaceMedia(place.id))?.url,
                city:place.city,    
                type:place.type
            })
        }

        return res.status(200).json(response);

    } catch (err) {
        return res.status(500).json({
            status:500,
            message:"Bad Requests"
        })
    }
}