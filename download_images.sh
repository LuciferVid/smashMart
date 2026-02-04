#!/bin/bash
mkdir -p frontend/public/products
cd frontend/public/products

echo "Downloading and Color-Grading Images..."

# --- RACKETS ---
# Phantom X-99 (Black/Gold style) -> High concern, desaturated, warm tint
curl -L -o racket_x99.jpg "https://images.unsplash.com/photo-1616248249518-b16013cd4e42?q=80&w=600&sat=-100&con=40&sepia=30"

# Stealth 700 (Blue style) -> Hue rotation to shift colors to cool/blue
curl -L -o racket_stealth.jpg "https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?q=80&w=600&hue=180&sat=20"

# Velocity Pro (Red/Energetic) -> High saturation, warm hue
curl -L -o racket_velocity.jpg "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&hue=30&sat=50"

# Thunder Strike (Power/Dark) -> Dark contrast
curl -L -o racket_thunder.jpg "https://images.unsplash.com/photo-1617083275225-6248b9d49110?q=80&w=600&con=50&sat=-50"

# Precision Elite (Standard/Pro) -> Clean
curl -L -o racket_precision.jpg "https://images.unsplash.com/photo-1626225967045-2c390255979d?q=80&w=600"

# --- SHUTTLES ---
# Feather (Classic)
curl -L -o shuttle_feather.jpg "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=600"
# Nylon (Synthetic look) -> Cool tone
curl -L -o shuttle_nylon.jpg "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=600&hue=180"
# Gold (Premium) -> Warm/Sepia
curl -L -o shuttle_gold.jpg "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=600&sepia=50&sat=20"

# --- SHOES ---
# Gravity (Blue/Tech)
curl -L -o shoe_gravity.jpg "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&hue=180"
# Court (Red/Speed)
curl -L -o shoe_court.jpg "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&hue=0"
# Speed (Green/Neon)
curl -L -o shoe_speed.jpg "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&hue=90"
# Comfort (White/Clean)
curl -L -o shoe_comfort.jpg "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=600"

# --- BAGS ---
curl -L -o bag_tour.jpg "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600"
curl -L -o bag_backpack.jpg "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600"
curl -L -o bag_duffel.jpg "https://images.unsplash.com/photo-1493723843689-d6401ca826c3?q=80&w=600"

# --- APPAREL ---
curl -L -o app_tee.jpg "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600"
curl -L -o app_shorts.jpg "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600"
curl -L -o app_jacket.jpg "https://images.unsplash.com/photo-1517466787929-bc90951d6dbb?q=80&w=600"
curl -L -o app_jersey.jpg "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600"
curl -L -o app_socks.jpg "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=600"

# --- ACCESSORIES ---
curl -L -o acc_wrist.jpg "https://images.unsplash.com/photo-1620189507187-1038e47b3952?q=80&w=600"
curl -L -o acc_head.jpg "https://images.unsplash.com/photo-1588731234159-8b99631b3fde?q=80&w=600"
curl -L -o acc_towel.jpg "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&crop=entropy&h=600"
curl -L -o acc_bottle.jpg "https://images.unsplash.com/photo-1602143407151-11115cdbf69c?q=80&w=600"

# --- GRIPS/STRINGS ---
curl -L -o grip_nano.jpg "https://images.unsplash.com/photo-1616248249518-b16013cd4e42?q=80&w=600"
curl -L -o grip_tacky.jpg "https://images.unsplash.com/photo-1616248249518-b16013cd4e42?q=80&w=600&hue=90"
curl -L -o str_titan.jpg "https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?q=80&w=600&crop=entropy&h=600"
curl -L -o str_power.jpg "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&crop=entropy&h=600"

echo "Images Downloaded Successfully."
