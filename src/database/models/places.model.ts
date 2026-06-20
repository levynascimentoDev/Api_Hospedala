import type { Place, PlaceMedia } from '../../types/hosts.js';
import { prisma } from '../db.js';



class PlaceModel {
    static async getAll() {

        
        try {

            const places = await prisma.places.findMany();
            return places;
        
        } catch (error) {
            return null
        }

    }

    static async getMediaByPlaceID(place_id:string) {
        

        try {
            const place = await prisma.places.findUnique({
                where:{
                    id:place_id
                }
            })
            return place;
        } catch (error) {
            return null
        }

    }
}


export default PlaceModel