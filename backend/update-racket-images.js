const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const RACKET_IMAGE_UPDATES = [
  { name: 'Astrex Phantom X-99 Ultra', image: '/images/racket-yonex-blue.png' },
  { name: 'Astrex Stealth 700', image: '/images/racket-mizuno-fortius.png' },
  { name: 'Astrex Velocity Pro', image: '/images/racket-nanospeed-nuclear75.png' },
  { name: 'Astrex Thunder Strike', image: '/images/racket-yonex-teal.png' },
  { name: 'Astrex Precision Elite', image: '/images/racket-black-green.png' },
];

const SHUTTLE_IMAGE_UPDATES = [
  { name: 'Astrex Orbital v.50 Pro', image: '/images/shuttle-leijiaer-tube.png' },
  { name: 'Astrex Aero-Sync Nylon', image: '/images/shuttle-kunli.png' },
  { name: 'Astrex Tournament Gold', image: '/images/shuttle-mavis-350.png' },
  { name: 'Astrex Practice Pack', image: '/images/shuttle-neon-yellow.png' },
];

const BAG_IMAGE_UPDATES = [
  { name: 'Astrex Tour Pro 9-Pack Bag', image: '/images/bag-victor.png' },
  { name: 'Astrex Aero Backpack', image: '/images/bag-lining-badminton.png' },
  { name: 'Astrex Elite 6-Racket Bag', image: '/images/bag-mizuno.png' },
];

const SHOE_IMAGE_UPDATES = [
  { name: 'Astrex Gravity Elite III', image: '/images/shoe-yonex-aerus.png' },
  { name: 'Astrex Court-Flow v2', image: '/images/shoe-yonex-blue.png' },
  { name: 'Astrex Speed Demon', image: '/images/shoe-yonex-red.png' },
  { name: 'Astrex Comfort Pro', image: '/images/shoe-yonex-white-orange.png' },
];

const STRING_IMAGE_UPDATES = [
  { name: 'Astrex Titan-String 0.66', image: '/images/string-lining-rebound.png' },
  { name: 'Astrex Power String 0.68', image: '/images/string-yonex-exbolt65.png' },
  { name: 'Astrex Pro String 0.65', image: '/images/string-hundred-magnite.png' },
  { name: 'Astrex Boost String 0.66', image: '/images/string-hundred-boost.png' },
  { name: 'Astrex Hybrid String 0.69', image: '/images/string-hybrid-069.png' },
  { name: 'Astrex Control String 0.65', image: '/images/string-control-065.png' },
];

const GRIP_IMAGE_UPDATES = [
  { name: 'Astrex Nano-Grip Pro XL', image: '/images/grip-head-overgrips.png' },
  { name: 'Astrex Tacky Overgrip', image: '/images/grip-yonex-tape.png' },
  { name: 'Astrex Pro Towel Grip', image: '/images/grip-towel-red.png' },
  { name: 'Astrex Towel Grip', image: '/images/grip-towel-red.png' },
];

const ACCESSORY_IMAGE_UPDATES = [
  { name: 'Astrex Wristbands (Pair)', image: '/images/acc-wristbands.png' },
  { name: 'Astrex Headband Pro', image: '/images/acc-headband.png' },
  { name: 'Astrex Towel Elite', image: '/images/acc-towel.png' },
  { name: 'Astrex Water Bottle', image: '/images/acc-water-bottle.png' },
  { name: 'Astrex Court Net', image: '/images/acc-net.png' },
  { name: 'Astrex Scoreboard', image: '/images/acc-scoreboard.png' },
];

const APPAREL_IMAGE_UPDATES = [
  { name: 'Astrex Performance Tee', image: '/images/apparel-perfly-white-teal.png' },
  { name: 'Astrex Pro Shorts', image: '/images/apparel-yonex-navy-orange.png' },
  { name: 'Astrex Training Jacket', image: '/images/apparel-yonex-blue.png' },
  { name: 'Astrex Competition Jersey', image: '/images/apparel-yonex-red.png' },
  { name: 'Astrex Sport Socks (3-Pack)', image: '/images/apparel-sport-socks.png' },
];

const ALL_UPDATES = [...RACKET_IMAGE_UPDATES, ...SHUTTLE_IMAGE_UPDATES, ...BAG_IMAGE_UPDATES, ...SHOE_IMAGE_UPDATES, ...STRING_IMAGE_UPDATES, ...GRIP_IMAGE_UPDATES, ...ACCESSORY_IMAGE_UPDATES, ...APPAREL_IMAGE_UPDATES];

async function run() {
  try {
    console.log('Connecting to database...');
    let updated = 0;
    
    for (const { name, image } of ALL_UPDATES) {
      const prod = await prisma.product.findFirst({
        where: { name }
      });

      if (prod) {
        await prisma.product.update({
          where: { id: prod.id },
          data: { image }
        });
        console.log(`Updated: ${name} -> ${image}`);
        updated++;
      } else {
        console.log(`Not found in DB: ${name}`);
      }
    }

    console.log(`Done. Synchronized ${updated} premium product images.`);
  } catch (e) {
    console.error('Synchronization failed: ', e);
  } finally {
    await prisma.$disconnect();
  }
}

run();
