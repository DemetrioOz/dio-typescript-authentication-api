import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/users.routes";
import statusRouter from "./routes/status.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter, statusRouter);

app.listen(3000, () => {
  console.log("Aplicação executando na porta 3000!");
});
