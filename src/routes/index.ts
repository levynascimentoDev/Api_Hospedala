import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import accommodationRoutes from "./accommodation.routes.js";

const routes = Router();
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/host', accommodationRoutes);

export default routes;
