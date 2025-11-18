import type { Place, PlaceMedia } from '../../utils/types/hosts.js';
import db from '../db.js'


export async function getAllPlaces() : Promise<Place[] | null>{
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM places;`,
            (err, results:any[]) => {
                if (err) { return reject(err)}
                const places:any[] = [];
                if (results.length) {
                    for (const place of results) {
                        places.push({
                            id:place.id as string,
                            title:place.title,
                            description:place.description,
                            region:place.region,
                            city:place.city,
                            sigla:place.sigla,
                            type:place.type,
                            max_people:place.max_people,
                            default_value:place.default_value,
                            available:place.available,
                            lon:place.lon,
                            lat:place.lat
                        })
                    }
                    
                    resolve(places as Place[])

                } else {
                    resolve(null);
                }          

            }
        )
    })
}

export async function getPlaceMedia(place_id:string) : Promise<PlaceMedia | null>{
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM media_places WHERE place_id = ? LIMIT 1;`,
            [place_id],
            (err, results:any[]) => {
                if (err) { return reject(err)}
                if (results.length) {
                
                    resolve(results[0] as PlaceMedia)

                } else {
                    resolve(null);
                }          

            }
        )
    })
}