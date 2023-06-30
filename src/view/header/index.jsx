import { Link } from "react-router-dom";
import { AppBar, Box, IconButton, MenuItem, MenuList, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse } from "@material-ui/core";
import { FaCar, FaUsers, FaLaptop, FaCreditCard, FaWhatsapp, FaSignOutAlt, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

export default function Header(props) {

    const [menu, setMenu] = useState({
        open: false
    })

    const [collapse, setCollapse] = useState({
        site: false,
        financeiro: false
    })

    return (
        <>
            {(window.innerWidth < 577) ?
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenu({open: true})}>
                            <MdMenu />
                        </IconButton>
                        <Typography variant="h6">
                            {props.title}
                        </Typography>
                    </Toolbar>
              </AppBar>
            :
            <header>
                <nav className="header navbar navbar-expand-lg navbar-light bg-white p-0">
                    <Box className="container">
                        <Link to="/" className="navbar-brand">
                            <img src="/logo.png" alt="logo" height="40" />
                        </Link>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center gap-2" to="/vehicles">
                                    <FaCar className="icon-lg mr-2" size={22}/> Veículos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link d-flex align-items-center gap-2">
                                    <FaUsers className="icon-lg mr-2" size={22}/> Proprietários
                                </button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="nav-link d-flex align-items-center gap-2 dropdown-toggle" data-toggle="dropdown" to="#">
                                    <FaLaptop className="icon-lg mr-2" size={22}/> Site
                                </button>
                                <MenuList className="dropdown-menu">
                                    <MenuItem className="dropdown-item">
                                        Otimização para o Google
                                    </MenuItem>
                                    <MenuItem className="dropdown-item">
                                        Unidade e telefones
                                    </MenuItem>
                                    <MenuItem className="dropdown-item">
                                        Minha logo
                                    </MenuItem>
                                    <MenuItem className="dropdown-item">
                                        Dominio
                                    </MenuItem>
                                    <MenuItem className="dropdown-item">
                                        Configurações
                                    </MenuItem>
                                </MenuList>
                            </li>

                            <li className="nav-item dropdown">
                                <button className="nav-link d-flex align-items-center gap-2 dropdown-toggle" data-toggle="dropdown" to="#">
                                    <FaCreditCard className="icon-lg mr-2" size={22}/> Financeiro
                                </button>
                                <MenuList className="dropdown-menu">
                                    <MenuItem className="dropdown-item">
                                        Meu plano
                                    </MenuItem>
                                    <MenuItem className="dropdown-item">
                                        Minha transações
                                    </MenuItem>
                                </MenuList>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" to="/">
                                    <FaWhatsapp className="icon-lg mr-2" size={22} />
                                    Ajuda
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" to="/">
                                    <FaSignOutAlt className="icon-lg mr-2" size={22} />
                                    Sair
                            </Link>
                            </li>
                        </ul>
                    </Box>
                </nav>
            </header>
            }
            <Drawer anchor="left" open={menu.open} onClose={() => setMenu({open: false})}>
                <Box style={{width: 320, maxWidth: window.innerWidth - 70}}>
                    <List component="nav" className="menu-mobile">
                        <ListItem>
                            <img src="/logo.png" alt="logo" className="img-fluid logo-mobile" />
                        </ListItem>
                        <ListItem>
                            teste@email.com
                        </ListItem>

                        <Divider className="mt-2 mb-2" />
                        
                        <ListItem>
                            <ListItemIcon>
                                <FaCar />
                            </ListItemIcon>
                            <ListItemText primary="Veículos" />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <FaUsers />
                            </ListItemIcon>
                            <ListItemText primary="Proprietários" />
                        </ListItem>

                        <ListItem button onClick={() => setCollapse({site: (collapse.site)? false: true})}>
                            <ListItemIcon>
                                <FaLaptop />
                            </ListItemIcon>
                            <ListItemText primary="Site" />
                            {(collapse.site) ? <FaAngleUp />: <FaAngleDown />}
                        </ListItem>
                        <Collapse in={collapse.site} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Otimização para o Google" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Unidades e telefones" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Minha logo" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Dominio" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Configurações" />
                                </ListItem>
                            </List>
                        </Collapse>

                        <Divider className="my-2" />

                        <ListItem button onClick={() => setCollapse({financeiro: (collapse.financeiro)? false: true})}>
                            <ListItemIcon>
                                <FaCreditCard />
                            </ListItemIcon>
                            <ListItemText primary="Financeiro" />
                            {(collapse.financeiro) ? <FaAngleUp /> : <FaAngleDown />}
                        </ListItem>

                        <Collapse in={collapse.financeiro} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Meu plano" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Minha transações" />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem>
                            <ListItemIcon>
                                <FaWhatsapp />
                            </ListItemIcon>
                            <ListItemText primary="Ajuda" />
                        </ListItem>

                        <Divider />

                        <ListItem>
                            <ListItemIcon>
                                <FaSignOutAlt />
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItem>
                    </List>
                </Box>

            </Drawer>
        </>
    )
}