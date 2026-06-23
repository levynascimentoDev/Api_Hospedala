import { request, type Request, type Response } from "express";
import { AccommodationModel } from "../../database/models/accommodation.model";
import Jwt from "../../utils/jwt";
import { ApiResponse } from "../../utils/response";




export class AccommodationCreateController {

    static async create(req:Request, res:Response) {
        try {

            const { id } = req.user!;
            const accommodation = await AccommodationModel.create(id);
            return res.status(201).json(ApiResponse.success("Accommodation has ben created with success", accommodation));              

        } catch (error) {
            console.log(error)
        }

    }
}