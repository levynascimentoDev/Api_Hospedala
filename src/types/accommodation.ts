
export type PropertyType = "apartamento" | "casa" | "pousada" | "chalê" | "quarto" | "hotel" | "resort"

export interface Accommodations {
    id:string;
    available:boolean;
    complete:boolean;
    title?:string;
    description?:string;
    property_type?:PropertyType;
    ownerId:number;
    max_guests?:number;
    bedrooms?:number;
}




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
