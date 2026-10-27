document.querySelectorAll("[data-password-toggle]").forEach((toggle) => {
    const inputId = toggle.getAttribute("data-password-toggle");
    const passwordInput = inputId ? document.getElementById(inputId) : null;

    if (!(passwordInput instanceof HTMLInputElement)) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isVisible = passwordInput.type === "text";
        passwordInput.type = isVisible ? "password" : "text";
        toggle.textContent = isVisible ? "แสดง" : "ซ่อน";
        toggle.setAttribute("aria-label", isVisible ? "แสดงรหัสผ่าน" : "ซ่อนรหัสผ่าน");
        toggle.setAttribute("aria-pressed", String(!isVisible));
    });
});

document.querySelectorAll(".auth-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        window.location.assign("หน้าหลัก.html");
    });
});
