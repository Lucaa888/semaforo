const redLights = [
    document.getElementById('red1'),
    document.getElementById('red2'),
    document.getElementById('red3'),
  ];
  const greenLight = document.getElementById('green');
  const startButton = document.getElementById('startButton');
  const resultDiv = document.getElementById('result');
  let startTime = null;
  
  startButton.addEventListener('click', () => {
    resultDiv.textContent = '';
    redLights.forEach(light => light.classList.remove('active'));
    greenLight.classList.remove('active');
    startButton.disabled = true;
  
    let delay = 0;
  
    redLights.forEach((light, index) => {
      const timer = Math.random() * 1000 + 500; // Tempo casuale per ogni luce rossa (0.5 - 1.5s)
      delay += timer;
      setTimeout(() => light.classList.add('active'), delay);
    });
  
    const greenDelay = Math.random() * 2000 + 1000; // Tempo casuale per il verde (1-3s)
    delay += greenDelay;
  
    setTimeout(() => {
      redLights.forEach(light => light.classList.remove('active'));
      greenLight.classList.add('active');
      startTime = Date.now();
    }, delay);
  
    document.body.addEventListener('click', () => {
      if (greenLight.classList.contains('active')) {
        const reactionTime = (Date.now() - startTime) / 1000;
        resultDiv.textContent = `Tempo di reazione: ${reactionTime.toFixed(3)} secondi`;
      } else {
        resultDiv.textContent = 'Partenza anticipata!';
      }
      startButton.disabled = false;
    }, { once: true });
  });
  