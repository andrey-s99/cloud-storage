import { IconButton, Card, CardActions, CardContent, Typography, CardActionArea, Dialog, DialogTitle, DialogContent, DialogContentText, Button, TextField, DialogActions } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';

const apiUrl = import.meta.env.VITE_API_URL;

interface FolderCardType {
    name: string;
    path: string,
    setPath: Dispatch<SetStateAction<string>>;
    refresh: () => void;
}

export const FolderCard = ({ name, path, setPath, refresh }: FolderCardType) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    
      const handleClose = () => {
        setOpenDialog(false);
    };


    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setPath(path + name);
    }

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const pathToFolder = path + name;
        try {
            const response = await axios.get(
                `${apiUrl}/cloud/download?path=${pathToFolder}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            const folderName = pathToFolder.split('/').filter(Boolean).pop(); // Get the folder name
            link.href = url;
            link.setAttribute('download', `${folderName}.zip`);
            document.body.appendChild(link);
            link.click();

            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

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
        <>
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
                        <IconButton  
                        size="small"
                        onClick={handleDownload}
                        >
                            <DownloadIcon fontSize="small"/>
                        </IconButton >
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