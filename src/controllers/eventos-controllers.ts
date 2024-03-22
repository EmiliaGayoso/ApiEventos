import express, {Request, Response} from "express";

const router = express.Router();

router.get("/event", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/event", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/event", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/event", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/event/{id}", (req: Request, res: Response) => {
  //hacer una query para getear 
  /* todos los atributos del Evento, como así también su localizacion (localidad y la provincia) */
});

router.post("/event/{id}/enrollment", (req: Request, res: Response) => {
  //hacer una query para getear
});
export default router;