export default async function ErrorPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>
}) {
    const params = await searchParams;

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary mb-4">Something went wrong</h1>
                <p className="text-gray-400 mb-8">{params.message || "Sorry, we couldn't complete your login request."}</p>
                <a href="/login" className="text-white underline hover:text-primary">Back to Login</a>
            </div>
        </div>
    )
}

