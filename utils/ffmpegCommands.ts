import { VideoInputSettings } from "~/types";

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


export const customVideoCompressionCommand = (input: string, output: string, videoSettings: VideoInputSettings) => {
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
};
