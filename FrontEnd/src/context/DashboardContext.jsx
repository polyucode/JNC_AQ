import { useState } from "react";
import { createContext } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    const [dashboardData, setDashboardData] = useState({});

    return (
        <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
            { children }
        </DashboardContext.Provider>
    )
}