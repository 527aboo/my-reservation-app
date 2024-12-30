
import Link from "next/link";

export default function Login() {
    return (
        <Link href={'/api/auth/signin'} 
        className='text-gray-300 hover:text-white 
        px-3 py-2 rounded-md text-sm font-medium'>
        googleでログイン
    </Link>   
    )
}