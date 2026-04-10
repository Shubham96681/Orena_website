import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '../src');

async function processDir(dir) {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            await processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = await fs.promises.readFile(fullPath, 'utf8');
            let original = content;
            content = content.replace(/to="\/contact"/g, 'to="/contact#form-section"');
            content = content.replace(/to="\/admission"/g, 'to="/admission#form-section"');
            if (content !== original) {
                await fs.promises.writeFile(fullPath, content);
                console.log('Updated', fullPath);
            }
        }
    }
}

processDir(baseDir).catch(console.error);
