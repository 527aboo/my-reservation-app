'use client'
import { User } from '@/types/type'
import React, { useState } from 'react'

const generateTimeOptions = () => {
    const options = [];
    for (let i=0; i<24; i++) {
        for (let j=0; j<2; j++) {
            const hour = i.toString().padStart(2, '0');
            const minute = (j * 30).toString().padStart(2, '0');
            const time = `${hour}:${minute}`;
            options.push(
                <option key={time} value={time}>{time}</option>
            );
        }
    }
    return options;
}

const ReservationForm = ({ user }: { user: User }) => {

    const userId = user.id;
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({date, time, userId}),
            });

            const data = await response.json();

            if (response.ok) {
                alert('予約が完了しました。');
                setDate('');
                setTime(''); 
            } else {
                alert(`予約に失敗しました: ${data.error}`);
            }
        } catch (error) {
            console.error('予約エラー:', error);
            alert('予約処理中にエラーが発生しました');
        }
    }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label 
                htmlFor="date" 
                className='block text-sm font-medium text-gray-700'
            >
                日付
            </label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50'
            />
        </div>
        <div>
            <label 
                htmlFor='time' 
                className='block text-sm font-medium text-gray-700'
            >
                時間
            </label>
            <select
                id='time'
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm from-indigo-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            >
                <option value="">時間を選択</option>
                {generateTimeOptions()}
            </select>
        </div>

        <button 
            type="submit"
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'    
        >予約する</button>
        
    </form>   
  )
}

export default ReservationForm