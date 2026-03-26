'use client';

import { useState } from 'react';
import { login, signup } from './actions';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#faf5eb]">
            <div className="w-full max-w-md space-y-8 border border-[#d4c4a8] p-8 rounded-xl bg-white shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-serif font-bold tracking-tight text-[#3d230d]">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="-space-y-px rounded-md shadow-sm">
                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="relative block w-full rounded-t-md border border-[#d4c4a8] bg-[#faf5eb] py-2 text-[#3d230d] placeholder:text-[#7a5c3a] focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#3d230d] sm:text-sm sm:leading-6 pl-4 font-medium"
                                    placeholder="Full Name"
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`relative block w-full border border-[#d4c4a8] bg-[#faf5eb] py-2 text-[#3d230d] placeholder:text-[#7a5c3a] focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#3d230d] sm:text-sm sm:leading-6 pl-4 font-medium ${isLogin ? 'rounded-t-md' : 'border-t-0'}`}
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-b-md border border-[#d4c4a8] border-t-0 bg-[#faf5eb] py-2 text-[#3d230d] placeholder:text-[#7a5c3a] focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#3d230d] sm:text-sm sm:leading-6 pl-4 font-medium"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            formAction={isLogin ? login : signup}
                            className="group relative flex w-full justify-center rounded-md bg-[#3d230d] px-3 py-2 text-sm font-bold text-white hover:bg-[#2a1809] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d230d] shadow-md transition-all active:scale-95"
                        >
                            {isLogin ? 'Sign in' : 'Sign up'}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-bold text-[#7a5c3a] hover:text-[#3d230d] transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
}

