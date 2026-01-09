// Samsco Portfolio - Main Script

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

    // --- GRAPHICS DESIGN (Batch 2) ---
    { title: "Satisfied", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/satisfied.jpg" },
    { title: "CCH 2024", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/cch%202024.jpg" },
    { title: "Project Oct", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_2024-10-18_14-08-16.jpg" },
    { title: "Graphic Art 19", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_7_2025-12-09_19-44-05.jpg" },
    { title: "Graphic Art 20", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_6_2025-12-09_19-44-05.jpg" },
    { title: "Graphic Art 21", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_5_2025-12-09_19-44-05.jpg" },
    { title: "Graphic Art 22", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_4_2025-12-09_19-44-05.jpg" },
    { title: "Graphic Art 23", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_3_2025-12-09_19-44-05.jpg" },
    { title: "Graphic Art 24", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_1_2025-12-09_19-44-05.jpg" },
    { title: "Graphic Art 25", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_31_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 26", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_32_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 27", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_2_2025-12-09_19-44-05.jpg" },
    { title: "Graphic Art 28", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_15_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 29", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_12_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 30", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_11_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 31", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_9_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 32", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_14_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 33", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_10_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 34", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_7_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 35", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_2_2025-12-09_20-06-29.jpg" },
    { title: "Graphic Art 36", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/Untitled-1.png" },
    { title: "Graphic Art 37", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_4_2025-12-09_19-59-08.jpg" },
    { title: "Graphic Art 38", cat: "Graphics Design", url: "https://6937feda504a835c4ce351d7.imgix.net/photo_6_2025-12-09_19-59-08.jpg" },

    // --- VIDEO (3D & VFX) ---
    { title: "VFX Intro Reel", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/intro.mp4" },
    { title: "S24 Render", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/s24%20render.png" },
    { title: "S24 Ultra Motion", cat: "3D & VFX", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/s24%20ultra.mp4" },
    { title: "iPad Air 2023", cat: "3D & VFX", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/Apple%20Ipad%20Air%202023%20(1).mp4" },
    { title: "Reactive Headset", cat: "3D & VFX", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/scroll%20reactive%20headset.mp4" },
    { title: "Pixel 9 Pro", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/Google%20Pixel%209%20Pro%20new.jpeg" },
    { title: "HP Spectre X360", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/HP%20Spectre%20X360.png" },
    { title: "Random Render", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/Just%20a%20random%20render.mp4" },
    { title: "Minimie Ad Concept", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/Minimie.mp4" },
    { title: "Character FX Simulation", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/A%20character%20on%20Fire.mp4" },
    { title: "VFX Car Shot", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/VFX%20Car%20Shot.mp4" },
    { title: "Instagram VFX", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/Instagram.mp4" },
    { title: "Random Render B", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/Random%20Renderr.mp4" },
    { title: "Random Concept", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/Random%20a.mp4" },
    { title: "Car VFX Still", cat: "3D & VFX", url: "https://6937feda504a835c4ce351d7.imgix.net/car%20vfx.jpg" },

    // --- VIDEO EDITING ---
    { title: "Hypo Ad Campaign", cat: "Video Editing", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/%E2%80%9CWhen%20life%20gives%20you%20stains,%20Hypo%20gives%20you%20hope%20%F0%9F%98%85%F0%9F%AB%A7%20A%20campaign%20that%20never%20made%20it%20to%20class,%20but%20made%20it%20to%20IG!%20CREDITS-%20Editor-%20@samsco.s1%20Actors-%20@mr_a.l.u.c.a.r.d%20@i__zeke%20%F0%9F%8E%A5-%20@kendavid.na%20%20" },
    { title: "Situation of Nigeria 2024", cat: "Video Editing", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/THE%20SITUATION%20OF%20NIGERIA%20IN%202024%20@motola_savage%20@temi.babs%20@mrlastborn1%20%20%F0%9F%93%B8%20@iamch_uks%20Edited%20by%20@samsco.s1%20" },
    { title: "Na Hunger Cause Am", cat: "Video Editing", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/Na%20hunger%20cause%20am%20@motola_savage%20@iamch_uks%20@temi.babs%20@thebosstehila%20%20Edited%20by%20@samsco.s1%20%20Shot%20by%20@mrlastborn1%20@samsco.s1%20%20We%20are%20THEM%20(Content%20Creators)%20" },
    { title: "The Pen Skit", cat: "Video Editing", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/The%20pen%20%E2%9C%8D%EF%B8%8F%F0%9F%99%86%F0%9F%8F%BD%F0%9F%98%82%20A%20new%20video%20from%20THEM%20%F0%9F%98%82%20%20@motola_savage%20@temi.babs%20%20@iamch_uks%20@thebosstehila%20%20%20Shot-%20@samsco.s1%20%20Edited-%20@mrlastborn1%20%20@samsco.s1%20%20%20Appreciation-%20God%20Almighty%20for%20the%20success%20of%20this.%20%20" },
    { title: "POV: Maths Teacher", cat: "Video Editing", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/POV-%20YOU%20MET%20YOUR%20SECONDARY%20SCHOOL%20MATHS%20TEACHER.mp4" },
    { title: "La La Land Skit", cat: "Video Editing", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/When%20your%20bestie%20lives%20in%20La%20La%20Land%20%F0%9F%92%AD%20Me-%20%E2%80%9CWe%20need%20to%20be%20realistic.%E2%80%9D%20Her-%20%E2%80%9CI%20saw%20a%20sign%20in%20the%20clouds%20shaped%20like%20a%20heart%E2%80%A6%20it%E2%80%99s%20destiny.%E2%80%9D%20%F0%9F%92%80%F0%9F%92%80%F0%9F%92%80%20%20Tag%20that%20one%20friend%20who%20stays%20in%20dreamland%2024-7%20%F0%9F%98%AD%E2%9C%A8%20%20%20" },

    // --- AI GENERATION ---
    { title: "AI Animation 1", cat: "AI", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/AI%20Video%20Generator%20-%20Animate%20Photos%20&%20Frames%20Online%20-%20Kling%20AI.mp4" },
    { title: "AI Animation 2", cat: "AI", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/AI%20Video%20Generator%20-%20Animate%20Photos%20&%20Frames%20Online%20-%20Kling%20AI_2.mp4" },
    { title: "A Guy Trying", cat: "AI", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/A_guy_trying_202512081219.mp4" },
    { title: "Me (AI Generated)", cat: "AI", type: "video", url: "https://6937feda504a835c4ce351d7.imgix.net/Me.mp4" },

    // --- CODING PLACEHOLDERS ---
    { title: "Data Dashboard", cat: "Coding & Data Analytics", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" },
    { title: "Code Interface", cat: "Coding & Data Analytics", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" },

    // --- WEBSITES ---
    { title: "Sweet Touch Ventures", cat: "Website", url: "https://image.thum.io/get/width/800/crop/800/https://sweettouchventures.vercel.app/", projectUrl: "https://sweettouchventures.vercel.app/" },
    { title: "Samsco Portfolio v1", cat: "Website", url: "https://image.thum.io/get/width/800/crop/800/https://samsco.vercel.app/", projectUrl: "https://samsco.vercel.app/" }
];

const galleryCategories = ["Graphics Design", "3D & VFX", "Video Editing", "Coding & Data Analytics", "AI", "Website"];

// --- 3. DYNAMIC GALLERY & FILTER GENERATOR ---
const galleryGrid = document.getElementById('gallery-grid-content');
const filterContainer = document.getElementById('vault-filters');

let currentFilter = 'ALL';
let galleryItems = [];
let visibleGalleryItems = [];

// Generate Filters
const allCategories = ["ALL", ...galleryCategories];
allCategories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `vault-filter-btn px-4 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-wider transition-all ${cat === 'ALL' ? 'active bg-blue-600 border-blue-600' : ''}`;
    btn.textContent = cat;
    btn.setAttribute('data-filter', cat);

    btn.addEventListener('click', () => {
        document.querySelectorAll('.vault-filter-btn').forEach(b => {
            b.classList.remove('active', 'bg-blue-600', 'border-blue-600');
            b.classList.add('bg-white/5', 'border-white/10');
        });
        btn.classList.add('active', 'bg-blue-600', 'border-blue-600');
        btn.classList.remove('bg-white/5', 'border-white/10');

        // Removed mosh-active class to prevent transition effect

        setTimeout(() => {
            currentFilter = cat;
            visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item')).filter(item =>
                currentFilter === 'ALL' || item.getAttribute('data-cat') === currentFilter
            );

            const items = document.querySelectorAll('.gallery-item');
            items.forEach(item => {
                const itemCat = item.getAttribute('data-cat');
                if (cat === 'ALL' || itemCat === cat) {
                    gsap.to(item, { scale: 1, opacity: 1, duration: 0.3, display: 'block', ease: "power2.out" });
                } else {
                    gsap.to(item, { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => item.style.display = 'none' });
                }
            });
            // Removed mosh-active class removal as the class is no longer added
        }, 200);
    });
    filterContainer.appendChild(btn);
});

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
        'Website': '#06b6d4' // Cyan/Teal for websites
    };
    const catColor = catColors[cat] || '#0071e3';

    if (configItem.projectUrl) {
        item.setAttribute('data-project-url', configItem.projectUrl);
    }

    if (isVideo) {
        mediaContent = `<video src="${configItem.url}" muted loop playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()" class="w-full h-full object-cover"></video>`;
    } else {
        mediaContent = `<img src="${thumbUrl}" loading="lazy" alt="${configItem.title}" class="w-full h-full object-cover">`;
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
}

visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));

// --- 4. GALLERY MODAL LOGIC ---
const galleryModal = document.getElementById('full-gallery-modal');
const openGalleryBtns = [document.getElementById('open-gallery-hero'), document.getElementById('open-gallery-main')];
const closeGalleryBtn = document.getElementById('close-gallery');

openGalleryBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
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

    const item = visibleGalleryItems[currentLbIndex];
    let rawUrl = item.getAttribute('data-url');
    let url = rawUrl.split('?')[0];

    const type = item.getAttribute('data-type');
    const title = item.getAttribute('data-title');
    const cat = item.getAttribute('data-cat');

    lbTitle.innerText = title;
    lbCat.innerText = cat;

    if (type === 'video') {
        lbImg.classList.add('hidden');
        lbVideo.classList.remove('hidden');
        lbVideo.src = rawUrl;
        lbVideo.play();
    } else {
        lbVideo.classList.add('hidden');
        lbImg.classList.remove('hidden');
        if (url.includes('imgix.net')) {
            url += "?w=1200&q=75&auto=format";
        }
        lbImg.src = url;
        lbVideo.pause();
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
//      DEVICE DETECTION & INITIALIZATION
// ==========================================

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

    // Small delay to show 100%
    setTimeout(() => {
        // Fallback or GSAP
        if (typeof gsap !== 'undefined') {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: finalizeLoad
            });
        } else {
            preloader.style.transition = "opacity 0.5s ease";
            preloader.style.opacity = "0";
            setTimeout(finalizeLoad, 500);
        }
    }, 200);
}

function finalizeLoad() {
    preloader.style.display = 'none';
    document.body.style.overflow = '';

    // Start animations AFTER preloader is gone
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

// --- 9. SPOTLIGHT EFFECT (PREMIUM INTERACTION) ---
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- 10. 3D TILT EFFECT (PREMIUM DEPTH) ---
// Checks if device is powerful enough (not mobile)
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
