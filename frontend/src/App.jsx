import { useState } from "react";
import Layout from "./layout/Layout";
import Sidebar from "./layout/Sidebar";


function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };
  return (
    <div className="app-container">
    </div>
  );
}

export default App;
