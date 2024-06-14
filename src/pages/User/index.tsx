import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { Colors } from "../../types"
import { useEffect, useState } from "react"
import "./index.scss"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { Drawer } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../services/authContext"


export const Layout = () => {
    
    const [colapseSideBar, setColapseSidebar] = useState<boolean>(localStorage.getItem('sidebar') === 'true' ? true : false)
    useEffect(() => {
        localStorage.setItem('sidebar', colapseSideBar.toString())
    }, [colapseSideBar]);

    return (
        <div 
            style={{ 
                backgroundColor: Colors.SECONDARY_LIGTH,
                color: Colors.MAIN_BLACK,
            }} 
            className="layout">
            <div className="layout__header">
                    <Header collapsed={colapseSideBar} setShowSidebar={setColapseSidebar}></Header>
            </div>
            <div style={{ display: "flex", position: "relative", width: "100%" }}>
                <div
                    className="layout__sidebar"
                    style={{ width: colapseSideBar ? 80 : 200, }}
                >
                    <Sidebar collapsed={colapseSideBar}></Sidebar>
                </div>

                <Drawer 
                    className={"layout__drawler"} 
                    open={colapseSideBar} 
                    onClose={() => setColapseSidebar(false)}
                >
                    <div className="drawler__top">
                        <div>SMS</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => setColapseSidebar(false)}>
                            {<FontAwesomeIcon icon={"fa-solid fa-x".split(' ') as any}></FontAwesomeIcon>}
                        </div>
                    </div>
                    
                    <Sidebar collapsed={false}></Sidebar>
                </Drawer>

                <div
                    className="layout__content"
                    style={{ marginLeft: colapseSideBar ? 80 : 200, overflowY: 'auto' }}
                >
                    <div style={{ }}>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}