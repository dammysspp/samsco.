/**
 * Supabase Shared Configuration
 * 
 * You can configure your credentials here directly, or configure them 
 * via the Setup Screen on the /admin page (which saves them to localStorage).
 */

const SUPABASE_DEFAULT_URL = ""; // Paste your Supabase project URL here
const SUPABASE_DEFAULT_ANON_KEY = ""; // Paste your Supabase project Anon Key here

// Helper to get active config (local storage takes precedence for easy setup)
function getSupabaseConfig() {
    const localUrl = localStorage.getItem("samsco_supabase_url");
    const localKey = localStorage.getItem("samsco_supabase_key");

    return {
        url: localUrl || SUPABASE_DEFAULT_URL,
        key: localKey || SUPABASE_DEFAULT_ANON_KEY
    };
}

// Initialize and return Supabase client
function initSupabase() {
    const config = getSupabaseConfig();
    if (config.url && config.key && typeof supabase !== 'undefined') {
        try {
            return supabase.createClient(config.url, config.key);
        } catch (e) {
            console.error("Failed to initialize Supabase client:", e);
            return null;
        }
    }
    return null;
}

// Global reference
window.supabaseClient = initSupabase();

// Pre-configured list of default portfolio works to allow easy migration/fallback
window.localGalleryConfig = [{
    "title": "Graphic Art 01", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(1).jpg"
}
    , {
    "title": "Graphic Art 02", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(2).jpg"
}
    , {
    "title": "Graphic Art 03", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(3).jpg"
}
    , {
    "title": "Graphic Art 04", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(4).jpg"
}
    , {
    "title": "Graphic Art 05", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(5).jpg"
}
    , {
    "title": "Graphic Art 06", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(6).jpg"
}
    , {
    "title": "Graphic Art 07", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(7).jpg"
}
    , {
    "title": "Graphic Art 08", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(8).jpg"
}
    , {
    "title": "Graphic Art 09", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(9).jpg"
}
    , {
    "title": "Graphic Art 10", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(10).jpg"
}
    , {
    "title": "Graphic Art 11", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(11).jpg"
}
    , {
    "title": "Graphic Art 12", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(12).jpg"
}
    , {
    "title": "Graphic Art 13", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(13).jpg"
}
    , {
    "title": "Graphic Art 14", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(14).jpg"
}
    , {
    "title": "Graphic Art 15", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(15).jpg"
}
    , {
    "title": "Graphic Art 16", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(16).jpg"
}
    , {
    "title": "Graphic Art 17", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(17).jpg"
}
    , {
    "title": "Graphic Art 18", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(18).jpg"
}
    , {
    "title": "Satisfied", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(45).jpg"
}
    , {
    "title": "CCH 2024", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(46).jpg"
}
    , {
    "title": "Graphic Art 19", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(19).avif"
}
    , {
    "title": "Graphic Art 20", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(20).avif"
}
    , {
    "title": "Graphic Art 21", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(21).jpg"
}
    , {
    "title": "Graphic Art 22", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(22).jpg"
}
    , {
    "title": "Graphic Art 28", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(28).jpg"
}
    , {
    "title": "Graphic Art 29", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(29).jpg"
}
    , {
    "title": "Graphic Art 30", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(30).jpg"
}
    , {
    "title": "Graphic Art 31", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(31).jpg"
}
    , {
    "title": "Graphic Art 32", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(32).jpg"
}
    , {
    "title": "Graphic Art 33", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(33).jpg"
}
    , {
    "title": "Graphic Art 34", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(34).jpg"
}
    , {
    "title": "Graphic Art 35", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(35).jpg"
}
    , {
    "title": "Graphic Art 36", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(36).jpg"
}
    , {
    "title": "Graphic Art 37", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(37).jpg"
}
    , {
    "title": "Graphic Art 38", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(38).jpg"
}
    , {
    "title": "Graphic Art 39", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(39).jpg"
}
    , {
    "title": "Graphic Art 40", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(40).jpg"
}
    , {
    "title": "Graphic Art 41", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(41).jpg"
}
    , {
    "title": "Graphic Art 42", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(42).jpg"
}
    , {
    "title": "Graphic Art 43", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(43).jpg"
}
    , {
    "title": "Graphic Art 44", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(44).jpg"
}
    , {
    "title": "Graphic Art 45", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(45).jpg"
}
    , {
    "title": "Graphic Art 46", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(46).jpg"
}
    , {
    "title": "Graphic Art 47", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(47).jpg"
}
    , {
    "title": "Graphic Art 48", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(48).jpg"
}
    , {
    "title": "Graphic Art 49", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(49).jpg"
}
    , {
    "title": "Graphic Art 50", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(50).jpg"
}
    , {
    "title": "Graphic Art 51", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(51).jpg"
}
    , {
    "title": "Graphic Art 52", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(52).jpg"
}
    , {
    "title": "Graphic Art 53", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(53).jpg"
}
    , {
    "title": "Graphic Art 54", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(54).jpg"
}
    , {
    "title": "Graphic Art 55", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(55).jpg"
}
    , {
    "title": "Graphic Art 56", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(56).jpg"
}
    , {
    "title": "Graphic Art 57", "cat": "Graphics Design", "url": "./assets/Graphics%20Design/Graphics%20(57).png"
}
    , {
    "title": "Graphic Art 58", "cat": "Graphics Design", "type": "iframe", "url": "https://www.canva.com/design/DAG9kCov0b8/vPyilNilJww34NmSz8wmTw/view"
}
    , {
    "title": "VFX Intro Reel", "cat": "3D & VFX", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769428630/VFX_Intro_Reel_l0fmqw.mp4"
}
    , {
    "title": "iPad Air 2023", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/iPad%20Air%202023.mp4"
}
    , {
    "title": "3D Headset", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/3D%20Headset.mp4"
}
    , {
    "title": "Random Render A", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/Random%20Render%20A.mp4"
}
    , {
    "title": "Minimie Ad Concept", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/Minimie%20Ad%20Concept.mp4"
}
    , {
    "title": "Character FX Simulation", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/Character%20FX%20Simulation.mp4"
}
    , {
    "title": "VFX Car Shot", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/VFX%20Car%20Shot.mp4"
}
    , {
    "title": "Instagram VFX", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/Instagram%20VFX.mp4"
}
    , {
    "title": "Random Render B", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/Random%20Render%20B.mp4"
}
    , {
    "title": "Product Commercial Exam", "cat": "3D & VFX", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769433928/Product_Commercial_Exam_gmlyp0.mp4"
}
    , {
    "title": "3D Animation Sequence", "cat": "3D & VFX", "type": "video", "url": "./assets/3D%20&%20VFX/0001-0148.mp4"
}
    , {
    "title": "Car VFX Still", "cat": "3D & VFX", "url": "./assets/3D%20&%20VFX/Car%20VFX%20Still.jpg"
}
    , {
    "title": "Hypo Ad Campaign", "cat": "Video Editing", "type": "video", "url": "./assets/Video%20Editing/Hypo%20Ad%20Campaign.mp4"
}
    , {
    "title": "Situation of Nigeria 2024", "cat": "Video Editing", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769427459/Situation_of_Nigeria_2024_evmjxy.mp4"
}
    , {
    "title": "Na Hunger Cause Am", "cat": "Video Editing", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769395474/Na_Hunger_Cause_Am_yhhgje.mp4"
}
    , {
    "title": "The Pen Skit", "cat": "Video Editing", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769396398/The_Pen_Skit_ierx9y.mp4"
}
    , {
    "title": "POV: Maths Teacher", "cat": "Video Editing", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769427423/POV_Maths_Teacher_r5p696.mp4"
}
    , {
    "title": "La La Land Skit", "cat": "Video Editing", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769420831/La_La_Land_Skit_w14v8x.mp4"
}
    , {
    "title": "Enter Me", "cat": "Video Editing", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769426290/Enter_Me_r3lqgk.mp4"
}
    , {
    "title": "100 Level News Project", "cat": "Video Editing", "type": "video", "url": "https://res.cloudinary.com/deacdvqxk/video/upload/v1769373338/100_Level_News_Project_oybl61.mp4"
}
    , {
    "title": "PRE327 Video Project", "cat": "Video Editing", "type": "video", "url": "./assets/Video%20Editing/PRE327%20PROJECT.mp4"
}
    , {
    "title": "AI Animation 1", "cat": "AI", "type": "video", "url": "./assets/AI/AI%20Animation%201.mp4"
}
    , {
    "title": "AI Animation 2", "cat": "AI", "type": "video", "url": "./assets/AI/AI%20Animation%202.mp4"
}
    , {
    "title": "A Guy Trying", "cat": "AI", "type": "video", "url": "./assets/AI/A%20Guy%20Trying.mp4"
}
    , {
    "title": "PRE327 AI Project", "cat": "AI", "type": "video", "url": "./assets/AI/PRE327%20PROJECT.mp4"
}
    , {
    "title": "Sweet Touch Ventures", "cat": "Website", "url": "https://image.thum.io/get/width/800/crop/800/https://sweettouchventures.vercel.app/", "projectUrl": "https://sweettouchventures.vercel.app/"
}
    , {
    "title": "Samsco Portfolio v1", "cat": "Website", "url": "https://image.thum.io/get/width/800/crop/800/https://samsco.vercel.app/", "projectUrl": "https://samsco.vercel.app/"
}
    , {
    "title": "RCCG Faith Tabernacle", "cat": "Website", "url": "https://image.thum.io/get/width/800/crop/800/https://rccgparish.wixsite.com/rccgfaithtabernacle", "projectUrl": "https://rccgparish.wixsite.com/rccgfaithtabernacle"
}
    , {
    "title": "TforTrendz YouTube", "cat": "Social Management", "url": "./assets/Social%20Management/tfortrendz-thumbnail.png", "projectUrl": "https://www.youtube.com/@TforTrendz", "stats": {
        "subscribers": "100+", "views": "95K", "videos": "85+"
    }

}
    , {
    "title": "Presentation 1", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAG5MPzCT9s/WUjeA7tSJM_X_knOCgXLXg/view"
}
    , {
    "title": "Presentation 2", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGlmu7xNCg/pJpf9XlkTukhwqJoU44wIQ/view"
}
    , {
    "title": "Presentation 3", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGZ1n4efb4/aIb1mhPK1Ih1lcgcy2-3qw/view"
}
    , {
    "title": "Presentation 4", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGbvggkPeY/fWLe5spSL401NWmuAy5ALQ/view"
}
    , {
    "title": "Presentation 5", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGbvjyze3o/JJxneA8SvZkxMewqx-qhdw/view"
}
    , {
    "title": "Presentation 6", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGlUkXPUOo/eha8IUZ9xv98gsKSessxoQ/view"
}
    , {
    "title": "Presentation 7", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGfdbkES60/cEpha2EZP5BG_aNbCm2m1g/view"
}
    , {
    "title": "Presentation 8", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGlqyIm6cM/f8wIbADUuBhEA8Otz3Tr1A/view"
}
    , {
    "title": "Presentation 9", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGl2WxIlYI/aUty1AkpBjaObMhBo9q_pw/view"
}
    , {
    "title": "Presentation 10", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGolgtVa3M/oIVck2MQETy18v8mTO-Dhg/view"
}
    , {
    "title": "Presentation 11", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGtSnAFHiI/MplySYYQKQMLq62dKOe_qQ/view"
}
    , {
    "title": "Presentation 12", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGURwQGzsI/RD8CfiopXAs5AYXlooC_yA/view"
}
    , {
    "title": "Presentation 13", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGeROxTabM/TGj5fW--_Am0AP4V6tilBQ/view"
}
    , {
    "title": "Graphics Design 59", "cat": "Graphics Design", "type": "iframe", "url": "https://www.canva.com/design/DAGQp7ZorVI/3PWh7TEDLJzxRedZ_pXtXQ/view"
}
    , {
    "title": "Presentation 14", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGcFpCQ1ZQ/E559wRx7_JMPLeT8nZPGxg/view"
}
    , {
    "title": "Presentation 15", "cat": "Presentations", "type": "iframe", "url": "https://www.canva.com/design/DAGlUeOB954/W76lcwkeUdRCPGwwoRmaYA/view"
}
    , {
    "title": "Graphics Design 60", "cat": "Graphics Design", "type": "iframe", "url": "https://www.canva.com/design/DAGcGAsUpvU/1K4sNLIU12LjX06hCTsG9Q/view"
}
    , {
    "title": "Graphics Design 61", "cat": "Graphics Design", "type": "iframe", "url": "https://www.canva.com/design/DAGZ0bfoWXk/-mCx81UG09fQXf9sA4hfRg/view"
}
    , {
    "title": "Graphics Design 62", "cat": "Graphics Design", "type": "iframe", "url": "https://www.canva.com/design/DAGNQIL6Opo/_xvlN-tPHcUjFdG8d1kp9w/view"
}
];
