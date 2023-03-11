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

//emailUser, nameCar, type, moneyCar, dates, times, nameUser
const EmailDangKyBaoDuong = (IdOptionBaoDuong, IdLoaiXe, energy, BienSo, QuangDuongDi, Iddaily, IdUser, nhanxung, name, email, numberphone, address, mabuuchinh, address_cuthe, checkEmail, IdCoVan, dates, times, TenLoaiXe, TenDaiLy, DiaChiDaiLy, TenKhachHang, EmailKhachHang, NameCoVan, SDTCoVan) => {
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
        to: email,
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
                        rgb(240, 82, 47); font-style: italic; font-weight: 400;">Đăng ký
                        đặt lịch bảo dưỡng thành công thành công</h2>
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
                                <span>Chưa Gọi Điện Thoại Xác Minh</span>
                            </div>
                        </div>
                        <div style=" height: auto; padding-top:
                            20px; padding-bottom: 20px; display: flex; justify-content:
                            center;">
                            <table className="table table-bordered" style="background-color:
                                #fff; padding: 20px; border-radius: 10px; margin: auto;">
                                <tbody>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600; padding-bottom: 10px;">Tên Khách Hàng:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${nhanxung === 1 ? "Anh" : "Chị"} ${TenKhachHang ? TenKhachHang : name}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;padding-bottom: 10px;">Tên loại xe:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${TenLoaiXe}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;">Loại năng lượng:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${energy === 1 ? "Xăng" : "Điện"}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;">Biển số đã đăng ký:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${BienSo}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;">Số kilomet đã đi:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${QuangDuongDi} km</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;">Tên đại lý:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${TenDaiLy}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;">Địa chỉ đại lý:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${DiaChiDaiLy}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;">Cố vấn:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${NameCoVan ? NameCoVan : "Chưa có"} </td>
                                    </tr >
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;">Ngày đăng ký lái thử:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${dates}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 20px; font-weight:
                                            600;">Thời gian đăng ký lái thử:</td>
                                        <td style="padding-left: 20px; padding-bottom:
                                            10px;text-align: center;">${times}</td>
                                    </tr>
                                </tbody >
                            </table >
                        </div >
    <div style="color: red; font-weight: 400; font-style: italic; text-align: center; padding-bottom: 20px;">Chúng
        tôi sẽ liên hệ lại với quý khách trong thời gian sớm nhất.</div>
                    </div >
                </div >
    `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if (err) {
            return err
        };
        return infor
    })
}

module.exports = EmailDangKyBaoDuong