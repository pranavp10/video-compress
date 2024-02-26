export type FileActions = {
    file: File;
    fileName: string;
    fileSize: number;
    from: string;
    to: String | null;
    fileType: string;
    isError?: boolean;
    url?: string;
    output?: any;
};
