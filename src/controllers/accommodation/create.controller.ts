import { type Request, type Response } from "express";
import { ApiResponse } from "../../utils/response";
import { prisma } from "../../database/db";
import { addressSchema, detailsSchema, finishSchema, photosSchema, propertyTypeSchema, rulesSchema, servicesSchema, spaceTypeSchema } from "../../schemas/accommodation.schemas";




export class AccommodationCreateController {

    static async create(req:Request, res:Response) {
        try {
            
            const { id } = req.user!;
            const accommodation = await prisma.accommodations.create({
                data:{
                    ownerId:id                    
                }
            });
            return res.status(201).json(ApiResponse.success("Accommodation has ben created with success", accommodation));              
        } catch (error) {
            console.log(error)
            return res.status(500).json(ApiResponse.error("Internal server error"));               
        }

    }

    static async updateProperty(req:Request, res:Response) {
        try {

            const accommodation = req.accommodation!;

            const { 
                property_type
            } = propertyTypeSchema.parse(req.body);

            const updated = await prisma.accommodations.update({
                where:{
                    id:accommodation.id,
                },
                data:{  
                    propertyType:property_type,
                    ...(accommodation.currentStep == "PROPERTY_TYPE" && { currentStep:'SPACE_TYPE' })
                }
            })

            return res.status(201).json(
                ApiResponse.success("Success",  updated)
            )
            
            

        } catch (error) {
            console.log(error)
            return res.status(201).json(ApiResponse.error("Bad Request"));
        }
    }


    static async updateSpace(req:Request, res:Response) {
        try {
            
            const accommodation = req.accommodation!;       


            const { 
                spacetype
            } = spaceTypeSchema.parse(req.body);

            const updated = await prisma.accommodations.update({
                where:{
                    id:accommodation.id,
                },
                data:{
                    spacetype:spacetype,
                    ...(accommodation.currentStep == 'PROPERTY_TYPE' && { currentStep:'SPACE_TYPE' })
                }
            })

            return res.status(201).json(
                ApiResponse.success("Success",  updated)
            )
            
            

        } catch (error) {
            console.log(error)
            return res.status(201).json(ApiResponse.error("Bad Request"));
        }
    }

    static async updateServices(req:Request, res:Response) {


        try {
            const accommodation = req.accommodation!;
            const services = servicesSchema.parse(req.body);

            const current = await prisma.services.findUnique({
                where:{
                    accommodationId:accommodation.id
                }
            })


            let updated;
            
            if (current) {
                updated = await prisma.services.update({
                    where:{
                        accommodationId:accommodation.id
                    },
                    data:{
                        ...services
                    }
                })
                

            } else {

                updated = await prisma.services.create({
                    data:{
                        ...services,
                        accommodationId:accommodation.id
                    }
                })            
                
            }

            if (accommodation.currentStep == 'SERVICES') {
                await prisma.accommodations.update({
                    where:{
                        id:accommodation.id
                    },
                    data:{
                        currentStep:"LOCATION"
                    }
                }) 
            }

            return res.status(201).json(
                ApiResponse.success("Success Updated", updated)
            )
        } catch (error) {
            console.log(error)
            return res.status(401).json(ApiResponse.error("Bad Request"))
        }
    
        
    }

    static async updateLocation(req:Request, res:Response) {

        try {
            const accommodation = req.accommodation!;
            const address = addressSchema.parse(req.body);

            const current = await prisma.addressAccommodation.findUnique({
                where:{
                    accommodationId:accommodation.id
                }
            })


            let updated;
            
            if (current) {
                updated = await prisma.addressAccommodation.update({
                    where:{
                        accommodationId:accommodation.id
                    },
                    data:{

                    }
                })
                

            } else {

                updated = await prisma.addressAccommodation.create({
                    data:{
                        ...address,
                        accommodationId:accommodation.id
                    }
                })            
                
            }

            if (accommodation.currentStep == 'LOCATION') {
                await prisma.accommodations.update({
                    where:{
                        id:accommodation.id
                    },
                    data:{
                        currentStep:"DETAILS"
                    }
                }) 
            }

            return res.status(201).json(
                ApiResponse.success("Success Updated", updated)
            )
        } catch (error) {
            console.log(error)
            return res.status(401).json(ApiResponse.error("Bad Request"))
        }
    }
    
