import { Router, Request, Response, NextFunction } from "express";
import statusCode from "http-status-codes";
import userRepository from "../repositories/user.repository";

// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

const user = Router();

user.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers();
  res.status(statusCode.OK).send({ users });
});

user.get(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const user = await userRepository.findById(uuid);
    res.status(statusCode.OK).send({ user });
  }
);

user.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  const uuid = await userRepository.create(newUser);

  res.status(statusCode.CREATED).send(uuid);
});

user.put(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const id = req.params.uuid;
    const modifiedUSer = req.body;
    modifiedUSer.uuid = id;

    const updateUser = await userRepository.update(modifiedUSer);

    res.status(statusCode.OK).send(updateUser);
  }
);

user.delete(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    await userRepository.remove(req.params.uuid);
    res.sendStatus(statusCode.OK);
  }
);

export default user;
