const DUMMY_STORAGE_BASE_URL = "https://dummy-storage.coolerguru.com";

/*
 * TODO: Replace with the real S3 upload once the bucket is available.
 * For now we only fake the upload and return a dummy (but valid) URL,
 * so create / update flows can be completed end to end.
 */
export async function uploadFileToStorage(file: File, folder: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const safeFileName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");

  return `${DUMMY_STORAGE_BASE_URL}/${folder}/${Date.now()}-${safeFileName}`;
}

export function getFileNameFromUrl(url: string): string {
  const lastSegment = url.split("/").pop() ?? url;

  return decodeURIComponent(lastSegment.replace(/^\d+-/, ""));
}
