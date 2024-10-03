import { Box, Breadcrumbs, Link } from "@mui/material"
import { FileUploadButton } from "../../components/file-upload/file-upload-button"
import Grid from '@mui/material/Grid2';
import { FileCard } from "../../components/files/file-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { FolderCard } from "./folder-card";

const apiUrl = import.meta.env.VITE_API_URL;

interface DataType {
    username: string;
    files?: string[];
    folders?: string[];
}

export const FilesMenu = () => {
    const [username, setUsername] = useState<string>('');
    const [files, setFiles] = useState<string[] | undefined>(undefined);
    const [folders, setFolders] = useState<string[] | undefined>(undefined);
    const [path, setPath] = useState<string>('');

    const [breadcrumbs, setBreadcrumbs] = useState<(JSX.Element | undefined)[]>([]);
    const [fileCards, setFileCards] = useState<(JSX.Element | undefined)[]>([]);
    const [folderCards, setFolderCards] = useState<(JSX.Element | undefined)[]>([]);

    useEffect(() => {
        getUserData();
    }, [path])

    useEffect(() => {
        setFileCards(() => {
            return files ? files.map(f => {
                return (
                    <FileCard
                        key={crypto.randomUUID()}
                        name={f}
                    >
                    </FileCard>
                )
            }) : [];
        });

        setFolderCards(() => {
            return folders ? folders.map(f => {
                return (
                    <FolderCard
                        key={crypto.randomUUID()}
                        name={f}
                        path={path}
                        setPath={setPath}
                    >
                    </FolderCard>
                )
            }) : [];
        });
    }, [files, folders]);

    const handleBreadcrumbClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const fullPath = e.currentTarget.getAttribute("data-fullpath") as string;

        setPath(fullPath);
    }

    const getUserData = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/cloud?path=${path}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }}
            );

            const data: DataType = response.data; 

            setUsername(data.username);
            setFiles(data.files);
            setFolders(data.folders); 

            setBreadcrumbs(() => {
                let fullPath = '';
                return path.split("/").map(sub => {
                    if (sub !== "") {
                        fullPath = fullPath + sub + '/';
                        return (
                            <Link 
                                underline="hover"
                                color="inherit"
                                onClick={handleBreadcrumbClick}
                                key={fullPath}
                                data-fullpath={fullPath}
                                sx={{
                                    cursor: "pointer"
                                }}
                            >
                                {sub}
                            </Link>
                        )
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

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
                            onClick={handleBreadcrumbClick}
                            data-fullpath={''}
                            sx={{
                                cursor: "pointer"
                            }}
                        >
                            {username}
                        </Link>
                        {breadcrumbs}
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
                        {folderCards}
                        {fileCards}
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