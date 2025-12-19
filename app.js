let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll("button");

let string = "";
const operators = ['+', '-', '*', '/', '%'];

// Initialize input value
input.value = string;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        if (value === '=') {
            try {
                if (string === "") {
                    input.value = "0";
                    return;
                }
                string = eval(string);
                input.value = string;
            } catch {
                input.value = "Error";
                string = "";
            }
        } else if (value === 'AC') {
            string = "";
            input.value = string;
        } else if (value === 'DEL') {
            if (string.length > 0) {
                string = string.slice(0, -1);
                input.value = string;
            }
        } else if (value === '.') {
            // prevent multiple dots in one number
            let lastNum = string.split(/[\+\-\*\/\%]/).pop();
            if (lastNum.includes('.')) return;

            string += value;
            input.value = string;
        } else if (operators.includes(value)) {
            if (string === "") {
                // allow minus at the beginning for negative number
                if (value === '-') {
                    string += value;
                    input.value = string;
                }
                return; // don't allow other operators at start
            }

            let lastChar = string.slice(-1);

            if (operators.includes(lastChar)) {
                // If last char is an operator
                if (lastChar !== '-' || value !== '-') {
                    // Replace only if not double minus
                    string = string.slice(0, -1) + value;
                }
                // else allow negative like 5*-3
            } else {
                string += value;
            }

            input.value = string;
        } else {
            // Handle number input
            string += value;
            input.value = string;
        }
    });
});