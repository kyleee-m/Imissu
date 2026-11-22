const yesButton = document.querySelector(".yes-button");
const noButton = document.querySelector(".no-button");
const heartRain = document.querySelector(".heart-rain");
const response = document.querySelector(".response");
const envelope = document.querySelector(".envelope");
const openButton = document.querySelector(".open-button");
const letter = document.querySelector(".letter");
const closeButton = document.querySelector(".close-button");
let responseTimer;
let effectTimer;

function toggleEnvelope(forceOpen) {
    const isOpen = typeof forceOpen === "boolean" ? forceOpen : !envelope.classList.contains("is-open");
    envelope.classList.toggle("is-open", isOpen);
    letter.inert = !isOpen;
    openButton.setAttribute("aria-expanded", String(isOpen));
    openButton.textContent = isOpen ? "Close the envelope" : "Open the envelope";
    openButton.setAttribute("aria-controls", "love-letter");
}

openButton.addEventListener("click", () => toggleEnvelope());
closeButton.addEventListener("click", () => toggleEnvelope(false));

/* Keep the answer buttons usable without accidentally toggling the envelope. */
yesButton.addEventListener("click", () => {
    toggleEnvelope(true);
    showResponse("Yeyyyyyyyyy! I miss u too :>");
    for (let i = 0; i < 72; i += 1) window.setTimeout(makeHeart, i * 36);
});

noButton.addEventListener("click", () => {
    toggleEnvelope(true);
    showResponse("luh", showBrokenHeart, 900);
});

function showResponse(message, after, effectDelay = 1500) {
    window.clearTimeout(responseTimer);
    window.clearTimeout(effectTimer);
    response.textContent = message;
    response.classList.remove("is-visible");
    // Restart the pop animation when either answer is clicked again.
    void response.offsetWidth;
    response.classList.add("is-visible");
    responseTimer = window.setTimeout(() => {
        response.classList.remove("is-visible");
    }, 1500);
    if (after) effectTimer = window.setTimeout(after, effectDelay);
}

function showBrokenHeart() {
    const burst = document.createElement("div");
    burst.className = "broken-heart-burst";
    burst.setAttribute("aria-hidden", "true");

    const heart = document.createElement("span");
    heart.className = "broken-heart-icon";
    heart.textContent = "\u{1F494}";
    burst.appendChild(heart);

    for (let i = 0; i < 8; i += 1) {
        const shard = document.createElement("span");
        shard.className = "heart-shard";
        shard.textContent = "\u2665";
        shard.style.setProperty("--angle", `${i * 45}deg`);
        shard.style.setProperty("--distance", `${45 + Math.random() * 65}px`);
        burst.appendChild(shard);
    }

    document.body.appendChild(burst);
    burst.addEventListener("animationend", (event) => {
        if (event.target === heart) burst.remove();
    }, { once: true });
}

function makeHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.45 ? "\u2665" : "\u2661";
    const colors = ["#ff7699", "#ffd08b", "#d7b2f3", "#ffc0aa", "#b9e3d7"];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${25 + Math.random() * 42}px`;
    heart.style.setProperty("--duration", `${2.2 + Math.random() * 1.1}s`);
    heart.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
    heartRain.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
}

