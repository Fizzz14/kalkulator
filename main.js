// Navigation
const navLinks = document.querySelectorAll('nav a');
const pages = document.querySelectorAll('.calculator-page');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('data-page');
    
    navLinks.forEach(l => l.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    
    link.classList.add('active');
    document.getElementById(`${pageId}-calculator`).classList.add('active');
  });
});

// Basic Calculator
let currentNumber = '';
let previousNumber = '';
let operation = null;

window.appendNumber = (num) => {
  currentNumber += num;
  updateDisplay();
};

window.setOperation = (op) => {
  if (currentNumber === '') return;
  
  if (previousNumber !== '') {
    calculate();
  }
  
  operation = op;
  previousNumber = currentNumber;
  currentNumber = '';
};

window.calculate = () => {
  if (previousNumber === '' || currentNumber === '') return;
  
  let result;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
  
  switch(operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    case '^':
      result = Math.pow(prev, current);
      break;
    case '√':
      result = Math.pow(current, 1/prev);
      break;
  }
  
  currentNumber = result.toString();
  operation = null;
  previousNumber = '';
  updateDisplay();
};

window.clearDisplay = () => {
  currentNumber = '';
  previousNumber = '';
  operation = null;
  updateDisplay();
};

function updateDisplay() {
  document.getElementById('basic-display').value = currentNumber;
}

// Sequence Calculator
window.calculateArithmetic = () => {
  const a = parseFloat(document.getElementById('first-term').value);
  const d = parseFloat(document.getElementById('common-diff').value);
  const n = parseInt(document.getElementById('num-terms').value);
  
  if (isNaN(a) || isNaN(d) || isNaN(n)) {
    document.getElementById('sequence-result').textContent = 'Mohon masukkan angka yang valid';
    return;
  }
  
  const sequence = [];
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    const term = a + (i * d);
    sequence.push(term);
    sum += term;
  }
  
  document.getElementById('sequence-result').innerHTML = `
    Barisan: ${sequence.join(', ')}<br>
    Jumlah: ${sum}
  `;
};

window.calculateGeometric = () => {
  const a = parseFloat(document.getElementById('first-term').value);
  const r = parseFloat(document.getElementById('common-diff').value);
  const n = parseInt(document.getElementById('num-terms').value);
  
  if (isNaN(a) || isNaN(r) || isNaN(n)) {
    document.getElementById('sequence-result').textContent = 'Mohon masukkan angka yang valid';
    return;
  }
  
  const sequence = [];
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    const term = a * Math.pow(r, i);
    sequence.push(term);
    sum += term;
  }
  
  document.getElementById('sequence-result').innerHTML = `
    Barisan: ${sequence.join(', ')}<br>
    Jumlah: ${sum}
  `;
};

// Infinite Geometric Series
window.calculateInfiniteGeometric = () => {
  const a = parseFloat(document.getElementById('geo-first-term').value);
  const r = parseFloat(document.getElementById('geo-ratio').value);
  
  if (isNaN(a) || isNaN(r)) {
    document.getElementById('geometric-result').textContent = 'Mohon masukkan angka yang valid';
    return;
  }
  
  if (Math.abs(r) >= 1) {
    document.getElementById('geometric-result').textContent = 'Deret divergen (|r| harus kurang dari 1)';
    return;
  }
  
  const sum = a / (1 - r);
  document.getElementById('geometric-result').textContent = `Jumlah tak hingga: ${sum}`;
};