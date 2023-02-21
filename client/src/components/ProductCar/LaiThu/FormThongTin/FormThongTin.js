import { createContext, useState } from "react";
import CarAPI from "../../../../Api/CarAPI";
import DaiLyAPI from "../../../../Api/DaiLyAPI";
import TimeAPI from "../../../../Api/TimeAPI";
import UserAPI from "../../../../Api/UserAPI";

export const StepperContext = createContext()

export const UseContextProvider = ({ children }) => {
    const states = {
        carContent: CarAPI(),
        dailyContent: DaiLyAPI(),
        timeContent: TimeAPI(),
        userContent: UserAPI()
    }

    return (
        <StepperContext.Provider value={states}>
            {children}
        </StepperContext.Provider>
    );
}