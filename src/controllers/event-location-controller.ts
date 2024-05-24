import express, {Request, Response} from "express";
import { EventLocationService } from "../servicios/event-location-service";

const router = express.Router();
const categoryService = new EventLocationService();



export default router;