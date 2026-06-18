"scrollRestoration" in history && (history.scrollRestoration = "manual"), window.scrollTo(0, 0), "undefined" != typeof gsap && "undefined" != typeof ScrollTrigger ? gsap.registerPlugin(ScrollTrigger) : console.warn("GSAP not loaded. Some animations will be disabled.");
const words = [{
    top: "VISION", bottom: "ENGINEERED"
}
    , {
    top: "REALITY", bottom: "RENDERED"
}
    , {
    top: "DIGITAL", bottom: "ALCHEMY"
}
    , {
    top: "LOGIC", bottom: "DEFYING"
}
    , {
    top: "ART", bottom: "INTELLIGENT"
}
];
let currentIndex = 0;
const topText = document.getElementById("hero-word-1"), bottomText = document.getElementById("hero-word-2");
let isTabActive = !0;
function rotateText() {
    if (!isTabActive) return;
    currentIndex = (currentIndex + 1) % words.length;
    const e = words[currentIndex];
    gsap.to([topText, bottomText], {
        yPercent: -120, opacity: 0, duration: .8, ease: "power3.in", stagger: .08, onComplete: () => {
            topText.innerText = e.top, bottomText.innerText = e.bottom, gsap.set([topText, bottomText], {
                yPercent: 120, opacity: 0
            }
            ), gsap.to([topText, bottomText], {
                yPercent: 0, opacity: 1, duration: .9, ease: "power3.out", stagger: .08
            }
            )
        }

    }
    )
}
document.addEventListener("visibilitychange", () => {
    isTabActive = !document.hidden
}
);
const localGalleryConfig = window.localGalleryConfig || [];
let galleryConfig = [...localGalleryConfig];

// Load cached works from localStorage on startup
try {
    const cachedWorks = localStorage.getItem("samsco_works_cache");
    if (cachedWorks) {
        galleryConfig = JSON.parse(cachedWorks);
    }
} catch (e) {
    console.error("Failed to parse cached works:", e);
}

// Fetch works from Supabase dynamically
async function fetchWorksFromSupabase() {
    if (!window.supabaseClient) {
        console.log("Supabase client not initialized - using local gallery config");
        return;
    }
    console.log("Fetching works from Supabase...");
    try {
        const { data, error } = await window.supabaseClient
            .from("works")
            .select("*")
            .order("created_at", { ascending: false });
            
        if (error) throw error;
        
        if (data && data.length > 0) {
            console.log(`Loaded ${data.length} works from Supabase`);
            // Format works to match galleryConfig structure
            const formattedWorks = data.map(item => ({
                title: item.title,
                cat: item.cat,
                url: item.url,
                type: item.type || (item.url.endsWith(".mp4") ? "video" : "image"),
                projectUrl: item.projectUrl || "",
                client: item.client || "Private Client",
                year: item.year || "2024",
                role: item.role || "Creative Lead",
                desc: item.desc || "",
                tags: item.tags ? item.tags.split(",").map(t => t.trim()) : [],
                problem: item.problem || "",
                process: item.process || "",
                result: item.result || "",
                demoUrl: item.demoUrl || ""
            }));
            
            // Compare and update if changed
            const isChanged = JSON.stringify(formattedWorks) !== JSON.stringify(galleryConfig);
            if (isChanged) {
                galleryConfig = formattedWorks;
                localStorage.setItem("samsco_works_cache", JSON.stringify(galleryConfig));
                
                // If vault page or main page has already rendered, force re-render
                if (galleryInitialized) {
                    galleryInitialized = false;
                    if (typeof initGallery === 'function') {
                        initGallery(true);
                    }
                }
            }
        }
    } catch (e) {
        console.error("Error fetching works from Supabase:", e);
    }
}

async function fetchSkillsFromSupabase() {
    if (!window.supabaseClient) return;
    try {
        const { data, error } = await window.supabaseClient
            .from("skills")
            .select("*")
            .order("id", { ascending: true });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
            const container = document.getElementById("skills-container");
            if (container) {
                container.innerHTML = "";
                data.forEach(skill => {
                    const item = document.createElement("div");
                    item.className = "skill-item";
                    item.setAttribute("data-skill", skill.level);
                    item.innerHTML = `
                        <div class="flex justify-between mb-2">
                            <span class="text-white font-medium">${skill.name}</span>
                            <span class="text-[#64d2ff] font-bold">${skill.level}%</span>
                        </div>
                        <div class="skill-bar-container">
                            <div class="skill-bar-fill" style="--skill-level: ${skill.level}%"></div>
                        </div>
                    `;
                    container.appendChild(item);
                });
                if (typeof initSkillsAnimation === 'function') initSkillsAnimation();
            }
        }
    } catch (e) {
        console.error("Error fetching skills from Supabase:", e);
    }
}

async function fetchExperienceFromSupabase() {
    if (!window.supabaseClient) return;
    try {
        const { data, error } = await window.supabaseClient
            .from("experience")
            .select("*")
            .order("order_index", { ascending: true });
            
        if (error) throw error;
        
        if (data && data.length > 0) {
            const container = document.querySelector(".timeline-container");
            if (container) {
                container.innerHTML = "";
                data.forEach(exp => {
                    const item = document.createElement("div");
                    item.className = "timeline-item";
                    item.innerHTML = `
                        <div class="timeline-date">${exp.year}</div>
                        <div class="timeline-title">${exp.title}</div>
                        <div class="timeline-subtitle">${exp.subtitle}</div>
                    `;
                    container.appendChild(item);
                });
                if (typeof initTimelineAnimation === 'function') initTimelineAnimation();
            }
        }
    } catch (e) {
        console.error("Error fetching experience from Supabase:", e);
    }
}

async function fetchProfileImagesFromSupabase() {
    if (!window.supabaseClient) return;
    try {
        const { data, error } = await window.supabaseClient
            .from("site_settings")
            .select("*")
            .in("key", ["profile_image_1", "profile_image_2"]);
            
        if (error) throw error;
        
        if (data && data.length > 0) {
            const img1 = document.getElementById("profile-img-1");
            const img2 = document.getElementById("profile-img-2");
            
            data.forEach(setting => {
                if (setting.key === "profile_image_1" && img1) {
                    img1.src = setting.value;
                } else if (setting.key === "profile_image_2" && img2) {
                    img2.src = setting.value;
                }
            });
        }
    } catch (e) {
        console.error("Error fetching profile settings from Supabase:", e);
    }
}

async function fetchTestimonialsFromSupabase() {
    if (!window.supabaseClient) return;
    try {
        const { data, error } = await window.supabaseClient
            .from("testimonials")
            .select("*")
            .order("order_index", { ascending: true });
            
        if (error) throw error;
        
        if (data && data.length > 0) {
            const track = document.querySelector(".testimonials-track");
            if (track) {
                track.innerHTML = "";
                
                // Duplicate items to ensure smooth infinite loop scroll
                let itemsList = [...data];
                while (itemsList.length < 8) {
                    itemsList = [...itemsList, ...data];
                }
                const finalItemsList = [...itemsList, ...itemsList];
                
                const gradients = [
                    "from-[#0071e3] to-[#64d2ff]", // Blue-Cyan
                    "from-[#bf5af2] to-[#ff375f]", // Purple-Pink
                    "from-[#30d158] to-[#64d2ff]", // Green-Cyan
                    "from-[#ff9f0a] to-[#ff375f]"  // Orange-Pink
                ];
                
                finalItemsList.forEach((test, idx) => {
                    const card = document.createElement("div");
                    card.className = "testimonial-card";
                    
                    const stars = "★".repeat(test.rating || 5);
                    const initial = (test.client_name || "C").charAt(0).toUpperCase();
                    const grad = gradients[idx % gradients.length];
                    const subtitle = test.company ? `${test.client_role}, ${test.company}` : test.client_role;
                    
                    card.innerHTML = `
                        <div class="testimonial-stars mb-4">${stars}</div>
                        <p class="text-white/70 mb-6 leading-relaxed">"${test.content}"</p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white font-bold">
                                ${initial}
                            </div>
                            <div>
                                <div class="text-white font-semibold">${test.client_name}</div>
                                <div class="text-white/40 text-sm">${subtitle}</div>
                            </div>
                        </div>
                    `;
                    track.appendChild(card);
                });
            }
        }
    } catch (e) {
        console.error("Error fetching testimonials from Supabase:", e);
    }
}

// Start fetch in background
document.addEventListener("DOMContentLoaded", () => {
    // Small delay to let initial paint complete smoothly
    setTimeout(() => {
        fetchCategoriesFromSupabase();
        fetchWorksFromSupabase();
        fetchSkillsFromSupabase();
        fetchExperienceFromSupabase();
        fetchProfileImagesFromSupabase();
        fetchTestimonialsFromSupabase();
    }, 200);
});

let galleryCategories = ["Graphics Design", "3D & VFX", "Video Editing", "Coding & Data Analytics", "AI", "Website", "Social Management", "Presentations"];
const galleryGrid = document.getElementById("gallery-grid-content"), filterContainer = document.getElementById("vault-filters");
let currentFilter = "ALL", galleryItems = [], visibleGalleryItems = [], galleryInitialized = !1, filtersInitialized = !1;
let categoryColorsMap = {};
let searchSortBound = false;

