import { Box,  Link, Typography } from "@mui/material"

export const HeroBlock = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "left"
            }}
            ml={{ xs: 1 }}
            mr={{ xs: 1 }}
            mt={5}
            textAlign={"left"}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    alignItems: "flex-start"
                }}
            >
                <Typography
                    variant="h3"
                >
                    UP IN THE CLOUD
                </Typography>
                <Typography
                    variant="body2"
                >
                    <Link href="/sign-in">Sign in</Link> to start uploading and safely storing your files in the cloud.
                </Typography>
            </Box>
        </Box>
    )
}