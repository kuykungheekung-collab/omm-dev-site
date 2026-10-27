const requestForm = document.querySelector("#bot-request-form");
const selectionCount = document.querySelector("#selection-count");
const selectionError = document.querySelector("#selection-error");
const resultPanel = document.querySelector("#request-result");
const summaryField = document.querySelector("#request-summary");
const copyButton = document.querySelector("#copy-request");
const copyStatus = document.querySelector("#copy-status");
const capabilityInputs = [...document.querySelectorAll('input[name="capabilities"]')];

const updateSelectionCount = () => {
    const count = capabilityInputs.filter((input) => input.checked).length;
    selectionCount.textContent = `เลือกแล้ว ${count} รายการ`;
    if (count > 0) {
        selectionError.hidden = true;
    }
};

capabilityInputs.forEach((input) => input.addEventListener("change", updateSelectionCount));

requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedCapabilities = capabilityInputs
        .filter((input) => input.checked)
        .map((input) => input.value);
    const details = requestForm.elements.namedItem("details").value.trim();
    const discordId = requestForm.elements.namedItem("discord-id").value.trim();

    if (selectedCapabilities.length === 0 && details.length === 0) {
        selectionError.hidden = false;
        requestForm.querySelector(".capability-fieldset").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    const lines = [
        "รายละเอียดคำขอเขียนบอท Discord",
        "",
        "ความสามารถที่ต้องการ:",
        ...(selectedCapabilities.length > 0
            ? selectedCapabilities.map((capability) => `- ${capability}`)
            : ["- ยังไม่ได้เลือกความสามารถ"]),
        "",
        `รายละเอียดเพิ่มเติม: ${details || "ไม่ได้ระบุ"}`,
        `Discord สำหรับติดต่อกลับ: ${discordId || "ไม่ได้ระบุ"}`,
        "",
        "ขอสอบถามรายละเอียดและประเมินราคาตามความสามารถของบอท"
    ];

    summaryField.value = lines.join("\n");
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
