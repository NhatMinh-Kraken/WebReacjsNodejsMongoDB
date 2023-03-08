import React, { useState } from 'react'

function ThongTinNhapAPI() {
    const [thongtinNhap, setThongTinNhap] = useState([])

    return {
        ThongTinNhapData: [thongtinNhap, setThongTinNhap]
    }
}

export default ThongTinNhapAPI