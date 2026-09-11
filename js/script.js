const envelopeCover = document.getElementById("envelopeCover");
const waxTrigger = document.getElementById("waxTrigger");
const hero = document.getElementById("hero");

let invitationOpened = false;

if (waxTrigger && envelopeCover && hero) {
    waxTrigger.addEventListener("click", () => {
        if (invitationOpened) return;

        invitationOpened = true;

        document.body.classList.remove("invitation-locked");

        envelopeCover.classList.add("seal-pressed");

        setTimeout(() => {
            envelopeCover.classList.remove("seal-pressed");
            envelopeCover.classList.add("open");

            hero.classList.add("hero-ready");

            setTimeout(() => {
                startPetalRain();
            }, 350);
        }, 180);

        setTimeout(() => {
            envelopeCover.classList.add("finished");
        }, 2900);
    });
}


/* =========================
   PETALS
========================= */

function createPetals() {
    const petalLayer = document.getElementById("petalLayer");

    if (!petalLayer) return;

    for (let i = 0; i < 10; i++) {
        const petal = document.createElement("span");

        petal.classList.add("petal");

        const direction = Math.random() > 0.5 ? 1 : -1;

        const basePosition = (i / 10) * 100;
        const variation = Math.random() * 8 - 4;

        petal.style.left = `${basePosition + variation}%`;

        petal.style.setProperty(
            "--size",
            `${6 + Math.random() * 4}px`
        );

        petal.style.setProperty(
            "--duration",
            `${6.5}s`
        );

        petal.style.setProperty(
            "--delay",
            `${Math.random() * 4}s`
        );

        petal.style.setProperty(
            "--drift1",
            `${direction * (10 + Math.random() * 30)}px`
        );

        petal.style.setProperty(
            "--drift2",
            `${-direction * (10 + Math.random() * 35)}px`
        );

        petal.style.setProperty(
            "--drift3",
            `${direction * (10 + Math.random() * 35)}px`
        );

        petal.style.setProperty(
            "--drift4",
            `${-direction * (5 + Math.random() * 25)}px`
        );

        petalLayer.appendChild(petal);
    }
}

let petalRainInterval;

function startPetalRain() {
    createPetals();

    petalRainInterval = setInterval(() => {
        createPetals();
    }, 2200);
}


/* =========================
   COUNTDOWN
========================= */

const weddingDate = new Date("2026-10-18T11:30:00");

function updateCountdown() {
    const now = new Date();

    const difference = weddingDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    if (difference <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   SECTION ANIMATIONS
========================= */

const animatedSections = document.querySelectorAll(
    ".welcome-section, " +
    ".date-section, " +
    ".events-section, " +
    ".timeline-section, " +
    ".venue-section, " +
    ".countdown-section, " +
    ".rsvp-section, " +
    ".closing-section"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");

                sectionObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.68,
        rootMargin: "0px 0px -8% 0px"
    }
);

animatedSections.forEach((section) => {
    sectionObserver.observe(section);
});


/* =========================
   RSVP OPEN / CLOSE
========================= */

const rsvpButton = document.getElementById("rsvpButton");
const rsvpFormWrap = document.getElementById("rsvpFormWrap");

if (rsvpButton && rsvpFormWrap) {
    rsvpButton.addEventListener("click", () => {
        rsvpFormWrap.classList.toggle("open");

        if (rsvpFormWrap.classList.contains("open")) {
            rsvpButton.textContent = "Close RSVP";
        } else {
            rsvpButton.textContent = "Confirm Attendance";
        }
    });
}


/* =========================
   RSVP DEMO SUBMISSION
========================= */

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", (event) => {
        event.preventDefault();

        rsvpForm.innerHTML = `
            <div class="rsvp-success">
                <p class="rsvp-success-small">
                    THANK YOU
                </p>

                <h3>
                    RSVP Received
                </h3>

                <p>
                    We’re so happy to celebrate
                    this special day with you.
                </p>
            </div>
        `;
    });
}


/* =========================
   VENUE BUTTON
========================= */

const venueButton = document.getElementById("venueButton");

if (venueButton) {
    venueButton.addEventListener("click", () => {
        window.open(
            "https://www.google.com/maps/search/?api=1&query=Rambagh+Palace+Jaipur",
            "_blank"
        );
    });
}