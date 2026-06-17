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
                tags: item.tags ? item.tags.split(",").map(t => t.trim()) : []
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

function getCategoryColor(cat) {
    if (categoryColorsMap[cat]) return categoryColorsMap[cat];
    const colors = {
        "3D & VFX": "#bf5af2",
        "Graphics Design": "#0071e3",
        "Video Editing": "#ff375f",
        "Coding & Data Analytics": "#30d158",
        "AI": "#ff9f0a",
        "Website": "#06b6d4",
        "Social Management": "#ec4899",
        "Presentations": "#10b981"
    };
    if (colors[cat]) return colors[cat];
    if (cat === "ALL") return "#0071e3";
    let hash = 0;
    for (let i = 0; i < cat.length; i++) {
        hash = cat.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 85%, 65%)`;
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
    ["ALL", ...galleryCategories].forEach(e => {
        const t = document.createElement("button");
        t.textContent = e, t.setAttribute("data-filter", e), t.className = "vault-filter-btn";
        applyFilterButtonStyles(t, currentFilter === e, getCategoryColor(e)), t.addEventListener("click", function () {
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
    filterGalleryItems(t);
}
function filterGalleryItems(e) {
    const t = document.querySelectorAll(".gallery-item");
    let hasItems = false;

    // Remove existing empty message if any
    const existingMsg = document.getElementById('empty-category-msg');
    if (existingMsg) existingMsg.remove();

    if (0 !== t.length) {
        visibleGalleryItems = [];
        t.forEach(t => {
            const a = t.getAttribute("data-cat");
            if ("ALL" === e || (a && a.split(',').map(c => c.trim()).includes(e))) {
                visibleGalleryItems.push(t);
                t.style.display = "block";
                gsap.to(t, { scale: 1, opacity: 1, duration: .3, ease: "power2.out" });
                hasItems = true;
            } else {
                gsap.to(t, {
                    scale: .85, opacity: 0, duration: .25, ease: "power2.in", onComplete: () => {
                        t.style.display = "none";
                    }
                });
            }
        });

        if (e === "Coding & Data Analytics" && !hasItems) {
            const msg = document.createElement('div');
            msg.id = 'empty-category-msg';
            msg.className = 'col-span-full py-20 text-center flex flex-col items-center justify-center';
            msg.innerHTML = `
                <svg class="w-16 h-16 text-blue-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                <h3 class="text-3xl font-bold text-white mb-3">Compiling Awesomeness</h3>
                <p class="text-white/60 max-w-md mx-auto text-lg">My Coding & Data Analytics projects are currently being updated and will be available here soon.</p>
            `;
            galleryGrid.appendChild(msg);
            gsap.fromTo(msg, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 });
        }

        "undefined" != typeof ScrollTrigger && setTimeout(() => ScrollTrigger.refresh(), 350);
    }
}
filterContainer && initVaultFilters(), window.handleGridImageError = function (e) {
    e && (e.onerror = null, e.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80")
}
    , window.handleGridVideoError = function (e) {
        if (!e) return;
        e.style.display = "none";
        const t = e.nextElementSibling;
        t && (t.style.display = "flex", t.classList.remove("hidden"))
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
);
function initGallery(force = false) {
    if (galleryInitialized && !force) return;
    galleryGrid.innerHTML = "";
    const e = galleryConfig.length;
    for (let t = 0;
        t < e;
        t++) {
        const e = galleryConfig[t], a = e.cat, r = "video" === e.type || e.url.endsWith(".mp4"), i = document.createElement("div");
        i.className = "gallery-item relative bg-gray-900/50 rounded-xl overflow-hidden group cursor-pointer", i.setAttribute("data-index", t), i.setAttribute("data-title", `${e.title
            }
`), i.setAttribute("data-cat", a), i.setAttribute("data-type", e.type === "iframe" ? "iframe" : r ? "video" : "image"), i.setAttribute("data-url", e.url);
        let o = "", n = e.url.split("?")[0], s = n;
        e.url.includes("imgix.net") && (s = n + "?w=400&q=40&auto=format");
        const firstCat = a ? a.split(",")[0].trim() : "";
        const l = getCategoryColor(firstCat);
        e.projectUrl && i.setAttribute("data-project-url", e.projectUrl);
        const thumbUrl = e.type === "iframe" ? `https://image.thum.io/get/width/400/crop/800/noanimate/${e.url}` : s;
        
        // Eager load the first 15 items to speed up preloader and avoid pop-in
        const isEager = t < 15;
        
        o = e.type === "iframe" ? `<div class="w-full h-full relative bg-gray-800 flex items-center justify-center overflow-hidden">\n            <img ${isEager ? `src="${thumbUrl}"` : `data-src="${thumbUrl}"`} loading="${isEager ? 'eager' : 'lazy'}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" onload="window.vaultImagesLoaded = (window.vaultImagesLoaded || 0) + 1">\n            <div class="absolute inset-0 flex items-center justify-center">\n                <div class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">\n                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>\n                </div>\n            </div>\n        </div>` : r ? `
<video ${isEager ? `src="${e.url}"` : `data-src="${e.url}"`} muted loop playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()" onloadeddata="window.vaultImagesLoaded = (window.vaultImagesLoaded || 0) + 1" class="w-full h-full object-cover"></video>\n            <div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 hidden pointer-events-none">\n                <span class="text-2xl mb-2">⚠️</span>\n                <span class="text-white/50 text-xs font-mono">Video Unavailable</span>\n            </div>` : `<img ${isEager ? `src="${s}"` : `data-src="${s}"`} loading="${isEager ? 'eager' : 'lazy'}" alt="${e.title}" class="w-full h-full object-cover" onload="window.vaultImagesLoaded = (window.vaultImagesLoaded || 0) + 1">`;

        i.innerHTML = `\n            ${o
            }
\n            <div class="category-badge" style="color: ${l
            }
;
 border-color: ${l
            }
30;
">${a
            }
</div>\n            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 pointer-events-none z-10">\n                <h4 class="text-white text-sm md:text-base font-bold leading-tight">${e.title
            }
</h4>\n                <span class="text-xs mt-1 font-medium" style="color: ${l
            }
">${a
            }
</span>\n            </div>\n        `, galleryGrid.appendChild(i);
        
        if (!isEager) {
            galleryObserver.observe(i);
        }
    }
    visibleGalleryItems = Array.from(document.querySelectorAll(".gallery-item")), galleryInitialized = !0, document.querySelectorAll(".gallery-item").forEach(e => {
        e.addEventListener("click", () => {
            openLightbox(e)
        }
        )
    }
    )
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
allGalleryItems.forEach(e => {
    e.addEventListener("click", () => {
        openLightbox(e)
    }
    )
}
), document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox), document.getElementById("lightbox-next")?.addEventListener("click", nextLightboxItem), document.getElementById("lightbox-prev")?.addEventListener("click", prevLightboxItem), document.addEventListener("keydown", e => {
    lightbox?.classList.contains("active") && ("ArrowRight" !== e.key && "ArrowUp" !== e.key || (e.preventDefault(), nextLightboxItem()), "ArrowLeft" !== e.key && "ArrowDown" !== e.key || (e.preventDefault(), prevLightboxItem()), "Escape" === e.key && (e.preventDefault(), closeLightbox()))
}
), gsap.utils.toArray(".anim-heading").forEach(e => {
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
                        }
                            , "<0.1")
    }
    updateActiveCard(0)
}
const projectModal = document.getElementById("project-modal"), closeModalBtn = document.getElementById("close-modal"), prevBtn = document.getElementById("prev-project"), nextBtn = document.getElementById("next-project"), mTitle = document.getElementById("modal-title"), mCat = document.getElementById("modal-category"), mDesc = document.getElementById("modal-desc"), mClient = document.getElementById("modal-client"), mYear = document.getElementById("modal-year"), mRole = document.getElementById("modal-role"), mTags = document.getElementById("modal-tags");
let currentProjectIndex = 0;
const projectCards = document.querySelectorAll(".wheel-card"), projectArray = Array.from(projectCards);
function openProjectModal(e) {
    currentProjectIndex = e;
    const t = projectArray[e];
    mTitle.innerText = t.getAttribute("data-title"), mCat.innerText = t.getAttribute("data-category"), mDesc.innerText = t.getAttribute("data-desc"), mClient.innerText = t.getAttribute("data-client") || "Private Client", mYear.innerText = t.getAttribute("data-year") || "2024", mRole.innerText = t.getAttribute("data-role") || "Creative Lead";
    const a = t.getAttribute("data-tags").split(",");
    mTags.innerHTML = "", a.forEach(e => {
        const t = document.createElement("span");
        t.className = "px-3 py-1 bg-white/10 border border-white/5 rounded-full text-xs text-blue-300 tracking-wide", t.innerText = e, mTags.appendChild(t)
    }
    ), projectModal.classList.add("active"), (document.body.style.overflow = "hidden", window.lenis && window.lenis.stop())
}
function closeProjectModal() {
    projectModal.classList.remove("active"), (document.body.style.overflow = "auto", window.lenis && window.lenis.start())
}
function nextProjectFunc() {
    let e = (currentProjectIndex + 1) % projectArray.length;
    for (;
        "none" === projectArray[e].style.display;
    )e = (e + 1) % projectArray.length;
    openProjectModal(e)
}
function prevProjectFunc() {
    let e = (currentProjectIndex - 1 + projectArray.length) % projectArray.length;
    for (;
        "none" === projectArray[e].style.display;
    )e = (e - 1 + projectArray.length) % projectArray.length;
    openProjectModal(e)
}
projectArray.forEach((e, t) => e.addEventListener("click", () => openProjectModal(t))), closeModalBtn?.addEventListener("click", closeProjectModal), nextBtn?.addEventListener("click", nextProjectFunc), prevBtn?.addEventListener("click", prevProjectFunc), projectModal?.addEventListener("click", e => {
    e.target === projectModal && closeProjectModal()
}
);
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
        case "escape": closeShortcuts()
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
