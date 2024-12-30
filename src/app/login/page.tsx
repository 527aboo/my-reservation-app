"use client"
import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div>
            <h1>ログイン</h1>
            <button onClick={() => signIn("google")}>Googleでログイン</button>
        </div>
    )
}