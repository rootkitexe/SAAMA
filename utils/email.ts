import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saama.seattle@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

type EmailOptions = {
    subject: string;
    html: string;
    replyTo?: string;
};

export async function sendNotificationEmail({ subject, html, replyTo }: EmailOptions) {
    try {
        await transporter.sendMail({
            from: '"Sadhana Academy Website" <saama.seattle@gmail.com>',
            to: 'saama.seattle@gmail.com',
            subject,
            html,
            replyTo,
        });
        return { success: true };
    } catch (error: any) {
        console.error('Email send failed:', error);
        return { success: false, error: error.message };
    }
}

export async function sendRegistrationConfirmationEmail({ 
    to, 
    studentName, 
    categories 
}: { 
    to: string; 
    studentName: string; 
    categories: string[]; 
}) {
    const subject = "Registration Confirmed - Aaroha Carnatic Music Festival 2026";
    const html = `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #3d230d; background-color: #faf5eb; border: 1px solid #d4c4a8; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #3d230d; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Registration Confirmed!</h1>
            </div>
            <div style="padding: 30px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Dear ${studentName},</p>
                <p style="font-size: 16px; margin-bottom: 20px;">Thank you for registering for the <strong>Aaroha Carnatic Music Festival 2026</strong>. We have successfully received your payment and your registration is confirmed.</p>
                
                <div style="background-color: white; border: 1px solid #d4c4a8; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                    <h2 style="font-size: 18px; margin-top: 0; margin-bottom: 15px; color: #5c3a1e; border-bottom: 1px solid #d4c4a8; padding-bottom: 10px;">Registered Categories</h2>
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                        ${categories.map(cat => `<li style="margin-bottom: 8px;">✨ ${cat}</li>`).join('')}
                    </ul>
                </div>

                <p style="font-size: 16px; margin-bottom: 20px;">You can view and manage your registration details anytime by logging into your participant dashboard on our website.</p>
                
                <a href="https://saamaseattle.org/portal" style="display: inline-block; background-color: #3d230d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-bottom: 20px;">Go to Dashboard</a>
                
                <p style="font-size: 14px; color: #7a5c3a; margin-top: 30px;">If you have any questions, please reply to this email.</p>
            </div>
            <div style="background-color: #f0e6d2; padding: 15px; text-align: center; font-size: 12px; color: #7a5c3a;">
                Sadhana Academy for Musical Arts &bull; Seattle, WA
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: '"Sadhana Academy" <saama.seattle@gmail.com>',
            to,
            bcc: 'saama.seattle@gmail.com',
            subject,
            html,
        });
        return { success: true };
    } catch (error: any) {
        console.error('Confirmation email send failed:', error);
        return { success: false, error: error.message };
    }
}
