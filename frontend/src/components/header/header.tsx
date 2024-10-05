import { AppBar, Box, Toolbar, Button, useMediaQuery, useTheme } from "@mui/material"
import CloudIcon from '@mui/icons-material/Cloud';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { SearchField } from "../search/search-field";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface HeaderProps {
    setSearchResults: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Header = ({ setSearchResults }: HeaderProps) => {
    const [headerMenu, setHeaderMenu] = useState(<></>);
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const navigate = useNavigate();

    const handleSignout = async () => {
        // Delete JWT token on client side
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    }

    useEffect(() => {
        setHeaderMenu(
            isAuthenticated ? (
                <>
                    <Button 
                        onClick={handleSignout}
                        sx={{
                            color: "white",
                        }}
                    >
                        {isSm && 'Sign Out' || <LogoutIcon/>}
                    </Button>
                </>
            ) : (
                <>
                    <Button 
                        href="/sign-in"
                        sx={{
                            color: "white",

                        }}
                    >
                        {isSm && 'Sign In' || <LoginIcon/>}
                    </Button>
                    <Button 
                        href="/sign-up"
                        sx={{
                            color: "white",
                        }}
                    >
                        {isSm && 'Sign Up' || <PersonAddIcon/>}
                    </Button>
                </>
            )
        );
    }, [isAuthenticated, isSm]);

    return (
        <Box >
            <AppBar position="static">
                <Toolbar sx={{ display:"flex", justifyContent:"space-between"}}>
                    <Button
                        href="/cloud"
                        variant="contained"
                        startIcon={<CloudIcon />}
                        sx={{
                            color: "white",
                        }}
                    >
                        {isSm && 'My Cloud'}
                    </Button>
                        {isAuthenticated && <SearchField setSearchResults={setSearchResults}></SearchField>}
                    <Box >
                        {headerMenu}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}