    static async updateDetails(req:Request, res:Response) {
        try {
            
            const accommodation = req.accommodation!;       

            const { 
                bathrooms,
                bedrooms,
                max_guests,
                beds
            } = detailsSchema.parse(req.body);


            const updated = await prisma.accommodations.update({
                where:{
                    id:accommodation.id,
                },
                data:{
                    bedrooms,
                    bathrooms,
                    beds,
                    maxGuests:max_guests,
                    ...(accommodation.currentStep == 'DETAILS' && { currentStep:'PHOTOS' })
                }
            })

            return res.status(201).json(
                ApiResponse.success("Success",  updated)
            )
            
            

        } catch (error) {
            console.log(error)
            return res.status(201).json(ApiResponse.error("Bad Request"));
        }
    }

    static async updatePhotos(req:Request, res:Response) {
        try {
            const accommodation = req.accommodation!;
            const { photos } = photosSchema.parse(req.body);

            const current = await prisma.addressAccommodation.findMany({
                where:{
                    accommodationId:accommodation.id
                }
            })
            
            if (current.length) {

                for (const photo of photos) {
                    await prisma.photos.update({
                        where:{
                            key:photo.key
                        },
                        data:{
                            ...photos,
                            accommodationId:accommodation.id
                        }
                    })
                }

            } else {


                for (const photo of photos) {
                    await prisma.photos.create({
                        data:{
                            ...photo,
                            accommodationId:accommodation.id
                        }
                    })        
                } 
                
            }

            if (accommodation.currentStep == 'PHOTOS') {
                await prisma.accommodations.update({
                    where:{
                        id:accommodation.id
                    },
                    data:{
                        currentStep:"RULES"
                    }   
                }) 
            }

            

            return res.status(201).json(
                ApiResponse.success("Success Updated", photos)
            )
        } catch (error) {
            console.log(error)
            return res.status(401).json(ApiResponse.error("Bad Request"))
        }
    }
    static async updateRules(req:Request, res:Response) {
        try {
            const accommodation = req.accommodation!;
            const { animals, events, optional } = rulesSchema.parse(req.body);

            const current = await prisma.rules.findUnique({
                where:{
                    accommodationId:accommodation.id
                }
            })

            let update;
            
            if (current) {
                
                update = await prisma.rules.update({
                    where:{
                        accommodationId:accommodation.id
                    },
                    data:{
                        animals:animals,
                        events:events,
                        optional:optional
                    }
                })
                
            } else {


                update = await prisma.rules.create({
                    data:{
                        animals:animals,
                        events:events,
                        optional:optional,
                        accommodationId:accommodation.id
                    }
                })

            }

            if (accommodation.currentStep == 'RULES') {
                await prisma.accommodations.update({
                    where:{
                        id:accommodation.id
                    },
                    data:{
                        currentStep:'FINISH'
                    }   
                }) 
            }

            

            return res.status(201).json(
                ApiResponse.success("Success Updated", update)
            )
        } catch (error) {
            console.log(error)
            return res.status(401).json(ApiResponse.error("Bad Request"))
        }
    }

    static async updateFinish(req:Request, res:Response) {
        try {
            
            const accommodation = req.accommodation!;       

            const { 
                title,
                description,
                price_per_night
            } = finishSchema.parse(req.body);


            const updated = await prisma.accommodations.update({
                where:{
                    id:accommodation.id,
                },
                data:{
                    title:title,
                    description:description,
                    pricePerNight:price_per_night,
                    ...(accommodation.currentStep == 'FINISH' && { currentStep:'COMPLETED' }),
                    available:true
                }
            })

            return res.status(201).json(
                ApiResponse.success("Success",  updated)
            )
            
            

        } catch (error) {
            console.log(error)
            return res.status(201).json(ApiResponse.error("Bad Request"));
        }
    }

    
}