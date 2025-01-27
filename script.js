const startButton = document.getElementById('startButton');
const resultDiv = document.getElementById('result');
const redLights = [
  document.getElementById('red1'),
  document.getElementById('red2'),
  document.getElementById('red3'),
];
const greenLight = document.getElementById('green');
let startTime = null;

function resetLights() {
  redLights.forEach(light => light.classList.remove('active'));
  greenLight.classList.remove('active');
}

function startSequence() {
  resultDiv.textContent = 'Preparati...';
  resetLights();
  startButton.disabled = true;

  let delay = 0;

  redLights.forEach((light) => {
    const timer = Math.random() * 1000 + 500;
    delay += timer;
    setTimeout(() => light.classList.add('active'), delay);
  });

  const greenDelay = Math.random() * 2000 + 1000;
  delay += greenDelay;

  setTimeout(() => {
    resetLights();
    greenLight.classList.add('active');
    startTime = Date.now();
    document.body.addEventListener('click', handleClick, { once: true });
  }, delay);
}

function handleClick() {
  if (greenLight.classList.contains('active')) {
    const reactionTime = (Date.now() - startTime) / 1000;
    resultDiv.textContent = `Tempo di reazione: ${reactionTime.toFixed(3)} secondi`;
  } else {
    resultDiv.textContent = 'Partenza anticipata!';
  }
  startButton.disabled = false;
}

startButton.addEventListener('click', () => {
  document.body.removeEventListener('click', handleClick);
  startSequence();
});
