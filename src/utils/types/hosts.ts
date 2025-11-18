export interface Place {
    id:string;
    title:string;
    description:string;
    type:string;
    region:string;
    sigla:string;
    city:string;
    max_people:number;
    default_value:number;
    owner_id:number;
    lat:string;
    lon:string;
    available:boolean;
}

export interface PlaceMedia {
    id:number;
    url:string;
    place_id:string;
}
