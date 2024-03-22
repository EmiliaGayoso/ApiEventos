import express, {Request, Response} from "express";
const router = express.Router();

router.post("/user/login", (req: Request, res: Response) => {
    const body = req.body;
    
    console.log(body);
    res.json({
      id: 0,
      username: body.username,
      password: body.password,
    });

});

router.post("/user/register", (req:Request,res:Response) => {
    const body = req.body;
    console.log(body);
    res.json({
      id: 0,
      firstname:body.firstname,
      lastname:body.lastname,
      username: body.username,
      password: body.password,
    });
});

export default router;
