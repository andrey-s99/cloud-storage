import { AppBar, Box, Toolbar, Button } from "@mui/material"
import CloudIcon from '@mui/icons-material/Cloud';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";

export const Header = () => {
    const [headerMenu, setHeaderMenu] = useState(<></>);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setHeaderMenu(
            isAuthenticated ? (
                <Button 
                    href="/sign-out"
                    sx={{
                        color: "white"
                    }}
                >Sign Out</Button>
            ) : (
                <>
                    <Button 
                        href="/sign-in"
                        sx={{
                            color: "white"
                        }}
                    >Sign In</Button>
                    <Button 
                        href="/sign-up"
                        sx={{
                            color: "white"
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
                            color: "white"
                        }}
                    >
                        My cloud
                    </Button>
                    <Box >
                        {headerMenu}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}