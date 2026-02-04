import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-8">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} SAAMA Seattle Festival. All rights reserved.
                </p>
                <div className="mt-4 flex justify-center gap-6">
                    <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300">
                        Privacy Policy
                    </Link>
                    <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-300">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
