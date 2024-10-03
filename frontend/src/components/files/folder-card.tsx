import { IconButton, Card, CardActions, CardContent, Typography, CardActionArea } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
//import PreviewIcon from '@mui/icons-material/Preview';

const apiUrl = import.meta.env.VITE_API_URL;

interface FolderCardType {
    name: string;
    path: string,
    setPath: Dispatch<SetStateAction<string>>;
    refresh: () => void;
}

export const FolderCard = ({ name, path, setPath, refresh }: FolderCardType) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setPath(path + name);
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const pathToFile = path + name;
        try {
            await axios.delete(
                `${apiUrl}/cloud?path=${pathToFile}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }}
            );
            refresh();
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <Card 
            variant="outlined"
            sx={{
                flexGrow: "1",
                minWidth: "150px"
            }}
        >
            <CardActionArea
                onClick={handleClick}
            >
                <CardContent>
                    <Typography
                        variant="body2"
                        gutterBottom
                    >
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
                <CardActions sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <IconButton  size="small">
                        <EditIcon fontSize="small"/>
                    </IconButton >
                    <IconButton  
                        size="small"
                        onClick={handleDelete}
                    >
                        <DeleteIcon fontSize="small"/>
                    </IconButton >
                </CardActions>
        </Card>
    )
}