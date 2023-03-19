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

const EmailChoCoVan = (giatri) => {
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
        to: giatri.IdCoVan.email,
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
            rgb(240, 82, 47); font-style: italic; font-weight: 400;">Thông báo lịch làm việc</h2>
        <div style="padding-left: 20px; padding-right: 20px;">
            
            <div style=" height: auto; padding-top:
                20px; padding-bottom: 20px; display: flex; justify-content:
                center;">
              <div style="border-radius:4px;padding:14px 24px 15px 24px;text-align:left;font-family:inherit;width:350px;margin:auto;font-style:italic;font-weight:400;flex-direction: column;">
                    <span style="padding-bottom: 5px;line-height:20px; display: block; margin-top: 10px;"><span>Xin chào ${giatri.IdCoVan.name} </span></span>
                    <span style="padding-bottom: 5px;line-height:20px; display: block; margin-top: 10px;">Bạn có lịch hẹn cố vấn cho khách hàng ${giatri.name} về vấn đề bảo dưỡng xe. <span style="color: blue;">Ngày ${giatri.dates}</span> lúc <span style="color: blue;">${giatri.times}</span></span>
              </div>
            </div>

            <span style="font-weight:bold; display: flex; justify-content:center;">Thông tin khách hàng</span>

            <table className="table table-bordered" style="background-color:
            #fff; padding: 20px; border-radius: 10px; margin: auto;">
            <tbody>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600; padding-bottom: 10px;">Tên Khách Hàng:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.nhanxung === 1 ? "Anh" : "Chị"} ${giatri.name}</td>
                </tr>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600;padding-bottom: 10px;">Loại xe:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.IdLoaiXe.name}</td>
                </tr>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600;">Loại năng lượng:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.energy === 1 ? "Xăng" : "Điện"}</td>
                </tr>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600;">Biển số đã đăng ký:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.BienSo}</td>
                </tr>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600;">Số kilomet đã đi:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.QuangDuongDi} km</td>
                </tr>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600;">Tên đại lý:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.Iddaily.Name}</td>
                </tr>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600;">Địa chỉ đại lý:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.Iddaily.Address}</td>
                </tr>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600;">Ngày đăng ký lái thử:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.dates}</td>
                </tr>
                <tr>
                    <td style="padding-right: 20px; font-weight:
                        600;">Thời gian đăng ký lái thử:</td>
                    <td style="padding-left: 20px; padding-bottom:
                        10px;text-align: center;">${giatri.times}</td>
                </tr>
            </tbody >
        </table >
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



module.exports = EmailChoCoVan