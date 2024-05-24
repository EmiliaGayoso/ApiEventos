import express, {Request, Response} from "express";
import {AuthMiddleware} from '../auth/authMiddleware'
import { UserService } from "../servicios/user-service";

const router = express.Router();
const userService = new UserService();

router.post("/login", async(req: Request, res: Response) => {
  const {username, password} = req.body;
  console.log(username, password);
  
  const userExistence = await userService.verificarExistenciaUsuario(String(username), String(password));
  
  if (userExistence != null){
    const token = userService.creacionToken(String(username),Number(password));
    return res.status(200).send({
      success: true,
      message: "Usuario existe",
      token: token
  });
  } else {
    console.log("error")
    return res.status(401).send({
      success: false,
      message: "Usuario no existe",
      token: ""
  });
  }

  /*res.json({
    id: 0,
    username: username,
    password: password,
  });*/
});

router.post("/register", (req:Request,res:Response) => {
  const { fName, lName, username, password } = req.body;
  console.log(fName, lName, username, password);

  const crearUsuario = userService.crearUsuario(String(fName), String(lName), String(username), String(password));
  if (crearUsuario === true){
    return res.json("El usuario fue creado exitosamente");
  } else {
    return res.json("El usuario no se pudo crear");
  }
  
  /*res.json({
    id: 0,
    firstname:body.firstname,
    lastname:body.lastname,
    username: body.username,
    password: body.password,
  });*/
});

export default router;