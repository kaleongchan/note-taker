import fs from 'fs';

/**
 * This service manages recordings using local file system. In production it needs to be something more robust
 */

const PATH = process.cwd() + '/tmp/';

export const updateRecording = (key: string, data: any) => {
  fs.appendFileSync(getRecordingFilePath(key), data);
};

export const getRecording = (key: string) => {
  return fs.readFileSync(getRecordingFilePath(key));
};

const getRecordingFilePath = (key: string): string => `${PATH}${key}.webm`;