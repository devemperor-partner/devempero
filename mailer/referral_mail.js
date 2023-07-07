const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

// let referral_transporter = nodemailer.createTransport({
//   service: "Gmail",
//   secure: false,

//   auth: {
//     user: process.env.company_mail,
//     pass: process.env.mail_password,
//   },
// });

const referral_transporter = nodemailer.createTransport(
  smtpTransport({
    host: process.env.host,
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
    port: 465,
    auth: {
      user: process.env.company_mail,
      pass: process.env.mail_password,
    },
  }),
);

let referral_mail_options = (userInfo) => {
  return (mailOptions = {
    from: process.env.mail,
    to: userInfo.reciever,
    subject: `Someone Registerd with your Refferral link`,
    html: `
   
        <div class="mail_template"
            style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; background-color: #f2f2f2; padding: 20px; border-radius: 10px; border: 1px solid #ccc;">
            <div style="text-align: center;">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpuFiJrUPZz0Mns1nbi97C4RegvU_2KeiOGv2lseVYvfk6JKEYr48M5ToCQgsfBuS8pBo&usqp=CAU"
                    alt="Company Logo" style="width: 80px; border-radius: 50%;">
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <h3 style="font-size: 24px; font-weight: bold; color: #333;">A User Registerd With Your Referral Link </h3>
            </div>
            <div style="margin-top: 30px;">
                <p style="font-size: 18px; color: #555;"> <b>${userInfo.refferd_user}</b> just registerd with your referral link on Devemperor, you will recieve a 10% commision of whatever they spend on devemperor.</p>
            </div>
           
            <div style="margin-top: 40px;">
                <p style="font-size: 14px; color: #999; text-align: center;">This message was generated via Devemperor's secured
                    channel. Please do not take any action if you did not make this request.</p>
            </div>
        </div>
        
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        </style>
 `,
  });
};
module.exports = { referral_mail_options, referral_transporter };

// transporter.sendMail(
//   create_mail_options({
//     first_name: "chidera",
//     last_name: "Nweke",
//     reciever: "chideranwofe02@gmail.com",
//   }),
//   (err, info) => {
//     if (err) return console.log(err);
//     console.log(info);
//     // return res.status(400).json({
//     //   error: true,
//     //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
//     // });
//   },
// );
// transporter.sendMail(mailOptions, (err, info) => {
//   if (err)
//     return res
//       .status(400)
//       .json({ error: true, errMessage: `an error occured: ${err.message}` });
//   // console.log(info)
//   return res.status(200).json({ error: false, message: "message sent" });
//   // console.log("message sent",info)
// });

// //   if (err)
// //     return { error: true, errMessage: `an error occured: ${err.message}` };
// //   // console.log(info)
// //   return { error: false, message: "message sent" };
// // });
// };
