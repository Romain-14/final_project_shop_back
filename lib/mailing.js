import nodemailer from 'nodemailer';
import {google} from 'googleapis';

const OAuth2 = google.auth.OAuth2;

// infos à obtenir sur le "https://developers.google.com/oauthplayground" et le console cloud plateform
const clientId = '805143496761-tpd45t0mchuo8hcrl9r11n9bqcon8gss.apps.googleusercontent.com';
const clientSecret = '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';
const refreshToken = '1//04C_DHL9KVgRgCgYIARAAGAQSNwF-L9IrpKXq3sTKzRbdf0ABF2RRL_uOqbgLhKkJKBqb-ERgRIxWYTu3YU5CG6Le8CExV1sVooY';
const accessToken = 'ya29.a0ARrdaM91r2OVSWVHTljLZsFGL4dmnP7UDuMk1rVphwnQlnCdwugUIxZXeYX6uGrJ_ha6msFMU5cj1pukc0f3yjYO6BJeHBheQE770H_p51XiupfjrXQHHyYedSE0qsJIEPqZrKZxt34lFL0ZB0rIJjIE75L4';

export default (mailTo, subject, title, text, uuid) => {

    const oauth2Client = new OAuth2(
        clientId, clientSecret, "https://developers.google.com/oauthplayground"
    )
    
    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

   console.log(mailTo, subject, title, text, uuid);           
        
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "devtest14r@gmail.com", // le mail de l'user autorisé sur la plateforme google cloud 
            clientId: clientId, // client Id
            clientSecret: clientSecret, // client secret
            refreshToken: refreshToken,
            accessToken: accessToken,
        },
    })

    const mailOptions = { 
        from: '"Ship-shop" <ship-shop@gmail.com>', // sender address
        to: mailTo, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: `<b>${title}</b><p>${text}<p><a href='http://localhost:3000/user/validateAccount/${uuid}'>Valider mon compte</a>`, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("ça rate");
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
        });
}