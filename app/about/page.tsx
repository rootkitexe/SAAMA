export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-serif font-bold text-white text-center mb-8">About Us</h1>

                <div className="prose prose-invert prose-lg mx-auto">
                    <p className="lead">
                        The SAAMA Seattle Festival is a volunteer-run organization dedicated to the preservation and propagation of Carnatic music and Bharathanatyam in North America.
                    </p>

                    <h3 className="text-primary mt-8">Our History</h3>
                    <p>
                        Started in 2026, the festival was established to provide a platform for Indian classical artists to perform and for students to showcase their talent. Inspired by the great music festivals of Chennai and Cleveland, SAAMA brings the rich cultural heritage of South India to the Pacific Northwest.
                    </p>

                    <h3 className="text-primary mt-8">Mission</h3>
                    <p>
                        Our core mission is education and celebration. We believe that classical arts are a vital link to our cultural identity. Through workshops, competitions, and concerts, we aim to inspire the next generation of artists.
                    </p>

                    <figure className="my-8 border-l-4 border-primary pl-4 italic text-gray-400">
                        "Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife."
                        <figcaption className="mt-2 text-sm text-gray-500">— Kahlil Gibran</figcaption>
                    </figure>

                    <h3 className="text-primary mt-8">The Committee</h3>
                    <p>
                        The festival is organized by a dedicated committee of volunteers who work year-round to ensure a seamless experience for artists and attendees alike.
                    </p>
                </div>
            </div>
        </div>
    );
}