// Reverted back to raw categories
function mapCategoryToOutcome(cat) {
    if (!cat) return "Creative Work";
    return cat.trim();
}

function getOutcomeColor(outcome) {
    if (categoryColorsMap[outcome]) return categoryColorsMap[outcome];
    const defaultColors = {
        "3D & VFX": "#bf5af2",
        "Graphics Design": "#0071e3",
        "Video Editing": "#ff375f",
        "Coding & Data Analytics": "#30d158",
        "AI": "#ff9f0a",
        "Website": "#06b6d4",
        "Social Management": "#ec4899",
        "Presentations": "#10b981",
        "ALL": "#0071e3"
    };
    return defaultColors[outcome] || "#0071e3";
}

function getCategoryColor(cat) {
    return getOutcomeColor(mapCategoryToOutcome(cat));
}

async function fetchCategoriesFromSupabase() {
    if (!window.supabaseClient) {
        console.log("Supabase client not initialized - using local categories");
        return;
    }
    console.log("Fetching categories from Supabase...");
    try {
        const { data, error } = await window.supabaseClient
            .from("categories")
            .select("name, color")
            .order("name", { ascending: true });
            
        if (error) {
            if (error.code === 'PGRST116' || error.message.includes("does not exist")) {
                console.log("Categories table does not exist in Supabase yet. Using defaults.");
                return;
            }
            throw error;
        }
        
        if (data && data.length > 0) {
            data.forEach(item => {
                if (item.color) {
                    categoryColorsMap[item.name] = item.color;
                }
            });
            const fetchedCategories = data.map(item => item.name);
            const isChanged = JSON.stringify(fetchedCategories) !== JSON.stringify(galleryCategories);
            if (isChanged) {
                galleryCategories = fetchedCategories;
                
                // Re-initialize filter buttons if vault is initialized
                if (filterContainer) {
                    initVaultFilters(true);
                }
            }
        }
    } catch (e) {
        console.error("Error fetching categories from Supabase:", e);
    }
}

