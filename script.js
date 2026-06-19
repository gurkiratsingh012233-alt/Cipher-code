// --- 1. Math Helper for Multiplicative Cipher ---
function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1;
}

// --- 2. Caesar Cipher Algorithm ---
function caesarCipher(text, shift, isDecrypt) {
    let result = '';
    // If decrypting, reverse the shift
    let effectiveShift = isDecrypt ? (26 - shift) % 26 : shift;
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[A-Z]/)) {
            let code = ((char.charCodeAt(0) - 65 + effectiveShift) % 26) + 65;
            result += String.fromCharCode(code);
        } else if (char.match(/[a-z]/)) {
            let code = ((char.charCodeAt(0) - 97 + effectiveShift) % 26) + 97;
            result += String.fromCharCode(code);
        } else {
            result += char; // Keep spaces and symbols unchanged
        }
    }
    return result;
}

// --- 3. Multiplicative Cipher Algorithm ---
function multiplicativeCipher(text, key, isDecrypt) {
    let result = '';
    const m = 26; 
    
    let effectiveKey = isDecrypt ? modInverse(key, m) : key;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[A-Z]/)) {
            let p = char.charCodeAt(0) - 65;
            let c = (p * effectiveKey) % m;
            result += String.fromCharCode(c + 65);
        }
        else if (char.match(/[a-z]/)) {
            let p = char.charCodeAt(0) - 97;
            let c = (p * effectiveKey) % m;
            result += String.fromCharCode(c + 97);
        }
        else {
            result += char; // Keep spaces and symbols unchanged
        }
    }
    return result;
}

// --- 4. User Interface Logic ---
function updateUI() {
    const type = document.getElementById("cipherType").value;
    if (type === "caesar") {
        document.getElementById("caesarKeyDiv").style.display = "block";
        document.getElementById("multiplicativeKeyDiv").style.display = "none";
    } else {
        document.getElementById("caesarKeyDiv").style.display = "none";
        document.getElementById("multiplicativeKeyDiv").style.display = "block";
    }
    processText(); // Recalculate text when switching ciphers
}

// --- 5. Main Processing Logic ---
function processText() {
    // 1. Get the text from the input box
    const inputText = document.getElementById("inputText").value; 
    
    // 2. Check if decrypt mode is active (assumes your decrypt radio button has id="decrypt")
    const decryptElement = document.getElementById("decrypt");
    const isDecrypt = decryptElement ? decryptElement.checked : false; 
    
    // 3. Get the selected cipher
    const cipherType = document.getElementById("cipherType").value;
    
    let outputText = "";
    
    // 4. Route to the correct algorithm
    if (cipherType === "caesar") {
        const shift = parseInt(document.getElementById("shiftValue").value) || 3;
        outputText = caesarCipher(inputText, shift, isDecrypt); 
        
        // Update the visible number next to the slider if you have a display element
        if(document.getElementById("shiftDisplay")) {
            document.getElementById("shiftDisplay").innerText = shift;
        }
    } else {
        const key = parseInt(document.getElementById("multiKey").value) || 1;
        outputText = multiplicativeCipher(inputText, key, isDecrypt);
    }
    
    // 5. Put the result into the output box
    document.getElementById("outputText").value = outputText; 
}

// --- 6. Event Listeners (Triggers calculations automatically) ---
document.addEventListener("DOMContentLoaded", () => {
    // Listen for dropdown and slider changes
    document.getElementById("cipherType").addEventListener("change", updateUI);
    document.getElementById("multiKey").addEventListener("change", processText);
    document.getElementById("shiftValue").addEventListener("input", processText);
    
    // Listen for typing in the input box
    document.getElementById("inputText").addEventListener("input", processText);
    
    // Listen for Encrypt/Decrypt toggle changes
    const encryptRadio = document.getElementById("encrypt");
    const decryptRadio = document.getElementById("decrypt");
    if(encryptRadio) encryptRadio.addEventListener("change", processText);
    if(decryptRadio) decryptRadio.addEventListener("change", processText);
});
