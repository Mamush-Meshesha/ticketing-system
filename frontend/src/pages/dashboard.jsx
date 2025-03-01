import { useSelector } from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";

const DashboardPage = () => {
    const isSidebarCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed);
    return (
       <div className="overflow-x-hidden w-full py-10">
         <div className={`container mx-auto ${isSidebarCollapsed ? "ml-[80px]" : "ml-[280px]"}`}>
        <Dashboard />
        </div>
       </div>
    );

}

export default DashboardPage