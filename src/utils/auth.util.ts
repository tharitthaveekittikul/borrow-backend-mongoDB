import { Request , Response, NextFunction} from "express";
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()

export async function getCurrent(req : Request){
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(
            token!,
            process.env.JWT_TOKEN!
        )
        const user = await prisma.admin.findUnique({
            where: { id: decodedToken.id}
        })
        return user
    }
    catch (error) {
        return null
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const user = await getCurrent(req)
    if (!user){
        return res.status(404).send("Admin not found");
    }
    res.locals.user = user;
    next()
}