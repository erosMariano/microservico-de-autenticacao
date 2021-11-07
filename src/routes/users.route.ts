import { NextFunction, Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import DatabaseError from "../models/database.erros.model";
import userRepository from "../repositories/user.repository";


const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send({ users })

});

usersRoute.get("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const user = await userRepository.findById(uuid)
    res.status(StatusCodes.OK).send({ uuid })
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {

    try{
        const newUsers = req.body;
        const uuid = await userRepository.create(newUsers);
        res.status(StatusCodes.CREATED).send(uuid)

    }catch(err){
        next(err);
    }   

})

usersRoute.put("/users/:uuid", async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUsers = req.body;

    modifiedUsers.uuid = uuid;

    await userRepository.update(modifiedUsers);
    res.status(StatusCodes.OK).send(modifiedUsers);
})



usersRoute.delete("/users/:uuid", async (req: Request, res: Response, next: NextFunction) => {
    await userRepository.remove(req.params.uuid);
    res.sendStatus(StatusCodes.OK)
})
export default usersRoute;