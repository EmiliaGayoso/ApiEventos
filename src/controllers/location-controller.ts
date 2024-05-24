import express, {Request, Response} from "express";
import { LocationService } from "../servicios/location-service";

const router = express.Router();
const locationService = new LocationService();

export default router;