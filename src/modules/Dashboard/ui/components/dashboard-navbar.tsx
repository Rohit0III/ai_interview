"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

import { PanelLeft, PanelLeftCloseIcon, PanelLeftIcon, PanelRight, SearchIcon } from "lucide-react"
import DashboardCommand from "./dashboar-command"
import { useEffect, useState } from "react"

export const DashboardNavbar =() =>{
    const {state,toggleSidebar,isMobile} =useSidebar()
    const [Commandopen, setCommandopen] = useState(false)

    useEffect (()=>{
        const down = (e:KeyboardEvent)=>{
            if(e.key==="q" && (e.metaKey || e.ctrlKey)){
                setCommandopen((open)=>!open)
            }
        }
        document.addEventListener("keydown",down)
        return ()=>document.removeEventListener("keydown",down)
    },[]);

    return (
        <>
        <DashboardCommand open={Commandopen} setOpen={setCommandopen} />
        <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
            <Button className="size-9" variant="outline" onClick={toggleSidebar}>
                {(state === "collapsed" || isMobile )
                ?<PanelLeftIcon  className="size-4"/> :
                <PanelLeftCloseIcon  className="size-4"/>
                }
            </Button>
            <Button
            className="h-9 w-[240px] justify-start font-normal text-muted-foreground
             hover:text-muted-foreground "
            variant="outline"
            size="sm"
            onClick={()=>{setCommandopen((open)=>!open)}}
            >
                <SearchIcon />
                Search
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center
                 gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span>&#8984;</span>Q
                </kbd>
            </Button>
        </nav>
        </>
    )
}