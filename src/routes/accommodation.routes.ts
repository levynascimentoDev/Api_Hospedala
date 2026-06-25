import { Router } from "express";
import { AccomodationController } from "../controllers/accommodation/host.controller.js";
import { AccommodationCreateController } from "../controllers/accommodation/create.controller.js";
import { AuthMidlleware } from "../middlewares/auth.js";
import { AccommodationMiddleware } from "../middlewares/accommodation.js";

const accommodationRoutes = Router();

accommodationRoutes
    .get(
        '/', 
        AccomodationController.getPlaces
);
accommodationRoutes
    .post(
        '/create',
        AuthMidlleware.AuthUser,
        AccommodationCreateController.create
);
accommodationRoutes
    .patch(
        '/update/:id/property-type',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccommodationCreateController.updateProperty
);

accommodationRoutes
    .patch(
        '/update/:id/space-type',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccommodationCreateController.updateSpace
);

accommodationRoutes
    .patch(
        '/update/:id/services',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccommodationCreateController.updateServices
);

accommodationRoutes
    .patch(
        '/update/:id/location',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccommodationCreateController.updateLocation
);

accommodationRoutes
    .patch(
        '/update/:id/details',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccommodationCreateController.updateDetails
);

accommodationRoutes
    .patch(
        '/update/:id/photos',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccommodationCreateController.updatePhotos
);

accommodationRoutes
    .patch(
        '/update/:id/rules',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccommodationCreateController.updateRules
);

accommodationRoutes
    .patch(
        '/update/:id/finish',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccommodationCreateController.updateFinish
);

accommodationRoutes
    .get(
        '/:id',
        AuthMidlleware.AuthUser,
        AccommodationMiddleware.validate,
        AccomodationController.getByID
);

export default accommodationRoutes;