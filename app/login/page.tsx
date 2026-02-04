import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="w-full max-w-md space-y-8 border border-white/10 p-8 rounded-xl bg-white/5">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Or{' '}
                        <a href="#" className="font-medium text-primary hover:text-red-400">
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
                                className="relative block w-full rounded-t-md border-0 bg-white/10 py-2 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4"
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
                                className="relative block w-full rounded-b-md border-0 bg-white/10 py-2 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            formAction={login}
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Sign in
                        </button>
                        <button
                            formAction={signup}
                            className="mt-3 group relative flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
