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
            content = content.replace(/to="\/courses"/g, 'to="/courses#courses-grid"');

            // Revert mistakenly generated links that might stack like /courses#courses-grid#courses-grid
            content = content.replace(/to="\/courses#courses-grid#courses-grid"/g, 'to="/courses#courses-grid"');

            if (content !== original) {
                await fs.promises.writeFile(fullPath, content);
                console.log('Updated', fullPath);
            }
        }
    }
}

processDir(baseDir).catch(console.error);
