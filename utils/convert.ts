import { FFmpeg, } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { FileActions } from '~/global';

function getFileExtension(fileName: string) {
    const regex = /(?:\.([^.]+))?$/;
    const match = regex.exec(fileName);
    if (match && match[1]) {
        return match[1];
    }
    return '';
}

function removeFileExtension(fileName: string) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        return fileName.slice(0, lastDotIndex);
    }
    return fileName;
}

export default async function convertFile(
    ffmpeg: FFmpeg,
    actionFile: FileActions,
): Promise<any> {
    const { file, to, fileName, fileType } = actionFile;
    const input = getFileExtension(fileName);
    const output = removeFileExtension(fileName) + '.' + to;
    ffmpeg.writeFile(input, await fetchFile(file));

    const ffmpegCmd = [
        '-i',
        input,
        '-c:v',
        'libx264',
        '-profile:v',
        'high',
        '-level:v',
        '4.2',
        '-pix_fmt',
        'yuv420p',
        '-c:a',
        'aac',
        '-b:a',
        '192k',
        '-movflags',
        'faststart',
        '-r',
        '30',
        '-maxrate',
        '5000k',
        '-bufsize',
        '5000k',
        '-tune',
        'film',
        output,
    ];

    await ffmpeg.exec(ffmpegCmd);
    const data = await ffmpeg.readFile(output)
    const blob = new Blob([data], { type: fileType.split('/')[0] });
    const url = URL.createObjectURL(blob);
    return { url, output };
}
