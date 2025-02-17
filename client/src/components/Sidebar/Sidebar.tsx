'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { List, ListItem, ListItemText, IconButton, ListItemButton, ListItemIcon, } from "@mui/material";
import {
    Menu,
    ChevronLeft, 
    Inbox,
    AccountCircle,
    Apartment,
    Security,
    People,
    Group
} from '@mui/icons-material';
import { useRouter } from "next/navigation";


interface SideBarProps {
    setOpen: Dispatch<SetStateAction<boolean>>,
    open: boolean
}

const menuList = [
    { name: "Account", url: "/users", icon: <AccountCircle /> },
    { name: "Department", url: "/department", icon: <Apartment /> },
    { name: "Roles", url: "/roles", icon: <Security /> },
    { name: "Employees", url: "/employees", icon: <People /> },
    { name: "Group", url: "/group", icon: <Group /> },
    { name: "Menu", url: "/menu", icon: <Menu /> },
    { name: "Chevron", url: "/chevron", icon: <ChevronLeft /> },
    { name: "Inbox", url: "/inbox", icon: <Inbox /> },
]
function Sidebar(props: SideBarProps) {
    const router = useRouter()
    const { open, setOpen } = props
    const [selectedKey, setSelectedkey] = useState(0)

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        url: string,
    ) => {
        console.log(event, url)
        router.push(url)}
    
    return (
        <div className={`flex flex-col min-h-screen transition-all duration-300 ${open ? "w-52" : "w-16"}`}>
            {/* Nút mở/đóng sidebar */}
            <div className="p-2 flex justify-end">
                <IconButton onClick={() => setOpen(!open)} className="text-white">
                    {open ? <ChevronLeft /> : <Menu />}
                </IconButton>
            </div>

            {/* Danh sách menu */}
            <List>
                {menuList.map((item, index) => {
                    return (
                        <ListItemButton
                            key={index}
                            selected={selectedKey === index}
                            onClick={(event) => {
                                setSelectedkey(index)
                                handleListItemClick(event, item.url)
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} className={`${open ? "block" : "hidden"}`} />
                        </ListItemButton>

                    );
                })}


            </List>
        </div>
    );
};

export default Sidebar;

