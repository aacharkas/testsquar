import * as StreamZip from 'node-stream-zip';

export const extractInto = async (
  filePath: string,
  targetPath: string
): Promise<number> => {
  // eslint-disable-next-line new-cap
  const zip = new StreamZip.async({ file: filePath });
  const count = await zip.extract(null, targetPath);
  await zip.close();

  return count ?? 0;
};
