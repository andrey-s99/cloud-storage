import { IconButton, Card, CardActions, CardContent, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
//import PreviewIcon from '@mui/icons-material/Preview';

const apiUrl = import.meta.env.VITE_API_URL;

interface FileCardType {
    name: string;
    path: string;
    refresh: () => void;
}

export const FileCard = ({ name, path, refresh }: FileCardType) => {

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const pathToFile = path + name;
        try {
            await axios.patch(
                `${apiUrl}/cloud`,
                {
                    path: pathToFile,
                    newName: 'aboba',
                }, 
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }}
            );
            refresh();
        } catch (err) {
            console.log(err);
        }
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
        <Card sx={{
            flexGrow: "1",
            minWidth: "150px"
        }}>
            <CardContent>
                <Typography
                    variant="body2"
                    gutterBottom
                >
                    {name}
                </Typography>
            </CardContent>
            <CardActions sx={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <IconButton  
                    size="small"
                    onClick={handleEdit}
                >
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