function initVaultFilters(force = false) {
    if (filtersInitialized && !force || !filterContainer) return;
    filterContainer.innerHTML = "";
    
    const outcomes = [];
    galleryCategories.forEach(cat => {
        const outcome = mapCategoryToOutcome(cat);
        if (!outcomes.includes(outcome)) {
            outcomes.push(outcome);
        }
    });

    ["ALL", ...outcomes].forEach(e => {
        const t = document.createElement("button");
        t.setAttribute("data-filter", e), t.className = "vault-filter-btn flex items-center";
        
        const dotColor = getOutcomeColor(e);
        t.innerHTML = `
            <span class="w-1.5 h-1.5 rounded-full mr-2 transition-transform duration-300" style="background-color: ${dotColor}; box-shadow: 0 0 6px ${dotColor}"></span>
            <span>${e}</span>
        `;
        
        applyFilterButtonStyles(t, currentFilter === e, dotColor), t.addEventListener("click", function () {
            handleFilterClick(this, e)
        }
        ), filterContainer.appendChild(t)
    }
    ), filtersInitialized = !0
}
function applyFilterButtonStyles(e, t, a) {
    e.style.setProperty('--category-color', a);
    if (t) {
        e.classList.add("active");
    } else {
        e.classList.remove("active");
    }
}
function handleFilterClick(e, t) {
    document.querySelectorAll("#vault-filters .vault-filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    e.classList.add("active");
    currentFilter = t;
    filterAndSortVault();
}

// Typographic fallback HTML generator
function getTypographicFallbackHTML(title, mappedCat, catColor) {
    return `
        <div class="w-full h-full relative flex flex-col justify-between p-4 bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden select-none">
            <!-- Grid overlay -->
            <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none"></div>
            <!-- Glow -->
            <div class="absolute -top-10 -right-10 w-28 h-28 opacity-20 blur-2xl rounded-full pointer-events-none" style="background-image: radial-gradient(circle, ${catColor} 0%, transparent 70%)"></div>
            
            <!-- Category and Icon -->
            <div class="flex justify-between items-center z-10">
                <span class="text-[7px] font-black tracking-[0.2em] uppercase font-display" style="color: ${catColor}">${mappedCat}</span>
                <svg class="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
            
            <!-- Big Bold Stylized Title -->
            <div class="my-auto py-2 z-10">
                <h4 class="text-white text-[10px] font-black tracking-wider uppercase leading-snug line-clamp-3 font-display">
                    ${title}
                </h4>
            </div>
            
            <!-- Secure / Vault code -->
            <div class="flex items-center justify-between text-[6px] text-white/30 font-mono tracking-widest z-10 border-t border-white/5 pt-1.5">
                <span>INDEX // VAULT</span>
                <span class="flex items-center gap-0.5">
                    <span class="w-1 h-1 rounded-full animate-pulse" style="background-color: ${catColor}"></span>
                    SECURED
                </span>
            </div>
        </div>
    `;
}

filterContainer && initVaultFilters(), window.handleGridImageError = function (e) {
    if (!e) return;
    const item = e.closest('.gallery-item') || e.closest('.featured-item');
    if (!item) return;
    const title = item.getAttribute('data-title') || 'Creative Work';
    const cat = item.getAttribute('data-cat') || 'Graphics Design';
    const mappedCat = mapCategoryToOutcome(cat);
    const color = getOutcomeColor(mappedCat);
    
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = "w-full h-full absolute inset-0 z-0";
    fallbackDiv.innerHTML = getTypographicFallbackHTML(title, mappedCat, color);
    e.replaceWith(fallbackDiv);
}
    , window.handleGridVideoError = function (e) {
        if (!e) return;
        const item = e.closest('.gallery-item') || e.closest('.featured-item');
        if (!item) return;
        const title = item.getAttribute('data-title') || 'Creative Video';
        const cat = item.getAttribute('data-cat') || 'Video Editing';
        const mappedCat = mapCategoryToOutcome(cat);
        const color = getOutcomeColor(mappedCat);
        
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = "w-full h-full absolute inset-0 z-0";
        fallbackDiv.innerHTML = getTypographicFallbackHTML(title, mappedCat, color);
        
        const siblingError = e.nextElementSibling;
        if (siblingError) {
            siblingError.remove();
        }
        e.replaceWith(fallbackDiv);
    }
    ;
const galleryObserver = new IntersectionObserver((e, t) => {
    e.forEach(e => {
        if (e.isIntersecting) {
            const a = e.target, r = a.querySelector("video"), i = a.querySelector("img");
            r && r.dataset.src && (r.onerror = function () {
                window.handleGridVideoError(this)
            }
                , r.src = r.dataset.src, r.load(), r.removeAttribute("data-src")), i && i.dataset.src && (i.onerror = function () {
                    window.handleGridImageError(this)
                }
                    , i.src = i.dataset.src, i.removeAttribute("data-src")), t.unobserve(a)
        }

    }
    )
}
    , {
        root: window.isVaultPage ? null : document.getElementById("full-gallery-modal"), rootMargin: "200px"
    }
);function initGallery(force = false) {
    if (galleryInitialized && !force) return;
    galleryGrid.innerHTML = "";
    const e = galleryConfig.length;
    for (let t = 0; t < e; t++) {
        const work = galleryConfig[t];
        const rawCat = work.cat;
        const mappedCat = mapCategoryToOutcome(rawCat);
        const isVideo = "video" === work.type || work.url.endsWith(".mp4");
        
        const i = document.createElement("div");
        i.className = "gallery-item relative bg-gray-900/50 rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-white/10 transition-all duration-300", 
        i.setAttribute("data-index", t), 
        i.setAttribute("data-title", work.title), 
        i.setAttribute("data-cat", mappedCat), 
        i.setAttribute("data-type", work.type === "iframe" ? "iframe" : isVideo ? "video" : "image"), 
        i.setAttribute("data-url", work.url);
        
        if (work.projectUrl) i.setAttribute("data-project-url", work.projectUrl);
        
        const outcomeColor = getOutcomeColor(mappedCat);
        
        // Eager load the first 15 items to speed up preloader and avoid pop-in
        const isEager = t < 15;
        
        // Typographic fallback detection
        const isTypographic = !work.url || work.url.includes("placeholder") || work.url.trim() === "" || work.url.includes("missing");
        
        let mediaHtml = "";
        if (isTypographic) {
            mediaHtml = getTypographicFallbackHTML(work.title, mappedCat, outcomeColor);
        } else if (work.type === "iframe") {
            const thumbUrl = `https://image.thum.io/get/width/400/crop/800/noanimate/${work.url}`;
            mediaHtml = `
                <div class="w-full h-full relative bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img ${isEager ? `src="${thumbUrl}"` : `data-src="${thumbUrl}"`} loading="${isEager ? 'eager' : 'lazy'}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" onload="window.vaultImagesLoaded = (window.vaultImagesLoaded || 0) + 1" onerror="window.handleGridImageError(this)">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                    </div>
                </div>`;
        } else if (isVideo) {
            mediaHtml = `
                <video ${isEager ? `src="${work.url}"` : `data-src="${work.url}"`} muted loop playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()" onloadeddata="window.vaultImagesLoaded = (window.vaultImagesLoaded || 0) + 1" class="w-full h-full object-cover" onerror="window.handleGridVideoError(this)"></video>
                <div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 hidden pointer-events-none">
                    <span class="text-2xl mb-2">⚠️</span>
                    <span class="text-white/50 text-xs font-mono">Video Unavailable</span>
                </div>`;
        } else {
            let thumbUrl = work.url.split("?")[0];
            if (work.url.includes("imgix.net")) {
                thumbUrl = thumbUrl + "?w=400&q=40&auto=format";
            }
            mediaHtml = `<img ${isEager ? `src="${thumbUrl}"` : `data-src="${thumbUrl}"`} loading="${isEager ? 'eager' : 'lazy'}" alt="${work.title}" class="w-full h-full object-cover" onload="window.vaultImagesLoaded = (window.vaultImagesLoaded || 0) + 1" onerror="window.handleGridImageError(this)">`;
        }
        
        // Tags overlay details (Role and Tools)
        const tags = Array.isArray(work.tags) ? work.tags : (work.tags ? work.tags.split(",").map(t => t.trim()) : []);
        const keyTools = tags.slice(0, 3).map(tag => `
            <span class="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-[8px] text-white/80 font-mono tracking-tight">${tag}</span>
        `).join("");
        const toolsContainer = keyTools ? `<div class="flex flex-wrap gap-1 mt-1.5">${keyTools}</div>` : '';
        
        i.innerHTML = `
            ${mediaHtml}
            <div class="category-badge" style="color: ${outcomeColor}; border-color: ${outcomeColor}30; background-color: ${outcomeColor}10;">
                ${mappedCat}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 pointer-events-none z-10">
                <span class="text-[9px] font-bold tracking-widest uppercase mb-1" style="color: ${outcomeColor}">${mappedCat}</span>
                <h4 class="text-white text-xs md:text-sm font-bold leading-tight truncate">${work.title}</h4>
                <p class="text-white/50 text-[9px] mt-1 font-medium">Role: <span class="text-white/85 font-semibold">${work.role || 'Creator'}</span></p>
                ${toolsContainer}
            </div>
        `;
        
        galleryGrid.appendChild(i);
        
        if (!isEager && !isTypographic) {
            galleryObserver.observe(i);
        }
    }
    
    visibleGalleryItems = Array.from(document.querySelectorAll(".gallery-item"));
    galleryInitialized = !0;
    
    document.querySelectorAll(".gallery-item").forEach(item => {
        item.addEventListener("click", () => {
            openProjectModal(item);
        });
    });

    if (!searchSortBound) {
        const searchInput = document.getElementById("vault-search");
        const sortSelect = document.getElementById("vault-sort");
        if (searchInput) {
            searchInput.addEventListener("input", filterAndSortVault);
        }
        if (sortSelect) {
            sortSelect.addEventListener("change", filterAndSortVault);
        }
        searchSortBound = true;
    }

    initFeaturedWorks();
}

function initFeaturedWorks() {
    const featuredGrid = document.getElementById("featured-works-grid");
    if (!featuredGrid) return;
    featuredGrid.innerHTML = "";
    
    const featuredTitles = [
        "Sweet Touch Ventures",
        "Character FX Simulation",
        "Hypo Ad Campaign",
        "Presentation 1"
    ];
    
    let featuredWorks = galleryConfig.filter(w => w.featured === true || w.featured === "true");
    if (featuredWorks.length === 0) {
        featuredWorks = galleryConfig.filter(w => featuredTitles.includes(w.title));
    }
    if (featuredWorks.length === 0) {
        featuredWorks = galleryConfig.slice(0, 4);
    }
    
    featuredWorks = featuredWorks.slice(0, 4);
    
    featuredWorks.forEach(work => {
        const configIndex = galleryConfig.indexOf(work);
        const mappedCat = mapCategoryToOutcome(work.cat);
        const outcomeColor = getOutcomeColor(mappedCat);
        const isVideo = "video" === work.type || work.url.endsWith(".mp4");
        
        let mediaHtml = "";
        const isTypographic = !work.url || work.url.includes("placeholder") || work.url.trim() === "" || work.url.includes("missing");
        
        if (isTypographic) {
            mediaHtml = getTypographicFallbackHTML(work.title, mappedCat, outcomeColor);
        } else if (isVideo) {
            mediaHtml = `<video src="${work.url}" muted loop playsinline preload="metadata" class="w-full h-full object-cover" onmouseover="this.play()" onmouseout="this.pause()"></video>`;
        } else if (work.type === "iframe") {
            const thumbUrl = `https://image.thum.io/get/width/400/crop/800/noanimate/${work.url}`;
            mediaHtml = `<img src="${thumbUrl}" class="w-full h-full object-cover" loading="lazy">`;
        } else {
            let thumbUrl = work.url.split("?")[0];
            if (work.url.includes("imgix.net")) {
                thumbUrl = thumbUrl + "?w=400&q=50&auto=format";
            }
            mediaHtml = `<img src="${thumbUrl}" class="w-full h-full object-cover" loading="lazy">`;
        }
        
        const tags = Array.isArray(work.tags) ? work.tags : (work.tags ? work.tags.split(",").map(t => t.trim()) : []);
        const keyTools = tags.slice(0, 3).map(tag => `
            <span class="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-[8px] text-white/80 font-mono tracking-tight">${tag}</span>
        `).join("");
        const toolsContainer = keyTools ? `<div class="flex flex-wrap gap-1 mt-1.5">${keyTools}</div>` : '';
        
        const card = document.createElement("div");
        card.className = "featured-item relative bg-gray-900/40 rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-[280px]";
        card.setAttribute("data-index", configIndex);
        card.setAttribute("data-title", work.title);
        card.setAttribute("data-cat", mappedCat);
        
        card.innerHTML = `
            <div class="relative w-full h-[55%] overflow-hidden bg-black/40">
                ${mediaHtml}
            </div>
            <div class="p-4 flex flex-col justify-between flex-1 bg-gradient-to-b from-transparent to-black/60">
                <div>
                    <div class="flex items-center gap-1.5 mb-1">
                        <span class="px-1.5 py-0.5 rounded-[4px] text-[7px] font-bold tracking-widest uppercase" style="color: ${outcomeColor}; border: 1px solid ${outcomeColor}30; background: ${outcomeColor}08">
                            ${mappedCat}
                        </span>
                        <span class="text-[7px] text-[#bf5af2] border border-[#bf5af2]/30 bg-[#bf5af2]/08 px-1.5 py-0.5 rounded-[4px] font-bold tracking-widest uppercase flex items-center gap-0.5">
                            <svg class="w-1.5 h-1.5 text-[#bf5af2]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                            FEATURED
                        </span>
                    </div>
                    <h4 class="text-white text-xs font-bold truncate">${work.title}</h4>
                    <p class="text-white/50 text-[9px] mt-0.5">Role: <span class="text-white/85 font-medium">${work.role || 'Lead Creator'}</span></p>
                </div>
                ${toolsContainer}
            </div>
        `;
        
        card.addEventListener("click", () => {
            openProjectModal(configIndex);
        });
        
        featuredGrid.appendChild(card);
    });
    
    const featuredSection = document.getElementById("featured-works-section");
    const searchVal = document.getElementById("vault-search")?.value || "";
    if (featuredSection && currentFilter === "ALL" && !searchVal) {
        featuredSection.classList.remove("hidden");
        featuredSection.style.opacity = "1";
        featuredSection.style.height = "auto";
    }
}

function filterAndSortVault() {
    const items = Array.from(document.querySelectorAll("#gallery-grid-content .gallery-item"));
    if (items.length === 0) return;

    const searchVal = (document.getElementById("vault-search")?.value || "").toLowerCase().trim();
    const sortVal = document.getElementById("vault-sort")?.value || "newest";

    let visibleItems = [];
    let hiddenItems = [];

    items.forEach(item => {
        const index = parseInt(item.getAttribute("data-index"));
        const work = galleryConfig[index];
        if (!work) return;

        const mappedOutcome = mapCategoryToOutcome(work.cat);
        const titleMatches = work.title.toLowerCase().includes(searchVal);
        const toolMatches = (work.tags || []).some(tag => tag.toLowerCase().includes(searchVal));
        const roleMatches = (work.role || "").toLowerCase().includes(searchVal);
        const searchMatches = !searchVal || titleMatches || toolMatches || roleMatches;

        const catMatches = currentFilter === "ALL" || mappedOutcome === currentFilter;

        if (searchMatches && catMatches) {
            visibleItems.push(item);
        } else {
            hiddenItems.push(item);
        }
    });

    hiddenItems.forEach(item => {
        gsap.to(item, {
            scale: 0.85, 
            opacity: 0, 
            duration: 0.2, 
            ease: "power2.in", 
            onComplete: () => {
                item.style.display = "none";
            }
        });
    });

    visibleItems.sort((a, b) => {
        const indexA = parseInt(a.getAttribute("data-index"));
        const indexB = parseInt(b.getAttribute("data-index"));
        const workA = galleryConfig[indexA];
        const workB = galleryConfig[indexB];

        if (sortVal === "newest") {
            return indexA - indexB;
        } else if (sortVal === "oldest") {
            return indexB - indexA;
        } else if (sortVal === "alphabetical") {
            return (workA.title || "").localeCompare(workB.title || "");
        }
        return 0;
    });

    const grid = document.getElementById("gallery-grid-content");
    visibleItems.forEach(item => {
        grid.appendChild(item);
        item.style.display = "block";
        gsap.to(item, { 
            scale: 1, 
            opacity: 1, 
            duration: 0.3, 
            ease: "power2.out" 
        });
    });

    const countElement = document.getElementById("gallery-count");
    if (countElement) {
        countElement.textContent = `${visibleItems.length} Creative Work${visibleItems.length === 1 ? '' : 's'}`;
    }

    const featuredSection = document.getElementById("featured-works-section");
    if (featuredSection) {
        if (currentFilter === "ALL" && !searchVal) {
            featuredSection.classList.remove("hidden");
            gsap.to(featuredSection, { opacity: 1, height: "auto", duration: 0.4 });
        } else {
            gsap.to(featuredSection, { 
                opacity: 0, 
                height: 0, 
                duration: 0.3, 
                onComplete: () => featuredSection.classList.add("hidden") 
            });
        }
    }

    const existingMsg = document.getElementById('empty-category-msg');
    if (existingMsg) existingMsg.remove();

    if (visibleItems.length === 0) {
        const msg = document.createElement('div');
        msg.id = 'empty-category-msg';
        msg.className = 'col-span-full py-20 text-center flex flex-col items-center justify-center';
        msg.innerHTML = `
            <svg class="w-12 h-12 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 class="text-xl font-bold text-white mb-2">No projects found</h3>
            <p class="text-white/60 max-w-sm mx-auto text-xs">We couldn't find any projects matching your search criteria. Try a different query.</p>
        `;
        grid.appendChild(msg);
        gsap.fromTo(msg, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
    }

    visibleGalleryItems = visibleItems;

    if (typeof ScrollTrigger !== "undefined") {
        setTimeout(() => ScrollTrigger.refresh(), 300);
    }
}

const galleryModal = document.getElementById("full-gallery-modal"), openGalleryBtns = [document.getElementById("open-gallery-hero"), document.getElementById("open-gallery-main")], closeGalleryBtn = document.getElementById("close-gallery");
openGalleryBtns.forEach(e => {
    e && e.addEventListener("click", (evt) => {
        if (galleryModal) {
            initVaultFilters();
            initGallery();
            galleryModal.classList.add("active");
            document.body.style.overflow = "hidden";
            if (window.lenis) window.lenis.stop();
            gsap.fromTo(".gallery-item", {
                y: 30, opacity: 0
            }, {
                y: 0, opacity: 1, duration: .4, stagger: .03, delay: .1
            });
        }
    });
});

if (closeGalleryBtn) {
    closeGalleryBtn.addEventListener("click", () => {
        if (galleryModal) {
            galleryModal.classList.remove("active");
        }
        document.body.style.overflow = "auto";
        if (window.lenis) window.lenis.start();
    });
}
const lightbox = document.getElementById("lightbox-modal"), lbImg = document.getElementById("lightbox-img"), lbVideo = document.getElementById("lightbox-video"), lbIframe = document.getElementById("lightbox-iframe"), lbTitle = document.getElementById("lightbox-title"), lbCat = document.getElementById("lightbox-cat"), lbError = document.getElementById("lightbox-error");
let currentLbIndex = 0;
const allGalleryItems = document.querySelectorAll(".gallery-item");
function openLightbox(e) {
    currentLbIndex = visibleGalleryItems.indexOf(e), updateLightboxContent(), lightbox.classList.add("active")
}
function updateLightboxContent() {
    if (currentLbIndex < 0 || currentLbIndex >= visibleGalleryItems.length) return;
    
    // 1. Detach event handlers first to prevent asynchronous onerror calls when clearing src
    lbImg.onerror = null;
    lbVideo.onerror = null;
    lbVideo.oncanplay = null;
    if (lbIframe) lbIframe.onload = null;

    // 2. Clear sources and hide everything
    lbVideo.src = "";
    lbImg.src = "";
    if (lbIframe) lbIframe.src = "";
    
    lbImg.classList.add("hidden");
    lbImg.style.display = "none";
    lbVideo.classList.add("hidden");
    lbVideo.style.display = "none";
    if (lbIframe) {
        lbIframe.classList.add("hidden");
        lbIframe.style.display = "none";
    }
    lbError.classList.add("hidden");
    lbError.style.display = "none";
    
    // 3. Load next item data
    const e = visibleGalleryItems[currentLbIndex];
    let t = e.getAttribute("data-url"), a = t.split("?")[0];
    const r = e.getAttribute("data-type"), i = e.getAttribute("data-title"), o = e.getAttribute("data-cat");
    lbTitle.innerText = i, lbCat.innerText = o;

    if ("iframe" === r && lbIframe) {
        lbIframe.classList.remove("hidden");
        lbIframe.style.display = "block";
        lbIframe.src = t + "?embed";
    } else if ("video" === r) {
        lbVideo.classList.remove("hidden");
        // Attach event handlers BEFORE setting src
        lbVideo.onerror = function () {
            lbVideo.style.display = "none";
            lbVideo.classList.add("hidden");
            lbError.classList.remove("hidden");
            lbError.style.display = "flex";
        };
        lbVideo.oncanplay = function () {
            lbVideo.style.display = "block";
            lbVideo.play().catch(err => console.log("Video play was interrupted or auto-play prevented:", err));
        };
        lbVideo.src = t;
        lbVideo.load();
    } else {
        lbImg.classList.remove("hidden");
        lbImg.style.display = "block";
        if (a.includes("imgix.net")) {
            a += "?w=1200&q=75&auto=format";
        }
        // Attach event handlers BEFORE setting src
        lbImg.onerror = function () {
            lbImg.classList.add("hidden");
            lbImg.style.display = "none";
            lbError.classList.remove("hidden");
            lbError.style.display = "flex";
        };
        lbImg.src = a;
    }
    
    const n = e.getAttribute("data-project-url");
    let s = document.getElementById("lightbox-link-btn");
    n ? (s || (s = document.createElement("a"), s.id = "lightbox-link-btn", s.className = "mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/30", s.target = "_blank", s.rel = "noopener noreferrer", s.innerHTML = '\n                <span>Visit Project</span>\n                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>\n            ', lbCat.parentNode.appendChild(s)), s.href = n, s.style.display = "inline-flex") : s && (s.style.display = "none");
}
function nextLightboxItem() {
    currentLbIndex = (currentLbIndex + 1) % visibleGalleryItems.length, updateLightboxContent()
}
function prevLightboxItem() {
    currentLbIndex = (currentLbIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length, updateLightboxContent()
}
function closeLightbox() {
    lightbox.classList.remove("active");
    lbVideo.pause();
    lbVideo.onerror = null;
    lbVideo.oncanplay = null;
    lbImg.onerror = null;
    lbVideo.currentTime = 0;
    lbVideo.src = "";
    lbImg.src = "";
    if (lbIframe) lbIframe.src = "";
}
// Modal navigation & keyboard controls
document.addEventListener("keydown", e => {
    if (projectModal?.classList.contains("active")) {
        if ("ArrowRight" === e.key || "ArrowUp" === e.key) {
            e.preventDefault();
            nextProjectFunc();
        } else if ("ArrowLeft" === e.key || "ArrowDown" === e.key) {
            e.preventDefault();
            prevProjectFunc();
        } else if ("Escape" === e.key) {
            e.preventDefault();
            closeProjectModal();
        }
    }
});

// Modal tab logic
const tabOverviewBtn = document.getElementById("tab-btn-overview");
const tabCaseBtn = document.getElementById("tab-btn-case");
const tabOverviewPane = document.getElementById("tab-content-overview");
const tabCasePane = document.getElementById("tab-content-case");

if (tabOverviewBtn && tabCaseBtn && tabOverviewPane && tabCasePane) {
    tabOverviewBtn.addEventListener("click", () => {
        tabOverviewBtn.classList.add("active", "border-blue-500");
        tabOverviewBtn.classList.remove("border-transparent", "text-white/50");
        tabCaseBtn.classList.remove("active", "border-blue-500");
        tabCaseBtn.classList.add("border-transparent", "text-white/50");
        
        tabOverviewPane.classList.remove("hidden");
        tabCasePane.classList.add("hidden");
    });

    tabCaseBtn.addEventListener("click", () => {
        tabCaseBtn.classList.add("active", "border-blue-500");
        tabCaseBtn.classList.remove("border-transparent", "text-white/50");
        tabOverviewBtn.classList.remove("active", "border-blue-500");
        tabOverviewBtn.classList.add("border-transparent", "text-white/50");
        
        tabCasePane.classList.remove("hidden");
        tabOverviewPane.classList.add("hidden");
    });
}

// Navbar shortcuts listeners
const navShortcutsBtn = document.getElementById("nav-shortcuts-btn");
const navShortcutsMobile = document.getElementById("nav-shortcuts-mobile");
navShortcutsBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openShortcuts();
});
navShortcutsMobile?.addEventListener("click", (e) => {
    e.preventDefault();
    openShortcuts();
});

gsap.utils.toArray(".anim-heading").forEach(e => {
    gsap.to(e, {
        scrollTrigger: {
            trigger: e, start: "top 85%", once: !0
        }
        , y: 0, opacity: 1, duration: 1.2, ease: "expo.out"
    }
    )
}
), gsap.utils.toArray(".anim-text").forEach(e => {
    gsap.to(e, {
        scrollTrigger: {
            trigger: e, start: "top 90%", once: !0
        }
        , y: 0, opacity: 1, duration: 1, ease: "power4.out"
    }
    )
}
), gsap.utils.toArray(".anim-stagger").forEach((e, t) => {
    gsap.to(e, {
        scrollTrigger: {
            trigger: e, start: "top 90%", once: !0
        }
        , y: 0, opacity: 1, duration: .8, delay: .1 * t, ease: "back.out(1.2)"
    }
    )
}
);
const bubble = document.getElementById("identity-bubble"), trigger = document.querySelector(".identity-trigger"), identities = ["Aiyedun Samuel", "Visual Engineer", "Samsco Personal"];
let idInterval, idIndex = 0;
trigger && bubble && (trigger.addEventListener("mouseenter", () => {
    idInterval = setInterval(() => {
        idIndex = (idIndex + 1) % identities.length, bubble.innerText = identities[idIndex]
    }
        , 1500)
}
), trigger.addEventListener("mouseleave", () => {
    clearInterval(idInterval), bubble.innerText = "Aiyedun Samuel"
}
));
const wheelStage = document.getElementById("wheel-stage"), circularWheel = document.getElementById("circular-wheel"), wheelCards = document.querySelectorAll(".wheel-card"), detailsPanel = document.getElementById("wheel-details-panel"), wdTitle = document.getElementById("wd-title"), wdCat = document.getElementById("wd-category"), wdDesc = document.getElementById("wd-desc"), wdClient = document.getElementById("wd-client"), wdYear = document.getElementById("wd-year"), wdTags = document.getElementById("wd-tags");
if (circularWheel && wheelCards.length > 0) {
    const e = 280, t = 350, a = 360 / wheelCards.length;
    wheelCards.forEach((r, i) => {
        const o = i * a, n = o * Math.PI / 180, s = t + e * Math.cos(n), l = t + e * Math.sin(n);
        gsap.set(r, {
            left: s, top: l, xPercent: -50, yPercent: -50
        }
        ), r.dataset.initialAngle = o
    }
    ), gsap.to(circularWheel, {
        rotation: 360, transformOrigin: "center center", ease: "none", scrollTrigger: {
            trigger: "#portfolio", pin: !0, start: "top top", end: "+=1500", scrub: .5, anticipatePin: 1, invalidateOnRefresh: !0, onUpdate: e => {
                updateActiveCard(360 * e.progress)
            }

        }

    }
    );
    let r = -1;
    function updateActiveCard(e) {
        let t = (-e % 360 + 360) % 360, a = 0, i = 360;
        wheelCards.forEach((e, r) => {
            const o = parseFloat(e.dataset.initialAngle);
            let n = Math.abs(o - t);
            n > 180 && (n = 360 - n), n < i && (i = n, a = r)
        }
        ), a !== r && (updateDetails(a), highlightCard(a), r = a)
    }
    function highlightCard(e) {
        wheelCards.forEach((t, a) => {
            a === e ? gsap.to(t, {
                scale: 1.25, filter: "brightness(1.1) drop-shadow(0 0 20px rgba(59,130,246,0.5))", zIndex: 10, borderColor: "#3b82f6", duration: .5, ease: "back.out(1.7)"
            }
            ) : gsap.to(t, {
                scale: .85, filter: "brightness(0.4) grayscale(0.3)", zIndex: 1, borderColor: "rgba(255,255,255,0.1)", duration: .4, ease: "power3.out"
            }
            )
        }
        )
    }
    let i = !1;
    function updateDetails(e) {
        const t = wheelCards[e];
        if (!t || i) return;
        i = !0;
        const a = {
            title: t.getAttribute("data-title"), cat: t.getAttribute("data-category"), client: t.getAttribute("data-client"), year: t.getAttribute("data-year"), desc: t.getAttribute("data-desc"), tags: t.getAttribute("data-tags").split(",")
        }
            ;
        gsap.timeline({
            onComplete: () => {
                i = !1
            }

        }
        ).to([wdTitle, wdCat], {
            opacity: 0, x: -20, duration: .2, ease: "power2.in", stagger: .03
        }
        ).to([wdClient, wdYear, wdDesc], {
            opacity: 0, duration: .15, ease: "power2.in"
        }
            , "<0.05").to(wdTags, {
                opacity: 0, duration: .1, ease: "power2.in"
            }
                , "<").call(() => {
                    wdTitle.innerText = a.title, wdCat.innerText = a.cat, wdClient.innerText = a.client || "Private", wdYear.innerText = a.year || "2024", wdDesc.innerText = a.desc, wdTags.innerHTML = "", a.tags.forEach(e => {
                        const t = document.createElement("span");
                        t.className = "px-3 py-1 bg-white/10 border border-white/5 rounded-full text-xs text-blue-300", t.innerText = e.trim(), wdTags.appendChild(t)
                    }
                    )
                }
                ).to([wdTitle, wdCat], {
                    opacity: 1, x: 0, duration: .35, ease: "expo.out", stagger: .05
                }
                ).to([wdClient, wdYear], {
                    opacity: 1, duration: .25, ease: "power2.out"
                }
                    , "<0.1").to(wdDesc, {
                        opacity: 1, duration: .3, ease: "power2.out"
                    }
                        , "<0.05").to(wdTags, {
                            opacity: 1, duration: .25, ease: "power2.out"
                        }, "<0.1")
    }
    updateActiveCard(0)
}
function generateContextualDescription(title, cat, field, tags = []) {
    const defaultDescriptions = {
        overview: {
            "Graphics Design": `A strategic branding project designed to establish a memorable identity. This project focuses on cohesive visual language, distinct color palettes, and typographic excellence to ensure brand retention and authority.`,
            "3D & VFX": `An immersive 3D and VFX production showcasing advanced simulations and spatial environments. Built using industry-standard techniques to deliver visual impact, high-fidelity render quality, and dynamic motion.`,
            "Video Editing": `A high-conversion marketing asset optimized for digital campaigns and social media channels. Designed to capture viewer attention, communicate key brand messaging in seconds, and maximize user click-through rates.`,
            "Social Management": `A high-conversion marketing asset optimized for digital campaigns and social media channels. Designed to capture viewer attention, communicate key brand messaging in seconds, and maximize user click-through rates.`,
            "Coding & Data Analytics": `A high-performance digital interface blending robust front-end engineering with immersive UI/UX. Designed for seamless responsiveness, quick loading times, and engaging user interactions.`,
            "Website": `A high-performance digital interface blending robust front-end engineering with immersive UI/UX. Designed for seamless responsiveness, quick loading times, and engaging user interactions.`,
            "AI": `An artificial intelligence workflow or automation designed to streamline operations and enhance creativity. Showcases the integration of generative AI pipelines to create custom digital assets and media.`,
            "Presentations": `A compelling visual strategy pitch presentation designed to communicate business value and design direction. Crafted to align stakeholders and win creative mandates through structured storytelling.`
        },
        problem: {
            "Graphics Design": `the client needed to establish a strong presence in a highly competitive market, requiring a brand identity that stands out while conveying credibility and trust.`,
            "3D & VFX": `the challenge was to render a complex, dynamic environment with high realistic detail and physical simulation accuracy while maintaining stable performance.`,
            "Video Editing": `the campaign required attention-grabbing assets that stand out in crowded feeds and drive user engagement within a 3-second window.`,
            "Social Management": `the campaign required attention-grabbing assets that stand out in crowded feeds and drive user engagement within a 3-second window.`,
            "Coding & Data Analytics": `the project demanded a complex, responsive web layout that remains fluid and fast-loading even when loading heavy media assets.`,
            "Website": `the project demanded a complex, responsive web layout that remains fluid and fast-loading even when loading heavy media assets.`,
            "AI": `integrating complex generative models into a seamless content pipeline while keeping creative output consistent and customizable.`,
            "Presentations": `translating intricate business models and design guidelines into a clear, visually arresting presentation for executive decision-makers.`
        },
        process: {
            "Graphics Design": `Conducted deep market research followed by visual moodboarding, sketching, vector design, and rigorous testing across multiple digital and print mediums.`,
            "3D & VFX": `Created geometry, refined material shaders, set up realistic dynamic lighting, simulated motion physics, and post-processed using advanced rendering pipelines.`,
            "Video Editing": `Analyzed audience metrics to design key hook points, refined editing pacing, implemented typography overlays, and designed platform-specific aspect ratios.`,
            "Social Management": `Analyzed audience metrics to design key hook points, refined editing pacing, implemented typography overlays, and designed platform-specific aspect ratios.`,
            "Coding & Data Analytics": `Structured semantic HTML, implemented responsive CSS architectures, added smooth scrolling scripts, and optimized image compression for speed.`,
            "Website": `Structured semantic HTML, implemented responsive CSS architectures, added smooth scrolling scripts, and optimized image compression for speed.`,
            "AI": `Constructed custom model prompts, chained generative pipelines, and manually edited outputs to match the visual branding guidelines.`,
            "Presentations": `Synthesized core brand messaging, designed structured layout templates, edited copywriting, and added custom visual assets.`
        },
        result: {
            "Graphics Design": `delivered a complete, scalable brand book containing color guidelines, logo variations, and typography tokens, receiving outstanding praise from the client.`,
            "3D & VFX": `achieved a high-end rendered asset with smooth physical animations that serves as a cornerstone of the client's creative portfolio.`,
            "Video Editing": `generated significant user interaction and click-through rates, boosting the digital campaign's organic reach and conversion metrics.`,
            "Social Management": `generated significant user interaction and click-through rates, boosting the digital campaign's organic reach and conversion metrics.`,
            "Coding & Data Analytics": `launched a fast, responsive web experience scoring high on performance audits, resulting in prolonged user session times.`,
            "Website": `launched a fast, responsive web experience scoring high on performance audits, resulting in prolonged user session times.`,
            "AI": `successfully accelerated the creative asset generation pipeline, demonstrating a practical approach to modern AI workflows.`,
            "Presentations": `presented a winning deck that secured client approval and set a clear visual roadmap for the upcoming development cycles.`
        }
    };

    const outcome = mapCategoryToOutcome(cat);
    const categoryGroup = defaultDescriptions[field];
    
    if (categoryGroup && categoryGroup[outcome]) {
        let text = categoryGroup[outcome];
        
        if (field === "overview") {
            text = text.replace("A strategic branding project", `"${title}" is a strategic branding project`);
            text = text.replace("An immersive 3D and VFX production", `"${title}" is an immersive 3D and VFX production`);
            text = text.replace("A high-conversion marketing asset", `"${title}" is a high-conversion marketing asset`);
            text = text.replace("A high-performance digital interface", `"${title}" is a high-performance digital interface`);
            text = text.replace("An artificial intelligence workflow", `"${title}" is an artificial intelligence workflow`);
            text = text.replace("A compelling visual strategy pitch", `"${title}" is a compelling visual strategy pitch`);
            return text;
        }
        
        if (field === "problem") {
            return `For the "${title}" project, ${text}`;
        }
        
        if (field === "process") {
            let processedText = text;
            if (tags && tags.length > 0) {
                const toolsList = tags.slice(0, 3).join(", ");
                processedText += ` The workflow was executed and optimized using ${toolsList}.`;
            }
            return processedText;
        }
        
        if (field === "result") {
            return `Ultimately, the execution of "${title}" ${text}`;
        }
    }

    const fallbackText = {
        overview: `"${title}" showcases high-quality technical implementation and strategic creative direction, designed to meet modern standards of digital excellence.`,
        problem: `The primary objective for "${title}" was to solve a complex creative brief, delivering a polished solution under tight execution constraints.`,
        process: `The methodology involved research, iterative sketching, asset design, and progressive optimization to ensure the final output is highly refined.${tags && tags.length > 0 ? ' The workflow utilized ' + tags.slice(0,3).join(', ') + '.' : ''}`,
        result: `The final asset successfully met all project goals, establishing a high-end design pattern and satisfying all client expectations.`
    };

    return fallbackText[field];
}

const projectModal = document.getElementById("project-modal"), closeModalBtn = document.getElementById("close-modal"), prevBtn = document.getElementById("prev-project"), nextBtn = document.getElementById("next-project"), mTitle = document.getElementById("modal-title"), mCat = document.getElementById("modal-category"), mDesc = document.getElementById("modal-desc"), mClient = document.getElementById("modal-client"), mYear = document.getElementById("modal-year"), mRole = document.getElementById("modal-role"), mTags = document.getElementById("modal-tags");

function openProjectModal(indexOrEl) {
    let configIndex = 0;
    if (typeof indexOrEl === 'object' && indexOrEl.getAttribute) {
        // Passed DOM element
        configIndex = parseInt(indexOrEl.getAttribute("data-index"));
        currentLbIndex = visibleGalleryItems.indexOf(indexOrEl);
    } else {
        // Passed visible index
        const visibleIndex = parseInt(indexOrEl);
        if (visibleIndex >= 0 && visibleIndex < visibleGalleryItems.length) {
            currentLbIndex = visibleIndex;
            configIndex = parseInt(visibleGalleryItems[visibleIndex].getAttribute("data-index"));
        } else {
            configIndex = parseInt(indexOrEl);
            currentLbIndex = 0;
        }
    }
    
    const work = galleryConfig[configIndex];
    if (!work) return;

    const mappedCat = mapCategoryToOutcome(work.cat);

    mTitle.innerText = work.title;
    mCat.innerText = mappedCat;
    mClient.innerText = work.client || "Private Client";
    mYear.innerText = work.year || "2024";
    mRole.innerText = work.role || "Creative Lead";

    // Tech Stack Tags
    const tags = Array.isArray(work.tags) ? work.tags : (work.tags ? work.tags.split(",").map(t => t.trim()) : []);
    mTags.innerHTML = "";
    tags.forEach(tag => {
        if (!tag) return;
        const span = document.createElement("span");
        span.className = "px-2.5 py-0.5 bg-white/5 border border-white/5 rounded-full text-[10px] text-blue-300 tracking-wide font-mono";
        span.innerText = tag;
        mTags.appendChild(span);
    });

    // Description fallback
    const rawDesc = work.desc ? work.desc.trim() : "";
    if (!rawDesc || rawDesc === "Description goes here...") {
        mDesc.innerText = "--";
    } else {
        mDesc.innerText = rawDesc;
    }

    // Case Study fields
    const mProblem = document.getElementById("modal-problem");
    const mProcess = document.getElementById("modal-process");
    const mResult = document.getElementById("modal-result");
    const mDemoLink = document.getElementById("modal-demo-link");
    const mProjectLink = document.getElementById("modal-project-link");

    // Problem fallback
    const rawProblem = work.problem ? work.problem.trim() : "";
    if (!rawProblem || rawProblem === "Details on goals and challenges...") {
        if (mProblem) mProblem.innerText = "--";
    } else {
        if (mProblem) mProblem.innerText = rawProblem;
    }

    // Process fallback
    const rawProcess = work.process ? work.process.trim() : "";
    if (!rawProcess || rawProcess === "Details on optimization, scripts, techniques...") {
        if (mProcess) mProcess.innerText = "--";
    } else {
        if (mProcess) mProcess.innerText = rawProcess;
    }

    // Result fallback
    const rawResult = work.result ? work.result.trim() : "";
    if (!rawResult || rawResult === "Outcome, metrics, and details...") {
        if (mResult) mResult.innerText = "--";
    } else {
        if (mResult) mResult.innerText = rawResult;
    }

    // Action buttons
    if (mDemoLink) {
        if (work.demoUrl) {
            mDemoLink.href = work.demoUrl;
            mDemoLink.style.display = "inline-flex";
            mDemoLink.classList.remove("hidden");
        } else {
            mDemoLink.style.display = "none";
            mDemoLink.classList.add("hidden");
        }
    }
    if (mProjectLink) {
        if (work.projectUrl) {
            mProjectLink.href = work.projectUrl;
            mProjectLink.style.display = "inline-flex";
            mProjectLink.classList.remove("hidden");
        } else {
            mProjectLink.style.display = "none";
            mProjectLink.classList.add("hidden");
        }
    }

    // Media Handling (image, video, iframe)
    const mImg = document.getElementById("modal-img");
    const mVideo = document.getElementById("modal-video");
    const mIframe = document.getElementById("modal-iframe");
    const mError = document.getElementById("modal-media-error");

    if (mImg && mVideo && mIframe) {
        // Reset src
        mImg.src = "";
        mVideo.src = "";
        mIframe.src = "";

        // Hide all
        mImg.classList.add("hidden");
        mVideo.classList.add("hidden");
        mIframe.classList.add("hidden");
        if (mError) mError.classList.add("hidden");

        const mediaType = work.type || (work.url.endsWith(".mp4") ? "video" : "image");
        if (mediaType === "iframe") {
            mIframe.classList.remove("hidden");
            mIframe.src = work.url + "?embed";
        } else if (mediaType === "video") {
            mVideo.classList.remove("hidden");
            mVideo.src = work.url;
            mVideo.load();
            mVideo.play().catch(err => console.log("Video auto-play blocked:", err));
        } else {
            mImg.classList.remove("hidden");
            let cleanUrl = work.url.split("?")[0];
            if (cleanUrl.includes("imgix.net")) {
                cleanUrl += "?w=1200&q=75&auto=format";
            }
            mImg.src = cleanUrl;
        }
    }

    // Set Active Tab to Overview
    const tabOverviewBtn = document.getElementById("tab-btn-overview");
    const tabCaseBtn = document.getElementById("tab-btn-case");
    const tabOverviewPane = document.getElementById("tab-content-overview");
    const tabCasePane = document.getElementById("tab-content-case");

    if (tabOverviewBtn && tabCaseBtn && tabOverviewPane && tabCasePane) {
        tabOverviewBtn.classList.add("active", "border-blue-500");
        tabOverviewBtn.classList.remove("border-transparent", "text-white/50");
        tabCaseBtn.classList.remove("active", "border-blue-500");
        tabCaseBtn.classList.add("border-transparent", "text-white/50");
        
        tabOverviewPane.classList.remove("hidden");
        tabCasePane.classList.add("hidden");
    }

    projectModal.classList.add("active");
    projectModal.classList.remove("opacity-0", "pointer-events-none");
    const modalContent = projectModal.querySelector(".modal-content");
    if (modalContent) {
        modalContent.classList.remove("scale-95");
        modalContent.classList.add("scale-100");
    }
    document.body.style.overflow = "hidden";
    if (window.lenis) window.lenis.stop();
}

function closeProjectModal() {
    projectModal.classList.remove("active");
    projectModal.classList.add("opacity-0", "pointer-events-none");
    const modalContent = projectModal.querySelector(".modal-content");
    if (modalContent) {
        modalContent.classList.remove("scale-100");
        modalContent.classList.add("scale-95");
    }
    const mVideo = document.getElementById("modal-video");
    if (mVideo) {
        mVideo.pause();
        mVideo.src = "";
    }
    const mIframe = document.getElementById("modal-iframe");
    if (mIframe) mIframe.src = "";
    const mImg = document.getElementById("modal-img");
    if (mImg) mImg.src = "";

    document.body.style.overflow = "";
    if (window.lenis) window.lenis.start();
}

function nextProjectFunc() {
    if (visibleGalleryItems.length === 0) return;
    let nextIndex = (currentLbIndex + 1) % visibleGalleryItems.length;
    openProjectModal(nextIndex);
}

function prevProjectFunc() {
    if (visibleGalleryItems.length === 0) return;
    let prevIndex = (currentLbIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
    openProjectModal(prevIndex);
}

closeModalBtn?.addEventListener("click", closeProjectModal);
nextBtn?.addEventListener("click", nextProjectFunc);
prevBtn?.addEventListener("click", prevProjectFunc);
projectModal?.addEventListener("click", e => {
    e.target === projectModal && closeProjectModal();
});
document.querySelectorAll(".magnetic-btn").forEach(e => {
        e.addEventListener("mousemove", t => {
            const a = e.getBoundingClientRect(), r = .5 * (t.clientX - a.left - a.width / 2), i = .5 * (t.clientY - a.top - a.height / 2);
            gsap.to(e, {
                x: r, y: i, duration: .3, ease: "power2.out"
            }
            )
        }
        ), e.addEventListener("mouseleave", () => {
            gsap.to(e, {
                x: 0, y: 0, duration: .5, ease: "elastic.out(1, 0.3)"
            }
            )
        }
        )
    }
    )

const menuBtn = document.getElementById("menu-btn"), closeMenuBtn = document.getElementById("close-menu"), mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => mobileMenu.classList.add("active")), closeMenuBtn.addEventListener("click", () => mobileMenu.classList.remove("active")), document.querySelectorAll(".mobile-link").forEach(e => e.addEventListener("click", () => mobileMenu.classList.remove("active")));
const ctxMenu = document.getElementById("custom-context-menu");
document.addEventListener("contextmenu", e => {
    e.preventDefault();
    let t = e.clientX, a = e.clientY;
    const r = window.innerWidth, i = window.innerHeight;
    t + 200 > r && (t = r - 200), a + 200 > i && (a = i - 200), ctxMenu.style.left = `${t
        }
px`, ctxMenu.style.top = `${a
        }
px`, ctxMenu.classList.add("visible")
}
), document.addEventListener("click", () => ctxMenu.classList.remove("visible")), document.addEventListener("scroll", () => ctxMenu.classList.remove("visible"), {
    passive: !0
}
);
let ticking = !1;
window.addEventListener("scroll", () => {
    ticking || (window.requestAnimationFrame(() => {
        const e = (window.pageYOffset || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        document.getElementById("scroll-progress").style.width = e + "%", ticking = !1
    }
    ), ticking = !0)
}
    , {
        passive: !0
    }
);
const isMobile = window.innerWidth < 768;
function startTextAnimation() {
    setInterval(rotateText, 4e3)
}
const preloader = document.getElementById("preloader"), loaderPercent = document.getElementById("loader-percent"), loaderBar = document.getElementById("loader-bar"), allImages = Array.from(document.querySelectorAll("img[src]")).map(e => e.src), criticalResources = ["./SAMSCO.jpg", "./me_3.jpg", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"];
let loadedCount = 0;
const totalResources = criticalResources.length + 2;
function updateProgress(e = 1) {
    loadedCount += e;
    const t = Math.min(Math.round(loadedCount / totalResources * 100), 100);
    return loaderPercent && (loaderPercent.textContent = t), loaderBar && (loaderBar.style.width = t + "%"), t
}
function preloadImage(e) {
    return new Promise(t => {
        const a = new Image;
        a.onload = () => {
            updateProgress(), t(!0)
        }
            , a.onerror = () => {
                updateProgress(), t(!1)
            }
            , a.src = e
    }
    )
}
function waitForFonts() {
    return new Promise(e => {
        document.fonts && document.fonts.ready ? document.fonts.ready.then(() => {
            updateProgress(), e()
        }
        ) : setTimeout(() => {
            updateProgress(), e()
        }
            , 300)
    }
    )
}
function waitForDOM() {
    return new Promise(e => {
        "complete" === document.readyState ? (updateProgress(), e()) : window.addEventListener("load", () => {
            updateProgress(), e()
        }
        )
    }
    )
}
function hidePreloader() {
    preloader && (loaderPercent && (loaderPercent.textContent = "100"), loaderBar && (loaderBar.style.width = "100%"), document.body.classList.add("loading"), setTimeout(() => {
        preloader.classList.add("exit"), document.body.classList.remove("loading"), document.body.classList.add("reveal-active"), setTimeout(finalizeLoad, 2200)
    }
        , 500))
}
function finalizeLoad() {
    preloader.style.display = "none", (document.body.style.overflow = "", window.lenis && window.lenis.start()), setTimeout(() => {
        document.body.classList.remove("reveal-active");
        const e = document.getElementById("main-content");
        e && (e.style.opacity = "", e.style.filter = "", e.style.transform = "");
        const t = document.getElementById("navbar");
        t && (t.style.opacity = "", t.style.transform = "")
    }
        , 500), startTextAnimation(), "undefined" != typeof ScrollTrigger && ScrollTrigger.refresh()
}
async function initializeApp() {
    if (window.isVaultPage) return; // Vault page handles its own preloader logic
    (document.body.style.overflow = "hidden", window.lenis && window.lenis.stop());
    const e = [...criticalResources.map(preloadImage), waitForFonts(), waitForDOM()];
    await Promise.all(e), hidePreloader()
}
initializeApp(), setTimeout(() => {
    if (window.isVaultPage) return;
    preloader && "none" !== preloader.style.display && hidePreloader()
}
    , 8e3);
const backToTopBtn = document.getElementById("back-to-top");
backToTopBtn && (window.addEventListener("scroll", () => {
    window.scrollY > 500 ? backToTopBtn.classList.add("visible") : backToTopBtn.classList.remove("visible")
}
    , {
        passive: !0
    }
), backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0, behavior: "smooth"
    }
    )
}
));
const mobileGalleryBtn = document.getElementById("open-gallery-mobile");
mobileGalleryBtn && mobileGalleryBtn.addEventListener("click", () => {
    const e = document.getElementById("full-gallery-modal");
    e && (e.classList.add("active"), (document.body.style.overflow = "hidden", window.lenis && window.lenis.stop()))
}
);
const navbar = document.getElementById("navbar");
navbar && window.addEventListener("scroll", () => {
    window.scrollY > 20 ? navbar.classList.add("scrolled") : navbar.classList.remove("scrolled")
}
    , {
        passive: !0
    }
);
const aboutImgContainer = document.getElementById("about-img-container");
if (aboutImgContainer && window.matchMedia("(min-width: 768px)").matches) {
    const s = aboutImgContainer.querySelector(".glass-card");
    s && (s.style.transition = "transform 0.2s ease-out", aboutImgContainer.addEventListener("mousemove", e => {
        const t = s.getBoundingClientRect(), a = e.clientX - t.left, r = e.clientY - t.top, i = t.width / 2, o = t.height / 2, n = (a - i) / i * 8, l = (o - r) / o * 8;
        s.style.transform = `perspective(1000px) rotateX(${l
            }
deg) rotateY(${n
            }
deg) scale(1.02)`
    }
    ), aboutImgContainer.addEventListener("mouseleave", () => {
        s.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
    }
    ))
}
const canvas = document.getElementById("particle-canvas");
if (canvas) {
    const l = canvas.getContext("2d");
    const mouse = { x: null, y: null };
    let c, d, g = [];
    const p = isMobile ? 15 : 45, u = 100;
    function resize() {
        c = window.innerWidth, d = window.innerHeight, canvas.width = c, canvas.height = d
    }
    window.addEventListener("resize", resize), resize(), window.addEventListener("mousemove", e => {
        mouse.x = e.clientX, mouse.y = e.clientY
    }
    );
    class m {
        constructor() {
            this.x = Math.random() * c, this.y = Math.random() * d, this.vx = .5 * (Math.random() - .5), this.vy = .5 * (Math.random() - .5), this.size = 2 * Math.random()
        }
        update() {
            if (this.x += this.vx, this.y += this.vy, (this.x < 0 || this.x > c) && (this.vx *= -1), (this.y < 0 || this.y > d) && (this.vy *= -1), null != mouse.x) {
                let e = mouse.x - this.x, t = mouse.y - this.y, a = Math.sqrt(e * e + t * t);
                if (a < 100) {
                    const r = (100 - a) / 100, i = e / a * r * .5, o = t / a * r * .5;
                    this.vx -= i, this.vy -= o
                }

            }

        }
        draw() {
            l.fillStyle = "rgba(255, 255, 255, 0.5)", l.beginPath(), l.arc(this.x, this.y, this.size, 0, 2 * Math.PI), l.fill()
        }

    }
    for (let h = 0;
        h < p;
        h++)g.push(new m);
        
    let animationFrameId = null;
    let isCanvasVisible = false;
    
    function animate() {
        if (!isCanvasVisible) {
            animationFrameId = null;
            return;
        }
        l.clearRect(0, 0, c, d);
        for (let e = 0;
            e < g.length;
            e++) {
            g[e].update(), g[e].draw();
            for (let t = e;
                t < g.length;
                t++) {
                let a = g[e].x - g[t].x, r = g[e].y - g[t].y, i = Math.sqrt(a * a + r * r);
                if (i < u) {
                    l.beginPath();
                    let a = 1 - i / u;
                    l.strokeStyle = `rgba(255, 255, 255, ${.15 * a})`;
                    l.lineWidth = 1;
                    l.moveTo(g[e].x, g[e].y);
                    l.lineTo(g[t].x, g[t].y);
                    l.stroke();
                }
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    const canvasObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            isCanvasVisible = entry.isIntersecting;
            if (isCanvasVisible) {
                if (!animationFrameId) {
                    animate();
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        });
    }, { threshold: 0.01 });
    
    canvasObserver.observe(canvas);
}
const counterElements = document.querySelectorAll(".counter-value");
let countersAnimated = !1;
function animateCounters() {
    countersAnimated || (counterElements.forEach(e => {
        const t = parseInt(e.getAttribute("data-target")), a = Date.now();
        !function r() {
            const i = Date.now() - a, o = Math.min(i / 2e3, 1), n = 1 - Math.pow(1 - o, 4), s = Math.floor(n * t);
            e.textContent = s.toLocaleString(), e.classList.add("counting"), o < 1 ? requestAnimationFrame(r) : (e.textContent = t.toLocaleString(), e.classList.remove("counting"))
        }
            ()
    }
    ), countersAnimated = !0)
}
if (counterElements.length > 0) {
    const y = document.getElementById("fun-stats");
    y && ScrollTrigger.create({
        trigger: y, start: "top 80%", onEnter: animateCounters, once: !0
    }
    )
}
let skillsTrigger = null;
function initSkillsAnimation() {
    if (skillsTrigger) skillsTrigger.kill();
    const skillItems = document.querySelectorAll(".skill-item");
    if (skillItems.length > 0) {
        const f = document.getElementById("skills");
        if (f && typeof ScrollTrigger !== "undefined") {
            skillsTrigger = ScrollTrigger.create({
                trigger: f, start: "top 70%", onEnter: () => {
                    skillItems.forEach((e, t) => {
                        setTimeout(() => {
                            e.classList.add("visible");
                            const fill = e.querySelector(".skill-bar-fill"), a = e.getAttribute("data-skill");
                            if (fill && a) fill.style.width = a + "%";
                        }
                            , 150 * t)
                    }
                    )
                }
                , once: !0
            });
        }
    }
}
initSkillsAnimation();

let timelineTrigger = null;
function initTimelineAnimation() {
    if (timelineTrigger) timelineTrigger.kill();
    const timelineItems = document.querySelectorAll(".timeline-item");
    if (timelineItems.length > 0 && typeof ScrollTrigger !== "undefined") {
        timelineTrigger = ScrollTrigger.create({
            trigger: ".timeline-container", start: "top 80%", onEnter: () => {
                timelineItems.forEach((e, t) => {
                    setTimeout(() => {
                        e.classList.add("visible")
                    }
                        , 200 * t)
                }
                )
            }
            , once: !0
        });
    }
}
initTimelineAnimation();
const themeDots = document.querySelectorAll(".theme-dot"), accentColors = {
    blue: {
        primary: "#0071e3", glow: "rgba(0, 113, 227, 0.4)", secondary: "#64d2ff"
    }
    , purple: {
        primary: "#bf5af2", glow: "rgba(191, 90, 242, 0.4)", secondary: "#5856d6"
    }
    , pink: {
        primary: "#ff375f", glow: "rgba(255, 55, 95, 0.4)", secondary: "#ff6b8a"
    }
    , green: {
        primary: "#30d158", glow: "rgba(48, 209, 88, 0.4)", secondary: "#64d2ff"
    }
    , orange: {
        primary: "#ff9f0a", glow: "rgba(255, 159, 10, 0.4)", secondary: "#ffcc00"
    }

}
    ;
function setAccentColor(e) {
    const t = accentColors[e];
    t && (document.documentElement.style.setProperty("--accent-blue", t.primary), document.documentElement.style.setProperty("--accent-blue-glow", t.glow), document.documentElement.style.setProperty("--accent-cyan", t.secondary), themeDots.forEach(t => {
        t.classList.remove("active"), t.getAttribute("data-accent") === e && t.classList.add("active")
    }
    ), localStorage.setItem("samsco-accent", e))
}
const savedAccent = localStorage.getItem("samsco-accent");
savedAccent && accentColors[savedAccent] && setAccentColor(savedAccent), themeDots.forEach(e => {
    e.addEventListener("click", () => {
        setAccentColor(e.getAttribute("data-accent"))
    }
    )
}
);
const shortcutsModal = document.getElementById("shortcuts-modal"), closeShortcutsBtn = document.getElementById("close-shortcuts");
function openShortcuts() {
    shortcutsModal.classList.add("active")
}
function closeShortcuts() {
    shortcutsModal.classList.remove("active")
}
closeShortcutsBtn && closeShortcutsBtn.addEventListener("click", closeShortcuts), shortcutsModal && shortcutsModal.addEventListener("click", e => {
    e.target === shortcutsModal && closeShortcuts()
}
), document.addEventListener("keydown", e => {
    if ("INPUT" !== e.target.tagName && "TEXTAREA" !== e.target.tagName) switch (e.key.toLowerCase()) {
        case "?": e.preventDefault(), shortcutsModal.classList.contains("active") ? closeShortcuts() : openShortcuts();
            break;
        case "t": e.preventDefault(), window.scrollTo({
            top: 0, behavior: "smooth"
        }
        );
            break;
        case "g": e.preventDefault();
            const t = document.getElementById("full-gallery-modal");
            t && (t.classList.add("active"), (document.body.style.overflow = "hidden", window.lenis && window.lenis.stop()));
            break;
        case "c": e.preventDefault(), document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth"
        }
        );
            break;
        case "r": e.preventDefault(), document.body.classList.toggle("god-mode");
            break;
        case "escape": closeShortcuts(); closeProjectModal();
    }

}
);
const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiIndex = 0;
if (document.addEventListener("keydown", e => {
    if (e.key === konamiCode[konamiIndex]) {
        if (konamiIndex++, konamiIndex === konamiCode.length) {
            document.body.style.animation = "rainbow-bg 2s ease infinite";
            for (let i = 0; i < 60; i++) {
                const particle = document.createElement("div");
                const size = 10 + Math.random() * 20;
                const colors = ["#0071e3", "#64d2ff", "#bf5af2", "#ff375f", "#30d158", "#ff9f0a"];
                const shape = Math.floor(3 * Math.random());
                particle.style.position = "fixed", particle.style.pointerEvents = "none", particle.style.zIndex = "9999", particle.style.width = size + "px", particle.style.height = size + "px", particle.style.left = 100 * Math.random() + "vw", particle.style.top = "-50px";
                if (shape === 0) {
                    particle.style.borderRadius = "50%";
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                } else if (shape === 1) {
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                } else {
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
                }
                document.body.appendChild(particle);
                gsap.to(particle, {
                    y: window.innerHeight + 100, x: 300 * (Math.random() - .5), rotation: 720 * Math.random(), duration: 2 + 3 * Math.random(), ease: "power1.out", onComplete: () => particle.remove()
                })
            }
            setTimeout(() => {
                document.body.style.animation = ""
            }
                , 5e3), konamiIndex = 0
        }

    }
    else konamiIndex = 0
}
), !document.getElementById("rainbow-style")) {
    const b = document.createElement("style");
    b.id = "rainbow-style", b.textContent = `
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `, document.head.appendChild(b)
}
console.log("%c🎨 Welcome to Samsco Portfolio!", "font-size: 20px; font-weight: bold; color: #0071e3;"), console.log("%cPress ? for keyboard shortcuts", "font-size: 12px; color: #888;");
const telegramModal = document.getElementById("telegram-modal"), telegramBtn = document.getElementById("telegram-btn"), telegramClose = document.getElementById("telegram-close"), telegramContent = telegramModal ? telegramModal.querySelector(".glass-card") : null;
function openTelegramModal(e) {
    e && e.preventDefault(), telegramModal && telegramContent && (telegramModal.classList.remove("pointer-events-none", "opacity-0"), telegramContent.classList.remove("scale-90"), telegramContent.classList.add("scale-100"), (document.body.style.overflow = "hidden", window.lenis && window.lenis.stop()))
}
function closeTelegramModal() {
    telegramModal && telegramContent && (telegramModal.classList.add("pointer-events-none", "opacity-0"), telegramContent.classList.remove("scale-100"), telegramContent.classList.add("scale-90"), (document.body.style.overflow = "auto", window.lenis && window.lenis.start()))
}
telegramBtn && telegramBtn.addEventListener("click", openTelegramModal), telegramClose && telegramClose.addEventListener("click", closeTelegramModal), telegramModal && telegramModal.addEventListener("click", e => {
    e.target === telegramModal && closeTelegramModal()
}
);
