import { Request , Response} from "express";
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