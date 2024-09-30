import { Box, Button, TextField, Typography } from "@mui/material"
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { CredentialsError } from "../../interfaces/credentials-error";
import { useAuth } from "../../contexts/auth-context";

const apiUrl = import.meta.env.VITE_API_URL;

export const SignInForm = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isUsernameIncorrect, setisUsernameIncorrect] = useState(false);
    const [isPasswordIncorrect, setisPasswordIncorrect] = useState(false);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setisUsernameIncorrect(false);
        setisPasswordIncorrect(false);

        try {
            const response = await axios.post(
                `${apiUrl}/auth/sign-in`,
                {
                    username,
                    password
                }
            )

            const data = response.data;
            const jwtToken = data?.accessToken;
            localStorage.setItem('token', jwtToken);
            setIsAuthenticated(true);

            navigate("/cloud");
        } catch (err) {
            const error = err as AxiosError;
            console.log(error);

            if (error.status === 401) {
                const data = error.response?.data as CredentialsError;
                const message = data.message;

                if (message === "Incorrect username.") {
                    setisUsernameIncorrect(true);
                }

                if (message === "Incorrect password.") {
                    setisPasswordIncorrect(true);
                }

            }
        }
    }

    return (
            <Box 
                component="form" 
                autoComplete="off"  
                onSubmit={submitHandler}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "10vh",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                        gap: "5px"
                    }}
                >
                    <LockPersonIcon
                        fontSize="large"
                        color="primary"
                        sx={{
                            alignSelf: "center",
                            marginBottom: "10px"
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            alignSelf: "center"
                        }}
                    >
                        Sign in
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            alignSelf: "center"
                        }}
                    >
                        Welcome, sign in to continue
                    </Typography>
                </Box>
                <TextField
                    required
                    name="username"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    label="Username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    error={isUsernameIncorrect}
                    helperText={!isUsernameIncorrect ? "" : "Incorrect username."}
                />
                <TextField
                    required
                    name="password"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    error={isPasswordIncorrect}
                    helperText={!isPasswordIncorrect ? "" : "Incorrect password."}
                />
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                        marginTop: "20px"
                    }}
                >
                    Sign In
                </Button>
            </Box>
    )
}