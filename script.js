// Samsco Portfolio - Main Script

// Force scroll to top on page load/reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Safe GSAP Registration
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
} else {
    console.warn("GSAP not loaded. Some animations will be disabled.");
}

// ... (rest of code) ...

// --- 1. HERO ROTATOR ---
const words = [
    { top: "VISION", bottom: "ENGINEERED" },
    { top: "REALITY", bottom: "RENDERED" },
    { top: "DIGITAL", bottom: "ALCHEMY" },
    { top: "LOGIC", bottom: "DEFYING" },
    { top: "ART", bottom: "INTELLIGENT" }
];

let currentIndex = 0;
const topText = document.getElementById("hero-word-1");
const bottomText = document.getElementById("hero-word-2");

let isTabActive = true;
document.addEventListener("visibilitychange", () => {
    isTabActive = !document.hidden;
});

function rotateText() {
    if (!isTabActive) return;

    currentIndex = (currentIndex + 1) % words.length;
    const nextWord = words[currentIndex];

    gsap.to([topText, bottomText], {
        yPercent: -120, opacity: 0,
        duration: 0.8, ease: "power3.in", stagger: 0.08,
        onComplete: () => {
            topText.innerText = nextWord.top;
            bottomText.innerText = nextWord.bottom;
            gsap.set([topText, bottomText], { yPercent: 120, opacity: 0 });
            gsap.to([topText, bottomText], {
                yPercent: 0, opacity: 1,
                duration: 0.9, ease: "power3.out", stagger: 0.08
            });
        }
    });
}

