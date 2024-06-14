import { Sidebar as ProSidebar, Menu, SubMenu } from 'react-pro-sidebar'
import { MenuItems } from './menuItems'
import { SideBarSubMenu } from './MenuGroup'
import { Colors } from '../../types'
import { SideBarMenuItem } from './MenuItem'

type Props = {
    collapsed: boolean
}

export const Sidebar = ({ collapsed = false }: Props) => {

    return (
        <ProSidebar 
            backgroundColor='' 
            style={{ overflowY: 'auto', 
                backgroundColor: Colors.MAIN_WHITE,
                color: Colors.MAIN_BLACK,
                height: '100%',
                
            }}
            collapsed={collapsed}
        >
            
            
            <Menu menuItemStyles={{
                icon: (params) => {
                    if (params.level > 0) return { margin: 0,}
                },
                button: (params) => {
                    if (params.level > 0) return { fontSize: 12,
                        backgroundColor: Colors.MAIN_WHITE,
                        "&:hover": {
                            backgroundColor: `${Colors.MAIN_LIGTH} !important`,
                            color: "white !important",
                        },
                    }
                    return { "&:hover": {
                            backgroundColor: `${Colors.MAIN_LIGTH} !important`,
                            color: "white !important",
                        },
                    }
                },
            }}>
                {
                    MenuItems.map((menuItem: any) => {
                        return !menuItem.items 
                            ? <SideBarMenuItem key={menuItem.name} icon={menuItem.icon} path={menuItem.path} name={menuItem.name}></SideBarMenuItem>
                            : <SideBarSubMenu key={menuItem.name} icon={menuItem.icon} label={menuItem.name}>
                                {
                                    menuItem.items.map((subItem: any) => {
                                        return <SideBarMenuItem key={subItem.name} icon={subItem.icon} path={subItem.path} name={subItem.name}></SideBarMenuItem> 
                                    })
                                }
                            </SideBarSubMenu>
                    })
                }
            </Menu>
            
        </ProSidebar>
    )
}