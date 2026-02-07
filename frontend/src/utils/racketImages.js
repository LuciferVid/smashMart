/**
 * Your uploaded product images in public/images – used for these products everywhere.
 */
export const RACKET_IMAGES = {
    'Astrex Phantom X-99 Ultra': '/images/racket-yonex-blue.png',
    'Astrex Stealth 700': '/images/racket-mizuno-fortius.png',
    'Astrex Velocity Pro': '/images/racket-nanospeed-nuclear75.png',
    'Astrex Thunder Strike': '/images/racket-yonex-teal.png',
    'Astrex Precision Elite': '/images/racket-black-green.png',
};

export const SHUTTLE_IMAGES = {
    'Astrex Orbital v.50 Pro': '/images/shuttle-leijiaer-tube.png',
    'Astrex Aero-Sync Nylon': '/images/shuttle-kunli.png',
    'Astrex Tournament Gold': '/images/shuttle-mavis-350.png',
    'Astrex Practice Pack': '/images/shuttle-neon-yellow.png',
};

export const BAG_IMAGES = {
    'Astrex Tour Pro 9-Pack Bag': '/images/bag-victor.png',
    'Astrex Aero Backpack': '/images/bag-lining-badminton.png',
    'Astrex Elite 6-Racket Bag': '/images/bag-mizuno.png',
};

export const SHOE_IMAGES = {
    'Astrex Gravity Elite III': '/images/shoe-yonex-aerus.png',
    'Astrex Court-Flow v2': '/images/shoe-yonex-blue.png',
    'Astrex Speed Demon': '/images/shoe-yonex-red.png',
    'Astrex Comfort Pro': '/images/shoe-yonex-white-orange.png',
};

export const STRING_IMAGES = {
    'Astrex Titan-String 0.66': '/images/string-lining-rebound.png',
    'Astrex Power String 0.68': '/images/string-yonex-exbolt65.png',
    'Astrex Pro String 0.65': '/images/string-hundred-magnite.png',
    'Astrex Boost String 0.66': '/images/string-hundred-boost.png',
    'Astrex Hybrid String 0.69': '/images/string-hybrid-069.png',
    'Astrex Control String 0.65': '/images/string-control-065.png',
};

export const GRIP_IMAGES = {
    'Astrex Nano-Grip Pro XL': '/images/grip-head-overgrips.png',
    'Astrex Tacky Overgrip': '/images/grip-yonex-tape.png',
    'Astrex Pro Towel Grip': '/images/grip-towel-red.png',
    'Astrex Towel Grip': '/images/grip-towel-red.png',
};

export const ACCESSORY_IMAGES = {
    'Astrex Wristbands (Pair)': '/images/acc-wristbands.png',
    'Astrex Headband Pro': '/images/acc-headband.png',
    'Astrex Towel Elite': '/images/acc-towel.png',
    'Astrex Water Bottle': '/images/acc-water-bottle.png',
    'Astrex Court Net': '/images/acc-net.png',
    'Astrex Scoreboard': '/images/acc-scoreboard.png',
};

export const APPAREL_IMAGES = {
    'Astrex Performance Tee': '/images/apparel-perfly-white-teal.png',
    'Astrex Pro Shorts': '/images/apparel-yonex-navy-orange.png',
    'Astrex Training Jacket': '/images/apparel-yonex-blue.png',
    'Astrex Competition Jersey': '/images/apparel-yonex-red.png',
    'Astrex Sport Socks (3-Pack)': '/images/apparel-sport-socks.png',
};

const PRODUCT_IMAGES = { ...RACKET_IMAGES, ...SHUTTLE_IMAGES, ...BAG_IMAGES, ...SHOE_IMAGES, ...STRING_IMAGES, ...GRIP_IMAGES, ...ACCESSORY_IMAGES, ...APPAREL_IMAGES };

export function getProductImage(product) {
    if (!product) return null;
    const name = product.name || product.title;
    return PRODUCT_IMAGES[name] || product.image || null;
}
