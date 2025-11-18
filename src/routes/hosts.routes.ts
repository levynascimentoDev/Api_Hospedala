import { Router } from "express";
import { getPlaces } from "../controllers/auth/host.controller";

const hostRoutes = Router();


hostRoutes.get('/places', getPlaces);


export default hostRoutes;