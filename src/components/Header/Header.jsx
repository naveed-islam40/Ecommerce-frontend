import { ReactNavbar } from "overlay-navbar";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineAccountBox } from "react-icons/md";
import "./Header.css";

const option = {
  burgerColorHover: "red",
  logo: "/images/mylogo.png",
  logoWidth: "80px",
  navColor1: "white",
  link1Text: "Home",
  link2Text: "Product",
  link3Text: "About",
  link4Text: "Contact",
  link1Url: "/",
  link2Url: "/Products",
  link3Url: "/About",
  link4Url: "/Contact",
  link1ColorHover: "red",
  link2ColorHover: "red",
  link3ColorHover: "red",
  link4ColorHover: "red",
  link1Padding: "10px",
  link1Size: "1.5vmax",
  link1Color: "#242321",
  link2Color: "#242321",
  link3Color: "#242321",
  link4Color: "#242321",
  searchIcon: "true",
  SearchIconElement: CiSearch,
  searchIconUrl: "/Search",
  cartIcon: "true",
  CartIconElement: FaShoppingBag,
  cartIconUrl: "/cart",
  profileIcon: "true",
  ProfileIconElement: MdOutlineAccountBox,
  profileIconUrl: "/signup",
  searchIconMargin: "0 20px",
  cartIconMargin: "0 20px 0 0",
  searchIconColor: "#242321",
  cartIconColor: "#242321",
  profileIconColor: "#242321",
};

const Header = () => {
  return (
    <div className="header">
      <ReactNavbar {...option} />
    </div>
  );
};

export default Header;
