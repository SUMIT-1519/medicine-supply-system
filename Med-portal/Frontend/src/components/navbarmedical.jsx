import React,{useState, useContext} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import {loggedInMedicalData, SidebarData} from "../data/SidebarData";
import {IconContext} from "react-icons";
import {UserContext} from "../App";


function NavbarMedical () {
    const {state, dispatch} = useContext(UserContext);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const RenderMenu = () => {
        if(state) {
            return (
                <>
                {loggedInMedicalData.map((item,index)=> {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        </>
            )
        }
        else {
            return (
                <>
                 {SidebarData.map((item,index)=> {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        </>
            )
        }
    }
    return (
        <div>
            <IconContext.Provider value={{color: "#fff"}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    <RenderMenu />
                </ul>
            </nav>
            </IconContext.Provider>
        </div>
    )
}

export default NavbarMedical;
