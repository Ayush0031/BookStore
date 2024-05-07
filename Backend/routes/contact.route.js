import express from 'express'
const router = express.Router();
import nodemailer from 'nodemailer'

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
              user:process.env.USER,
              pass: process.env.PASSWORD,
            },
          });

        await transporter.sendMail({
            from: email,
            to: process.env.USER,
            subject: `Message from ${name}`,
            text: message
        });

        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to send message.');
    }
});

export default router;
