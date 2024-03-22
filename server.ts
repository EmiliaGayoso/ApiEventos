import express from "express";
import EventosController from "./src/controllers/eventos-controllers";
import ProvinciasController from "./src/controllers/provincias-controller";
import UserController from "./src/controllers/user-controller";

const app = express(); // Init API REST
app.use(express.json()); // Middleware to parse JSON
const port = 3508;

app.use("/Event", EventosController);
app.use("/User", UserController);
app.use("/Provincias", ProvinciasController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
