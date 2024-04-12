import express, {Request, Response} from "express";
import { UserService } from "../servicios/user-service";
const router = express.Router();
const userService = new UserService();

router.post("/login", (req: Request, res: Response) => {
  const {username, password} = req.body;
  
  const userExistence = userService.verificarExistenciaUsuario(String(username), String(password));

  console.log(username, password);
  if (userExistence != null){
    const token = userService.creacionToken(String(username));
    return token;
  } else {
    console.log("error")
    return res.json("El usuario no fue encontrado")
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
  if (crearUsuario == true){
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