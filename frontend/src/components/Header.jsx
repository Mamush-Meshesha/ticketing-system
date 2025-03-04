import { useLocation } from "react-router-dom";

const Header = ({collapsed}) => {
    const location =  useLocation()
    const pageName =  location.pathname.split("/")[1]
    const name = pageName.split[0]
    return (
        <header className="bg-blue-500  overflow-hidden h-[63px] text-white items-center flex">
        <div className={`container mx-auto ${collapsed ? "ml-[80px]" : "ml-[280px]"}`}>
       <h1 className="capitalize"> {pageName}</h1>
        </div>
        </header>
    );
}

export default Header;