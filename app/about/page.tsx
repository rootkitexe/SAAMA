export default function AboutPage() {
    return (
        <div className="bg-[#faf5eb] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-serif font-bold text-[#5c3a1e] text-center mb-8">About Us</h1>

                <div className="prose prose-lg mx-auto text-[#5c3a1e]">
                    <p className="text-[17px] leading-relaxed mb-6">
                        <strong>SaaMa — Sadhana Academy for Musical Arts</strong> is a 501(c)(3) non-profit organization
                        dedicated to nurturing and sustaining the living tradition of Indian classical music.
                        Through concerts, workshops, mentorship, and community initiatives, we seek to inspire
                        young musicians and cultivate a vibrant cultural space where artists, students, and
                        rasikas grow together in the spirit of learning, discipline, and artistic excellence.
                    </p>

                    <p className="text-[17px] leading-relaxed mb-6">
                        The name <em>SaaMa</em> draws inspiration from the <strong>Sāma Veda</strong>, revered in Indian thought as the
                        Veda of melody and one of the ancient foundations of the Indian musical tradition. In this
                        tradition, music is not merely performance but a path of refinement, devotion, and
                        knowledge. The word <em>Sādhana</em> signifies disciplined practice and purposeful striving; its
                        root <em>sādh</em> conveys the idea of making possible through dedicated effort and achieving
                        through perseverance.
                    </p>

                    <p className="text-[17px] leading-relaxed mb-6">
                        In bringing together the spirit of <em>Sāma</em> and <em>Sādhana</em>, SaaMa
                        reflects the belief that musical excellence arises through sustained effort within a living
                        tradition.
                    </p>

                    <p className="text-[17px] leading-relaxed mb-6">
                        Rooted in deep respect for tradition, SaaMa seeks to keep this heritage vibrant by
                        encouraging thoughtful innovation that grows organically from within the tradition and
                        strengthens its artistic foundations. By bringing together youth, teachers, scholars,
                        performers, and audiences, SaaMa connects community through music and devotion as
                        a <em>rāja-mārga</em> — the noble path celebrated in the Carnatic tradition, nurturing excellence
                        while sustaining the living lineage of Indian classical music.
                    </p>

                    <blockquote className="mt-12 border-l-4 border-[#c8a03e] pl-6 py-4 bg-[#f5efe3] rounded-r-lg">
                        <p className="text-[17px] leading-relaxed italic text-[#5c3a1e]">
                            &ldquo;They who realize and abide in the seven notes, emanating from the primordial Praṇava—whose very nature is the Supreme Brahman—are verily jīvanmuktas, liberated while yet embodied.&rdquo;
                        </p>
                        <footer className="mt-3 text-sm font-bold text-[#3d230d]">
                            — Tyagaraja Swami
                        </footer>
                    </blockquote>

                </div>
            </div>
        </div>
    );
}
