import { FileHandle } from "./file-handle.model"

export interface ImagePost {
    postCaption: string,
    postDescription: string,
    postCamera: string,
    postLens: string,
    postAperture: string
    postImages: FileHandle[]
}