import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function GET(request: Request,
    { params } : {params: { userId: string } }) {
   const userId = params.userId;

   try {
        const reservationList = await prisma.reservation.findMany({
            where:{
                userId: userId
            }
        })
        return NextResponse.json(reservationList);
   } catch (error: unknown) {
    return NextResponse.json({error: error}, {status:500});
   }

}