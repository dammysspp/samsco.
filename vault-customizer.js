/**
 * vault-customizer.js
 * COD Mobile-Style Interactive HUD Layout Customizer for Samsco Vault
 * Allows live visual adjustment of Vault UI elements (Card Scale/Height, Border Radius,
 * Grid Columns, Spacing/Gaps, Sidebar Width, Device Modes: PC / Mobile)
 * with strict Card Uniformity, Supabase persistence, and Reset to Default capability.
 */

(function () {
    // Default Layout Profiles (Clean Factory Reset Values)
    const DEFAULT_LAYOUT = {
        desktop: {
            cardHeight: 220,
            cardRadius: 16,
            cardGap: 24,
            cardCols: 3,
            sidebarWidth: 270,
            stagePaddingX: 36,
            stagePaddingY: 32,
            titleFontSize: 13
        },
        mobile: {
            cardHeight: 210,
            cardRadius: 14,
            cardGap: 12,
            cardCols: 2,
            stagePaddingX: 16,
            stagePaddingY: 16,
            titleFontSize: 11
        }
    };

    // Active working state
    let customLayout = JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
    let activeDeviceMode = window.innerWidth <= 768 ? "mobile" : "desktop";
    let isHudActive = false;
    let selectedComponent = "cards"; // "cards" | "sidebar" | "stage"

    // Load saved custom layout from localStorage and Supabase
    function loadSavedCustomLayout() {
        try {
            const local = localStorage.getItem("samsco_vault_custom_layout");
            if (local) {
                const parsed = JSON.parse(local);
                customLayout = mergeDefaults(parsed);
                applyLayoutToDom();
            }
        } catch (e) {
            console.warn("Could not read local vault custom layout:", e);
        }

        if (window.supabaseClient) {
            window.supabaseClient
                .from("site_settings")
                .select("value")
                .eq("key", "vault_custom_layout")
                .maybeSingle()
                .then(({ data, error }) => {
                    if (!error && data && data.value) {
                        try {
                            const parsed = typeof data.value === "string" ? JSON.parse(data.value) : data.value;
                            customLayout = mergeDefaults(parsed);
                            localStorage.setItem("samsco_vault_custom_layout", JSON.stringify(customLayout));
                            applyLayoutToDom();
                            if (isHudActive) updateHudInputValues();
                        } catch (err) {
                            console.warn("Error parsing remote custom layout:", err);
                        }
                    }
                })
                .catch(err => console.warn("Supabase fetch custom layout err:", err));
        }
    }

    function mergeDefaults(userConfig) {
        return {
            desktop: Object.assign({}, DEFAULT_LAYOUT.desktop, (userConfig && userConfig.desktop) || {}),
            mobile: Object.assign({}, DEFAULT_LAYOUT.mobile, (userConfig && userConfig.mobile) || {})
        };
    }

    // Apply layout variables to the document root (:root)
    function applyLayoutToDom() {
        const root = document.documentElement;
        const d = customLayout.desktop;
        const m = customLayout.mobile;

        // Desktop variables
        root.style.setProperty("--v-card-height-pc", `${d.cardHeight}px`);
        root.style.setProperty("--v-card-radius-pc", `${d.cardRadius}px`);
        root.style.setProperty("--v-card-gap-pc", `${d.cardGap}px`);
        root.style.setProperty("--v-card-cols-pc", `${d.cardCols}`);
        root.style.setProperty("--v-sidebar-width-pc", `${d.sidebarWidth}px`);
        root.style.setProperty("--v-stage-pad-x-pc", `${d.stagePaddingX}px`);
        root.style.setProperty("--v-stage-pad-y-pc", `${d.stagePaddingY}px`);
        root.style.setProperty("--v-title-size-pc", `${d.titleFontSize}px`);

        // Mobile variables
        root.style.setProperty("--v-card-height-mob", `${m.cardHeight}px`);
        root.style.setProperty("--v-card-radius-mob", `${m.cardRadius}px`);
        root.style.setProperty("--v-card-gap-mob", `${m.cardGap}px`);
        root.style.setProperty("--v-card-cols-mob", `${m.cardCols}`);
        root.style.setProperty("--v-stage-pad-x-mob", `${m.stagePaddingX}px`);
        root.style.setProperty("--v-stage-pad-y-mob", `${m.stagePaddingY}px`);
        root.style.setProperty("--v-title-size-mob", `${m.titleFontSize}px`);
    }

    // Check if user is logged into admin or requested layout edit
    function checkEditModeAllowed() {
        const urlParams = new URLSearchParams(window.location.search);
        const forceEdit = urlParams.get("edit_layout") === "1" || urlParams.get("hud") === "1" || urlParams.has("edit_layout");
        const hasAdminLocal = !!localStorage.getItem("samsco_admin_session") || !!sessionStorage.getItem("samsco_admin_logged_in");
        const hasSupabaseAuth = Object.keys(localStorage).some(key => key.startsWith("sb-") && key.endsWith("-auth-token"));
        return forceEdit || hasAdminLocal || hasSupabaseAuth;
    }

    // Create and Mount the COD Mobile HUD UI
    function initHudUi() {
        if (document.getElementById("vault-cod-hud")) return;

        // Inject HUD launcher button if admin is logged in but HUD not opened
        const launcher = document.createElement("button");
        launcher.id = "hud-launcher-btn";
        launcher.title = "Customize Layout (COD Mobile HUD Mode)";
        launcher.className = "fixed bottom-5 right-5 z-[100001] px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_8px_30px_rgba(37,99,235,0.5)] border border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer";
        launcher.innerHTML = `
            <svg class="w-4 h-4 text-cyan-300 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            <span>Edit Layout HUD</span>
        `;
        launcher.addEventListener("click", () => openHud());
        document.body.appendChild(launcher);

        // Build Main HUD Container
        const hud = document.createElement("div");
        hud.id = "vault-cod-hud";
        hud.className = "fixed inset-x-0 top-0 z-[100002] hidden select-none pointer-events-none font-sans";
        hud.innerHTML = `
            <!-- Top HUD Bar -->
            <div class="pointer-events-auto mx-auto max-w-5xl mt-3 px-4">
                <div class="glass-card rounded-2xl border border-cyan-500/30 bg-[#090b10]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-3 text-white">
                    <div class="flex flex-wrap items-center justify-between gap-3">
                        
                        <!-- Left: COD Style Title & Status -->
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-black text-xs">
                                HUD
                            </div>
                            <div>
                                <h3 class="text-xs font-black tracking-wider uppercase text-white font-display flex items-center gap-1.5">
                                    <span>VAULT LAYOUT CUSTOMIZER</span>
                                    <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                </h3>
                                <p class="text-[10px] text-cyan-300/70 font-mono">Select layer to adjust scale & position uniformly</p>
                            </div>
                        </div>

                        <!-- Center: Target Layer Tabs -->
                        <div class="flex items-center bg-black/60 border border-white/10 rounded-xl p-1 gap-1">
                            <button type="button" class="hud-layer-btn px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all bg-cyan-500/30 text-cyan-300 border border-cyan-500/40" data-layer="cards">
                                Work Cards (Uniform)
                            </button>
                            <button type="button" class="hud-layer-btn px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-white/50 hover:text-white" data-layer="sidebar">
                                Sidebar Menu
                            </button>
                            <button type="button" class="hud-layer-btn px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-white/50 hover:text-white" data-layer="stage">
                                Stage Container
                            </button>
                        </div>

                        <!-- Right: Device Mode Toggle & Quick Actions -->
                        <div class="flex items-center gap-2">
                            <!-- Device Switcher -->
                            <div class="flex items-center bg-black/60 border border-white/10 rounded-xl p-1">
                                <button type="button" id="hud-mode-pc" class="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${activeDeviceMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    <span>PC</span>
                                </button>
                                <button type="button" id="hud-mode-mob" class="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${activeDeviceMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                                    <span>Mobile</span>
                                </button>
                            </div>

                            <!-- Reset Button (Panic Button) -->
                            <button type="button" id="hud-reset-btn" class="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-bold tracking-wider transition-all active:scale-95 flex items-center gap-1" title="Reset everything to factory default">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                <span>Reset</span>
                            </button>

                            <!-- Save & Apply Button -->
                            <button type="button" id="hud-save-btn" class="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                <span>Save</span>
                            </button>

                            <!-- Close HUD -->
                            <button type="button" id="hud-close-btn" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all ml-1">
                                &times;
                            </button>
                        </div>
                    </div>

                    <!-- Lower Controls Drawer (Sliders per selected layer) -->
                    <div id="hud-controls-panel" class="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 items-end">
                        <!-- Populated dynamically based on selected layer -->
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(hud);
        bindHudEvents();
        renderLayerControls();
    }

    function openHud() {
        isHudActive = true;
        const hud = document.getElementById("vault-cod-hud");
        if (hud) {
            hud.classList.remove("hidden");
            document.body.classList.add("vault-hud-editing");
            renderLayerControls();
            highlightSelectedComponent();
        }

        // Dismiss preloader immediately so HUD is not blocked or hidden behind loading screen
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.classList.add("exit");
            preloader.style.display = "none";
        }

        // Ensure full gallery modal is visible and interactive
        const gm = document.getElementById("full-gallery-modal");
        if (gm) {
            if (document.body.classList.contains("vault-layout-sidebar")) {
                gm.style.display = "flex";
            } else {
                gm.style.display = "block";
            }
            gm.classList.add("active");
        }
        const bg = document.getElementById("vault-background");
        if (bg) {
            bg.classList.add("active");
        }

        // If revealVault is available, invoke it to animate items and start layout
        if (typeof window.revealVault === "function") {
            window.revealVault();
        }
    }

    function closeHud() {
        isHudActive = false;
        const hud = document.getElementById("vault-cod-hud");
        if (hud) {
            hud.classList.add("hidden");
            document.body.classList.remove("vault-hud-editing");
            clearHighlights();
        }
    }

    function bindHudEvents() {
        // Layer tab clicks
        document.querySelectorAll(".hud-layer-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".hud-layer-btn").forEach(b => {
                    b.className = "hud-layer-btn px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-white/50 hover:text-white";
                });
                btn.className = "hud-layer-btn px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all bg-cyan-500/30 text-cyan-300 border border-cyan-500/40";
                selectedComponent = btn.getAttribute("data-layer");
                renderLayerControls();
                highlightSelectedComponent();
            });
        });

        // Device Mode Switch
        const pcBtn = document.getElementById("hud-mode-pc");
        const mobBtn = document.getElementById("hud-mode-mob");

        pcBtn?.addEventListener("click", () => {
            activeDeviceMode = "desktop";
            pcBtn.className = "px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 bg-blue-600 text-white";
            mobBtn.className = "px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-white/40 hover:text-white";
            renderLayerControls();
        });

        mobBtn?.addEventListener("click", () => {
            activeDeviceMode = "mobile";
            mobBtn.className = "px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 bg-blue-600 text-white";
            pcBtn.className = "px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-white/40 hover:text-white";
            renderLayerControls();
        });

        // Close button
        document.getElementById("hud-close-btn")?.addEventListener("click", closeHud);

        // Reset to default button
        document.getElementById("hud-reset-btn")?.addEventListener("click", () => {
            if (confirm("Reset Vault layout to original clean design? All custom sizing and scaling will revert to default.")) {
                customLayout = JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
                applyLayoutToDom();
                renderLayerControls();
                saveCustomLayoutToRemote(true);
            }
        });

        // Save & Apply
        document.getElementById("hud-save-btn")?.addEventListener("click", () => {
            saveCustomLayoutToRemote(false);
        });

        // Clicking on elements in the page selects their layer in HUD
        document.addEventListener("click", (e) => {
            if (!isHudActive) return;
            const hudEl = document.getElementById("vault-cod-hud");
            if (hudEl && hudEl.contains(e.target)) return;

            if (e.target.closest(".gallery-item") || e.target.closest("#gallery-grid-content")) {
                e.preventDefault();
                e.stopPropagation();
                selectLayer("cards");
            } else if (e.target.closest("#vault-sidebar") || e.target.closest(".sidebar-nav-item")) {
                e.preventDefault();
                e.stopPropagation();
                selectLayer("sidebar");
            } else if (e.target.closest("#vault-main-stage")) {
                e.preventDefault();
                e.stopPropagation();
                selectLayer("stage");
            }
        }, true);
    }

    function selectLayer(layerName) {
        selectedComponent = layerName;
        document.querySelectorAll(".hud-layer-btn").forEach(b => {
            const matches = b.getAttribute("data-layer") === layerName;
            b.className = matches 
                ? "hud-layer-btn px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all bg-cyan-500/30 text-cyan-300 border border-cyan-500/40"
                : "hud-layer-btn px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-white/50 hover:text-white";
        });
        renderLayerControls();
        highlightSelectedComponent();
    }

    // Render slider controls depending on selected layer and active device mode (PC or Mobile)
    function renderLayerControls() {
        const container = document.getElementById("hud-controls-panel");
        if (!container) return;

        const currentProfile = customLayout[activeDeviceMode];
        const modeLabel = activeDeviceMode === "desktop" ? "PC" : "Mobile";

        if (selectedComponent === "cards") {
            container.innerHTML = `
                <!-- Height / Scale -->
                <div>
                    <div class="flex justify-between text-[10px] font-mono text-cyan-300 mb-1">
                        <span>Card Height (${modeLabel})</span>
                        <span id="val-card-height">${currentProfile.cardHeight}px</span>
                    </div>
                    <input type="range" min="140" max="360" step="5" value="${currentProfile.cardHeight}" 
                        class="hud-slider w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-1.5"
                        oninput="window.vaultHudUpdateParam('cardHeight', this.value, 'px', 'val-card-height')">
                </div>

                <!-- Columns Count -->
                <div>
                    <div class="flex justify-between text-[10px] font-mono text-cyan-300 mb-1">
                        <span>Grid Columns (${modeLabel})</span>
                        <span id="val-card-cols">${currentProfile.cardCols} cols</span>
                    </div>
                    <input type="range" min="${activeDeviceMode === 'desktop' ? 2 : 1}" max="${activeDeviceMode === 'desktop' ? 4 : 3}" step="1" value="${currentProfile.cardCols}" 
                        class="hud-slider w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-1.5"
                        oninput="window.vaultHudUpdateParam('cardCols', this.value, ' cols', 'val-card-cols')">
                </div>

                <!-- Spacing / Gap -->
                <div>
                    <div class="flex justify-between text-[10px] font-mono text-cyan-300 mb-1">
                        <span>Card Gap (${modeLabel})</span>
                        <span id="val-card-gap">${currentProfile.cardGap}px</span>
                    </div>
                    <input type="range" min="8" max="40" step="2" value="${currentProfile.cardGap}" 
                        class="hud-slider w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-1.5"
                        oninput="window.vaultHudUpdateParam('cardGap', this.value, 'px', 'val-card-gap')">
                </div>

                <!-- Border Radius / Round Edges -->
                <div>
                    <div class="flex justify-between text-[10px] font-mono text-cyan-300 mb-1">
                        <span>Corner Radius (${modeLabel})</span>
                        <span id="val-card-radius">${currentProfile.cardRadius}px</span>
                    </div>
                    <input type="range" min="0" max="32" step="2" value="${currentProfile.cardRadius}" 
                        class="hud-slider w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-1.5"
                        oninput="window.vaultHudUpdateParam('cardRadius', this.value, 'px', 'val-card-radius')">
                </div>

                <!-- Title Font Size -->
                <div>
                    <div class="flex justify-between text-[10px] font-mono text-cyan-300 mb-1">
                        <span>Title Size (${modeLabel})</span>
                        <span id="val-title-size">${currentProfile.titleFontSize}px</span>
                    </div>
                    <input type="range" min="10" max="18" step="1" value="${currentProfile.titleFontSize}" 
                        class="hud-slider w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-1.5"
                        oninput="window.vaultHudUpdateParam('titleFontSize', this.value, 'px', 'val-title-size')">
                </div>
            `;
        } else if (selectedComponent === "sidebar") {
            if (activeDeviceMode === "mobile") {
                container.innerHTML = `
                    <div class="col-span-full py-2 text-center text-xs text-white/40">
                        Sidebar layout applies to Desktop view. On Mobile, category filters display as the bottom pill dock.
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <!-- Sidebar Width -->
                    <div>
                        <div class="flex justify-between text-[10px] font-mono text-cyan-300 mb-1">
                            <span>Sidebar Width</span>
                            <span id="val-side-width">${currentProfile.sidebarWidth}px</span>
                        </div>
                        <input type="range" min="200" max="340" step="5" value="${currentProfile.sidebarWidth}" 
                            class="hud-slider w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-1.5"
                            oninput="window.vaultHudUpdateParam('sidebarWidth', this.value, 'px', 'val-side-width')">
                    </div>
                `;
            }
        } else if (selectedComponent === "stage") {
            container.innerHTML = `
                <!-- Stage Horizontal Padding -->
                <div>
                    <div class="flex justify-between text-[10px] font-mono text-cyan-300 mb-1">
                        <span>Side Padding (${modeLabel})</span>
                        <span id="val-stage-pad-x">${currentProfile.stagePaddingX}px</span>
                    </div>
                    <input type="range" min="12" max="64" step="4" value="${currentProfile.stagePaddingX}" 
                        class="hud-slider w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-1.5"
                        oninput="window.vaultHudUpdateParam('stagePaddingX', this.value, 'px', 'val-stage-pad-x')">
                </div>

                <!-- Stage Vertical Padding -->
                <div>
                    <div class="flex justify-between text-[10px] font-mono text-cyan-300 mb-1">
                        <span>Top Padding (${modeLabel})</span>
                        <span id="val-stage-pad-y">${currentProfile.stagePaddingY}px</span>
                    </div>
                    <input type="range" min="12" max="64" step="4" value="${currentProfile.stagePaddingY}" 
                        class="hud-slider w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-1.5"
                        oninput="window.vaultHudUpdateParam('stagePaddingY', this.value, 'px', 'val-stage-pad-y')">
                </div>
            `;
        }
    }

    // Live update a single parameter across the active device mode profile
    window.vaultHudUpdateParam = function (key, value, unit, labelId) {
        const numVal = parseInt(value, 10);
        customLayout[activeDeviceMode][key] = numVal;

        const label = document.getElementById(labelId);
        if (label) label.textContent = `${numVal}${unit}`;

        applyLayoutToDom();
    };

    function highlightSelectedComponent() {
        clearHighlights();
        if (!isHudActive) return;

        if (selectedComponent === "cards") {
            document.querySelectorAll(".gallery-item").forEach(item => {
                item.classList.add("hud-target-highlight");
            });
        } else if (selectedComponent === "sidebar") {
            const sb = document.getElementById("vault-sidebar");
            if (sb) sb.classList.add("hud-target-highlight");
        } else if (selectedComponent === "stage") {
            const st = document.getElementById("vault-main-stage");
            if (st) st.classList.add("hud-target-highlight");
        }
    }

    function clearHighlights() {
        document.querySelectorAll(".hud-target-highlight").forEach(el => {
            el.classList.remove("hud-target-highlight");
        });
    }

    // Save to Supabase and LocalStorage
    async function saveCustomLayoutToRemote(isReset = false) {
        const saveBtn = document.getElementById("hud-save-btn");
        if (saveBtn) {
            saveBtn.innerHTML = `<span>Saving...</span>`;
            saveBtn.disabled = true;
        }

        try {
            localStorage.setItem("samsco_vault_custom_layout", JSON.stringify(customLayout));

            if (window.supabaseClient) {
                const { error } = await window.supabaseClient
                    .from("site_settings")
                    .upsert({
                        key: "vault_custom_layout",
                        value: JSON.stringify(customLayout),
                        updated_at: new Date().toISOString()
                    });

                if (error) throw error;
            }

            if (typeof showToast === "function") {
                showToast(isReset ? "Layout reset to default!" : "Layout customizer saved successfully!", "success");
            } else {
                alert(isReset ? "Layout reset to default!" : "Layout saved and published to public site!");
            }
        } catch (err) {
            console.error("Save custom layout error:", err);
            if (typeof showToast === "function") {
                showToast("Could not save to Supabase: " + err.message, "error");
            } else {
                alert("Error saving layout: " + err.message);
            }
        } finally {
            if (saveBtn) {
                saveBtn.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>Save</span>`;
                saveBtn.disabled = false;
            }
        }
    }

    // Export helpers for external callers (e.g. from admin.html)
    window.vaultCustomizer = {
        open: openHud,
        close: closeHud,
        reset: () => {
            customLayout = JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
            applyLayoutToDom();
            saveCustomLayoutToRemote(true);
        },
        getLayout: () => customLayout,
        setLayout: (newLayout) => {
            customLayout = mergeDefaults(newLayout);
            applyLayoutToDom();
        }
    };

    // Auto-init on page load
    function initVaultCustomizer() {
        loadSavedCustomLayout();
        if (checkEditModeAllowed()) {
            initHudUi();
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get("edit_layout") === "1" || urlParams.get("hud") === "1" || urlParams.has("edit_layout")) {
                setTimeout(() => openHud(), 150);
            }
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initVaultCustomizer);
    } else {
        initVaultCustomizer();
    }
})();
