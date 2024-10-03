import { IconButton, Card, CardActions, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { FormEvent, useState } from "react";
//import PreviewIcon from '@mui/icons-material/Preview';

const apiUrl = import.meta.env.VITE_API_URL;

interface FileCardType {
    name: string;
    path: string;
    refresh: () => void;
}

export const FileCard = ({ name, path, refresh }: FileCardType) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    
      const handleClose = () => {
        setOpenDialog(false);
    };

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
        <>
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
                        onClick={handleClickOpen}
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

            <Dialog
                open={openDialog}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: async (e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const formProps = Object.fromEntries(formData);
                        
                        const pathToFile = path + name;
                        try {
                            await axios.patch(
                                `${apiUrl}/cloud`,
                                {
                                    path: pathToFile,
                                    newName: formProps.newName,
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
                    },
                }}
            >
            <DialogTitle>Edit name</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter new name for this file/folder
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="newName"
                    label="New Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Apply</Button>
            </DialogActions>
            </Dialog>
        </>
    )
}