import { useState } from 'react';

const BUTTONS = [
  { label: 'C', type: 'clear' },
  { label: '±', type: 'sign' },
  { label: '%', type: 'percent' },
  { label: '÷', type: 'op', value: '/' },
  { label: '7' }, { label: '8' }, { label: '9' },
  { label: '×', type: 'op', value: '*' },
  { label: '4' }, { label: '5' }, { label: '6' },
  { label: '−', type: 'op', value: '-' },
  { label: '1' }, { label: '2' }, { label: '3' },
  { label: '+', type: 'op', value: '+' },
  { label: '0', wide: true },
  { label: '.', type: 'dot' },
  { label: '=', type: 'equals' },
];

function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? NaN : a / b;
    default: return b;
  }
}

function format(num) {
  if (!Number.isFinite(num)) return 'Error';
  return String(parseFloat(num.toPrecision(12)));
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  function handleDigit(digit) {
    if (waitingForNext || display === 'Error') {
      setDisplay(digit);
      setWaitingForNext(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }

  function handleDot() {
    if (waitingForNext || display === 'Error') {
      setDisplay('0.');
      setWaitingForNext(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }

  function handleOperator(nextOp) {
    const current = parseFloat(display);
    if (stored !== null && operator && !waitingForNext) {
      const result = calculate(stored, current, operator);
      setDisplay(format(result));
      setStored(result);
    } else {
      setStored(current);
    }
    setOperator(nextOp);
    setWaitingForNext(true);
  }

  function handleEquals() {
    if (operator === null || stored === null) return;
    const result = calculate(stored, parseFloat(display), operator);
    setDisplay(format(result));
    setStored(null);
    setOperator(null);
    setWaitingForNext(true);
  }

  function handleClick(btn) {
    switch (btn.type) {
      case 'clear':
        setDisplay('0'); setStored(null); setOperator(null); setWaitingForNext(false);
        break;
      case 'sign':
        if (display !== '0' && display !== 'Error') {
          setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
        }
        break;
      case 'percent':
        if (display !== 'Error') setDisplay(format(parseFloat(display) / 100));
        break;
      case 'op':
        handleOperator(btn.value);
        break;
      case 'dot':
        handleDot();
        break;
      case 'equals':
        handleEquals();
        break;
      default:
        handleDigit(btn.label);
    }
  }

  return (
    <main className="app">
      <div className="calculator">
        <div className="display" aria-live="polite">{display}</div>
        <div className="keys">
          {BUTTONS.map((btn) => (
            <button
              key={btn.label}
              className={[
                'key',
                btn.type === 'op' || btn.type === 'equals' ? 'key--accent' : '',
                ['clear', 'sign', 'percent'].includes(btn.type) ? 'key--muted' : '',
                btn.wide ? 'key--wide' : '',
                btn.type === 'op' && operator === btn.value && waitingForNext ? 'key--active' : '',
              ].join(' ')}
              onClick={() => handleClick(btn)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
