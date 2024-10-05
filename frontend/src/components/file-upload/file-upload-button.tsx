import { Box, Button } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEvent } from "react";
import axios from "axios";

declare module 'react' {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
      // extends React's HTMLAttributes
      directory?: string;
      webkitdirectory?: string;
    }
  }

const apiUrl = import.meta.env.VITE_API_URL;

interface FileUploadProps {
    path: string;
    refresh: () => void;
}

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
            formData.append("relativePath", file.webkitRelativePath);

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
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%"
        }}>
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                    width: "100%"
                }}
            >
                Upload files
                <input
                    type="file"
                    accept="*/*"
                    multiple
                    hidden
                    onChange={handleUpload}
                >
                </input>
            </Button>
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                    width: "100%"
                }}
            >
                Upload folders
                <input
                    type="file"
                    accept="*/*"
                    multiple
                    webkitdirectory=""
                    hidden
                    onChange={handleUpload}
                >
                </input>
            </Button>
        </Box>
    )
}