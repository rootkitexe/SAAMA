import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#faf5eb]">
            <div className="w-full max-w-md space-y-8 border border-[#d4c4a8] p-8 rounded-xl bg-white shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-serif font-bold tracking-tight text-[#3d230d]">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-[#7a5c3a]">
                        Or{' '}
                        <a href="#" className="font-bold text-[#3d230d] hover:underline">
                            create a new profile
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="-space-y-px rounded-md shadow-sm">
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
                                className="relative block w-full rounded-t-md border border-[#d4c4a8] bg-[#faf5eb] py-2 text-[#3d230d] placeholder:text-[#7a5c3a] focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#3d230d] sm:text-sm sm:leading-6 pl-4 font-medium"
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
                            formAction={login}
                            className="group relative flex w-full justify-center rounded-md bg-[#3d230d] px-3 py-2 text-sm font-bold text-white hover:bg-[#2a1809] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d230d] shadow-md transition-all active:scale-95"
                        >
                            Sign in
                        </button>
                        <button
                            formAction={signup}
                            className="mt-3 group relative flex w-full justify-center rounded-md bg-white border border-[#d4c4a8] px-3 py-2 text-sm font-bold text-[#3d230d] hover:bg-[#faf5eb] transition-all"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

