export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#faf5eb] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-[#d4c4a8]">
                
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#3d230d] mb-4">Privacy Policy</h1>
                    <div className="h-1 w-24 bg-[#d4c4a8] mx-auto mb-6"></div>
                    <p className="text-[#7a5c3a] font-medium">Last updated: April 2026</p>
                </div>

                <div className="space-y-8 text-[#5c3a1e] leading-relaxed">
                    
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">1. Information We Collect</h2>
                        <p>At Sadhana Academy for Musical Arts, we are committed to protecting your privacy. We may collect personal information such as your name, email address, phone number, and mailing address when you voluntarily provide it to us through event registrations, donations, contact forms, or newsletter signups.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to communicate with you about our festivals, workshops, and concerts. Specifically, we may use your data to:</p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li>Process event registrations and donations.</li>
                            <li>Send newsletters, updates, and organizational support requests.</li>
                            <li>Respond to inquiries submitted through our website.</li>
                            <li>Improve our website and community outreach programs.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">3. Data Sharing and Protection</h2>
                        <p>As a 501(c)(3) non-profit organization, we highly value the trust of our patrons. We do not sell, rent, or trade your personal information to third parties. We may share necessary data with trusted service providers (such as payment processors like PayPal or Zeffy) solely for the purpose of facilitating transactions and organizational operations securely. We implement standard security measures to protect your information against unauthorized access, alteration, or disclosure.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">4. Third-Party Links</h2>
                        <p>Our website may contain links to external sites not operated by us (such as donation platforms or partner organizations). We have no control over the content or privacy practices of these third-party websites and encourage you to review their respective privacy policies.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">5. Your Consent and Rights</h2>
                        <p>By using our website, you consent to the collection and use of your information as described in this Privacy Policy. You have the right to request access to, correction of, or deletion of your personal data at any time by contacting us.</p>
                    </section>

                    <section className="bg-[#faf5eb] p-6 rounded-xl border border-[#d4c4a8] mt-10">
                        <h2 className="text-xl font-serif font-bold text-[#3d230d] mb-2">Contact Us</h2>
                        <p>If you have any questions or concerns about this Privacy Policy, please reach out to us at:</p>
                        <p className="mt-2 font-medium text-[#3d230d]">Email: saama.seattle@gmail.com</p>
                        <p className="font-medium text-[#3d230d]">Phone: (425) 591-2391</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
