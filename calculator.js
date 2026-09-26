function getdata(value) {
    document.getElementById("input").value += value;
}

function clearinput() {
    document.getElementById("input").value = "";
}

function backspace() {
    let value = document.getElementById("input").value;
    document.getElementById("input").value = value.slice(0, -1);
}

function final() {
    let input = document.getElementById("input").value;
    try {
        input = input.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(input);
        document.getElementById("input").value = result;
    } catch (e) {
        document.getElementById("input").value = "Error";
        setTimeout(() => { clearinput(); }, 1500);
    }
}