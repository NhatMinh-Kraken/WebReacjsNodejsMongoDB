import { createContext, useState } from "react";
import EnergyAPI from "../../../Api/BaoDuong/ThongTinXe/EnergyAPI";
import LoaiXeNhapAPI from "../../../Api/BaoDuong/ThongTinXe/LoaiXeNhapAPI";
import ThongTinNhapAPI from "../../../Api/BaoDuong/ThongTinXe/ThongTinNhapAPI";
import DaiLyCarAPI from "../../../Api/BaoDuong/DaiLyCar/DaiLyCarAPI";
import OptionBaoDuongAPI from "../../../Api/BaoDuong/optionBaoDuong/OptionBaoDuongAPI";
import TimeAndDateAPI from "../../../Api/BaoDuong/TimesAndDate/TimeAndDateAPI";
import CoVanAPI from "../../../Api/BaoDuong/TimesAndDate/CoVanAPI";

export const BaoDuongStepperContext = createContext()

export const UseContextProviderBaoDuong = ({ children }) => {
    const states = {
        energyContent: EnergyAPI(),
        loaiXeNhapContent: LoaiXeNhapAPI(),
        thongTinNhapContent: ThongTinNhapAPI(),
        daiLyCarContent: DaiLyCarAPI(),
        optionBaoDuongContent: OptionBaoDuongAPI(),
        timesAndDatesContent: TimeAndDateAPI(),
        convanContent: CoVanAPI()
    }

    return (
        <BaoDuongStepperContext.Provider value={states}>
            {children}
        </BaoDuongStepperContext.Provider>
    );
}