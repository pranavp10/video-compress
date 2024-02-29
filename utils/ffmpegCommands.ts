import { VideoFormats, VideoInputSettings } from "~/types";

export const twitterCompressionCommand = (input: string, output: string) => ([
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
]);


export const customVideoCompressionCommand = (input: string, output: string, videoSettings: VideoInputSettings): string[] => {
    switch (videoSettings.videoType) {
        case VideoFormats.MP4:
            return getMp4Command(input, output, videoSettings)
        case VideoFormats.WEBM:
            return getWebMCommand(input, output, videoSettings)
        case VideoFormats.AVI:
            return getAVICommand(input, output, videoSettings)
        case VideoFormats.FLV:
            return getFLVCommand(input, output, videoSettings)
        case VideoFormats.MKV:
            return getMKVCommand(input, output, videoSettings)
        case VideoFormats.MOV:
            return getMOVCommand(input, output, videoSettings)
        default:
            return ['-i', input, output]
    }
}


const getWebMCommand = (input: string, output: string, videoSettings: VideoInputSettings): string[] => {
    const audioOptions = videoSettings.removeAudio ? [] : ['-c:a', 'libvorbis'];
    return ['-i', input, '-c:v', 'libvpx', '-crf', videoSettings.quality, '-b:v', '1M', ...audioOptions, '-vf', `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`, output];
};

const getMKVCommand = (input: string, output: string, videoSettings: VideoInputSettings): string[] => {
    const audioOptions = videoSettings.removeAudio ? [] : ['-c:a', 'aac'];
    return ['-i', input, '-c:v', 'libx264', '-crf', videoSettings.quality, ...audioOptions, '-vf', `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`, output];
};

const getAVICommand = (input: string, output: string, videoSettings: VideoInputSettings): string[] => {
    const audioOptions = videoSettings.removeAudio ? [] : ['-c:a', 'mp3'];
    return ['-i', input, '-c:v', 'libx264', '-crf', videoSettings.quality, ...audioOptions, '-vf', `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`, output];
};

const getFLVCommand = (input: string, output: string, videoSettings: VideoInputSettings): string[] => {
    const audioOptions = videoSettings.removeAudio ? [] : ['-c:a', 'aac'];
    return ['-i', input, '-c:v', 'libx264', '-crf', videoSettings.quality, ...audioOptions, '-vf', `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`, output];
};

const getMOVCommand = (input: string, output: string, videoSettings: VideoInputSettings): string[] => {
    const audioOptions = videoSettings.removeAudio ? [] : ['-c:a', 'aac'];
    return ['-i', input, '-c:v', 'libx264', '-crf', videoSettings.quality, ...audioOptions, '-vf', `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`, output];
};

const getMp4Command = (input: string, output: string, videoSettings: VideoInputSettings) => {
    const ffmpegCommand = [
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
        '-r',
        '30',
        '-maxrate',
        '5000k',
        '-bufsize',
        '5000k',
        '-tune',
        'film',
        '-ss', videoSettings.customStartTime.toString(),
        '-to', videoSettings.customEndTime.toString(),
        '-q:v',
        videoSettings.quality,
        '-c:v',
        'libx264',
        '-crf',
        '18',
        '-preset',
        'medium',
        '-f',
        videoSettings.videoType,
    ];

    if (!videoSettings.removeAudio) {
        ffmpegCommand.push(
            '-c:a',
            'aac',
            '-b:a',
            '192k',
            '-movflags',
            'faststart',
        );
    } else {
        ffmpegCommand.push('-an');
    }
    ffmpegCommand.push(output);
    return ffmpegCommand;
}
