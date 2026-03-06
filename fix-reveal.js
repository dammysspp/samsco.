const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

// The logic that adds `reveal-active` looks like this in the minified script:
// document.body.classList.add("reveal-active"), setTimeout(finalizeLoad, 2200) }, 500)) } function finalizeLoad() { preloader.style.display = "none", document.body.style.overflow = "", setTimeout(() => { document.body.classList.remove("reveal-active");

// We just want to remove the CSS class addition so the animation isn't triggered.
// Wait, if we don't add reveal-active, the elements might have opacity: 0 from other CSS if we aren't careful?
// Let's check styles.css to ensure default isn't opacity: 0.
// Most likely `reveal-active` triggers an animation that takes it FROM opacity 0 TO 1, or manipulates scale/filters.

content = content.replace('document.body.classList.add("reveal-active")', '/* removed */');
content = content.replace('document.body.classList.remove("reveal-active")', '/* removed */');

// Let's look exactly at the preloader exit logic:
const searchString = 'document.body.classList.add("reveal-active"), setTimeout(finalizeLoad, 2200)';
const replaceString = 'setTimeout(finalizeLoad, 2200)';
if (content.includes(searchString)) {
    content = content.replace(searchString, replaceString);
    console.log("Found very specific string. Replaced.");
}

const searchString2 = 'document.body.classList.add("reveal-active")';
const replaceString2 = '/* no reveal-active */';
if (content.includes(searchString2)) {
    content = content.replace(searchString2, replaceString2);
}

fs.writeFileSync('script.js', content, 'utf8');
console.log("Updated script.js to remove reveal-active class addition.");
