import express from "express";
import EventosController from "./src/controllers/eventos-controller";
import ProvinciasController from "./src/controllers/provincias-controller";
import UserController from "./src/controllers/user-controller";

const app = express(); // Init API REST
app.use(express.json()); // Middleware to parse JSON
const port = 5050;

app.use("/event", EventosController);
app.use("/user", UserController);
app.use("/provincias", ProvinciasController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
