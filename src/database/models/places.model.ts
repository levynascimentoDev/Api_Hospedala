import type { Place, PlaceMedia } from '../../types/hosts.js';
import db from '../db.js'


class PlaceModel {
    static async getAll() : Promise<Place[] | null>{

        
        try {
            const [places] = await db.query<Place[]>(`SELECT * FROM places;`)
            return places ?? null;
        
        } catch (error) {
            return null
        }

    }

    static async getMediaByPlaceID(place_id:string) : Promise<PlaceMedia | null>{
        

        try {
            const [place] = await db.query<PlaceMedia[]>(
                `SELECT * FROM media_places WHERE place_id = ? LIMIT 1;`,
                [place_id]
            );
            return place[0] ?? null
        } catch (error) {
            return null
        }

    }
}


export default PlaceModel