/**
 * Spotlight Command Palette (Cmd + K Search)
 * Provides keyboard-driven navigation, command execution, and portfolio search.
 */

document.addEventListener("DOMContentLoaded", () => {
    const spotlightModal = document.getElementById("spotlight-modal");
    const spotlightInput = document.getElementById("spotlight-input");
    const spotlightResults = document.getElementById("spotlight-results");
    const closeBtn = document.getElementById("close-spotlight-btn");
    const floatingTrigger = document.getElementById("floating-spotlight-trigger");
    
    let isPaletteOpen = false;
    let selectedIdx = 0;
    let filteredItems = [];

    // Static system commands
    const systemCommands = [
        { title: "Toggle Accent Color", desc: "Cycle through accent design themes (Blue, Purple, Pink, Green, Orange)", action: () => cycleAccentThemes() },
        { title: "Download CV / Resume", desc: "Get Samsco's CV in Word/PDF format", action: () => downloadCV() },
        { title: "Get in Touch / Contact", desc: "Open email contact sheet to send a message", action: () => openContactForm() },
        { title: "Scroll to top", desc: "Smooth scroll to the top of page", action: () => scrollToSection("top") },
        { title: "Go to About Me", desc: "Read bio, background details, and profile images", action: () => scrollToSection("about") },
        { title: "Go to Skills & Tools", desc: "View technical proficiencies and levels", action: () => scrollToSection("skills") },
        { title: "Go to Experience Journey", desc: "Check career timeline and history", action: () => scrollToSection("experience") },
        { title: "Go to Works Portfolio", desc: "Browse through design, 3D, coding, and presentations", action: () => scrollToSection("works") },
        { title: "Go to Client Reviews", desc: "Read client testimonials and feedback", action: () => scrollToSection("testimonials") }
    ];

    // Helper functions
    function cycleAccentThemes() {
        const dots = document.querySelectorAll(".theme-dot");
        if (dots.length > 0) {
            let activeIdx = 0;
            dots.forEach((dot, idx) => {
                if (dot.classList.contains("active")) activeIdx = idx;
            });
            const nextIdx = (activeIdx + 1) % dots.length;
            dots[nextIdx].click();
            showFloatingToast("Accent Theme Toggled!");
        }
    }

    function downloadCV() {
        const cvLink = document.querySelector('a[href*="CV"]');
        if (cvLink) {
            cvLink.click();
        } else {
            window.open("./Aiyedun_Samuel_CV.pdf", "_blank");
        }
    }

    function openContactForm() {
        const mailBtn = document.querySelector('a[href^="mailto:"]') || document.getElementById("contact-trigger");
        if (mailBtn) {
            mailBtn.click();
        } else {
            scrollToSection("contact");
        }
    }

    function scrollToSection(id) {
        if (id === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const el = document.getElementById(id) || document.querySelector(`.${id}`);
            if (el) {
                if (window.lenis) {
                    window.lenis.scrollTo(el);
                } else {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    }

    function showFloatingToast(msg) {
        const toast = document.createElement("div");
        toast.className = "fixed bottom-20 left-6 z-50 bg-[#0071e3] text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase shadow-lg transition-all duration-300 transform translate-y-4 opacity-0";
        toast.textContent = msg;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove("translate-y-4", "opacity-0");
            toast.classList.add("translate-y-0", "opacity-100");
        }, 50);
        
        setTimeout(() => {
            toast.classList.remove("translate-y-0", "opacity-100");
            toast.classList.add("translate-y-4", "opacity-0");
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // Modal state togglers
    function openPalette() {
        isPaletteOpen = true;
        spotlightModal.classList.remove("opacity-0", "pointer-events-none");
        spotlightModal.querySelector(".transform").classList.remove("scale-95");
        spotlightInput.focus();
        spotlightInput.value = "";
        selectedIdx = 0;
        renderResults();
    }

    function closePalette() {
        isPaletteOpen = false;
        spotlightModal.classList.add("opacity-0", "pointer-events-none");
        spotlightModal.querySelector(".transform").classList.add("scale-95");
        spotlightInput.blur();
    }

    // Command searching & rendering
    function getSearchItems(query) {
        const q = query.toLowerCase().trim();
        let items = [];

        // 1. Matches system commands
        if (!q) {
            return systemCommands;
        }

        systemCommands.forEach(cmd => {
            if (cmd.title.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q)) {
                items.push(cmd);
            }
        });

        // 2. Matches portfolio works from Supabase / local configs
        const works = window.galleryConfig || window.localGalleryConfig || [];
        works.forEach(work => {
            if (work.title.toLowerCase().includes(q) || work.cat.toLowerCase().includes(q)) {
                items.push({
                    title: work.title,
                    desc: `Portfolio Work · ${work.cat}`,
                    action: () => {
                        const index = works.findIndex(w => w.title === work.title);
                        if (index !== -1 && typeof openGalleryModal === 'function') {
                            openGalleryModal(index);
                        } else {
                            scrollToSection("works");
                        }
                    }
                });
            }
        });

        return items;
    }

    function renderResults() {
        const query = spotlightInput.value;
        filteredItems = getSearchItems(query);
        spotlightResults.innerHTML = "";

        if (filteredItems.length === 0) {
            spotlightResults.innerHTML = `
                <div class="py-6 text-center text-white/30 text-xs font-light">
                    No results found for "${query}"
                </div>
            `;
            return;
        }

        filteredItems.forEach((item, idx) => {
            const card = document.createElement("div");
            const isActive = idx === selectedIdx;
            
            card.className = `flex flex-col px-4 py-3 rounded-2xl cursor-pointer transition-colors ${
                isActive ? "bg-white/[0.06] border border-white/5" : "border border-transparent hover:bg-white/[0.02]"
            }`;
            
            card.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-white tracking-wide">${item.title}</span>
                    ${isActive ? '<span class="text-[9px] text-[#0071e3] font-bold font-mono tracking-wider">ENTER</span>' : ''}
                </div>
                <span class="text-[10px] text-white/40 mt-1 leading-relaxed">${item.desc}</span>
            `;
            
            card.addEventListener("click", () => {
                item.action();
                closePalette();
            });

            spotlightResults.appendChild(card);
        });

        const activeItem = spotlightResults.children[selectedIdx];
        if (activeItem) {
            activeItem.scrollIntoView({ block: "nearest" });
        }
    }

    // Keyboard navigation listeners
    window.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            if (isPaletteOpen) {
                closePalette();
            } else {
                openPalette();
            }
            return;
        }

        if (!isPaletteOpen) return;

        if (e.key === "Escape") {
            e.preventDefault();
            closePalette();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedIdx = (selectedIdx + 1) % filteredItems.length;
            renderResults();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedIdx = (selectedIdx - 1 + filteredItems.length) % filteredItems.length;
            renderResults();
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredItems[selectedIdx]) {
                filteredItems[selectedIdx].action();
                closePalette();
            }
        }
    });

    // Input listening
    spotlightInput.addEventListener("input", () => {
        selectedIdx = 0;
        renderResults();
    });

    // Mouse bindings
    if (floatingTrigger) floatingTrigger.addEventListener("click", openPalette);
    if (closeBtn) closeBtn.addEventListener("click", closePalette);
    
    spotlightModal.addEventListener("click", (e) => {
        if (e.target === spotlightModal) {
            closePalette();
        }
    });
});
