'use client'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { login, clearError } from '@/redux/authSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginPage = () => {
        const dispatch = useAppDispatch()
        const router = useRouter()
        const { loading, error } = useAppSelector((state) => state.auth)
    
        const email = useRef<HTMLInputElement>(null)
        const password = useRef<HTMLInputElement>(null)
        const [localError, setLocalError] = useState('')
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            dispatch(clearError())
    
            if (!email.current || !password.current) return
            setLocalError('')
    
            const result = await dispatch(
                login({
                    email: email.current.value,
                    password: password.current.value,
                })
            )
    
            if (login.fulfilled.match(result)) {
                router.push('/')
            }
        }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-secondary)] px-4 w-full">
            <div className="w-full max-w-md bg-[var(--bg-background)] p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--color-accent2)]">Email</label>
                        <input
                            type="email"
                            ref={email}
                            className="mt-1.5 w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-accent2)]">Password</label>
                        <input
                            type="password"
                            ref={password}
                            className="mt-1.5 w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-hover)] text-white py-2 rounded transition-all duration-500 mt-3 cursor-pointer"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {(error || localError) && (
                <p className="text-red-500 mb-4 text-sm text-center">{error || localError}</p>
        )}
                </form>
                <div className="mt-4 text-center text-sm text-[var(--color-accent2)]">
                    You do not have an account?{" "}
                    <Link href="/signup" className="text-[var(--color-primary)] hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;