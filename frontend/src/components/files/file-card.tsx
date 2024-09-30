import { IconButton, Card, CardActions, CardContent, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import PreviewIcon from '@mui/icons-material/Preview';

export const FileCard = () => {
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
                    MyBook.pdf
                </Typography>
            </CardContent>
            <CardActions sx={{
                display: "flex",
                justifyContent: "flex-end"
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