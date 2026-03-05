/**
 * Cloudinary Migration Script
 * 
 * This script migrates all media from imgix to Cloudinary
 * 
 * SETUP:
 * 1. Install Cloudinary SDK: npm install cloudinary
 * 2. Replace YOUR_CLOUD_NAME, YOUR_API_KEY, YOUR_API_SECRET below
 * 3. Run: node migrate-to-cloudinary.js
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
cloudinary.config({
    cloud_name: 'YOUR_CLOUD_NAME',  // From Cloudinary dashboard
    api_key: 'YOUR_API_KEY',        // From Cloudinary dashboard
    api_secret: 'YOUR_API_SECRET'   // From Cloudinary dashboard
});

// Your current gallery configuration
const galleryConfig = [
    // --- GRAPHICS DESIGN (Batch 1) ---
    { title: "Graphic Art 01", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_2025-05-13_08-20-06.jpg" },
    { title: "Graphic Art 02", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_2025-05-13_08-23-54.jpg" },
    { title: "Graphic Art 03", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_2025-06-07_15-42-05.jpg" },
    { title: "Graphic Art 04", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_2025-05-11_17-48-06.jpg" },
    { title: "Graphic Art 05", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_2025-05-16_17-25-47.jpg" },
    { title: "Graphic Art 06", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_22_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 07", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_20_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 08", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_21_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 09", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_24_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 10", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_23_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 11", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_26_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 12", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_25_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 13", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_27_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 14", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_29_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 15", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_28_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 16", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_30_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 17", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_32_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 18", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_31_2025-12-09_19-59-08.jpg" },
    { title: "Satisfied", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/satisfied.jpg" },
    { title: "CCH 2024", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/cch%202024.jpg" },
    // Add all other items from your gallery config...
];

// ============================================
// MIGRATION LOGIC
// ============================================

async function migrateToCloudinary() {
    console.log('🚀 Starting migration to Cloudinary...\n');

    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < galleryConfig.length; i++) {
        const item = galleryConfig[i];
        const isVideo = item.type === 'video' || item.url.endsWith('.mp4');

        console.log(`[${i + 1}/${galleryConfig.length}] Uploading: ${item.title}...`);

        try {
            // Upload to Cloudinary from remote URL
            const result = await cloudinary.uploader.upload(item.url, {
                resource_type: isVideo ? 'video' : 'image',
                folder: 'portfolio', // Organize in a folder
                public_id: item.title.toLowerCase().replace(/\s+/g, '_'), // Clean filename
                overwrite: false,
                invalidate: true
            });

            console.log(`✅ Success: ${result.secure_url}\n`);

            results.push({
                ...item,
                oldUrl: item.url,
                url: result.secure_url
            });

            successCount++;

        } catch (error) {
            console.error(`❌ Failed: ${item.title}`);
            console.error(`   Error: ${error.message}\n`);

            results.push({
                ...item,
                oldUrl: item.url,
                url: item.url, // Keep old URL
                error: error.message
            });

            failCount++;
        }

        // Rate limiting - wait 500ms between uploads
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // ============================================
    // GENERATE NEW GALLERY CONFIG
    // ============================================

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log('='.repeat(50) + '\n');

    // Generate new JavaScript config
    const newConfig = `const galleryConfig = ${JSON.stringify(results.map(item => ({
        title: item.title,
        cat: item.cat,
        ...(item.type && { type: item.type }),
        url: item.url,
        ...(item.projectUrl && { projectUrl: item.projectUrl })
    })), null, 4)};`;

    // Save to file
    fs.writeFileSync('gallery-config-new.js', newConfig);
    console.log('📝 New gallery config saved to: gallery-config-new.js');

    // Save detailed results
    fs.writeFileSync('migration-results.json', JSON.stringify(results, null, 2));
    console.log('📊 Detailed results saved to: migration-results.json');
}

// Run migration
migrateToCloudinary().catch(console.error);
