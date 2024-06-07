import express from "express";
import EventosController from "./src/controllers/eventos-controller";
import ProvinciasController from "./src/controllers/provincias-controller";
import UserController from "./src/controllers/user-controller";
import CategoryController from "./src/controllers/category-controller";
import LocationController from "./src/controllers/location-controller";
import EventLocationController from "./src/controllers/event-location-controller";

const app = express(); // Init API REST
const port = 5050;

//Middlewares
app.use(express.json()); // Middleware to parse JSON

app.use("/api/event", EventosController);
app.use("/api/user", UserController);
app.use("/api/provincias", ProvinciasController);
app.use("/api/event-category", CategoryController);
app.use("/api/location", LocationController);
app.use("/api/event-location", EventLocationController);


//app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
