import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import './DonLaiThu.scss'
import FormALlLaiThu from './FormItemLaiThu/FormALlLaiThu';
import FormDonChuaDuyet from './FormItemLaiThu/FormDonChuaDuyet';
import FormDonHoanThanh from './FormItemLaiThu/FormDonHoanThanh';

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
          <FormDonChuaDuyet />
        </Tab>
        <Tab eventKey="DonHoangThanh" title="Đơn hoàn thành">
          <FormDonHoanThanh />
        </Tab>
      </Tabs>
    </>
  )
}

export default DonLaiThuUser