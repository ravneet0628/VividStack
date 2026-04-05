// Contact form — forms.vividstack.ca + Cloudflare Turnstile (script loads when #contact is in view)

const SUBMIT_URL =
  "https://forms.vividstack.ca/api/forms/vividstack/submissions";

type TurnstileApi = {
  reset: (widgetId?: string) => void;
};

function getTurnstileToken(form: HTMLFormElement): string {
  const input = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    'input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]',
  );
  return input?.value?.trim() ?? "";
}

function resetTurnstileWidget(form: HTMLFormElement): void {
  const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
  if (!api?.reset) return;
  const el = form.querySelector(".cf-turnstile");
  const widgetId = el?.getAttribute("data-widget-id") ?? undefined;
  try {
    api.reset(widgetId);
  } catch {
    /* ignore */
  }
}

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

    if (!getTurnstileToken(contactForm)) {
      errorEl?.classList.remove("hidden");
      if (errorTitleEl) errorTitleEl.textContent = "Verification loading";
      if (errorDetailEl)
        errorDetailEl.textContent =
          "Please wait for the security check to finish loading, then try again.";
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      let ok = response.ok;
      let errMessage: string | undefined;
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const raw = await response.text();
        if (raw) {
          try {
            const result = JSON.parse(raw) as {
              success?: boolean;
              message?: string;
              error?: string;
            };
            if (typeof result.success === "boolean") {
              ok = result.success;
            }
            errMessage = result.message ?? result.error;
          } catch {
            if (!response.ok) ok = false;
          }
        }
      }

      if (ok) {
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
          resetTurnstileWidget(contactForm);
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
        throw new Error(errMessage || "Submission failed");
      }
    } catch {
      errorEl?.classList.remove("hidden");
      if (errorTitleEl) errorTitleEl.textContent = defaultErrorTitle;
      if (errorDetailEl) errorDetailEl.textContent = defaultErrorDetail;
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
      resetTurnstileWidget(contactForm);
    }
  });
}

initContactForm();
