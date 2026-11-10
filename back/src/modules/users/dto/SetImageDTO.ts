import ImageDB from "../types/ImageDB.js";

export default interface SetImageDTO{
    idUser: number,
    image: {
        imageData: Buffer,
        mimeType: string
    }
}

