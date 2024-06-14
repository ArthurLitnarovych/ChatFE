import { MenuItem } from 'react-pro-sidebar'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Colors } from '../../types'

type Props = {
    path: string,
    name: string,
    icon: string
}

export const SideBarMenuItem = ({ path, name, icon }: Props) => {
    const { pathname } = useLocation()

    const isSelected = pathname === path
    return (
        <MenuItem 
            style={{ backgroundColor: isSelected ? Colors.SECONDARY_LIGTH : ''}} 
            component={<Link to={path}></Link>}
            icon={<FontAwesomeIcon icon={icon.split(' ') as any}></FontAwesomeIcon>}
        >
            { name  }
        </MenuItem>
    )
}
