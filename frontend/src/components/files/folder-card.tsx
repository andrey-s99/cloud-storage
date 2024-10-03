import { IconButton, Card, CardActions, CardContent, Typography, CardActionArea } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, SetStateAction } from "react";
//import PreviewIcon from '@mui/icons-material/Preview';

interface FolderCardType {
    name: string;
    path: string,
    setPath: Dispatch<SetStateAction<string>>;
}

export const FolderCard = ({ name, path, setPath }: FolderCardType) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setPath(path + name);
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
                    <IconButton  size="small">
                        <DeleteIcon fontSize="small"/>
                    </IconButton >
                </CardActions>
        </Card>
    )
}