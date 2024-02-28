import { FFmpeg, } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { FileActions, VideoInputSettings } from '~/types';
import { customVideoCompressionCommand, twitterCompressionCommand } from './ffmpegCommands';

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
    videoSettings: VideoInputSettings
): Promise<any> {
    const { file, fileName, fileType } = actionFile;
    const input = getFileExtension(fileName);
    const output = removeFileExtension(fileName) + '.' + videoSettings.videoType;
    ffmpeg.writeFile(input, await fetchFile(file));
    await ffmpeg.exec(videoSettings.twitterCompressionCommand ? twitterCompressionCommand(input, output) : customVideoCompressionCommand(input, output, videoSettings));
    const data = await ffmpeg.readFile(output)
    const blob = new Blob([data], { type: fileType.split('/')[0] });
    const url = URL.createObjectURL(blob);
    return { url, output, outputBlob: blob };
}
