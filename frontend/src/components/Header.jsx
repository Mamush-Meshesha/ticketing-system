import { useLocation } from "react-router-dom";

const Header = ({collapsed}) => {
    const location =  useLocation()
    const pageName =  location.pathname.split("/")[1]
    const name = pageName.split[0]
    return (
        <header className="bg-blue-500  overflow-hidden h-[63px] w-full fixed top-0 text-white items-center flex">
        <div className={`${collapsed ? "ml-[280px]" : "ml-[280px]"}`}>
       <h1 className="capitalize"> {pageName}</h1>
        </div>
        </header>
    );
}

export default Header;

{/* <header className="bg-blue-500 h-[63px] text-white flex items-center px-4 md:px-6">
<div
  className={`transition-all ${
    collapsed ? "ml-[80px]" : "ml-[280px]"
  } md:ml-6 lg:ml-8`}
>
  <h1 className="capitalize text-sm md:text-lg">{pageName}</h1>
</div>
</header> */}