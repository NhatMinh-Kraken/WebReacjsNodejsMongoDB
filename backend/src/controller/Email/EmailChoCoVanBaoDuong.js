const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

const EmailChoCoVanBaoDuong = (giatri) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_CLIENT_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: giatri.email,
        subject: "DEVELOPER: Nguyễn Nhật Minh",
        html: `
    <div style="max-width: 700px; margin:auto; border: 1px solid #f0f0f0;
        background-color: #f0f0f0; box-shadow: 0 8px 32px 0 rgb(223 236 244
        / 10%); font-size: 110%; max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <div style="display: flex; justify-content: center; background-color:
            #000; padding: 5px;">
            <img
                src="https://res.cloudinary.com/admincar/image/upload/v1669042855/avatar/logo_kfzref.png"
                alt="logo" />
        </div>
        <h2 style="text-align: center; text-transform: uppercase;color:
            rgb(240, 82, 47); font-style: italic; font-weight: 400;">Bảo dưỡng hoàn thành-Cố vấn</h2>
        <div style="padding-left: 20px; padding-right: 20px;">
            
            <div style=" height: auto; padding-top:
                20px; padding-bottom: 20px; display: flex; justify-content:
                center;">
              <div style="border-radius:4px;padding:14px 24px 15px 24px;text-align:left;font-family:inherit;width:350px;margin:auto;font-style:italic;font-weight:400;flex-direction: column;">
                    <span style="padding-bottom: 5px;line-height:20px; display: block; margin-top: 10px;"><span>Xin chào ${giatri.name} </span></span>
                    <span style="padding-bottom: 5px;line-height:20px; display: block; margin-top: 10px; color: green">Đơn hàng bảo dưỡng của khách hàng do bạn cố vấn đã hoàn thành, xin hãy tiến hành liên hệ đến khách hàng và hoàn tất thủ tục.</span>
              </div>
            </div>
            <div style="color: red; font-weight: 400; font-style: italic; text-align: center; padding-bottom: 20px;">Thân ái.</div>
        </div>
    </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if (err) {
            return err
        };
        return infor
    })
}



module.exports = EmailChoCoVanBaoDuong