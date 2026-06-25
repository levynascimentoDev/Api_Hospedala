import { z } from "zod";
import { accomodationResponse } from "../schemas/accommodation.schemas";

export type PropertyType = "apartamento" | "casa" | "pousada" | "chalê" | "quarto" | "hotel" | "resort"



export type AccomodationResponse = z.infer<typeof accomodationResponse>;


export interface CardResponse {
    id: string,
    title: string,
    pricePerNight: number,
    cover_image: string,
    city: string,
    propertyType:PropertyType
}

export interface PlaceMedia {
    id:number;
    url:string;
    place_id:string;
}


type ISODateString = `${number}-${number}-${number}`

export interface QueryPlaces {
    city?:string;
    state?:string;
    query?:string;
    checkin:ISODateString;
    checkout:ISODateString;
    adult:number;
    children:number;
    baby:number;
    animal:number;
}

export interface AccommodatioWizzardResponse {
    
}




