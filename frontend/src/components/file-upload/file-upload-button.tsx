import { Button, styled } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEvent } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface FileUploadProps {
    path: string;
    refresh: () => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export const FileUploadButton = ({ path, refresh }: FileUploadProps) => {
    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;
        // Upload files one at a time
        if (!files) {
            console.log("No files uploaded!");
            return;
        }

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                await axios.post(
                    `${apiUrl}/cloud/upload?path=${path}`, 
                    formData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    }}
                );

                refresh();
            } catch (err) {
                console.log(err);
            }
        }   
    }   
    return (
        <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
                width: "100%"
            }}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={handleUpload}
                multiple
            />
        </Button>
    )
}