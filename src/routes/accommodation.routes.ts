import { Router } from "express";
import { AccomodationController } from "../controllers/accommodation/host.controller.js";
import { AccommodationCreateController } from "../controllers/accommodation/create.controller.js";

const accommodationRoutes = Router();

accommodationRoutes.get('/places', AccomodationController.getPlaces);
accommodationRoutes.post('/create', AccommodationCreateController.create);


export default accommodationRoutes;