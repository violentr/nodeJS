import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Current working directory:", __dirname, __filename);

console.log("CWD:", process.cwd());
dotenv.config();
console.log("PORT from default config:", process.env.PORT);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log("PORT after explicit path:", process.env.PORT);
