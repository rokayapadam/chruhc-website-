// =====================================
// 1. MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';

});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

    });

});


// =====================================
// 2. DARK AND LIGHT MODE
// =====================================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("churchTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';

}

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    const darkMode = document.body.classList.contains("dark-mode");

    if (darkMode) {

        localStorage.setItem("churchTheme", "dark");

        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';

    } else {

        localStorage.setItem("churchTheme", "light");

        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';

    }

});


// =====================================
// 3. BIBLE VERSE GENERATOR
// =====================================

const verses = [

    {
        text: "The Lord is my shepherd; I shall not want.",
        reference: "Psalm 23:1"
    },

    {
        text: "I can do all things through Christ who strengthens me.",
        reference: "Philippians 4:13"
    },

    {
        text: "Be strong and courageous. Do not be afraid.",
        reference: "Joshua 1:9"
    },

    {
        text: "God is our refuge and strength, an ever-present help in trouble.",
        reference: "Psalm 46:1"
    },

    {
        text: "Trust in the Lord with all your heart.",
        reference: "Proverbs 3:5"
    },

    {
        text: "The Lord is my light and my salvation.",
        reference: "Psalm 27:1"
    },

    {
        text: "Love one another as I have loved you.",
        reference: "John 15:12"
    }

];

const verseText = document.getElementById("verseText");

const verseReference = document.getElementById("verseReference");

const newVerseBtn = document.getElementById("newVerseBtn");

let previousVerse = -1;

newVerseBtn.addEventListener("click", function() {

    let randomIndex;

    do {

        randomIndex = Math.floor(Math.random() * verses.length);
rs
    } while (randomIndex === previousVee);

    previousVerse = randomIndex;

    verseText.textContent = '"' + verses[randomIndex].text + '"';

    verseReference.textContent = verses[randomIndex].reference;

});


// =====================================
// 4. EVENT SEARCH AND FILTER
// =====================================

const eventSearch = document.getElementById("eventSearch");

const eventCards = document.querySelectorAll(".event-card");

const noEvents = document.getElementById("noEvents");

eventSearch.addEventListener("input", function() {

    const searchValue = eventSearch.value.toLowerCase();

    let visibleEvents = 0;

    eventCards.forEach(function(card) {

        const eventName = card.dataset.name.toLowerCase();

        if (eventName.includes(searchValue)) {

            card.style.display = "block";

            visibleEvents++;

        } else {

            card.style.display = "none";

        }

    });

    noEvents.hidden = visibleEvents !== 0;

});


// Event buttons

document.querySelectorAll(".event-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const eventName = button.dataset.event;

        showNotification(
            eventName + " selected. Please contact the church for registration details."
        );

    });

});


// =====================================
// 5. IMAGE GALLERY SLIDER
// =====================================

const galleryImages = document.querySelectorAll(".gallery-image");

const previousImage = document.getElementById("previousImage");

const nextImage = document.getElementById("nextImage");

let currentImage = 0;


// Display one image at a time on small screens.
// All images remain visible on desktop.

function updateGallery() {

    const mobileView = window.innerWidth <= 600;

    galleryImages.forEach(function(image, index) {

        if (mobileView) {

            image.style.display =
                index === currentImage ? "block" : "none";

        } else {

            image.style.display = "block";

        }

    });

}

nextImage.addEventListener("click", function() {

    currentImage++;

    if (currentImage >= galleryImages.length) {

        currentImage = 0;

    }

    updateGallery();

});


previousImage.addEventListener("click", function() {

    currentImage--;

    if (currentImage < 0) {

        currentImage = galleryImages.length - 1;

    }

    updateGallery();

});

window.addEventListener("resize", updateGallery);

updateGallery();


// =====================================
// 6. IMAGE POPUP
// =====================================

const imageModal = document.getElementById("imageModal");

const modalImage = document.getElementById("modalImage");

const closeModal = document.getElementById("closeModal");

galleryImages.forEach(function(image) {

    image.addEventListener("click", function() {

        modalImage.src = image.src;

        modalImage.alt = image.alt;

        imageModal.classList.add("active");

    });

});


closeModal.addEventListener("click", function() {

    imageModal.classList.remove("active");

});

imageModal.addEventListener("click", function(event) {

    if (event.target === imageModal) {

        imageModal.classList.remove("active");

    }

});


// Close popup using Escape key

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        imageModal.classList.remove("active");

    }

});


// =====================================
// 7. POPUP NOTIFICATION
// =====================================

const notification = document.getElementById("notification");

let notificationTimer;

function showNotification(message) {

    notification.textContent = message;

    notification.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer = setTimeout(function() {

        notification.classList.remove("show");

    }, 3500);

}


// =====================================
// 8. PRAYER REQUEST FORM
// =====================================

const prayerForm = document.getElementById("prayerForm");

prayerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("prayerName").value.trim();

    const email = document.getElementById("prayerEmail").value.trim();

    const message = document.getElementById("prayerMessage").value.trim();

    if (name === "" || email === "" || message === "") {

        showNotification("Please complete all prayer request fields.");

        return;

    }

    if (!isValidEmail(email)) {

        showNotification("Please enter a valid email address.");

        return;

    }

    showNotification(
        "Thank you, " + name + ". Your prayer request has been prepared."
    );

    prayerForm.reset();

});


// =====================================
// 9. CONTACT FORM VALIDATION
// =====================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();

    const email = document.getElementById("contactEmail").value.trim();

    const subject = document.getElementById("contactSubject").value.trim();

    const message = document.getElementById("contactMessage").value.trim();


    if (!name || !email || !subject || !message) {

        showNotification("Please complete all contact form fields.");

        return;

    }


    if (!isValidEmail(email)) {

        showNotification("Please enter a valid email address.");

        return;

    }


    showNotification("Thank you! Your message has been prepared.");

    contactForm.reset();

});


// Email validation function

function isValidEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// =====================================
// 10. FAQ EXPANDABLE SECTION
// =====================================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {

    question.addEventListener("click", function() {

        const faqItem = question.parentElement;

        faqItem.classList.toggle("active");

        const icon = question.querySelector("i");

        if (faqItem.classList.contains("active")) {

            icon.classList.replace("fa-plus", "fa-minus");

        } else {

            icon.classList.replace("fa-minus", "fa-plus");

        }

    });

});


// =====================================
// 11. DIGITAL CLOCK
// =====================================

const digitalClock = document.getElementById("digitalClock");

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString();

    digitalClock.textContent = "Current Time: " + time;

}

updateClock();

setInterval(updateClock, 1000);


// =====================================
// 12. CURRENT YEAR IN FOOTER
// =====================================

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();


// =====================================
// 13. BACK TO TOP BUTTON
// =====================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function() {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// =====================================
// 14. WELCOME MESSAGE
// =====================================

console.log("Welcome to Grace Community Church!");

console.log("Church website loaded successfully.");