import { Router, Request, Response, NextFunction } from "express";
import statusCode from "http-status-codes";
// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

const users: any[] = [
  {
    userName: "matheus",
    idade: "22",
  },
];

const user = Router();

user.get("/users", (req: Request, res: Response, next: NextFunction) => {
  res.status(statusCode.OK).send({ users });
});

user.get(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(statusCode.OK).send({ uuid });
  }
);

user.post("/users", (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;
  res.status(statusCode.CREATED).send(newUser);
});

user.put(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const id = req.params.uuid;
    const modifiedUSer = req.body;

    modifiedUSer.uuid = id;

    res.status(statusCode.OK).send({ modifiedUSer });
  }
);

user.delete(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    res.sendStatus(statusCode.OK);
  }
);

export default user;
