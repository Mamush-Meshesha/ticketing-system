const Header = ({collapsed}) => {
    return (
        <header className="bg-blue-500  overflow-hidden h-[63px] text-white items-center flex">
        <div className={`container mx-auto ${collapsed ? "ml-[80px]" : "ml-[280px]"}`}>
        hello
        </div>
        </header>
    );
}

export default Header;