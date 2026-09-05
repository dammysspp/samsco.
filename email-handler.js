const EMAILJS_SERVICE_ID = "service_cjapv6d";
const EMAILJS_TEMPLATE_ID = "template_unbl4d9";
const EMAILJS_PUBLIC_KEY = "CKq_iBV0azIcGlt_Q";

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const origBtnHtml = sendBtn.innerHTML;
        sendBtn.innerHTML = '<span>Sending...</span><span class="animate-spin">↻</span>';
        sendBtn.disabled = true;
        sendBtn.classList.add("opacity-70", "cursor-not-allowed");

        const nameVal = document.getElementById("user_name")?.value || "";
        const emailVal = document.getElementById("user_email")?.value || "";
        const messageVal = document.getElementById("message")?.value || "";

        const templateParams = {
            user_name: nameVal,
            user_email: emailVal,
            message: messageVal
        };

        // Mirror inquiry directly into Supabase inquiries table for CMS lead inbox
        if (window.supabaseClient) {
            window.supabaseClient.from("inquiries").insert([{
                name: nameVal,
                email: emailVal,
                message: messageVal,
                status: "New"
            }]).then(({ error }) => {
                if (error) console.warn("Supabase lead inquiry sync:", error.message);
            }).catch(err => console.warn("Supabase inquiry sync error:", err));
        }

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function() {
                if (formStatus) {
                    formStatus.innerHTML = '<span class="text-green-500">✅ Message sent successfully! I\'ll be in touch soon.</span>';
                    formStatus.classList.remove("hidden");
                }
                contactForm.reset();
            }, function(error) {
                console.error("EmailJS Error:", error);
                if (formStatus) {
                    formStatus.innerHTML = '<span class="text-red-500">❌ Failed to send message. Please try again or email directly.</span>';
                    formStatus.classList.remove("hidden");
                }
            })
            .finally(function() {
                sendBtn.innerHTML = origBtnHtml;
                sendBtn.disabled = false;
                sendBtn.classList.remove("opacity-70", "cursor-not-allowed");
                setTimeout(() => {
                    if (formStatus) formStatus.classList.add("hidden");
                }, 5000);
            });
    });
}