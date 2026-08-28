document.addEventListener("DOMContentLoaded", () => {
  // --- 1. CONTACT FORM VALIDATION (Only runs if a form exists) ---
  const form = document.querySelector("form");
  if (form && form.querySelector('input[type="email"]')) {
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector("textarea");
    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn) {
      const btnText = submitBtn.querySelector("span") || submitBtn;
      const btnIcon = submitBtn.querySelector("i");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const showError = (input) => {
        input.classList.remove(
          "border-transparent",
          "focus:border-emerald-500",
          "focus:ring-emerald-500/10",
        );
        input.classList.add(
          "border-red-500",
          "focus:border-red-600",
          "focus:ring-red-500/20",
        );
      };

      const removeError = (input) => {
        input.classList.remove(
          "border-red-500",
          "focus:border-red-600",
          "focus:ring-red-500/20",
        );
        input.classList.add(
          "border-transparent",
          "focus:border-emerald-500",
          "focus:ring-emerald-500/10",
        );
      };

      [nameInput, emailInput, messageInput].forEach((input) => {
        if (input) input.addEventListener("input", () => removeError(input));
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let isValid = true;

        if (nameInput && nameInput.value.trim() === "") {
          showError(nameInput);
          isValid = false;
        }
        if (
          emailInput &&
          (emailInput.value.trim() === "" ||
            !emailRegex.test(emailInput.value.trim()))
        ) {
          showError(emailInput);
          isValid = false;
        }
        if (messageInput && messageInput.value.trim() === "") {
          showError(messageInput);
          isValid = false;
        }

        if (!isValid) return;

        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-80", "cursor-not-allowed");
        if (btnText) btnText.textContent = "Sending...";
        if (btnIcon) btnIcon.className = "fa-solid fa-circle-notch fa-spin";

        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (btnText) btnText.textContent = "Message Sent!";
        if (btnIcon) btnIcon.className = "fa-solid fa-check";

        submitBtn.classList.remove(
          "bg-emerald-400",
          "hover:bg-emerald-500",
          "bg-slate-900",
        );
        submitBtn.classList.add("bg-green-500");
        form.reset();

        setTimeout(() => {
          if (btnText) btnText.textContent = "Send Message";
          if (btnIcon) btnIcon.className = "fa-solid fa-paper-plane";
          submitBtn.classList.remove(
            "bg-green-500",
            "opacity-80",
            "cursor-not-allowed",
          );
          submitBtn.classList.add("bg-emerald-400", "hover:bg-emerald-500");
          submitBtn.disabled = false;
        }, 3000);
      });
    }
  }

  // --- 2. GLOBAL CART INITIALIZATION ---
  updateCartBadge();
});

// --- 3. CART FUNCTIONALITY ---

// Listen for changes across different tabs/pages
window.addEventListener("storage", function (e) {
  if (e.key === "farmDirectCart") {
    updateCartBadge();
  }
});

function addToCart(name, price, imagePath) {
  let cart = JSON.parse(localStorage.getItem("farmDirectCart")) || [];
  cart.push({
    id: Date.now(),
    name: name,
    price: Number(price),
    image: imagePath,
  });
  localStorage.setItem("farmDirectCart", JSON.stringify(cart));
  updateCartBadge();
  showToast(`${name} added to basket!`);
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("farmDirectCart")) || [];
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach((badge) => {
    badge.innerText = cart.length;
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-5 right-5 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 transform transition-all duration-300 translate-y-0 opacity-100";
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i> <span class="font-medium">${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("translate-y-10", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
