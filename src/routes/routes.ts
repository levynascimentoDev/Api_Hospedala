import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import hostRoutes from "./hosts.routes.js";

const routes = Router();
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/host', hostRoutes);

export default routes;
