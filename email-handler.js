// Contact Form Handler - Direct Supabase Inquiries Pipeline
const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const origBtnHtml = sendBtn.innerHTML;
        sendBtn.innerHTML = '<span class="flex items-center gap-2"><span>Sending...</span><svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg></span>';
        sendBtn.disabled = true;
        sendBtn.classList.add("opacity-70", "cursor-not-allowed");

        const nameVal = document.getElementById("user_name")?.value.trim() || "";
        const emailVal = document.getElementById("user_email")?.value.trim() || "";
        const messageVal = document.getElementById("message")?.value.trim() || "";

        if (!nameVal || !emailVal || !messageVal) {
            if (formStatus) {
                formStatus.innerHTML = '<span class="text-amber-400">⚠️ Please fill in all fields.</span>';
                formStatus.classList.remove("hidden");
            }
            sendBtn.innerHTML = origBtnHtml;
            sendBtn.disabled = false;
            sendBtn.classList.remove("opacity-70", "cursor-not-allowed");
            return;
        }

        try {
            if (!window.supabaseClient) {
                throw new Error("Database client unavailable. Please email directly.");
            }

            const { data, error } = await window.supabaseClient
                .from("inquiries")
                .insert([{
                    name: nameVal,
                    email: emailVal,
                    message: messageVal,
                    status: "New"
                }]);

            if (error) throw error;

            if (formStatus) {
                formStatus.innerHTML = '<span class="text-green-400 font-semibold">✅ Message received! I\'ll be in touch with you shortly.</span>';
                formStatus.classList.remove("hidden");
            }
            contactForm.reset();
        } catch (err) {
            console.error("Inquiry submission error:", err);
            if (formStatus) {
                formStatus.innerHTML = `<span class="text-red-400 font-semibold">❌ Message failed to send: ${err.message || 'Please check your connection and try again.'}</span>`;
                formStatus.classList.remove("hidden");
            }
        } finally {
            sendBtn.innerHTML = origBtnHtml;
            sendBtn.disabled = false;
            sendBtn.classList.remove("opacity-70", "cursor-not-allowed");
            setTimeout(() => {
                if (formStatus) formStatus.classList.add("hidden");
            }, 6000);
        }
    });
}