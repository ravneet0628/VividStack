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

/** After redirects, FormZero may land on /error?... or similar; treat as failure even if status is 200. */
function urlIndicatesFormFailure(response: Response): boolean {
  try {
    const u = new URL(response.url);
    const pathAndQuery = `${u.pathname}${u.search}`.toLowerCase();
    return (
      pathAndQuery.includes("/error") ||
      pathAndQuery.includes("turnstile_failed") ||
      /\berror=/.test(pathAndQuery)
    );
  } catch {
    return false;
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
        headers: {
          Accept: "application/json",   // ← add this
          },
      });

      const raw = await response.text();
      const trimmed = raw.trim();

      const httpSuccessBand =
        response.status >= 200 && response.status < 300 && !urlIndicatesFormFailure(response);

      let ok = httpSuccessBand;
      let errMessage: string | undefined;

      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          const result = JSON.parse(trimmed) as {
            success?: boolean;
            message?: string;
            error?: string;
          };
          errMessage = result.message ?? result.error;
          // Prefer explicit API signal when present; otherwise trust HTTP + final URL (handles JSON without `success`)
          ok =
            typeof result.success === "boolean"
              ? result.success
              : httpSuccessBand;
        } catch {
          ok = httpSuccessBand;
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