// --- 2. EASY ACCESS GALLERY CONFIGURATION ---
const galleryConfig = [
    // --- GRAPHICS DESIGN (Local Files from assets/Graphics Design/) ---
    { title: "Graphic Art 01", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (1).jpg" },
    { title: "Graphic Art 02", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (2).jpg" },
    { title: "Graphic Art 03", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (3).jpg" },
    { title: "Graphic Art 04", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (4).jpg" },
    { title: "Graphic Art 05", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (5).jpg" },
    { title: "Graphic Art 06", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (6).jpg" },
    { title: "Graphic Art 07", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (7).jpg" },
    { title: "Graphic Art 08", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (8).jpg" },
    { title: "Graphic Art 09", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (9).jpg" },
    { title: "Graphic Art 10", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (10).jpg" },
    { title: "Graphic Art 11", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (11).jpg" },
    { title: "Graphic Art 12", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (12).jpg" },
    { title: "Graphic Art 13", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (13).jpg" },
    { title: "Graphic Art 14", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (14).jpg" },
    { title: "Graphic Art 15", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (15).jpg" },
    { title: "Graphic Art 16", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (16).jpg" },
    { title: "Graphic Art 17", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (17).jpg" },
    { title: "Graphic Art 18", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (18).jpg" },
    { title: "Graphic Art 19", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (19).avif" },
    { title: "Graphic Art 20", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (20).avif" },
    { title: "Graphic Art 21", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (21).jpg" },
    { title: "Graphic Art 22", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (22).jpg" },
    { title: "Graphic Art 23", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (23).jpg" },
    { title: "Graphic Art 24", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (24).jpg" },
    { title: "Graphic Art 25", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (25).jpg" },
    { title: "Graphic Art 26", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (26).jpg" },
    { title: "Graphic Art 27", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (27).jpg" },
    { title: "Graphic Art 28", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (28).jpg" },
    { title: "Graphic Art 29", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (29).jpg" },
    { title: "Graphic Art 30", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (30).jpg" },
    { title: "Graphic Art 31", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (31).jpg" },
    { title: "Graphic Art 32", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (32).jpg" },
    { title: "Graphic Art 33", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (33).jpg" },
    { title: "Graphic Art 34", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (34).jpg" },
    { title: "Graphic Art 35", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (35).jpg" },
    { title: "Graphic Art 36", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (36).jpg" },
    { title: "Graphic Art 37", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (37).jpg" },
    { title: "Graphic Art 38", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (38).jpg" },
    { title: "Graphic Art 39", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (39).jpg" },
    { title: "Graphic Art 40", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (40).jpg" },
    { title: "Graphic Art 41", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (41).jpg" },
    { title: "Graphic Art 42", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (42).jpg" },
    { title: "Graphic Art 43", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (43).jpg" },
    { title: "Graphic Art 44", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (44).jpg" },
    { title: "Graphic Art 45", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (45).jpg" },
    { title: "Graphic Art 46", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (46).jpg" },
    { title: "Graphic Art 47", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (47).jpg" },
    { title: "Graphic Art 48", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (48).jpg" },
    { title: "Graphic Art 49", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (49).jpg" },
    { title: "Graphic Art 50", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (50).jpg" },
    { title: "Graphic Art 51", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (51).jpg" },
    { title: "Graphic Art 52", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (52).jpg" },
    { title: "Graphic Art 53", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (53).jpg" },
    { title: "Graphic Art 54", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (54).jpg" },
    { title: "Graphic Art 55", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (55).jpg" },
    { title: "Graphic Art 56", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (56).jpg" },
    { title: "Graphic Art 57", cat: "Graphics Design", url: "./assets/Graphics Design/Graphics (57).png" },

    // --- VIDEO (3D & VFX) ---
    { title: "VFX Intro Reel", cat: "3D & VFX", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769428630/VFX_Intro_Reel_l0fmqw.mp4" },
    { title: "iPad Air 2023", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/iPad Air 2023.mp4" },
    { title: "3D Headset", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/3D Headset.mp4" },
    { title: "Random Render A", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/Random Render A.mp4" },
    { title: "Minimie Ad Concept", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/Minimie Ad Concept.mp4" },
    { title: "Character FX Simulation", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/Character FX Simulation.mp4" },
    { title: "VFX Car Shot", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/VFX Car Shot.mp4" },
    { title: "Instagram VFX", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/Instagram VFX.mp4" },
    { title: "Random Render B", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/Random Render B.mp4" },
    { title: "Product Commercial Exam", cat: "3D & VFX", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769433928/Product_Commercial_Exam_gmlyp0.mp4" },
    { title: "3D Animation Sequence", cat: "3D & VFX", type: "video", url: "./assets/3D & VFX/0001-0148.mp4" },
    { title: "Car VFX Still", cat: "3D & VFX", url: "./assets/3D & VFX/Car VFX Still.jpg" },

    // --- VIDEO EDITING ---
    { title: "Hypo Ad Campaign", cat: "Video Editing", type: "video", url: "./assets/Video Editing/Hypo Ad Campaign.mp4" },
    { title: "Situation of Nigeria 2024", cat: "Video Editing", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769427459/Situation_of_Nigeria_2024_evmjxy.mp4" },
    { title: "Na Hunger Cause Am", cat: "Video Editing", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769395474/Na_Hunger_Cause_Am_yhhgje.mp4" },
    { title: "The Pen Skit", cat: "Video Editing", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769396398/The_Pen_Skit_ierx9y.mp4" },
    { title: "POV: Maths Teacher", cat: "Video Editing", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769427423/POV_Maths_Teacher_r5p696.mp4" },
    { title: "La La Land Skit", cat: "Video Editing", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769420831/La_La_Land_Skit_w14v8x.mp4" },
    { title: "Enter Me", cat: "Video Editing", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769426290/Enter_Me_r3lqgk.mp4" },
    { title: "100 Level News Project😂👌", cat: "Video Editing", type: "video", url: "https://res.cloudinary.com/deacdvqxk/video/upload/v1769373338/100_Level_News_Project_oybl61.mp4" },
    { title: "PRE327 Video Project", cat: "Video Editing", type: "video", url: "./assets/Video Editing/PRE327 PROJECT.mp4" },
    // --- AI GENERATION ---
    { title: "AI Animation 1", cat: "AI", type: "video", url: "./assets/AI/AI Animation 1.mp4" },
    { title: "AI Animation 2", cat: "AI", type: "video", url: "./assets/AI/AI Animation 2.mp4" },
    { title: "A Guy Trying", cat: "AI", type: "video", url: "./assets/AI/A Guy Trying.mp4" },
    { title: "PRE327 AI Project", cat: "AI", type: "video", url: "./assets/AI/PRE327 PROJECT.mp4" },


    // --- CODING & DATA ANALYTICS ---
    // (No items yet - add when content is available)

    // --- WEBSITES ---
    { title: "Sweet Touch Ventures", cat: "Website", url: "https://image.thum.io/get/width/800/crop/800/https://sweettouchventures.vercel.app/", projectUrl: "https://sweettouchventures.vercel.app/" },
    { title: "Samsco Portfolio v1", cat: "Website", url: "https://image.thum.io/get/width/800/crop/800/https://samsco.vercel.app/", projectUrl: "https://samsco.vercel.app/" },
    { title: "RCCG Faith Tabernacle", cat: "Website", url: "https://image.thum.io/get/width/800/crop/800/https://rccgparish.wixsite.com/rccgfaithtabernacle", projectUrl: "https://rccgparish.wixsite.com/rccgfaithtabernacle" },

    // --- SOCIAL MANAGEMENT ---
    { title: "TforTrendz YouTube", cat: "Social Management", url: "./assets/Social Management/tfortrendz-thumbnail.png", projectUrl: "https://www.youtube.com/@TforTrendz", stats: { subscribers: "100+", views: "95K", videos: "85+" } }
];

const galleryCategories = ["Graphics Design", "3D & VFX", "Video Editing", "Coding & Data Analytics", "AI", "Website", "Social Management"];

// --- 3. DYNAMIC GALLERY & FILTER GENERATOR ---
const galleryGrid = document.getElementById('gallery-grid-content');
const filterContainer = document.getElementById('vault-filters');

let currentFilter = 'ALL';
let galleryItems = [];
let visibleGalleryItems = [];
let galleryInitialized = false;
let filtersInitialized = false;

// Filter category colors
const categoryColors = {
    'ALL': '#0071e3',
    'Graphics Design': '#0071e3',
    '3D & VFX': '#bf5af2',
    'Video Editing': '#ff375f',
    'Coding & Data Analytics': '#30d158',
    'AI': '#ff9f0a',
    'Website': '#06b6d4',
    'Social Management': '#ec4899'
};

// Initialize Vault Filter Buttons
function initVaultFilters() {
    if (filtersInitialized || !filterContainer) return;

    // Clear any existing buttons
    filterContainer.innerHTML = '';

    const allCategories = ["ALL", ...galleryCategories];

    allCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.setAttribute('data-filter', cat);
        btn.className = 'vault-filter-btn';

        const catColor = categoryColors[cat] || '#0071e3';

        // Apply base styles
        applyFilterButtonStyles(btn, cat === 'ALL', catColor);

        // Click handler
        btn.addEventListener('click', function () {
            handleFilterClick(this, cat);
        });

        filterContainer.appendChild(btn);
    });

    filtersInitialized = true;
}

// Apply styles to filter button
function applyFilterButtonStyles(btn, isActive, catColor) {
    btn.style.cssText = `
        padding: 10px 20px;
        border-radius: 9999px;
        border: 1px solid ${isActive ? catColor : 'rgba(255,255,255,0.2)'};
        background: ${isActive ? catColor : 'rgba(255,255,255,0.05)'};
        color: ${isActive ? '#fff' : 'rgba(255,255,255,0.7)'};
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.05em;
        cursor: pointer;
        margin: 4px;
        transition: all 0.3s ease;
        outline: none;
        flex-shrink: 0;
    `;

    if (isActive) {
        btn.classList.add('active');
    }
}

// Handle filter button click
function handleFilterClick(clickedBtn, category) {
    const catColor = categoryColors[category] || '#0071e3';

    // Reset all buttons to inactive state
    document.querySelectorAll('#vault-filters .vault-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnCat = btn.getAttribute('data-filter');
        const btnColor = categoryColors[btnCat] || '#0071e3';
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.borderColor = 'rgba(255,255,255,0.2)';
        btn.style.color = 'rgba(255,255,255,0.7)';
    });

    // Set clicked button to active
    clickedBtn.classList.add('active');
    clickedBtn.style.background = catColor;
    clickedBtn.style.borderColor = catColor;
    clickedBtn.style.color = '#fff';

    // Update current filter
    currentFilter = category;

    // Filter gallery items with animation
    filterGalleryItems(category);
}

// Filter gallery items based on category
function filterGalleryItems(category) {
    const items = document.querySelectorAll('.gallery-item');

    if (items.length === 0) return;

    // Update visible items array
    visibleGalleryItems = [];

    items.forEach(item => {
        const itemCat = item.getAttribute('data-cat');
        const shouldShow = category === 'ALL' || itemCat === category;

        if (shouldShow) {
            visibleGalleryItems.push(item);
            item.style.display = 'block';
            gsap.to(item, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap.to(item, {
                scale: 0.85,
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    item.style.display = 'none';
                }
            });
        }
    });

    // Refresh any scroll triggers
    if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 350);
    }
}

// Initialize filters when DOM is ready
if (filterContainer) {
    initVaultFilters();
}

// Global Error Handlers (Defined explicitly on window)
window.handleGridImageError = function (img) {
    if (!img) return;
    img.onerror = null; // Prevent infinite loops
    img.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80';
};

window.handleGridVideoError = function (video) {
    if (!video) return;
    video.style.display = 'none';
    const fallback = video.nextElementSibling;
    if (fallback) {
        fallback.style.display = 'flex';
        fallback.classList.remove('hidden');
    }
};

// Lazy Load Observer for Gallery Items
const galleryObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            const video = item.querySelector('video');
            const img = item.querySelector('img');

            if (video && video.dataset.src) {
                // Attach error handler BEFORE setting src
                video.onerror = function () {
                    window.handleGridVideoError(this);
                };

                video.src = video.dataset.src;
                video.load();
                video.removeAttribute('data-src');
            }

            if (img && img.dataset.src) {
                // Attach error handler BEFORE setting src
                img.onerror = function () {
                    window.handleGridImageError(this);
                };

                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }

            observer.unobserve(item);
        }
    });
}, { root: document.getElementById('full-gallery-modal'), rootMargin: "200px" });

function initGallery() {
    if (galleryInitialized) return;

    // Clear existing content if any (safety)
    galleryGrid.innerHTML = '';

    const totalItemsToGenerate = galleryConfig.length;

    for (let i = 0; i < totalItemsToGenerate; i++) {
        const configItem = galleryConfig[i];
        const cat = configItem.cat;
        const isVideo = configItem.type === 'video' || configItem.url.endsWith('.mp4');

        const item = document.createElement('div');
        item.className = 'gallery-item relative bg-gray-900/50 rounded-xl overflow-hidden group cursor-pointer';

        item.setAttribute('data-index', i);
        item.setAttribute('data-title', `${configItem.title}`);
        item.setAttribute('data-cat', cat);
        item.setAttribute('data-type', isVideo ? 'video' : 'image');
        item.setAttribute('data-url', configItem.url);

        let mediaContent = '';
        let cleanUrl = configItem.url.split('?')[0];
        let thumbUrl = cleanUrl;

        if (configItem.url.includes('imgix.net')) {
            thumbUrl = cleanUrl + "?w=400&q=40&auto=format";
        }

        // Get category color
        const catColors = {
            'Graphics Design': '#0071e3',
            '3D & VFX': '#bf5af2',
            'Video Editing': '#ff375f',
            'Coding & Data Analytics': '#30d158',
            'AI': '#ff9f0a',
            'Website': '#06b6d4',
            'Social Management': '#ff375f'
        };
        const catColor = catColors[cat] || '#0071e3';

        if (configItem.projectUrl) {
            item.setAttribute('data-project-url', configItem.projectUrl);
        }

        if (isVideo) {
            // No inline onerror, handled in observer
            mediaContent = `<video data-src="${configItem.url}" muted loop playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()" class="w-full h-full object-cover"></video>
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 hidden pointer-events-none">
                <span class="text-2xl mb-2">⚠️</span>
                <span class="text-white/50 text-xs font-mono">Video Unavailable</span>
            </div>`;
        } else {
            // No inline onerror, handled in observer
            mediaContent = `<img data-src="${thumbUrl}" loading="lazy" alt="${configItem.title}" class="w-full h-full object-cover">`;
        }

        item.innerHTML = `
            ${mediaContent}
            <div class="category-badge" style="color: ${catColor}; border-color: ${catColor}30;">${cat}</div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 pointer-events-none z-10">
                <h4 class="text-white text-sm md:text-base font-bold leading-tight">${configItem.title}</h4>
                <span class="text-xs mt-1 font-medium" style="color: ${catColor}">${cat}</span>
            </div>
        `;
        galleryGrid.appendChild(item);
        galleryObserver.observe(item);
    }

    visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    galleryInitialized = true;

    // Add global click handler for items (since they are now dynamic)
    document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
            openLightbox(item);
        });
    });
}

// --- 4. GALLERY MODAL LOGIC ---
const galleryModal = document.getElementById('full-gallery-modal');
const openGalleryBtns = [document.getElementById('open-gallery-hero'), document.getElementById('open-gallery-main')];
const closeGalleryBtn = document.getElementById('close-gallery');

openGalleryBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            // Initialize filters first
            initVaultFilters();
            // Initialize gallery content
            initGallery();

            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            gsap.fromTo(".gallery-item",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, delay: 0.1 }
            );
        });
    }
});

closeGalleryBtn.addEventListener('click', () => {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// --- 5. LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox-modal');
const lbImg = document.getElementById('lightbox-img');
const lbVideo = document.getElementById('lightbox-video');
const lbTitle = document.getElementById('lightbox-title');
const lbCat = document.getElementById('lightbox-cat');
const lbError = document.getElementById('lightbox-error'); // Updated to use ID
let currentLbIndex = 0;

const allGalleryItems = document.querySelectorAll('.gallery-item');
allGalleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        openLightbox(item);
    });
});

function openLightbox(clickedItem) {
    currentLbIndex = visibleGalleryItems.indexOf(clickedItem);
    updateLightboxContent();
    lightbox.classList.add('active');
}

function updateLightboxContent() {
    if (currentLbIndex < 0 || currentLbIndex >= visibleGalleryItems.length) return;

    // Reset State
    lbImg.classList.add('hidden');
    lbVideo.classList.add('hidden');
    lbError.classList.add('hidden');

    // Clear previous sources to stop playing
    lbVideo.src = "";
    lbImg.src = "";

    const item = visibleGalleryItems[currentLbIndex];
    let rawUrl = item.getAttribute('data-url');
    let url = rawUrl.split('?')[0];

    const type = item.getAttribute('data-type');
    const title = item.getAttribute('data-title');
    const cat = item.getAttribute('data-cat');

    lbTitle.innerText = title;
    lbCat.innerText = cat;

    if (type === 'video') {
        lbVideo.classList.remove('hidden');
        lbVideo.src = rawUrl;

        // Error handling
        lbVideo.onerror = function () {
            lbVideo.style.display = 'none'; // Ensure hidden
            lbVideo.classList.add('hidden');
            lbError.classList.remove('hidden');
            lbError.style.display = 'flex'; // Ensure flex
        };

        // If it works, play
        lbVideo.oncanplay = function () {
            lbVideo.style.display = 'block';
            lbVideo.play();
        };

        // Force load to trigger error if bad
        lbVideo.load();

    } else {
        lbImg.classList.remove('hidden');
        if (url.includes('imgix.net')) {
            url += "?w=1200&q=75&auto=format";
        }
        lbImg.src = url;

        lbImg.onerror = function () {
            lbImg.classList.add('hidden');
            lbError.classList.remove('hidden');
            lbError.style.display = 'flex';
        };
    }

    // Handle Project Link Button
    const projectUrl = item.getAttribute('data-project-url');
    let linkBtn = document.getElementById('lightbox-link-btn');

    if (projectUrl) {
        if (!linkBtn) {
            // Create button if it doesn't exist
            linkBtn = document.createElement('a');
            linkBtn.id = 'lightbox-link-btn';
            linkBtn.className = 'mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/30';
            linkBtn.target = '_blank';
            linkBtn.rel = 'noopener noreferrer';
            linkBtn.innerHTML = `
                <span>Visit Project</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            `;
            // Append after title section
            lbCat.parentNode.appendChild(linkBtn);
        }
        linkBtn.href = projectUrl;
        linkBtn.style.display = 'inline-flex';
    } else {
        if (linkBtn) linkBtn.style.display = 'none';
    }
}


function nextLightboxItem() {
    currentLbIndex = (currentLbIndex + 1) % visibleGalleryItems.length;
    updateLightboxContent();
}

function prevLightboxItem() {
    currentLbIndex = (currentLbIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
    updateLightboxContent();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lbVideo.pause();
    lbVideo.currentTime = 0;
    lbVideo.src = "";
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-next').addEventListener('click', nextLightboxItem);
document.getElementById('lightbox-prev').addEventListener('click', prevLightboxItem);

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); nextLightboxItem(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); prevLightboxItem(); }
    if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
});

// --- 6. FLUID TEXT ANIMATION SYSTEM ---
// Premium entrance animations with smooth easing
gsap.utils.toArray('.anim-heading').forEach(text => {
    gsap.to(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 85%",
            once: true
        },
        y: 0, opacity: 1, duration: 1.2, ease: "expo.out"
    });
});

gsap.utils.toArray('.anim-text').forEach(text => {
    gsap.to(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 90%",
            once: true
        },
        y: 0, opacity: 1, duration: 1, ease: "power4.out"
    });
});

gsap.utils.toArray('.anim-stagger').forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true
        },
        y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: "back.out(1.2)"
    });
});


// --- 7. STANDARD UI INTERACTIONS ---
const bubble = document.getElementById("identity-bubble");
const trigger = document.querySelector(".identity-trigger");
const identities = ["Aiyedun Samuel", "Visual Engineer", "Samsco Personal"];
let idIndex = 0;
let idInterval;

if (trigger && bubble) {
    trigger.addEventListener("mouseenter", () => {
        idInterval = setInterval(() => {
            idIndex = (idIndex + 1) % identities.length;
            bubble.innerText = identities[idIndex];
        }, 1500);
    });
    trigger.addEventListener("mouseleave", () => {
        clearInterval(idInterval);
        bubble.innerText = "Aiyedun Samuel";
    });
}

// --- 8. CIRCULAR 3D WHEEL LOGIC ---
const wheelStage = document.getElementById('wheel-stage');
const circularWheel = document.getElementById('circular-wheel');
const wheelCards = document.querySelectorAll('.wheel-card');
const detailsPanel = document.getElementById('wheel-details-panel');

// Details Elements
const wdTitle = document.getElementById('wd-title');
const wdCat = document.getElementById('wd-category');
const wdDesc = document.getElementById('wd-desc');
const wdClient = document.getElementById('wd-client');
const wdYear = document.getElementById('wd-year');
const wdTags = document.getElementById('wd-tags');

if (circularWheel && wheelCards.length > 0) {

    // 1. POSITION CARDS IN CIRCLE - Larger wheel (700px), half off-screen
    const radius = 280; // px - Larger radius for the bigger wheel
    const wheelCenter = 350; // Center of 700px wheel
    const totalCards = wheelCards.length;
    const angleStep = 360 / totalCards;

    // Position cards around the circle
    // 0 degrees = right side (visible), 180 degrees = left side (off-screen)
    wheelCards.forEach((card, index) => {
        const angle = index * angleStep;
        const radian = (angle * Math.PI) / 180;

        // Position relative to wheel center
        const x = wheelCenter + radius * Math.cos(radian);
        const y = wheelCenter + radius * Math.sin(radian);

        gsap.set(card, {
            left: x,
            top: y,
            xPercent: -50,
            yPercent: -50
        });

        // Store the initial angle on the card for selection calculation
        card.dataset.initialAngle = angle;
    });

    // 2. SCROLL TRIGGER ROTATION (Optimized for performance)
    gsap.to(circularWheel, {
        rotation: 360,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
            trigger: "#portfolio",
            pin: true,
            start: "top top",
            end: "+=1500", // Shorter scroll distance
            scrub: 0.5, // Lighter scrub for better performance
            anticipatePin: 1, // Avoid flashing/disappearing on rapid scrolls
            invalidateOnRefresh: true, // Recalculate on resize
            onUpdate: (self) => {
                const wheelRotation = self.progress * 360;
                updateActiveCard(wheelRotation);
            }
        }
    });


    // 3. DETECT ACTIVE CARD - Find which card is at the pointer (right side = 0 degrees)
    let lastActiveIndex = -1;

    function updateActiveCard(wheelRotation) {
        // The pointer is at 0 degrees (right side)
        // As wheel rotates, cards move. We need to find which card is now at 0 degrees.
        // Card's current angle = initial angle + wheel rotation
        // Card is at pointer when current angle ≡ 0 (mod 360)
        // So: initial angle + rotation ≡ 0 (mod 360)
        // initial angle ≡ -rotation (mod 360)

        let targetAngle = ((-wheelRotation % 360) + 360) % 360;

        // Find closest card to this angle
        let closestIndex = 0;
        let minDiff = 360;

        wheelCards.forEach((card, i) => {
            const cardAngle = parseFloat(card.dataset.initialAngle);
            let diff = Math.abs(cardAngle - targetAngle);
            if (diff > 180) diff = 360 - diff; // Handle wraparound

            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        });

        if (closestIndex !== lastActiveIndex) {
            updateDetails(closestIndex);
            highlightCard(closestIndex);
            lastActiveIndex = closestIndex;
        }
    }

    function highlightCard(index) {
        wheelCards.forEach((card, i) => {
            if (i === index) {
                // Active card - pop out with glow
                gsap.to(card, {
                    scale: 1.25,
                    filter: "brightness(1.1) drop-shadow(0 0 20px rgba(59,130,246,0.5))",
                    zIndex: 10,
                    borderColor: "#3b82f6",
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            } else {
                // Inactive cards - fade back
                gsap.to(card, {
                    scale: 0.85,
                    filter: "brightness(0.4) grayscale(0.3)",
                    zIndex: 1,
                    borderColor: "rgba(255,255,255,0.1)",
                    duration: 0.4,
                    ease: "power3.out"
                });
            }
        });
    }

    // Smooth crossfade transition for details
    let isAnimating = false;

    function updateDetails(index) {
        const card = wheelCards[index];
        if (!card || isAnimating) return;

        isAnimating = true;

        const data = {
            title: card.getAttribute('data-title'),
            cat: card.getAttribute('data-category'),
            client: card.getAttribute('data-client'),
            year: card.getAttribute('data-year'),
            desc: card.getAttribute('data-desc'),
            tags: card.getAttribute('data-tags').split(',')
        };

        // Create a smooth crossfade timeline
        const tl = gsap.timeline({
            onComplete: () => { isAnimating = false; }
        });

        // Fade out current content smoothly
        tl.to([wdTitle, wdCat], {
            opacity: 0,
            x: -20,
            duration: 0.2,
            ease: "power2.in",
            stagger: 0.03
        })
            .to([wdClient, wdYear, wdDesc], {
                opacity: 0,
                duration: 0.15,
                ease: "power2.in"
            }, "<0.05")
            .to(wdTags, {
                opacity: 0,
                duration: 0.1,
                ease: "power2.in"
            }, "<")
            // Update content
            .call(() => {
                wdTitle.innerText = data.title;
                wdCat.innerText = data.cat;
                wdClient.innerText = data.client || "Private";
                wdYear.innerText = data.year || "2024";
                wdDesc.innerText = data.desc;

                wdTags.innerHTML = '';
                data.tags.forEach((tag) => {
                    const s = document.createElement('span');
                    s.className = "px-3 py-1 bg-white/10 border border-white/5 rounded-full text-xs text-blue-300";
                    s.innerText = tag.trim();
                    wdTags.appendChild(s);
                });
            })
            // Fade in new content smoothly
            .to([wdTitle, wdCat], {
                opacity: 1,
                x: 0,
                duration: 0.35,
                ease: "expo.out",
                stagger: 0.05
            })
            .to([wdClient, wdYear], {
                opacity: 1,
                duration: 0.25,
                ease: "power2.out"
            }, "<0.1")
            .to(wdDesc, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, "<0.05")
            .to(wdTags, {
                opacity: 1,
                duration: 0.25,
                ease: "power2.out"
            }, "<0.1");
    }

    // Initialize first card
    updateActiveCard(0);
}

const projectModal = document.getElementById('project-modal');
const closeModalBtn = document.getElementById('close-modal');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');

const mTitle = document.getElementById('modal-title');
const mCat = document.getElementById('modal-category');
const mDesc = document.getElementById('modal-desc');
const mClient = document.getElementById('modal-client');
const mYear = document.getElementById('modal-year');
const mRole = document.getElementById('modal-role');
const mTags = document.getElementById('modal-tags');

let currentProjectIndex = 0;
// Fix for renamed classes:
const projectCards = document.querySelectorAll('.wheel-card');
const projectArray = Array.from(projectCards);

function openProjectModal(index) {
    currentProjectIndex = index;
    const card = projectArray[index];
    mTitle.innerText = card.getAttribute('data-title');
    mCat.innerText = card.getAttribute('data-category');
    mDesc.innerText = card.getAttribute('data-desc');
    mClient.innerText = card.getAttribute('data-client') || "Private Client";
    mYear.innerText = card.getAttribute('data-year') || "2024";
    mRole.innerText = card.getAttribute('data-role') || "Creative Lead";

    const tags = card.getAttribute('data-tags').split(',');
    mTags.innerHTML = '';
    tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1 bg-white/10 border border-white/5 rounded-full text-xs text-blue-300 tracking-wide';
        span.innerText = tag;
        mTags.appendChild(span);
    });
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() { projectModal.classList.remove('active'); document.body.style.overflow = 'auto'; }

function nextProjectFunc() {
    let nextIndex = (currentProjectIndex + 1) % projectArray.length;
    while (projectArray[nextIndex].style.display === 'none') { nextIndex = (nextIndex + 1) % projectArray.length; }
    openProjectModal(nextIndex);
}
function prevProjectFunc() {
    let prevIndex = (currentProjectIndex - 1 + projectArray.length) % projectArray.length;
    while (projectArray[prevIndex].style.display === 'none') { prevIndex = (prevIndex - 1 + projectArray.length) % projectArray.length; }
    openProjectModal(prevIndex);
}

projectArray.forEach((card, index) => card.addEventListener('click', () => openProjectModal(index)));
closeModalBtn.addEventListener('click', closeProjectModal);
nextBtn.addEventListener('click', nextProjectFunc);
prevBtn.addEventListener('click', prevProjectFunc);
projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProjectModal(); });

const cursor = document.getElementById('cursor');
if (window.matchMedia("(pointer: fine)").matches) {
    cursor.style.display = 'block';
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05, ease: "sine.out", overwrite: "auto" });
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    document.querySelectorAll('a, button, .project-card, .service-card, .gallery-item, .cursor-hover, .magnetic-btn, .filter-btn, .nav-btn, .footer-link, .vault-filter-btn, .ctx-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
    document.querySelectorAll(".magnetic-btn").forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.5;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.5;
            gsap.to(btn, { x: x, y: y, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });
}

function updateTime() {
    const time = new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos', hour: 'numeric', minute: '2-digit' });
    document.getElementById('lagos-time').innerText = `LAGOS: ${time}`;
}
setInterval(updateTime, 1000); updateTime();

const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));
closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('active')));

const ctxMenu = document.getElementById('custom-context-menu');
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    let x = e.clientX; let y = e.clientY;
    const winWidth = window.innerWidth; const winHeight = window.innerHeight;
    if (x + 200 > winWidth) x = winWidth - 200;
    if (y + 200 > winHeight) y = winHeight - 200;
    ctxMenu.style.left = `${x}px`; ctxMenu.style.top = `${y}px`;
    ctxMenu.classList.add('visible');
});
document.addEventListener('click', () => ctxMenu.classList.remove('visible'));
document.addEventListener('scroll', () => ctxMenu.classList.remove('visible'), { passive: true });

// Optimized scroll progress
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            document.getElementById('scroll-progress').style.width = progress + '%';
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ==========================================
//   3D HEADSET SCROLL-REACTIVE IMAGE SEQUENCE
//   Using GSAP + ScrollTrigger for Apple-level smoothness
//   High-performance canvas rendering with frame-by-frame control
// ==========================================

(function initScrollReactiveImageSequence() {
    'use strict';

    // ===== DOM ELEMENTS =====
    const canvas = document.getElementById('headset-canvas');
    const wrapper = document.getElementById('headset-wrapper');
    const loader = document.getElementById('headset-loader');
    const loaderBar = document.getElementById('headset-loader-bar');
    const loaderText = document.getElementById('headset-loader-text');

    // Exit if elements don't exist
    if (!canvas || !wrapper) {
        console.warn('⚠️ Headset canvas elements not found');
        return;
    }

    // ===== CONFIGURATION =====
    const CONFIG = {
        // Frame sequence settings
        frameCount: 192,                    // Total frames (0001-0192)
        framePath: './scroller/',           // Folder containing frames
        frameExtension: '.webp',            // File extension (.webp for best compression)
        frameDigits: 4,                     // Zero-padding (0001, 0002, etc.)

        // Scroll behavior
        scrollStart: 'top top',             // When to start the animation
        scrollEnd: '+=250%',                // How much scroll distance (250% = 2.5x viewport height)
        scrubSmoothing: 0.8,                // Scrub smoothing (0.1 = snappy, 2 = buttery)

        // Canvas rendering
        canvasWidth: 900,                   // Base canvas width
        canvasHeight: 900,                  // Base canvas height
        maxDPR: 2,                          // Max device pixel ratio for performance

        // Visual settings
        fadeInDuration: 0.8,                // Seconds to fade in canvas after load
        initialOpacity: 0.5,                // Canvas opacity when visible
        activeOpacity: 0.65,                 // Canvas opacity when visible
        verticalStretch: 1.8                 // Stretch on Y axis to fix squashed look
    };

    // ===== STATE =====
    const frames = [];                      // Array of preloaded Image objects
    let loadedCount = 0;                    // Number of successfully loaded frames
    let failedCount = 0;                    // Number of failed frames
    let currentFrameIndex = 0;              // Currently displayed frame
    let lastDrawnFrame = -1;                // Last frame drawn (to avoid redraws)
    let isReady = false;                    // All critical frames loaded
    let ctx = null;                         // Canvas 2D context
    let dpr = 1;                            // Device pixel ratio
    let displayWidth = 0;                   // Canvas CSS width
    let displayHeight = 0;                  // Canvas CSS height

    // ===== UTILITIES =====

    /**
     * Generate zero-padded frame filename
     * @param {number} index - Frame index (0-based)
     * @returns {string} Full path to frame image
     */
    function getFramePath(index) {
        const frameNum = String(index + 1).padStart(CONFIG.frameDigits, '0');
        return `${CONFIG.framePath}${frameNum}${CONFIG.frameExtension}`;
    }

    /**
     * Update loading progress UI
     * @param {number} loaded - Number of loaded frames
     * @param {number} total - Total frames
     */
    function updateLoadingProgress(loaded, total) {
        const percent = Math.round((loaded / total) * 100);
        if (loaderBar) loaderBar.style.width = `${percent}%`;
        if (loaderText) loaderText.textContent = `LOADING ${percent}%`;
    }

    /**
     * Hide the loading indicator
     */
    function hideLoader() {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }

    // ===== CANVAS SETUP =====

    /**
     * Initialize and resize canvas for current viewport
     */
    function setupCanvas() {
        // Get context with performance options
        ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: true,           // Reduces input latency
            willReadFrequently: false       // Optimize for drawing only
        });

        resizeCanvas();
    }

    /**
     * Resize canvas to fit viewport while maintaining aspect ratio
     */
    function resizeCanvas() {
        // Calculate DPR (capped for performance)
        dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDPR);

        // Calculate display size (CSS pixels)
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const aspectRatio = CONFIG.canvasWidth / CONFIG.canvasHeight;

        // Fit to viewport (cover behavior, centered)
        if (viewportWidth / viewportHeight > aspectRatio) {
            displayWidth = Math.min(viewportWidth * 0.9, CONFIG.canvasWidth);
            displayHeight = displayWidth / aspectRatio;
        } else {
            displayHeight = Math.min(viewportHeight * 0.9, CONFIG.canvasHeight);
            displayWidth = displayHeight / aspectRatio;
        }

        // Set CSS size
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;

        // Set actual buffer size (for sharp rendering on retina)
        canvas.width = Math.floor(displayWidth * dpr);
        canvas.height = Math.floor(displayHeight * dpr);

        // Redraw current frame after resize
        if (isReady && frames[currentFrameIndex]) {
            drawFrame(currentFrameIndex);
        }
    }

    // ===== FRAME LOADING =====

    /**
     * Preload all frames with intelligent ordering
     * Priority: first, last, then fill in between
     */
    function preloadAllFrames() {
        console.log(`🎬 Loading ${CONFIG.frameCount} frames from ${CONFIG.framePath}`);

        // Create all Image objects first
        for (let i = 0; i < CONFIG.frameCount; i++) {
            frames[i] = new Image();
            frames[i].decoding = 'async';
        }

        // Priority frames: first, middle, last (for quick preview)
        const priorityFrames = [
            0,
            Math.floor(CONFIG.frameCount / 4),
            Math.floor(CONFIG.frameCount / 2),
            Math.floor(3 * CONFIG.frameCount / 4),
            CONFIG.frameCount - 1
        ];

        // Load priority frames first
        priorityFrames.forEach(i => loadFrame(i, true));

        // Load remaining frames
        for (let i = 0; i < CONFIG.frameCount; i++) {
            if (!priorityFrames.includes(i)) {
                loadFrame(i, false);
            }
        }
    }

    /**
     * Load a single frame
     * @param {number} index - Frame index
     * @param {boolean} isPriority - Is this a priority frame
     */
    function loadFrame(index, isPriority) {
        // Create Image object if it doesn't exist (for standalone loading like reduced motion)
        if (!frames[index]) {
            frames[index] = new Image();
            frames[index].decoding = 'async';
        }

        const img = frames[index];
        const path = getFramePath(index);

        img.onload = () => {
            loadedCount++;
            updateLoadingProgress(loadedCount + failedCount, CONFIG.frameCount);

            // Show first frame immediately for quick feedback
            if (index === 0 && !isReady) {
                console.log('✅ First frame loaded - showing preview');
                drawFrame(0);
                canvas.style.opacity = CONFIG.initialOpacity;
            }

            // Check if enough frames loaded to start animation
            if (!isReady && loadedCount >= CONFIG.frameCount * 0.3) {
                isReady = true;
                console.log(`✅ ${loadedCount} frames loaded - starting animation`);
                initScrollTrigger();
                hideLoader();
            }

            // All frames loaded
            if (loadedCount + failedCount === CONFIG.frameCount) {
                console.log(`🎉 All frames processed: ${loadedCount} loaded, ${failedCount} failed`);
            }
        };

        img.onerror = () => {
            failedCount++;
            console.warn(`❌ Failed to load: ${path}`);
            updateLoadingProgress(loadedCount + failedCount, CONFIG.frameCount);

            // If first frame fails, try fallback
            if (index === 0) {
                console.error('⚠️ First frame failed! Trying fallback image...');
                tryFallbackImage();
            }

            // Check completion
            if (loadedCount + failedCount === CONFIG.frameCount) {
                console.log(`🎉 All frames processed: ${loadedCount} loaded, ${failedCount} failed`);
                if (loadedCount > 0 && !isReady) {
                    isReady = true;
                    initScrollTrigger();
                    hideLoader();
                }
            }
        };

        // Start loading
        img.src = path;
    }

    /**
     * Fallback to static image if frames fail to load
     */
    function tryFallbackImage() {
        const fallback = new Image();

        fallback.onload = () => {
            console.log('✅ Fallback image loaded');
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Draw with cover behavior
            drawImageCover(ctx, fallback, displayWidth, displayHeight);
            canvas.style.opacity = CONFIG.initialOpacity;
            hideLoader();
        };

        fallback.onerror = () => {
            console.warn('❌ Fallback image also failed');
            hideLoader();
        };

        // Try loading the static headset image
        fallback.src = './3D Headset.avif';
    }

    // ===== DRAWING =====

    /**
     * Draw a specific frame to the canvas
     * @param {number} frameIndex - Index of frame to draw
     */
    function drawFrame(frameIndex) {
        // Bounds check
        if (frameIndex < 0 || frameIndex >= CONFIG.frameCount) return;

        const img = frames[frameIndex];

        // Skip if image not ready
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Skip if same frame already drawn
        if (frameIndex === lastDrawnFrame) return;

        // Clear canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply DPR scaling
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Draw image with cover behavior (centered, cropped to fit)
        drawImageCover(ctx, img, displayWidth, displayHeight);

        lastDrawnFrame = frameIndex;
    }

    /**
     * Draw image with cover behavior (like CSS background-size: cover)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {HTMLImageElement} img - Image to draw
     * @param {number} targetWidth - Target width in CSS pixels
     * @param {number} targetHeight - Target height in CSS pixels
     */
    function drawImageCover(ctx, img, targetWidth, targetHeight) {
        // Apply vertical stretch if configured
        const stretchFactor = CONFIG.verticalStretch || 1;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        // Adjust the ratio to account for vertical stretching
        // If we stretch Y, the width/height ratio decreases
        const drawnRatio = imgRatio / stretchFactor;

        const targetRatio = targetWidth / targetHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (drawnRatio > targetRatio) {
            // Image (stretched) is wider - crop sides
            drawHeight = targetHeight;
            drawWidth = targetHeight * drawnRatio;
            offsetX = (targetWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Image (stretched) is taller - crop top/bottom
            drawWidth = targetWidth;
            drawHeight = targetWidth / drawnRatio;
            offsetX = 0;
            offsetY = (targetHeight - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // ===== GSAP SCROLL TRIGGER =====

    /**
     * Initialize GSAP ScrollTrigger for scroll-reactive animation
     */
    function initScrollTrigger() {
        // Ensure GSAP and ScrollTrigger are available
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('❌ GSAP or ScrollTrigger not loaded');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Create a timeline that maps scroll position to frame index
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#home',               // Trigger element (hero section)
                start: CONFIG.scrollStart,      // Start when top of hero hits top of viewport
                end: CONFIG.scrollEnd,          // End after scrolling 250% of viewport
                scrub: CONFIG.scrubSmoothing,   // Smooth scrubbing
                onUpdate: (self) => {
                    // Map scroll progress (0-1) to frame index (0 to frameCount-1)
                    // Using Math.round() for cleaner frame selection (smoother roll)
                    const progress = self.progress;
                    const targetFrame = Math.round(progress * (CONFIG.frameCount - 1));

                    // Only redraw if frame changed
                    if (targetFrame !== currentFrameIndex) {
                        currentFrameIndex = targetFrame;

                        // Use RAF for smooth rendering
                        requestAnimationFrame(() => {
                            drawFrame(currentFrameIndex);
                        });
                    }

                    // Adjust opacity based on scroll (more visible when scrolling)
                    const opacity = CONFIG.initialOpacity + (progress * 0.15);
                    canvas.style.opacity = Math.min(opacity, CONFIG.activeOpacity);
                },
                onEnter: () => {
                    canvas.classList.add('active');
                },
                onLeave: () => {
                    canvas.classList.remove('active');
                },
                onEnterBack: () => {
                    canvas.classList.add('active');
                },
                onLeaveBack: () => {
                    canvas.classList.remove('active');
                }
            }
        });

        console.log('✅ ScrollTrigger initialized for frame sequence');
    }

    // ===== EVENT HANDLERS =====

    /**
     * Handle window resize with debounce
     */
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            // Force redraw after resize
            lastDrawnFrame = -1;
            drawFrame(currentFrameIndex);
        }, 150);
    }

    /**
     * Handle visibility change (pause when tab hidden)
     */
    function handleVisibilityChange() {
        if (document.hidden) {
            // Tab is hidden - no action needed
        } else {
            // Tab is visible again - redraw current frame
            if (isReady) {
                lastDrawnFrame = -1;
                drawFrame(currentFrameIndex);
            }
        }
    }

    // ===== INITIALIZATION =====

    function init() {
        console.log('🎬 Initializing Scroll-Reactive Image Sequence');
        console.log(`📁 Frame path: ${CONFIG.framePath}`);
        console.log(`📊 Frame count: ${CONFIG.frameCount}`);

        // Check for reduced motion preference
        // NOTE: Add 'false &&' below to bypass for testing, remove for production
        if (false && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('⚠️ Reduced motion preferred - showing static frame');
            // Still need to setup canvas for drawing
            setupCanvas();
            canvas.style.opacity = '0.4';
            hideLoader();
            // Just load first frame as static (no scroll animation)
            loadFrame(0, true);
            return;
        }

        // Setup canvas
        setupCanvas();

        // Attach event listeners
        window.addEventListener('resize', handleResize, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Start loading frames
        preloadAllFrames();
    }

    // Start initialization
    init();

})();

// --- DEVICE DETECTION ---
const isMobile = window.innerWidth < 768;

// --- INITIALIZATION ---
function startTextAnimation() {
    setInterval(rotateText, 4000);
}

// --- PRELOADER WITH PERCENTAGE ---
const preloader = document.getElementById('preloader');
const loaderPercent = document.getElementById('loader-percent');
const loaderBar = document.getElementById('loader-bar');

// ALL images on the page that should be loaded
const allImages = Array.from(document.querySelectorAll('img[src]')).map(img => img.src);

// Critical resources to wait for
const criticalResources = [
    // About images
    'https://6937feda504a835c4ce351d7.imgix.net/IMG-20250916-WA0026.jpg?w=300&q=30&auto=format',
    'https://6937feda504a835c4ce351d7.imgix.net/me%203.jpg?w=600&q=60&auto=format',
    // Wheel card images
    'https://www.brandessencenigeria.com/wp-content/uploads/2025/12/IMG-20251208-WA0168-1024x819.jpg',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'https://6937feda504a835c4ce351d7.imgix.net/cucsa_imgupscaler.ai_General_4K.jpg?w=600&q=50&auto=format',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
];

let loadedCount = 0;
const totalResources = criticalResources.length + 2; // +2 for fonts and DOM

function updateProgress(increment = 1) {
    loadedCount += increment;
    const percent = Math.min(Math.round((loadedCount / totalResources) * 100), 100);

    if (loaderPercent) loaderPercent.textContent = percent;
    if (loaderBar) loaderBar.style.width = percent + '%';

    return percent;
}

function preloadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            updateProgress();
            resolve(true);
        };
        img.onerror = () => {
            updateProgress();
            resolve(false);
        };
        img.src = src;
    });
}

function waitForFonts() {
    return new Promise((resolve) => {
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                updateProgress();
                resolve();
            });
        } else {
            // Fallback for browsers without font loading API
            setTimeout(() => {
                updateProgress();
                resolve();
            }, 300);
        }
    });
}

function waitForDOM() {
    return new Promise((resolve) => {
        if (document.readyState === 'complete') {
            updateProgress();
            resolve();
        } else {
            window.addEventListener('load', () => {
                updateProgress();
                resolve();
            });
        }
    });
}

function hidePreloader() {
    if (!preloader) return;

    // Ensure we show 100% before hiding
    if (loaderPercent) loaderPercent.textContent = '100';
    if (loaderBar) loaderBar.style.width = '100%';

    // Add loading class to body for initial state
    document.body.classList.add('loading');

    // Small delay to show 100% and build anticipation
    setTimeout(() => {
        // Add exit animation to preloader
        preloader.classList.add('exit');

        // Trigger the SPECTACULAR reveal animation
        document.body.classList.remove('loading');
        document.body.classList.add('reveal-active');

        // After all spectacular animations complete, finalize
        setTimeout(finalizeLoad, 2200);
    }, 500);
}

function finalizeLoad() {
    preloader.style.display = 'none';
    document.body.style.overflow = '';

    // Clean up animation classes after a delay
    setTimeout(() => {
        document.body.classList.remove('reveal-active');

        // Reset any inline styles
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.opacity = '';
            mainContent.style.filter = '';
            mainContent.style.transform = '';
        }

        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.style.opacity = '';
            navbar.style.transform = '';
        }
    }, 500);

    // Start text rotation animation
    startTextAnimation();

    // Refresh ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

// Main loading sequence
async function initializeApp() {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    // Start loading all resources in parallel
    const loadPromises = [
        ...criticalResources.map(preloadImage),
        waitForFonts(),
        waitForDOM()
    ];

    // Wait for all resources
    await Promise.all(loadPromises);

    // Hide preloader
    hidePreloader();
}

// Start loading
initializeApp();

// Fallback: Force hide after 8 seconds max
setTimeout(() => {
    if (preloader && preloader.style.display !== 'none') {
        hidePreloader();
    }
}, 8000);

// --- BACK TO TOP BUTTON ---
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- MOBILE GALLERY BUTTON ---
const mobileGalleryBtn = document.getElementById('open-gallery-mobile');
if (mobileGalleryBtn) {
    mobileGalleryBtn.addEventListener('click', () => {
        const galleryOverlay = document.getElementById('full-gallery-modal');
        if (galleryOverlay) {
            galleryOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
}

// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// --- 9. SPOTLIGHT EFFECT ---
// REMOVED: Was part of the problematic hover effect causing content to disappear

// --- 9B. ABOUT IMAGE 3D TILT EFFECT ---
// This is specifically for the about section image only
const aboutImgContainer = document.getElementById('about-img-container');
if (aboutImgContainer && window.matchMedia("(min-width: 768px)").matches) {
    const imgCard = aboutImgContainer.querySelector('.glass-card');
    if (imgCard) {
        imgCard.style.transition = 'transform 0.2s ease-out';

        aboutImgContainer.addEventListener('mousemove', (e) => {
            const rect = imgCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle rotation (max 8 degrees)
            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = ((centerY - y) / centerY) * 8;

            imgCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        aboutImgContainer.addEventListener('mouseleave', () => {
            imgCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
}

// --- 10. 3D TILT EFFECT (PREMIUM DEPTH) ---
// DISABLED: Was causing content to disappear on hover due to perspective/3D transform conflicts
/*
if (window.matchMedia("(min-width: 768px)").matches) {
    document.querySelectorAll('.glass-card').forEach(card => {
        // Add transition for smooth reset
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
 
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
 
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
 
            // Max rotation degrees
            const maxRotate = 10;
 
            // Calculate rotation
            // Rotate Y depends on X position (left side -> tilt left, right side -> tilt right)
            const rotateY = ((x - centerX) / centerX) * maxRotate;
            // Rotate X depends on Y position (top -> tilt up, bottom -> tilt down)
            const rotateX = ((centerY - y) / centerY) * maxRotate; // Inverted for natural feel
 
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
 
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}
*/

// --- 11. INTERACTIVE PARTICLE FIELD (OPTIMIZED) ---
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = isMobile ? 30 : 80; // Reduce for mobile
    const connectionDist = 150;

    // Resize
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // PERFORMANCE OPTIMIZATION: Particles disabled for smoother experience
    /* 
    // Mouse
    const mouse = { x: null, y: null };
    ...
    */

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (100 - distance) / 100;
                    const directionX = forceDirectionX * force * 0.5; // repulsion strength
                    const directionY = forceDirectionY * force * 0.5;
                    this.vx -= directionX;
                    this.vy -= directionY;
                }
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Init
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connections
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDist) {
                    ctx.beginPath();
                    let opacity = 1 - (distance / connectionDist);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`; // Subtle lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    // animate(); // Disabled loop
}



// --- 13. INERTIA SCROLL SKEW (THE "AWWWARDS" FEEL) ---
// PERFORMANCE OPTIMIZATION: Inertia scroll disabled
/*
const scrollContent = document.getElementById('main-content');
...
*/

// --- 14. CURSOR TRAIL PHYSICS ---
// PERFORMANCE OPTIMIZATION: Cursor trails disabled
// if (window.matchMedia("(pointer: fine)").matches) { ... }

// --- 15. MAGNETIC TEXT (INNER PARALLAX) ---
// PERFORMANCE OPTIMIZATION: Magnetic buttons disabled
/*
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    ...
});
*/

// --- 16. ANIMATED COUNTERS ---
const counterElements = document.querySelectorAll('.counter-value');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);

            counter.textContent = current.toLocaleString();
            counter.classList.add('counting');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
                counter.classList.remove('counting');
            }
        }

        updateCounter();
    });

    countersAnimated = true;
}

// Trigger counters on scroll
if (counterElements.length > 0) {
    const funStatsSection = document.getElementById('fun-stats');
    if (funStatsSection) {
        ScrollTrigger.create({
            trigger: funStatsSection,
            start: "top 80%",
            onEnter: animateCounters,
            once: true
        });
    }
}

// --- 17. SKILL BAR ANIMATIONS ---
const skillItems = document.querySelectorAll('.skill-item');

if (skillItems.length > 0) {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        ScrollTrigger.create({
            trigger: skillsSection,
            start: "top 70%",
            onEnter: () => {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                        const skillBar = item.querySelector('.skill-bar-fill');
                        const skillLevel = item.getAttribute('data-skill');
                        if (skillBar && skillLevel) {
                            skillBar.style.width = skillLevel + '%';
                        }
                    }, index * 150);
                });
            },
            once: true
        });
    }
}

// --- 18. TIMELINE ANIMATIONS ---
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    ScrollTrigger.create({
        trigger: '.timeline-container',
        start: "top 80%",
        onEnter: () => {
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            });
        },
        once: true
    });
}

// --- 19. THEME ACCENT SWITCHER ---
const themeDots = document.querySelectorAll('.theme-dot');
const accentColors = {
    blue: { primary: '#0071e3', glow: 'rgba(0, 113, 227, 0.4)', secondary: '#64d2ff' },
    purple: { primary: '#bf5af2', glow: 'rgba(191, 90, 242, 0.4)', secondary: '#5856d6' },
    pink: { primary: '#ff375f', glow: 'rgba(255, 55, 95, 0.4)', secondary: '#ff6b8a' },
    green: { primary: '#30d158', glow: 'rgba(48, 209, 88, 0.4)', secondary: '#64d2ff' },
    orange: { primary: '#ff9f0a', glow: 'rgba(255, 159, 10, 0.4)', secondary: '#ffcc00' }
};

function setAccentColor(accent) {
    const colors = accentColors[accent];
    if (!colors) return;

    document.documentElement.style.setProperty('--accent-blue', colors.primary);
    document.documentElement.style.setProperty('--accent-blue-glow', colors.glow);
    document.documentElement.style.setProperty('--accent-cyan', colors.secondary);

    // Update active state
    themeDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-accent') === accent) {
            dot.classList.add('active');
        }
    });

    // Save preference
    localStorage.setItem('samsco-accent', accent);
}

// Load saved accent
const savedAccent = localStorage.getItem('samsco-accent');
if (savedAccent && accentColors[savedAccent]) {
    setAccentColor(savedAccent);
}

// Theme dot click handlers
themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const accent = dot.getAttribute('data-accent');
        setAccentColor(accent);
    });
});

// --- 20. KEYBOARD SHORTCUTS ---
const shortcutsModal = document.getElementById('shortcuts-modal');
const closeShortcutsBtn = document.getElementById('close-shortcuts');

function openShortcuts() {
    shortcutsModal.classList.add('active');
}

function closeShortcuts() {
    shortcutsModal.classList.remove('active');
}

if (closeShortcutsBtn) {
    closeShortcutsBtn.addEventListener('click', closeShortcuts);
}

// Close on background click
if (shortcutsModal) {
    shortcutsModal.addEventListener('click', (e) => {
        if (e.target === shortcutsModal) {
            closeShortcuts();
        }
    });
}

// Keyboard event handler
document.addEventListener('keydown', (e) => {
    // Ignore if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key.toLowerCase()) {
        case '?':
            e.preventDefault();
            if (shortcutsModal.classList.contains('active')) {
                closeShortcuts();
            } else {
                openShortcuts();
            }
            break;
        case 't':
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'g':
            e.preventDefault();
            const galleryOverlay = document.getElementById('full-gallery-modal');
            if (galleryOverlay) {
                galleryOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            break;
        case 'c':
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'r':
            e.preventDefault();
            document.body.classList.toggle('god-mode');
            break;
        case 'escape':
            closeShortcuts();
            break;
    }
});

// --- 21. EASTER EGG - Konami Code ---
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow-bg 2s ease infinite';

            // Create celebration particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'fixed pointer-events-none text-3xl z-[9999]';
                particle.textContent = ['🎉', '🎊', '✨', '🚀', '💫'][Math.floor(Math.random() * 5)];
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.top = '-50px';
                document.body.appendChild(particle);

                gsap.to(particle, {
                    y: window.innerHeight + 100,
                    x: (Math.random() - 0.5) * 200,
                    rotation: Math.random() * 720,
                    duration: 3 + Math.random() * 2,
                    ease: "power1.out",
                    onComplete: () => particle.remove()
                });
            }

            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);

            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation to head if not exists
if (!document.getElementById('rainbow-style')) {
    const style = document.createElement('style');
    style.id = 'rainbow-style';
    style.textContent = `
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

console.log('%c🎨 Welcome to Samsco Portfolio!', 'font-size: 20px; font-weight: bold; color: #0071e3;');
console.log('%cPress ? for keyboard shortcuts', 'font-size: 12px; color: #888;');

// --- 22. TELEGRAM MODAL LOGIC ---
const telegramModal = document.getElementById('telegram-modal');
const telegramBtn = document.getElementById('telegram-btn');
const telegramClose = document.getElementById('telegram-close');
// Safe select: use optional chaining or check existence
const telegramContent = telegramModal ? telegramModal.querySelector('.glass-card') : null;

function openTelegramModal(e) {
    if (e) e.preventDefault();
    if (telegramModal && telegramContent) {
        telegramModal.classList.remove('pointer-events-none', 'opacity-0');
        telegramContent.classList.remove('scale-90');
        telegramContent.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    }
}

function closeTelegramModal() {
    if (telegramModal && telegramContent) {
        telegramModal.classList.add('pointer-events-none', 'opacity-0');
        telegramContent.classList.remove('scale-100');
        telegramContent.classList.add('scale-90');
        document.body.style.overflow = 'auto';
    }
}

if (telegramBtn) telegramBtn.addEventListener('click', openTelegramModal);
if (telegramClose) telegramClose.addEventListener('click', closeTelegramModal);
if (telegramModal) telegramModal.addEventListener('click', (e) => {
    if (e.target === telegramModal) closeTelegramModal();
});
