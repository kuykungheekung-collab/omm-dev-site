const requestForm = document.querySelector("#system-request-form");
const resultPanel = document.querySelector("#request-result");
const summaryField = document.querySelector("#request-summary");
const copyButton = document.querySelector("#copy-request");
const copyStatus = document.querySelector("#copy-status");

requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const description = requestForm.elements.namedItem("system-description").value.trim();
    const details = requestForm.elements.namedItem("system-details").value.trim();
    const contact = requestForm.elements.namedItem("contact-info").value.trim();

    if (!description) {
        requestForm.elements.namedItem("system-description").focus();
        return;
    }

    summaryField.value = [
        "รายละเอียดคำขอระบบหรือโปรแกรม",
        "",
        `ระบบหรือโปรแกรมที่ต้องการ: ${description}`,
        `รายละเอียดเพิ่มเติม: ${details || "ไม่ได้ระบุ"}`,
        `ช่องทางติดต่อกลับ: ${contact || "ไม่ได้ระบุ"}`,
        "",
        "ขอสอบถามรายละเอียดและประเมินแนวทางการพัฒนา"
    ].join("\n");
    copyStatus.textContent = "";
    resultPanel.hidden = false;
    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(summaryField.value);
        copyStatus.textContent = "คัดลอกคำขอแล้ว นำไปส่งผ่านช่องทางติดต่อที่คุณสะดวกได้เลย";
    } catch (error) {
        copyStatus.textContent = "คัดลอกอัตโนมัติไม่ได้ กรุณาเลือกข้อความในช่องแล้วคัดลอกด้วยตนเอง";
        summaryField.focus();
        summaryField.select();
    }
});
