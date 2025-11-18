import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const directory = dirname(__filename);

export const filesDirectory = join(directory, "..", "files");
