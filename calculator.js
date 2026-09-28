function getdata(value) {
    if (value === '%') {
        percentage();
        return;
    }
    let inputElem = document.getElementById("input");
    let current = inputElem.value;
    if (current === "Error") {
        inputElem.value = "";
        current = "";
    }
    // Prevent duplicate consecutive operators
    if (['+', '-', '*', '/', '×', '÷', '−'].includes(value)) {
        if (current === "") {
            if (value === '-') {
                inputElem.value = "-";
            }
            return;
        }
        if (['+', '-', '*', '/', '×', '÷', '−'].includes(current.slice(-1))) {
            inputElem.value = current.slice(0, -1) + value;
            return;
        }
    }
    inputElem.value += value;
}

function clearinput() {
    document.getElementById("input").value = "";
}

function backspace() {
    let value = document.getElementById("input").value;
    if (value === "Error") {
        document.getElementById("input").value = "";
        return;
    }
    document.getElementById("input").value = value.slice(0, -1);
}

function percentage() {
    let inputElem = document.getElementById("input");
    let input = inputElem.value;
    if (!input || input === "Error") return;

    // Remove trailing operator if any
    if (/[+\-*/×÷−]$/.test(input)) {
        input = input.slice(0, -1);
    }
    if (!input) return;

    // Check if there is an expression like "100+20" or "500*10"
    let match = input.match(/^(.*?)([+\-*/×÷−])(\d+(?:\.\d+)?)$/);
    if (match) {
        let firstPart = match[1];
        let op = match[2];
        let lastNum = parseFloat(match[3]);

        try {
            let evalBase = eval(firstPart.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'));
            if (op === '+' || op === '-' || op === '−') {
                // e.g., 200 + 10% -> 200 + 20
                let percentVal = (evalBase * lastNum) / 100;
                if (!Number.isInteger(percentVal)) {
                    percentVal = parseFloat(percentVal.toFixed(8));
                }
                inputElem.value = firstPart + op + percentVal;
            } else {
                // e.g., 200 * 10% -> 200 * 0.1
                let percentVal = lastNum / 100;
                if (!Number.isInteger(percentVal)) {
                    percentVal = parseFloat(percentVal.toFixed(8));
                }
                inputElem.value = firstPart + op + percentVal;
            }
        } catch (e) {
            let percentVal = lastNum / 100;
            inputElem.value = firstPart + op + percentVal;
        }
    } else {
        // Single number
        try {
            let clean = input.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
            let val = eval(clean);
            let result = val / 100;
            if (!Number.isInteger(result)) {
                result = parseFloat(result.toFixed(8));
            }
            inputElem.value = result;
        } catch (e) {
            inputElem.value = "Error";
            setTimeout(() => { clearinput(); }, 1500);
        }
    }
}

function final() {
    let input = document.getElementById("input").value;
    if (!input || input === "Error") return;
    try {
        let expr = input.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        // Handle any remaining % in expression
        expr = expr.replace(/(\d+(?:\.\d+)?)([+\-])(\d+(?:\.\d+)?)%/g, '$1$2($1*$3/100)');
        expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
        let result = eval(expr);
        if (typeof result === 'number' && !Number.isInteger(result)) {
            result = parseFloat(result.toFixed(8));
        }
        document.getElementById("input").value = result;
    } catch (e) {
        document.getElementById("input").value = "Error";
        setTimeout(() => { clearinput(); }, 1500);
    }
}