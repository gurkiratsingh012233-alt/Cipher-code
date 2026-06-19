// 1. Helper Function: Finds the modular inverse for decryption
function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1;
}

// 2. Core Function: Multiplicative Encryption / Decryption
function multiplicativeCipher(text, key, isDecrypt) {
    let result = '';
    const m = 26; // Alphabet length
    
    // If decrypting, we use the inverse of the key mathematically
    let effectiveKey = isDecrypt ? modInverse(key, m) : key;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Handle Uppercase letters
        if (char.match(/[A-Z]/)) {
            let p = char.charCodeAt(0) - 65; // Convert 'A' to 0
            let c = (p * effectiveKey) % m;
            result += String.fromCharCode(c + 65);
        }
        // Handle Lowercase letters
        else if (char.match(/[a-z]/)) {
            let p = char.charCodeAt(0) - 97; // Convert 'a' to 0
            let c = (p * effectiveKey) % m;
            result += String.fromCharCode(c + 97);
        }
        // Keep spaces, numbers, and symbols exactly the same
        else {
            result += char;
        }
    }
    return result;
}
