import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import { toggleSidebar } from "../stores/redux/state";

const Layout = ({ children }) => {
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed);
const dispatch = useDispatch();
    return (
        <div>
        <Sidebar 
        collapsed={isSidebarCollapsed} 
        toggleSidebar={() => dispatch(toggleSidebar())}      />
      <Header collapsed={isSidebarCollapsed}/>
        <main>{children}</main>
        </div>
    );
    }

    export default Layout