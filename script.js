// Switches between the Shift Slider and the Dropdown depending on the Cipher chosen
function updateUI() {
    const type = document.getElementById("cipherType").value;
    if (type === "caesar") {
        document.getElementById("caesarKeyDiv").style.display = "block";
        document.getElementById("multiplicativeKeyDiv").style.display = "none";
    } else {
        document.getElementById("caesarKeyDiv").style.display = "none";
        document.getElementById("multiplicativeKeyDiv").style.display = "block";
    }
    processText(); // Automatically recalculate text when the cipher type is changed
}

// Modify your existing processing/calculation function
function processText() {
    const inputText = document.getElementById("inputText").value; // Your input textarea
    const isDecrypt = document.getElementById("decryptToggle").checked; // Assuming you have a toggle/radio for decrypt
    const cipherType = document.getElementById("cipherType").value;
    
    let outputText = "";
    
    // Route to the correct algorithm
    if (cipherType === "caesar") {
        const shift = parseInt(document.getElementById("shiftValue").value);
        outputText = caesarCipher(inputText, shift, isDecrypt); // Your existing caesar function
    } else {
        const key = parseInt(document.getElementById("multiKey").value);
        outputText = multiplicativeCipher(inputText, key, isDecrypt);
    }
    
    document.getElementById("outputText").value = outputText; // Your result textarea
}

// Ensure elements listen for changes
document.getElementById("cipherType").addEventListener("change", processText);
document.getElementById("multiKey").addEventListener("change", processText);
