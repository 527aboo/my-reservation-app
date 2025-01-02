import { nextAuthOptions } from '@/lib/next-auth/option';
import { Reservation, User } from '@/types/type';
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async () => {
    const session = await getServerSession(nextAuthOptions);
    const user: User = session?.user as User;
    let reservationList: Reservation[] = []

    if (user) {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/myreservation/${user.id}`,
            { cache: 'no-store'}
        );  
        reservationList = await response.json()
    }

    return (
        <div className="container mx-auto my-12 px-4">
            <h1 className="text-2xl font-bold mb-6">予約履歴</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">予約者</th>
                            <th className="px-4 py-2">予約日時</th>
                            <th className="px-4 py-2">登録日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservationList.map((reservation) => (
                            <tr key={reservation.id} className="border-b text-center">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">
                                    {reservation.date
                                        ? new Date(reservation.date).toLocaleString('ja-JP', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })
                                        : ''}
                                </td>
                                <td className="px-4 py-2">
                                    {reservation.createdAt
                                        ? new Date(reservation.createdAt).toLocaleString('ja-JP', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })
                                        : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page