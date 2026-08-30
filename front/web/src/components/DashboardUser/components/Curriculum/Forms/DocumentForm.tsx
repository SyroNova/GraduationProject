import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import axios from "../../../../../api/axios";
import { isAxiosError } from "axios";
import type MetadataResponse from "../../../../../types/Curriculum/Document";

type Props = {
    idResume: string
    onSavedSuccess: () => void
    onError: () => void
    onDirtyChange: React.Dispatch<React.SetStateAction<boolean>>
    setDocuments: React.Dispatch<React.SetStateAction<MetadataResponse[] | null>>
}

export default function DocumentForm({ idResume, onSavedSuccess, onError, onDirtyChange, setDocuments }: Readonly<Props>){
    const [files, setFiles] = useState<File[]>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile =   Array.from(e.target.files ?? [])
        onDirtyChange(selectedFile.length > 0)
        setFiles(selectedFile)
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            const formData = new FormData()

            formData.append("idResume", idResume)

            files.forEach(file => {
                formData.append("files", file)
            })

            const response = await axios.post('/document/create/resume',formData)

            setDocuments(prev => {
                if(!prev) return prev

                return [
                    ...prev,
                    ...response.data.documents
                ]
            })

            onSavedSuccess()
        } catch (error) {
            if(isAxiosError(error)){
                console.log(error.response?.data)
            }
            onError()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group>
                    <Form.Label>Documentos</Form.Label>
                    <Form.Control 
                        type="file"
                        onChange={handleFileChange}
                        multiple
                    />
                </Form.Group>
            </Row>
            <Row>
                <Button type="submit" className="btn-link bg-transparent" disabled={files.length === 0}>Guardar cambios</Button>
            </Row>
        </Form>
    )
}