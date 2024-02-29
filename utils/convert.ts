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
    const output = removeFileExtension(fileName) + '.' + videoSettings.videoType;
    ffmpeg.writeFile(fileName, await fetchFile(file));
    const command = videoSettings.twitterCompressionCommand ? twitterCompressionCommand(fileName, output) : customVideoCompressionCommand(fileName, output, videoSettings)
    console.log(command)
    await ffmpeg.exec(command);
    const data = await ffmpeg.readFile(output)
    const blob = new Blob([data], { type: fileType.split('/')[0] });
    const url = URL.createObjectURL(blob);
    return { url, output, outputBlob: blob };
}


export const formatTime = (seconds: number): string => {
    // Ensure seconds is an integer
    seconds = Math.round(seconds);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let formattedTime = "";

    if (hours > 0) {
        formattedTime += hours + "hr";
        if (minutes > 0 || remainingSeconds > 0) {
            formattedTime += " ";
        }
    }

    if (minutes > 0) {
        formattedTime += `${minutes.toString()} min`;
        if (remainingSeconds > 0) {
            formattedTime += " ";
        }
    }

    if (remainingSeconds > 0 || formattedTime === "") {
        formattedTime += `${remainingSeconds} sec`;
    }

    return formattedTime;
}


