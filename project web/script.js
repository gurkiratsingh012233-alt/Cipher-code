let mode = 'encrypt';

function setMode(newMode) {
    mode = newMode;
    document.getElementById('encBtn').className = (mode === 'encrypt') ? 'active' : '';
    document.getElementById('decBtn').className = (mode === 'decrypt') ? 'active' : '';
    runCipher();
}

document.getElementById('inputText').addEventListener('input', runCipher);
document.getElementById('shiftKey').addEventListener('input', (e) => {
    document.getElementById('shiftVal').innerText = e.target.value;
    runCipher();
});

function runCipher() {
    const input = document.getElementById('inputText').value;
    let shift = parseInt(document.getElementById('shiftKey').value);
    if (mode === 'decrypt') shift = (26 - shift) % 26;

    document.getElementById('outputText').value = input.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt();
            const base = (code >= 65 && code <= 90) ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

function copyText() {
    const output = document.getElementById('outputText');
    output.select();
    document.execCommand('copy');
    alert("Result copied!");
}