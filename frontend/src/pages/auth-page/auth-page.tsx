import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';

interface AuthPageProps {
    authForm: JSX.Element;
}

export const AuthPage = ({ authForm }: AuthPageProps) => {
    return (
        <Box>
            <Grid container>
                <Grid size="grow">        
                </Grid>
                <Grid size={{ xs: 8, sm: 4, md: 4, lg: 4, xl: 2 }}>
                    {authForm}
                </Grid>
                <Grid size="grow">     
                </Grid>
            </Grid>
        </Box>
    )
}