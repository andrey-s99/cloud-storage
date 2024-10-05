import { useEffect, useState } from "react"
import { FileCard } from "../../components/files/file-card";
import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

interface SearchResultsProps {
    searchResults: string[];
}

export const SearchResults = ({ searchResults }: SearchResultsProps) => {
    const [files, setFiles] = useState<(JSX.Element | undefined)[]>([]);
    const navigate = useNavigate();

    const refresh = () => {
        navigate("/");
    }

    useEffect(() => {
        setFiles(() => {
            return searchResults.map((result) => {
                const name = result.split('/').pop() ?? '';
                return(
                    <FileCard
                        name={name}
                        path={result}
                        refresh={refresh}
                        key={crypto.randomUUID()}
                    >
                    </FileCard>
                )
            })
        });

    }, [searchResults]);

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
                        <Typography>
                            search results
                        </Typography>
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
                        {files}
                    </Box>
                </Grid>
                <Grid size={{ xs: 0, sm: 1, md: 1, lg: 2, xl: 2 }}></Grid>
            </Grid>
        </Box>
    )
}