const { PrismaClient } = require('@prisma/client');

// Auto-fix DATABASE_URL if it's missing the database name (Workaround for Render config)
let correctedDatabaseUrl = process.env.DATABASE_URL;

if (process.env.DATABASE_URL) {
    let url = process.env.DATABASE_URL;
    // Check if URL matches standard Atlas pattern but is missing the DB name
    if (url.includes('.mongodb.net/') && !url.includes('/badminton')) {
        // If it ends with slash, append badminton
        if (url.endsWith('/')) {
            url += 'badminton';
        } else if (url.includes('?')) {
            // Insert before query params
            url = url.replace('.mongodb.net/', '.mongodb.net/badminton');
        } else {
            // Append if just ending in .net (unlikely with slash check above but safe)
            url += '/badminton';
        }
        
        // Update the environment variable so other parts of the app (like MongoClient) see the fix
        process.env.DATABASE_URL = url;
        correctedDatabaseUrl = url;
        console.log('System: Auto-corrected DATABASE_URL to include database name: .../badminton');
    }
}

// Explicitly pass the corrected URL to PrismaClient
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: correctedDatabaseUrl,
        },
    },
    log: ['query', 'info', 'warn', 'error'],
});

module.exports = prisma;
