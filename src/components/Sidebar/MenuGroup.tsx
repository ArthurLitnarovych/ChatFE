import React from 'react'
import { SubMenu } from 'react-pro-sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    label: string
    icon: string
    children: React.ReactNode
}

export const SideBarSubMenu = ({ label, icon, children }: Props) => {

    return (
        <SubMenu icon={<FontAwesomeIcon icon={icon.split(' ') as any}></FontAwesomeIcon>} label={label}>{children}</SubMenu>
    )
} 
