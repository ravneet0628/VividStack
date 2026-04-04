// Contact form — Web3Forms + hCaptcha (widget loads with Web3Forms when #contact is in view)
function initContactForm(): void {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const successEl = document.getElementById("form-success");
  const errorEl = document.getElementById("form-error");
  const errorTitleEl = document.getElementById("form-error-title");
  const errorDetailEl = document.getElementById("form-error-detail");

  const defaultErrorTitle = errorTitleEl?.textContent ?? "That didn't send";
  const defaultErrorDetail =
    errorDetailEl?.textContent ??
    "Try again in a moment, or email us directly. We will still see it.";

  if (
    !(contactForm instanceof HTMLFormElement) ||
    !(submitBtn instanceof HTMLButtonElement)
  ) {
    return;
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    successEl?.classList.add("hidden");
    errorEl?.classList.add("hidden");
    if (errorTitleEl) errorTitleEl.textContent = defaultErrorTitle;
    if (errorDetailEl) errorDetailEl.textContent = defaultErrorDetail;

    const hCaptchaResponse = contactForm.querySelector(
      'textarea[name="h-captcha-response"]',
    );
    if (!(hCaptchaResponse instanceof HTMLTextAreaElement)) {
      errorEl?.classList.remove("hidden");
      if (errorTitleEl) errorTitleEl.textContent = "Verification loading";
      if (errorDetailEl)
        errorDetailEl.textContent =
          "Please wait for the security check to finish loading, then try again.";
      return;
    }
    if (!hCaptchaResponse.value.trim()) {
      errorEl?.classList.remove("hidden");
      if (errorTitleEl) errorTitleEl.textContent = "Verification required";
      if (errorDetailEl)
        errorDetailEl.textContent =
          "Complete the captcha below, then send again.";
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");

    try {
      const formData = new FormData(contactForm);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (result.success) {
        successEl?.classList.remove("hidden");

        const formFields = contactForm.querySelectorAll(
          "input:not([type=hidden]), textarea, .grid, .flex.flex-col.mt-2, .mt-6.flex",
        );
        formFields.forEach((el) => {
          if (!(el instanceof HTMLElement)) return;
          el.style.transition = "opacity 0.4s ease";
          el.style.opacity = "0.3";
          el.style.pointerEvents = "none";
        });

        submitBtn.classList.remove("is-loading");
        submitBtn.classList.add("is-success");
        submitBtn.textContent = "✓ Sent";

        setTimeout(() => {
          contactForm.reset();
          formFields.forEach((el) => {
            if (!(el instanceof HTMLElement)) return;
            el.style.opacity = "1";
            el.style.pointerEvents = "auto";
          });
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove("is-success");
          successEl?.classList.add("hidden");
        }, 5000);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch {
      errorEl?.classList.remove("hidden");
      if (errorTitleEl) errorTitleEl.textContent = defaultErrorTitle;
      if (errorDetailEl) errorDetailEl.textContent = defaultErrorDetail;
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
    }
  });
}

initContactForm();
