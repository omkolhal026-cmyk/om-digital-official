const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxcYjY5sMXMPT8g1hEFMdT62YXrUPeSypUksN9t4lngDMBbGQxil_4Nb3azkiz804QN/exec";

// Auto Today's Date
window.onload = () => {

    document.getElementById("renewDate").value =
        new Date().toISOString().split("T")[0];

};

// MH Format
function formatMH(input){

    let value = input.value.toUpperCase();

    value = value.replace(/[^A-Z0-9]/g,"");

    if(!value.startsWith("MH")){
        value = "MH" + value.replace(/^MH/,"");
    }

    let digits = value.substring(2).replace(/\D/g,"").substring(0,12);

    input.value = "MH" + digits;

}

// Save Button
document.getElementById("saveBtn").addEventListener("click", saveRenewal);

async function saveRenewal(){

    const btn = document.getElementById("saveBtn");

    const name = document.getElementById("name").value.trim();
    const mhNumber = document.getElementById("mhNumber").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const renewDate = document.getElementById("renewDate").value;
    const verifyDate = document.getElementById("verifyDate").value;
    const from = document.getElementById("from").value;
    const formFiller = document.getElementById("filler").value;

    // Validation

    if(name===""){
        alert("Enter Full Name");
        return;
    }

    if(!/^MH\d{12}$/.test(mhNumber)){
        alert("Enter Valid MH Number");
        return;
    }

    if(!/^\d{10}$/.test(mobile)){
        alert("Enter Valid Mobile Number");
        return;
    }

    if(verifyDate===""){
        alert("Select Verification Date");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = "Saving...";

    const formData = new FormData();

    formData.append("type","Renewal");
    formData.append("name",name);
    formData.append("mhNumber",mhNumber);
    formData.append("mobile",mobile);
    formData.append("renewDate",renewDate);
    formData.append("verifyDate",verifyDate);
    formData.append("from",from);
    formData.append("formFiller",formFiller);

    try{

        const response = await fetch(SCRIPT_URL,{
            method:"POST",
            body:formData
        });

        const result = await response.json();

        if(result.status==="success"){

            alert("✅ Renewal Saved Successfully");

            document.getElementById("renewForm").reset();

            document.getElementById("renewDate").value =
            new Date().toISOString().split("T")[0];

        }else{

            alert(result.message);

        }

    }catch(err){

        console.error(err);
        alert("Error : " + err.message);

    }

    btn.disabled = false;
    btn.innerHTML = "💾 SAVE";

}
const verifyTaluka =
document.getElementById("verifyTaluka").value;

if(verifyTaluka==""){
    alert("Select Verification Taluka");
    return;
}
