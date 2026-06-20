import { Router } from "express";
import { HostController } from "../controllers/hosts/host.controller.js";

const hostRoutes = Router();

hostRoutes.get('/places', HostController.getPlaces);

export default hostRoutes;