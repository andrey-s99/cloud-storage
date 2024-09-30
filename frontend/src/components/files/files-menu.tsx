import { Box, Breadcrumbs, Link } from "@mui/material"
import { FileUploadButton } from "../../components/file-upload/file-upload-button"
import Grid from '@mui/material/Grid2';
import { FileCard } from "../../components/files/file-card";

export const FilesMenu = () => {
    return (
        <Box 
            sx={{ 
                flexGrow: 1,
                marginTop: "2vh" 
            }} 
            ml={{ xs: 1 }}
            mr={{ xs: 1 }}
            mb={5}
        >
            <Grid 
                container
                rowSpacing={2}
                columns={{ xs: 4, sm: 8, md: 8, lg: 12, xl: 12 }}
            >
                <Grid size={{ xs: 0, sm: 1, md: 1, lg: 2, xl: 2 }}></Grid>
                <Grid size={{ xs: 4, sm: 6, md: 6, lg: 8, xl: 8 }}>
                    <Breadcrumbs>
                        <Link 
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            Pictures
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href="/"
                        >
                            Milan
                        </Link>
                    </Breadcrumbs>
                </Grid>
                <Grid size={{ xs: 0, sm: 1, md: 1, lg: 2, xl: 2 }}></Grid>

                <Grid size={{ xs: 0, sm: 1, md: 1, lg: 2, xl: 2 }}></Grid>
                <Grid size={{ xs: 4, sm: 6, md: 6, lg: 8, xl: 8 }}>
                    <Box
                        className="files"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "stretch",
                            gap: "10px"
                        }}
                    >
                        <FileCard></FileCard>
                    </Box>
                </Grid>
                <Grid size={{ xs: 0, sm: 1, md: 1, lg: 2, xl: 2 }}></Grid>

                <Grid size={{ xs: 0, sm: 1, md: 1, lg: 2, xl: 2 }}></Grid>
                <Grid 
                    className="upload"
                    size={{ xs: 4, sm: 6, md: 6, lg: 8, xl: 8 }}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <FileUploadButton />
                </Grid>
                <Grid size={{ xs: 0, sm: 1, md: 1, lg: 2, xl: 2 }}></Grid>
            </Grid>
        </Box>
    )
}