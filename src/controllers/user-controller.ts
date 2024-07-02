import express, {Request, Response} from "express";
import {AuthMiddleware} from '../auth/authMiddleware'
import { UserService } from "../servicios/user-service";

const router = express.Router();
const userService = new UserService();

router.post("/login", async (req: Request, res: Response) => {
  const {username, password} = req.body;
  console.log(username, password);
  
  const token = await userService.verificarExistenciaUsuario(String(username), String(password));
  return res.json(token);
  });

router.post("/register", async (req:Request,res:Response) => {
  const fName = req.body.first_name;
  const lName = req.body.last_name;
  const username = req.body.username;
  const password = req.body.password;
  console.log(fName, lName, username, password);

  try {
    const crearUsuario = await userService.crearUsuario(String(fName), String(lName), String(username), String(password));
    return res.json("El usuario fue creado exitosamente");    
  } catch (error) {
    if(error.message === 'Bad Request'){
      return res.status(400).json({message: 'El registro no cumplia con los requisitos de los campos'})
    }else if(error.message === 'Pruebe otra vez'){
      return res.json({message: 'Pruebe otra vez'});
    }else if(error.message === 'Usuario ya existente'){
      return res.status(500).json({message: 'Usuario ya existente, pruebe otra vez'});
    }
    return res.json('Error, pruebe otra vez');
  }
  /*res.json({id: 0, firstname:body.firstname, lastname:body.lastname, username: body.username, password: body.password,});*/
});

export default router;