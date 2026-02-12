const { PrismaClient } = require('@prisma/client');


let correctedDatabaseUrl = process.env.DATABASE_URL;

if (process.env.DATABASE_URL) {
    let url = process.env.DATABASE_URL;

    if (url.includes('.mongodb.net/') && !url.includes('/badminton')) {

        if (url.endsWith('/')) {
            url += 'badminton';
        } else if (url.includes('?')) {
            url = url.replace('.mongodb.net/', '.mongodb.net/badminton');
        } else {
            url += '/badminton';
        }
        
        process.env.DATABASE_URL = url;
        correctedDatabaseUrl = url;
        console.log('System: Auto-corrected DATABASE_URL to include database name: .../badminton');
    }
}


const prisma = new PrismaClient({
    datasources: {
        db: {
            url: correctedDatabaseUrl,
        },
    },
    log: ['query', 'info', 'warn', 'error'],
});

module.exports = prisma;
