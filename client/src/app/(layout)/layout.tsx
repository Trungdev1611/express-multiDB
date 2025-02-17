'use client'
import Sidebar from "@/components/Sidebar/Sidebar";
import { Paper } from "@mui/material";
import { useState } from "react";



export default function Layout(props: {children: React.ReactNode}) {
    const [open, setOpen] = useState(true);
  return (
          <div className="flex 0 min-h-screen ">
            <Paper className="fixed bg-red-400" elevation={1}>
              <Sidebar open = {open} setOpen = {setOpen}/>
            </Paper>
            <div className={`flex-1 bg-slate-200 h-[2000px] overflow-y-auto ${open ? "ml-52" : "ml-16"} ` }> 
                <div className="ml-4 bg-slate-50 h-full rounded-md">
                {props.children}
                </div>
            </div>
          </div>
  )
}
