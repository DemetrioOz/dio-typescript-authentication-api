import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/users.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

app.get("/status", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: "bar" });
});

app.listen(3000, () => {
  console.log("Aplicação executando na porta 3000!");
});
