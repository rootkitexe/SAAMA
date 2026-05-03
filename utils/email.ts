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
