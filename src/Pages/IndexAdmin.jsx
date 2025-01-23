import { Outlet, useLocation } from "react-router-dom";
import LayoutAdmine from "./PageAdmin/layout/LayoutAdmine";
import DashboardContent from "./PageAdmin/Components/DashboardContent";

export function IndexAdmin() {
    const location = useLocation();

    return (
        <LayoutAdmine>
            {location.pathname === "/dashboardAdmin" ? (
                <DashboardContent />
            ) : (
                <Outlet />
            )}
        </LayoutAdmine>
    )
}
