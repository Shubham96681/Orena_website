import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function checkDB() {
    try {
        const db = await open({
            filename: './database.sqlite',
            driver: sqlite3.Database
        });
        
        console.log("Database opened successfully.");
        
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
        console.log("Tables:", tables.map(t => t.name).join(', '));
        
        const users = await db.all("SELECT id, username FROM users");
        console.log("Users:", JSON.stringify(users));
        
        await db.close();
    } catch (err) {
        console.error("Database check failed:", err.message);
    }
}

checkDB();
