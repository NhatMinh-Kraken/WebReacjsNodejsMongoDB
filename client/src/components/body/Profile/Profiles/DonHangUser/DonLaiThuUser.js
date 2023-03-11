import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import './DonLaiThu.scss'
import FormALlLaiThu from './FormItemLaiThu/FormALlLaiThu';

function DonLaiThuUser() {
  return (
    <>
      <Tabs
        defaultActiveKey="AllDonLaiThu"
        id="uncontrolled-tab-example"
        className="mb-3 button-tabs"
      >
        <Tab eventKey="AllDonLaiThu" title="Tất cả đơn lái thử">
          <>
            <FormALlLaiThu />
          </>
        </Tab>
        <Tab eventKey="DonChoDuyet" title="Đơn chưa duyệt">
          <div>2</div>
        </Tab>
        <Tab eventKey="DonHoangThanh" title="Đơn hoàng thành">
          <div>3</div>
        </Tab>
      </Tabs>
    </>
  )
}

export default DonLaiThuUser