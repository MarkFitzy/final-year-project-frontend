import { FileHandle } from "./file-handle.model"

export interface ImagePost {
    postId: number;
    postCaption: string,
    postDescription: string,
    postCamera: string,
    postLens: string,
    postAperture: string,
    postImages: FileHandle[],
    postType: string,
}