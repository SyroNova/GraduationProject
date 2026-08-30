export function getFileType(mimeType: string){
    switch (mimeType) {
        case "application/pdf":
            return "PDF"

        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "Word"

        case "application/msword":
            return "Word"

        default:
            return "Documento"
    }
}

export function getSize(bytes: number){
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 ** 2) {
        return `${Number.parseFloat((bytes / 1024).toFixed(2))} KB`;
    }

    return `${Number.parseFloat((bytes / (1024 ** 2)).toFixed(2))} MB`;
}