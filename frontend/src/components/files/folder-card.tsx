import { IconButton, Card, CardActions, CardContent, Typography, CardActionArea } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import PreviewIcon from '@mui/icons-material/Preview';

interface FolderCardType {
    name: string;
}

export const FolderCard = ({ name }: FolderCardType) => {
    return (
        <Card 
            variant="outlined"
            sx={{
                flexGrow: "1",
                minWidth: "150px"
            }}
        >
            <CardActionArea>
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