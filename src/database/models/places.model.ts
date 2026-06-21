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

    static async getMediasByID(place_id:string) {
        

        try {
            const place_media = await prisma.media_places.findMany({
                where:{
                    place_id:place_id
                }
            })
    
            return place_media;
        } catch (error) {
            return null
        }

    }
}


export default PlaceModel