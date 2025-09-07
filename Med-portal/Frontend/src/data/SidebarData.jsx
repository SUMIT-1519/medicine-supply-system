import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },

    {
        title: 'Login as Doctor',
        path: '/logindoctor',
        icon: <MdIcons.MdLogin />,
        cName: 'nav-text'
    },
    {
        title: 'Login as Medical',
        path: '/loginmedical',
        icon: <MdIcons.MdLogin />,
        cName: 'nav-text'
    },
    
   
]

export const loggedInMedicalData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Med Dashboard',
        path: '/meddashboard',
        icon: <GiIcons.GiMedicines/>,
        cName: 'nav-text'
    },
    {
        title: 'Add Med',
        path: '/addmed',
        icon: <IoIcons.IoIosAddCircleOutline />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <MdIcons.MdLogin />,
        cName: 'nav-text'
    },
    
]

export const loggedInDoctorData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Prescription',
        path: '/prescriptionpage',
        icon: <BsIcons.BsPrescription />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <MdIcons.MdLogin />,
        cName: 'nav-text'
    },
    
]