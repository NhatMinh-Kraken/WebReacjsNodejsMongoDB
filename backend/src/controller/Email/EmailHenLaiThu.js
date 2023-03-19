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

const EmailHenLaiThu = (giatri) => {
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
        to: giatri.idUser.email,
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
            rgb(240, 82, 47); font-style: italic; font-weight: 400;">Thông báo đến hẹn trải nghiệm xe</h2>
        <div style="padding-left: 20px; padding-right: 20px;">
            <div style="padding-bottom: 10px;">
                <div style=" border-radius: 4px;
                    padding: 14px 24px 15px 24px;
                    text-align: left;
                    background-color: #d5e9e2;
                    color: #1e9469;
                    font-family: inherit;
                    width: 300px;
                    margin: auto;">
                    <div style="display: inline-block;
                        text-align: left;
                        float: left;
                        height: 24px;
                        width: 24px;
                        margin-right: 18px;
                        background-repeat: no-repeat;
                        background-image:
                        url(https://ci6.googleusercontent.com/proxy/k7qEtegL4qOMQr0YuT4mRMoUxnnAgW8jfQRnS5irFNp96kbcIHx-zrdyc3yHA7TbmNeIH1UJfSZteKBnOWMxWeJ6aplqJ1BHX24meoUXsXFR0XTh8nneNUgD6phfjijA5z8t0HRNYWrD9epIlHkL4birohjd8w2MUyCPPgIvE4XQQzc=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/6c20475da3226ec8/29beeb69-d82d-4eb7-97e2-70ca2d868d40/18x18.png);
                        font-family: inherit;">
                    </div>
                    <span>Đã Lưu Dữ Liệu</span>
                </div>
            </div>
            <div style="padding-bottom: 10px;">
                <div style=" border-radius: 4px;
                    padding: 14px 24px 15px 24px;
                    text-align: left;
                    background-color: #eed6f5;
                    color: #ba27e7;
                    font-family: inherit;
                    width: 300px;
                    margin: auto;">
                    <div style="display: inline-block;
                        text-align: left;
                        float: left;
                        height: 24px;
                        width: 24px;
                        margin-right: 18px;
                        background-repeat: no-repeat;
                        background-image:
                        url(https://ci5.googleusercontent.com/proxy/31lGygXl3AjkjdRQDkJWNQnuRcOC-Ma_rKpQba5WJxtuzCuEftJ3wHWQIefMG09dm7j5xOi3ma16REoKNZQSAwDnlowHrF1mHdFizB7AkqFksDih-HcjoC4MejgmhIIs8yFauaw0b8FIJBAYZZZl6ofzsSg2vT-dqzWcN6TCkUdSkDs=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/6c20475da3226ec8/e3386e9a-e745-43e4-9236-848e144b6ba3/18x18.png);
                        font-family: inherit;"></div>
                    <span>Đã Gọi Điện Thoại Xác Minh</span>
                </div>
            </div>
            <div style=" height: auto; padding-top:
                20px; padding-bottom: 20px; display: flex; justify-content:
                center;">
              <div style="border-radius:4px;padding:14px 24px 15px 24px;text-align:left;font-family:inherit;width:350px;margin:auto;font-style:italic;font-weight:400;flex-direction: column;">
                    <span style="padding-bottom: 5px;line-height:20px; display: block; margin-top: 10px;"><span>Xin chào ${giatri.nhanxung === 1 ? "Anh" : "Chị"} </span><span>${giatri.idUser.name}</span></span>
                    <span style="padding-bottom: 5px;line-height:20px; display: block; margin-top: 10px;">Anh có lịch hẹn lái thử vào ngày <span style="color: blue;">${giatri.dates}</span> lúc <span style="color: blue;">${giatri.times}</span></span>
                    <span style="padding-bottom: 5px;line-height:20px; display: block; margin-top: 10px;">Với mẫu xe <span style="color: red;">${giatri.Idcar.name}</span> thuộc loại xe <span style="color: red;">${giatri.type}</span></span>
                    <span style="padding-bottom: 5px;line-height:20px; display: block; margin-top: 10px;">Tại đại lý <span style="color: green;">${giatri.Iddaily.Name}</span>, địa chỉ tại: <span style="color: green;">${giatri.Iddaily.Address}</span></span>
                    <span style="padding-bottom: 5px; line-height:20px; display: block; margin-top: 10px;">Rất mong anh có thể sắp xếp lịch hẹn đến trải nghiệm xe của chung tôi</span>
                    <span style="padding-bottom: 5px; line-height:20px; display: block; margin-top: 10px;">Chúc ${giatri.nhanxung === 1 ? "Anh" : "Chị"} có buổi trải nghiệm đáng mong đợi.</span>
              </div>
            </div>
            <div style="color: red; font-weight: 400; font-style: italic; text-align: center; padding-bottom: 20px;">Thân ái</div>
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



module.exports = EmailHenLaiThu