//Tento komponent slouží pro změnu URL a stránky v aplikaci.
//Komponent využívá router-dom pro dynamické zobrazení obsahu aplikace. 
//Zde, je krom komponentů z MUI využito také fuknce isNonMobile pro lepší kontrolu nad responzivním designem.

import React from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ReceiptLongOutlined,
    AdminPanelSettingsOutlined,
    PieChartOutlined,
} from "@mui/icons-material";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [  //Boční menu - Path slouží k zapsání do URL. Stránky jsou vytvořeny s pomocí AJ v URL, z důvodu ulehčení URL transferu. Mezery v názvech by přídávali %20 do URL. 
    //Příklad https://localhost:3000/hlavní%20panel
    {
        text: "Hlavní panel",
        path: "dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Logovací systém",
        icon: null,
    },
    {
        text: "Přehled všech logů",
        path: "logs",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Vložení logu",
        path: "form",
        icon: <InsertDriveFileOutlinedIcon />,
    },
    {
        text: "Grafy",
        icon: null,
    },
    {
        text: "Přehled",
        path: "overview",
        icon: <PieChartOutlined />,
    },

    {
        text: "Správci",
        icon: null,
    },
    {
        text: "Admin",
        path: "admin",
        icon: <AdminPanelSettingsOutlined />,
    },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "1px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        SMART LOG
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon, path }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcPath = path.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcPath}`);
                                                setActive(lcPath);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcPath
                                                        ? theme.palette.secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcPath
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcPath
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcPath && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px ",
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;