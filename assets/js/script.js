const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const overlayElement = document.getElementById('overlay');
const indicatorElement = document.getElementById('volume-indicator');
const sliderElement = document.getElementById('volume-slider');

let soundInitialized = false;
let sound;

function changeQuote() {
  const quoteData = getRandomQuote();
  overlayElement.classList.add('hide');
  
  setTimeout(function() {
    quoteElement.innerText = quoteData.text;
    authorElement.innerText = quoteData.author;
    overlayElement.classList.remove('hide');
  }, 2500)
}

function getRandomQuote() {
  const quote = {...(quotes[Math.floor(Math.random() * quotes.length)])};
  if (quote.author === null) quote.author = "Unknown";
  quote.author = "—" + quote.author;
  return quote;
}

const initialQuoteData = getRandomQuote();
quoteElement.innerText = initialQuoteData.text;
authorElement.innerText = initialQuoteData.author;

function updateVolumeIndicator() {
  const volume = sliderElement.value;

  let state;
  if (volume > 0.7) {
    state = 'high';
  } else if (volume > 0.3) {
    state = 'medium';
  } else if (volume > 0) {
    state = 'low';
  } else {
    state = 'muted';
  }

  indicatorElement.src = `assets/img/volume-${state}.png`;
  if (sound) sound.volume(volume); 
}

function toggleMute() {
  if (sliderElement.value != 0) {
    sliderElement.beforeMute = sliderElement.value;
    sliderElement.value = 0;  
  } else {
    sliderElement.value = sliderElement.beforeMute;
  }
  updateVolumeIndicator();

  initSounds();
}

function initSounds() {
  if (soundInitialized) return;
  // alert('ALERT!');
  sound = new Howl({
    src: ['assets/mp3/WaterWoodAndStone.mp3'],
    loop: true,
  });

  sound.play();
  soundInitialized = true;
}

sliderElement.oninput = updateVolumeIndicator;
sliderElement.beforeMute = 0.7;
indicatorElement.onclick = toggleMute;

sliderElement.onchange = initSounds;


setInterval(changeQuote, 12_000)