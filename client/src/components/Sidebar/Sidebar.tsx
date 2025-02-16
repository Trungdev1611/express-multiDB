'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface SideBarProps {
    setOpen: Dispatch<SetStateAction<boolean>>,
    open: boolean
}
function Sidebar (props: SideBarProps) {
   
    const {open, setOpen} = props
    return (
        <div className={`flex flex-col min-h-screen transition-all duration-300 ${open ? "w-64" : "w-16"}`}>
            {/* Nút mở/đóng sidebar */}
            <div className="p-2 flex justify-end">
                <IconButton onClick={() => setOpen(!open)} className="text-white">
                    {open ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </div>

            {/* Danh sách menu */}
            <List>
                <ListItem onClick={() => console.log("Dashboard Clicked")}>
                    <ListItemText primary="Dashboard" className={`${open ? "block" : "hidden"}`} />
                </ListItem>
                <ListItem onClick={() => console.log("Settings Clicked")}>
                    <ListItemText primary="Settings" className={`${open ? "block" : "hidden"}`} />
                </ListItem>
                <ListItem onClick={() => console.log("Logout Clicked")}>
                    <ListItemText primary="Logout" className={`${open ? "block" : "hidden"}`} />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;

