const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/badminton";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("badminton");

        // Collections
        const categories = db.collection("Category");
        const products = db.collection("Product");

        // Clear
        await categories.deleteMany({});
        await products.deleteMany({});
        console.log("Cleared existing data");

        const now = new Date();

        // Seed Categories
        const cats = [
            { name: "Pro Rackets", image: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200" },
            { name: "Premium Shuttles", image: "https://images.unsplash.com/photo-1613912303663-1937e0da292c?q=80&w=1200" },
            { name: "Elite Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200" },
            { name: "Bags & Totes", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200" },
            { name: "Apparel", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200" },
            { name: "Accessories", image: "https://images.unsplash.com/photo-1588731234159-8b99631b3fde?q=80&w=1200" },
            { name: "Grips & Tapes", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200" },
            { name: "Strings", image: "https://images.unsplash.com/photo-1626225967045-2c390255979d?q=80&w=1200" }
        ];

        const insertedCats = await categories.insertMany(cats);
        console.log("Inserted categories");

        const prods = [
            // Rackets (Category 0)
            {
                name: "Astrex Phantom X-99 Ultra",
                description: "The peak of carbon engineering. Ultra-stiff, head-heavy power unit for explosive smashes.",
                price: 259.99,
                categoryId: insertedCats.insertedIds[0],
                stock: 15,
                image: "https://images.unsplash.com/photo-1626225967045-2c390255979d?q=80&w=800", // Racket 1
                createdAt: now
            },
            {
                name: "Astrex Stealth 700",
                description: "Aerodynamic frame design for rapid swing speed and defensive recovery.",
                price: 189.99,
                categoryId: insertedCats.insertedIds[0],
                stock: 20,
                image: "https://images.unsplash.com/photo-1617083275225-6248b9d49110?q=80&w=800", // Racket 2
                createdAt: now
            },
            {
                name: "Astrex Velocity Pro",
                description: "Lightweight control racket perfect for doubles play and net shots.",
                price: 149.99,
                categoryId: insertedCats.insertedIds[0],
                stock: 25,
                image: "https://images.unsplash.com/photo-1549495543-a6021f156d11?q=80&w=800", // Racket 3 (New)
                createdAt: now
            },
            {
                name: "Astrex Thunder Strike",
                description: "Maximum power racket with extra stiff shaft for aggressive players.",
                price: 229.99,
                categoryId: insertedCats.insertedIds[0],
                stock: 12,
                image: "https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?q=80&w=800", // Racket 4 (New)
                createdAt: now
            },
            {
                name: "Astrex Precision Elite",
                description: "Balanced racket offering perfect blend of power and control.",
                price: 199.99,
                categoryId: insertedCats.insertedIds[0],
                stock: 18,
                image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800", // Racket 5
                createdAt: now
            },

            // Shuttles (Category 1)
            {
                name: "Astrex Orbital v.50 Pro",
                description: "Aeronautically tested tournament grade goose feather shuttlecocks.",
                price: 44.99,
                categoryId: insertedCats.insertedIds[1],
                stock: 100,
                image: "https://images.unsplash.com/photo-1613912303663-1937e0da292c?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Aero-Sync Nylon",
                description: "Durable nylon shuttles with flight stability mimicking natural feathers.",
                price: 24.99,
                categoryId: insertedCats.insertedIds[1],
                stock: 200,
                image: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Tournament Gold",
                description: "Premium duck feather shuttles for professional tournaments.",
                price: 39.99,
                categoryId: insertedCats.insertedIds[1],
                stock: 150,
                image: "https://images.unsplash.com/photo-1626225967045-2c390255979d?q=80&w=800", // Racket + Shuttle
                createdAt: now
            },
            {
                name: "Astrex Practice Pack",
                description: "Value pack of 12 durable shuttles for training sessions.",
                price: 19.99,
                categoryId: insertedCats.insertedIds[1],
                stock: 300,
                image: "https://images.unsplash.com/photo-1613912303663-1937e0da292c?q=80&w=800", // Reuse but distinct product context
                createdAt: now
            },

            // Shoes (Category 2)
            {
                name: "Astrex Gravity Elite III",
                description: "Power cushion technology with lateral stability for elite court movement.",
                price: 179.99,
                categoryId: insertedCats.insertedIds[2],
                stock: 25,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Court-Flow v2",
                description: "Lightweight, breathable court shoes with non-marking gum rubber soles.",
                price: 129.99,
                categoryId: insertedCats.insertedIds[2],
                stock: 40,
                image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Speed Demon",
                description: "Ultra-light shoes designed for maximum agility and quick movements.",
                price: 159.99,
                categoryId: insertedCats.insertedIds[2],
                stock: 30,
                image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Comfort Pro",
                description: "All-day comfort with superior arch support for recreational players.",
                price: 99.99,
                categoryId: insertedCats.insertedIds[2],
                stock: 50,
                image: "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800",
                createdAt: now
            },

            // Bags (Category 3)
            {
                name: "Astrex Tour Pro 9-Pack Bag",
                description: "Thermal lined racket compartments with dedicated shoe and wet pockets.",
                price: 99.99,
                categoryId: insertedCats.insertedIds[3],
                stock: 15,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Aero Backpack",
                description: "Compact racket backpack for the urban athlete.",
                price: 69.99,
                categoryId: insertedCats.insertedIds[3],
                stock: 30,
                image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Elite 6-Racket Bag",
                description: "Professional tournament bag with multiple compartments.",
                price: 79.99,
                categoryId: insertedCats.insertedIds[3],
                stock: 20,
                image: "https://images.unsplash.com/photo-1493723843689-d6401ca826c3?q=80&w=800", // Generic sport bag (reliable)
                createdAt: now
            },

            // Apparel (Category 4)
            {
                name: "Astrex Performance Tee",
                description: "Moisture-wicking fabric with anti-odor technology.",
                price: 34.99,
                categoryId: insertedCats.insertedIds[4],
                stock: 100,
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Pro Shorts",
                description: "Lightweight shorts with stretch fabric for unrestricted movement.",
                price: 39.99,
                categoryId: insertedCats.insertedIds[4],
                stock: 80,
                image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Training Jacket",
                description: "Breathable windbreaker perfect for warm-ups and cool-downs.",
                price: 79.99,
                categoryId: insertedCats.insertedIds[4],
                stock: 40,
                image: "https://images.unsplash.com/photo-1517466787929-bc90951d6dbb?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Competition Jersey",
                description: "Official tournament jersey with sublimated design.",
                price: 49.99,
                categoryId: insertedCats.insertedIds[4],
                stock: 60,
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Sport Socks (3-Pack)",
                description: "Cushioned athletic socks with arch compression.",
                price: 19.99,
                categoryId: insertedCats.insertedIds[4],
                stock: 150,
                image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800",
                createdAt: now
            },

            // Accessories (Category 5)
            {
                name: "Astrex Wristbands (Pair)",
                description: "Absorbent terry cloth wristbands for sweat management.",
                price: 9.99,
                categoryId: insertedCats.insertedIds[5],
                stock: 200,
                image: "https://images.unsplash.com/photo-1588731234159-8b99631b3fde?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Headband Pro",
                description: "Non-slip silicone grip headband keeps hair and sweat at bay.",
                price: 12.99,
                categoryId: insertedCats.insertedIds[5],
                stock: 150,
                image: "https://images.unsplash.com/photo-1620189507187-1038e47b3952?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Towel Elite",
                description: "Microfiber sports towel with quick-dry technology.",
                price: 24.99,
                categoryId: insertedCats.insertedIds[5],
                stock: 100,
                image: "https://images.unsplash.com/photo-1599474924187-334a405be2fa?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Water Bottle",
                description: "Insulated 750ml bottle keeps drinks cold for 24 hours.",
                price: 29.99,
                categoryId: insertedCats.insertedIds[5],
                stock: 80,
                image: "https://images.unsplash.com/photo-1602143407151-11115cdbf69c?q=80&w=800",
                createdAt: now
            },

            // Grips & Tapes (Category 6)
            {
                name: "Astrex Nano-Grip Pro XL",
                description: "Extreme friction coating for precise handle control. Pack of 12.",
                price: 14.99,
                categoryId: insertedCats.insertedIds[6],
                stock: 500,
                image: "https://images.unsplash.com/photo-1616248249518-b16013cd4e42?q=80&w=800", // Detail usage 1
                createdAt: now
            },
            {
                name: "Astrex Tacky Overgrip",
                description: "Super tacky grip with moisture absorption. Pack of 3.",
                price: 8.99,
                categoryId: insertedCats.insertedIds[6],
                stock: 400,
                image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800", // Detail usage 2
                createdAt: now
            },
            {
                name: "Astrex Towel Grip",
                description: "Cotton towel grip for maximum sweat absorption.",
                price: 6.99,
                categoryId: insertedCats.insertedIds[6],
                stock: 300,
                image: "https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?q=80&w=800", // Detail usage 3
                createdAt: now
            },

            // Strings (Category 7)
            {
                name: "Astrex Titan-String 0.66",
                description: "High-repulsion titanium coated strings for sharp hitting sound.",
                price: 12.99,
                categoryId: insertedCats.insertedIds[7],
                stock: 300,
                image: "https://images.unsplash.com/photo-1616248249518-b16013cd4e42?q=80&w=800", // Detail usage 1
                createdAt: now
            },
            {
                name: "Astrex Power String 0.68",
                description: "Thick gauge string for maximum power and durability.",
                price: 10.99,
                categoryId: insertedCats.insertedIds[7],
                stock: 250,
                image: "https://images.unsplash.com/photo-1617083275225-6248b9d49110?q=80&w=800", // Detail usage 2
                createdAt: now
            },
            {
                name: "Astrex Control String 0.65",
                description: "Thin gauge multifilament for superior control and feel.",
                price: 15.99,
                categoryId: insertedCats.insertedIds[7],
                stock: 200,
                image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800", // Detail usage 3
                createdAt: now
            },
            {
                name: "Astrex Hybrid String 0.69",
                description: "Hybrid construction for durability and repulsion power.",
                price: 13.99,
                categoryId: insertedCats.insertedIds[7],
                stock: 180,
                image: "https://images.unsplash.com/photo-1626225967045-2c390255979d?q=80&w=800", // Detail usage 4
                createdAt: now
            },
            // New Category: Equipment
            {
                name: "Astrex Court Net",
                description: "Professional tournament grade badminton net.",
                price: 89.99,
                categoryId: insertedCats.insertedIds[5], // Accessories
                stock: 10,
                image: "https://images.unsplash.com/photo-1613912303663-1937e0da292c?q=80&w=800",
                createdAt: now
            },
            {
                name: "Astrex Scoreboard",
                description: "Digital scoreboard for tournament play.",
                price: 149.99,
                categoryId: insertedCats.insertedIds[5], // Accessories
                stock: 5,
                image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800",
                createdAt: now
            }
        ];

        await products.insertMany(prods);
        console.log(`Inserted ${prods.length} products across ${cats.length} categories`);
        console.log("Inserted comprehensive Astrex arsenal");
        console.log("Seeding complete with timestamps!");

    } finally {
        await client.close();
    }
}

run().catch(console.dir);
