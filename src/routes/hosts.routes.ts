import { Router } from "express";
import { getPlaces } from "../controllers/auth/host.controller.js";

const hostRoutes = Router();


hostRoutes.get('/places', getPlaces);


export default hostRoutes;