"use client";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signup, clearError } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confirmpassword = useRef<HTMLInputElement>(null);
    const [localError, setLocalError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        if (password.current!.value !== confirmpassword.current!.value) {
            return setLocalError("Passwords do not match");
        }
        if (!name.current?.value) {
            return setLocalError("Name is required");
        }

        setLocalError("");
        const result = await dispatch(
            signup({
                name: name.current!.value,
                email: email.current!.value,
                password: password.current!.value,
            })
        );

        if (signup.fulfilled.match(result)) {
            router.push("/");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-secondary)] w-full">
            <div className="w-full max-w-md bg-[var(--bg-background)] p-8 rounded-xl shadow-sm">
                <h2 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
                    Create an acount
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--color-accent2)]">
                            Name
                        </label>
                        <input
                            type="text"
                            ref={name}
                            className="mt-1.5 w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-accent2)]">
                            Email
                        </label>
                        <input
                            type="email"
                            ref={email}
                            className="mt-1.5 w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-accent2)]">
                            Password
                        </label>
                        <input
                            type="password"
                            ref={password}
                            className="mt-1.5 w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-accent2)]">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            ref={confirmpassword}
                            className="mt-1.5 w-full px-4 py-1.5 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-hover)] text-white py-2 rounded transition-all duration-500 mt-3 cursor-pointer"
                    >
                        {loading ? "Signing up..." : "Create Account"}
                    </button>
                    {(error || localError) && (
                        <p className="text-red-500 mb-4 text-sm text-center">
                            {error || localError}
                        </p>
                    )}
                </form>

                <div className="mt-4 text-center text-sm text-[var(--color-accent2)]">
                    You already have an account?{" "}
                    <Link href="/login" className="text-[var(--color-primary)] hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
