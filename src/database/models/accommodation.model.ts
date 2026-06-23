import type { PropertyType } from '../../types/accommodation.js';
import { prisma } from '../db.js';



interface AlterOptions {
    complete?:boolean;
    available?:boolean;
    title?:string;
    description?:string;
    pricePerNight?:number;
    maxGuests?:number;
    bedrooms?:number;
    bathrooms?:number;
    rating?:number;
    reviewCount?:number;
    propertyType?:PropertyType
}



class AccommodationModel {
    static async getAll() {
        try {
            const accommodations = await prisma.accommodations.findMany({
                include:{
                    address:true
                }
            });
            return accommodations;

        } catch (error) {
            return null
        }

    }

    static async getMediasByID(accommodation_id: string) {


        try {
            const place_media = await prisma.media_accommodations.findMany({
                where: {
                    accommodationId:accommodation_id 
                },
                include:{
                    
                }
            })

            return place_media;
        } catch (error) {
            return null
        }

    }


    static async create(ownerId:string) {
        
        const accommodation = await prisma.accommodations.create({
            data:{
                ownerId,
            }
        })

        return accommodation;
    }

    static async alter(accommodation_id:string, options:AlterOptions) {
        if (!Object.keys(options).length) return;
        

        const accommodation = await prisma.accommodations.update({
            where:{
                id:accommodation_id
            },
            data:{
                ...options
            }
        })


        return accommodation;
    }
}


export  { AccommodationModel };