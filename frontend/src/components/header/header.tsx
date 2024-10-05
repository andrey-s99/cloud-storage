import { AppBar, Box, Toolbar, Button, useMediaQuery, useTheme } from "@mui/material"
import CloudIcon from '@mui/icons-material/Cloud';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { SearchField } from "../search/search-field";

export const Header = () => {
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
                            fontSize: { xs: '0.63rem', sm: '0.9rem'}
                        }}
                    >Sign Out</Button>
                </>
            ) : (
                <>
                    <Button 
                        href="/sign-in"
                        sx={{
                            color: "white",
                            fontSize: { xs: '0.63rem', sm: '0.9rem'}
                        }}
                    >Sign In</Button>
                    <Button 
                        href="/sign-up"
                        sx={{
                            color: "white",
                            fontSize: { xs: '0.63rem', sm: '0.9rem'}
                        }}
                    >Sign Up</Button>
                </>
            )
        );
    }, [isAuthenticated]);

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
                        {isAuthenticated && <SearchField></SearchField>}
                    <Box >
                        {headerMenu}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}