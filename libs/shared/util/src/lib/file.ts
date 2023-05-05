import { rm } from 'fs/promises';

export const silentDeleteDir = async (filePath: string): Promise<void> => {
  try {
    await rm(filePath, { recursive: true, force: true });
  } catch (err) {
    console.error(`Could not delete directory '${filePath}'`, err);
  }
};
