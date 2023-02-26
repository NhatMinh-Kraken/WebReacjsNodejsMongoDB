import React, { useState } from 'react'
import './items/ThongTinCaNhan.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from 'axios';


const initialState = {
  nhanxung: '',
  name: '',
  email: '',
  numberphone: '',
}

function ThongTinCaNhan({ user, handleClick, dailyData, dates, times, carItem }) {

  const auth = useSelector(state => state.auth)
  const { isLogged } = auth
  const token = useSelector(state => state.token)
  const [thongtin, setThongTin] = useState([])
  const [open, setOpen] = useState(false);
  const history = useHistory()

  const [checkEmail, setCheckEmail] = useState(false)
  const [num, setNum] = useState(0)

  const handleChangeInput = e => {
    const { name, value } = e.target
    setThongTin({ ...thongtin, [name]: value })
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleCheck = () => {
    setCheckEmail(!checkEmail)
    setNum(num + 1)
  }


  const handleSubmitLaiThu = async (e) => {
    try {
      e.preventDefault();
      if (!isLogged) {
        toast.error("Please login to proceed with registration!!!")
        history.push("/login")
      }
      else {
        await Axios.post("/api/laithu", {
          idUser: user._id,
          phone: thongtin.numberphone ? thongtin.numberphone : user.numberphone,
          nhanxung: thongtin.nhanxung,
          Idcar: carItem._id,
          type: carItem.type.name,
          Iddaily: dailyData._id,
          dates: dates,
          times: times,
          nameCar: carItem.name,
          moneyCar: carItem.money,
          nameUser: user.name,
          emailUser: user.email,
          checkedEmail: checkEmail ? 1 : 0,
          nameDaiLy: dailyData.Name,
          addressDaiLy: dailyData.Address

        }, {
          headers: { Authorization: token }
        })

        history.push("/")
        toast.success("Đăng ký lái thử thành công! Chúng tôi sẽ gửi thông báo đến bạn trong thời gian sớm nhất.")
      }

    } catch (err) {
      toast.error(err.response.data.msg)
      console.log(err)
    }
  }

  return (
    <>
      <div className='Form-ThongTinCaNhan'>
        <div className='Form-ThongTinCaNhan-header'>
          <span>Thông tin cá nhân</span>
        </div>
        <div className='Form-ThongTinCaNhan-body'>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                <Form.Label>Nhân xưng</Form.Label>
                <Form.Select aria-label="Default select example" name='nhanxung' onChange={handleChangeInput}>
                  <option>Vui lòng chọn một</option>
                  <option value="1">Anh</option>
                  <option value="2">Chị</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name='name'
                  placeholder="Họ và tên"
                  defaultValue={user.name}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a họ và tên.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="email"
                  placeholder="email"
                  defaultValue={user.email}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text" 
                  name="numberphone"
                  placeholder="phone"
                  defaultValue={user.numberphone}
                  onChange={handleChangeInput}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a phone.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className='dieu-khoan-top col-12 '>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="dieu-khoan">
                    <span className='font-weight-bold'>Tôi đồng ý nhận thông tin qua:</span>
                  </Accordion.Header>
                  <Accordion.Body className='dieu-khoan-body'>
                    <Form.Check className="pt-3 pb-3 font-weight-bold"
                      type="checkbox"
                      name="checkEmail"
                      label="Gửi thông báo qua Email"
                      onChange={handleCheck}
                      checked={checkEmail}
                    />
                    <span className='font-italic font-weight-light text-dieukhoan'>Tôi theo đây xác nhận đồng ý rằng Công ty TNHH Mercedes-Benz Việt Nam (“NNM”), Tập đoàn Mercedes-Benz Group NNM, các đại lý được ủy quyền của NNM và/hoặc các công ty khác được chỉ định bởi NNM và/hoặc Mercedes-Benz Group NNM có quyền thu thập, lưu giữ, sử dụng, phân tích, chuyển giao và cập nhật dữ liệu cá nhân đã được tôi cung cấp qua hình thức đã chọn, cho các mục đích chăm sóc khách hàng, gởi thông tin khuyến mãi, tiến hành các hoạt động tiếp thị liên quan đến các sản phẩm và dịch vụ được cung cấp bởi NNM, Mercedes-Benz Group NNM, các đại lý ủy quyền của NNM, và/hoặc các công ty khác được chỉ định bởi NNM và/hoặc Mercedes-Benz Group NNM.</span>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="pt-5 d-flex justify-content-end">
              <Button onClick={handleSubmitLaiThu}>Submit form <i className="fa-solid fa-chevron-right pl-2"></i></Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ThongTinCaNhan