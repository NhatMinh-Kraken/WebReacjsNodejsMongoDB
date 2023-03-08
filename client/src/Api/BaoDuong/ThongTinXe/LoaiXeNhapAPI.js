import React, { useState } from 'react'

function LoaiXeNhapAPI() {
    const [loaiXeNhap, setLoaiXeNhap] = useState("")

    return {
        LoaiXeNhapData: [loaiXeNhap, setLoaiXeNhap]
    }
}

export default LoaiXeNhapAPI