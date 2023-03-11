import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { getCurrent } from "../utils/auth.util";

const prisma = new PrismaClient()

export async function login(req: Request, res: Response){
    try{
        const {email, password} = req.body;
        const user = await prisma.admin.findUnique({
            where:{email: email}
        })

        if(! user){
            return res.status(401).json({
                message: "Invalid Email"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_TOKEN!, { expiresIn: "1h" })
        res.status(200).json({user,token})
    }
    catch (error){
        res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

export async function addAdmin(req: Request, res: Response){
    try{
        const user = getCurrent(req,res)
        if (!user){
            return res.status(404).send("You must be logged in");
        }

        const {email, password,name} = req.body;
        const existingUser = await prisma.admin.findUnique({
            where: {email}
        })
        
        if (existingUser){
            return res.status(400).json({ message: "User already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await prisma.admin.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name
            },
        })
        res.status(200).json({newAdmin: newAdmin})
    }
    catch (error){
        res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

export async function getAdmin(req: Request, res: Response){
    try{
        const user = getCurrent(req,res)
        if (!user){
            return res.status(404).send("User not found");
        }
        const {email} = req.body

        if(!email){
            const user = await prisma.admin.findMany();
            return res.status(200).json({user})
        }
        res.status(200).json({user})
    }
    catch (error){
        res.status(500).json({message:"Server error",error: error})
    }
}

export async function deleteAdmin(req: Request, res: Response){
    try{
        const user = getCurrent(req,res)
        if (!user){
            return res.status(404).send("User not found");
        }
        const {id} = req.params
        if(id === undefined){
            res.json({
                message: "can't delete admin no params",
            })
        }
        const result = await prisma.admin.delete({
            where: {id : id}
        })
        res.status(200).json(result)
    }
    catch (error){
        res.status(500).json({message:"Server error",error: error})
    }
}