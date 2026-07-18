const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxcYjY5sMXMPT8g1hEFMdT62YXrUPeSypUksN9t4lngDMBbGQxil_4Nb3azkiz804QN/exec";

// Auto Today's Date
window.onload = function () {
    document.getElementById("regDate").value =
        new Date().toISOString().split("T")[0];
};

// Save Button
document.getElementById("saveBtn").addEventListener("click", saveRegistration);

async function saveRegistration() {

    const btn = document.getElementById("saveBtn");

    const name = document.getElementById("name").value.trim();
    const aadhaar = document.getElementById("aadhaar").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const regDate = document.getElementById("regDate").value;
    const verifyDate = document.getElementById("verifyDate").value;
    const verifyTaluka = document.getElementById("verifyTaluka").value;
    const from = document.getElementById("from").value;
    const formFiller = document.getElementById("filler").value;

    // Validation

    if (name === "") {
        alert("Enter Full Name");
        return;
    }

    if (!/^\d{12}$/.test(aadhaar)) {
        alert("Enter Valid Aadhaar Number");
        return;
    }

    if (!/^\d{10}$/.test(mobile)) {
        alert("Enter Valid Mobile Number");
        return;
    }

    if (verifyDate === "") {
        alert("Select Verification Date");
        return;
    }

    if (verifyTaluka === "") {
        alert("Select Verification Taluka");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = "Saving...";

    const formData = new FormData();

    formData.append("type", "Registration");
    formData.append("name", name);
    formData.append("aadhaar", aadhaar);
    formData.append("mobile", mobile);
    formData.append("regDate", regDate);
    formData.append("verifyDate", verifyDate);
    formData.append("verifyTaluka", verifyTaluka);
    formData.append("from", from);
    formData.append("formFiller", formFiller);

    try {

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.status === "success") {

            alert("✅ Registration Saved Successfully");

            document.getElementById("regForm").reset();

            document.getElementById("regDate").value =
                new Date().toISOString().split("T")[0];

        } else {

            alert(result.message || "Save Failed");

        }

    } catch (err) {

        console.error(err);
        alert("Error : " + err.message);

    }

    btn.disabled = false;
    btn.innerHTML = "💾 SAVE";

}
