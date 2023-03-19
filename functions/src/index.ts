import * as functions from "firebase-functions";
import { createTransport } from "nodemailer";

import { FormInputs } from "./interfaces";

const transport = createTransport({
    service: "Gmail",
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

const sendContactForm = (form: FormInputs) => transport.sendMail({
    subject: "Mensaje de cliente - Xochicalli Commerce",
    bcc: [`${process.env.APP_TOEMAIL}`],
    html: `
    <h1>¡Nuevo mensaje!</h1>
    <h3>Este mensaje viene por parte de: ${form.name}.</h3>
    <p>Correo de contacto: ${form.email}</p>
    <p>Mensaje: ${form.message}</p>
    <br>
    <h4>Gracias por su atención.</h4>
`,
}).then((res) => {
    console.log(`Accepted --> ${res.accepted}`);
    console.log(`Rejected --> ${res.rejected}`);
}).catch((err) => {
    console.log(err);
});

export const contactForm = functions.https.onRequest((req, res: any) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    } else if (req.body.secret !== process.env.APP_SECRET) {
        res.sendStatus(500);
    } else {
        sendContactForm(req.body).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }
});
