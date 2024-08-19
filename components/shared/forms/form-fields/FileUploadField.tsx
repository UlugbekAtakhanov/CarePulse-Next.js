"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploadFieldProps = {
    files: File[];
    onChange: (files: File[]) => void;
};

const FileUploadField = ({ files, onChange }: FileUploadFieldProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps()}
            className="input border-dashed flex flex-col items-center justify-center !h-auto cursor-pointer !py-4 hover:border-primary"
        >
            <input {...getInputProps()} />
            {files && files.length > 0 ? (
                <div>file exist...</div>
            ) : (
                <>
                    <Image src="/assets/icons/upload.svg" width={40} height={40} alt="icon" className="mb-2" />
                    <div className="text-muted-foreground text-center">
                        <span className="text-green-500">Click to upload</span> or drag and drop <br /> SVG, PNG, JPG or GIF (max. 800x400px)
                    </div>
                </>
            )}
            {/* {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>} */}
        </div>
    );
};

export default FileUploadField;
