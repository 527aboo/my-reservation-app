import { nextAuthOptions } from '@/lib/next-auth/option';
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

const Header = async () => {

    const session = await getServerSession(nextAuthOptions);
    const user: User = session?.user as User;
    console.log(user)

  return (
    <header className='bg-slate-600 text-gray-100 shadow-lg'>
    <nav className='flex items-center justify-between p-4'>
        <Link href={"/"}
            className='text-xl font-bold'
        >
            予約管理
        </Link>
        <div className='flex items-center gap-1'>
            <Link href={"/"}
                className='text-gray-300 hover:text-white 
                    px-3 py-2 
                    text-sm font-medium'
            >
                ホーム
            </Link>

            <Link href={user ? "/profile" : "/api/auth/signin"}
                className='text-gray-300 hover:text-white 
                    px-3 py-2 
                    rounded-md text-sm font-medium'>
                {user ? "予約履歴" : "ログイン"}
            </Link>

            {user ? (
                <Link href={'/api/auth/signout'} 
                    className='text-gray-300 hover:text-white 
                    px-3 py-2 rounded-md text-sm font-medium'>
                    ログアウト
                </Link>                         
                ) : (""
            )}

                <Link href={"/profile"}>
                    <Image
                        width={50}
                        height={50}
                        alt='profile_icon'
                        src={user?.image || "/default_icon.png"}
                    />
                </Link>
        </div>
    </nav>
</header>
  )
}

export default Header