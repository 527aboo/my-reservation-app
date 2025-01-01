import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { date, time, userId } = await req.json();
        
        if (!date || !time || !userId) {
            return NextResponse.json(
                { error: '必須項目が不足しています' },
                { status: 400 }
            );
        }

        const datetime = new Date(`${date} ${time}`);
        
        if (isNaN(datetime.getTime())) {
            return NextResponse.json(
                { error: '無効な日付または時間です' },
                { status: 400 }
            );
        }

        const reservation = await prisma.Reservation.create({
            data: {
                userId,
                date: datetime,
            }
        });

        return NextResponse.json(reservation);
    } catch (error) {
        console.error('予約作成エラー:', error);
        return NextResponse.json(
            { error: '予約の作成中にエラーが発生しました' },
            { status: 500 }
        );
    }
}