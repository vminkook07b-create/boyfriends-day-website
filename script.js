const screens = [
  'openingScreen',
  'letterScreen',
  'memoriesScreen',
  'reasonsScreen',
  'cdScreen',
  'envelopeScreen',
  'envelopeLetterScreen'
];

let currentScreen = 0;
let reasons = [
  '1. You make my heart feel safe. 💕',
  '2. Your hair is my favorite part of you. ✨',
  '3. Your voice is the sweetest sound I know. 🎶',
  '4. Your eyes are so beautiful they make me lose my breath. 😍',
  '5. The way you always understand me without needing me to say too much. 💞',
  '6. You make even ordinary days feel like a story worth remembering. 📖',
  '7. Your hugs are my comfort and my home. 🤍',
  '8. You are cute, patient, and ridiculously lovable. 🫶',
  '9. You are my favorite person to laugh with. 😄',
  '10. You make my life softer, brighter, and happier. 🌷'
];

const defaultMusicUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

window.addEventListener('DOMContentLoaded', () => {
  generateStars();
  displayReasons();
  setupMusic();
  showScreen(0);

  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.volume = 0.35;
    bgMusic.play().catch(() => {
      console.log('Autoplay blocked until the user interacts with the page.');
    });
  }
});

function generateStars() {
  const starsContainer = document.querySelector('.stars-container');
  if (!starsContainer) return;

  for (let i = 0; i < 38; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.width = `${Math.random() * 6 + 5}px`;
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
  }

  const sparkles = document.querySelector('.sparkles');
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.textContent = i % 2 === 0 ? '✦' : '✧';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 7}s`;
    sparkle.style.animationDuration = `${Math.random() * 5 + 5}s`;
    sparkles.appendChild(sparkle);
  }
}

function showScreen(index) {
  screens.forEach((id) => {
    const screen = document.getElementById(id);
    if (screen) screen.classList.remove('active');
  });

  const target = screens[index];
  const nextScreenEl = document.getElementById(target);
  if (nextScreenEl) {
    nextScreenEl.classList.add('active');
    currentScreen = index;
  }
}

function nextScreen() {
  const nextIndex = Math.min(currentScreen + 1, screens.length - 1);
  showScreen(nextIndex);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function editImage(imageId) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const target = document.getElementById(imageId);
      if (target) target.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function displayReasons() {
  const container = document.getElementById('reasonsList');
  if (!container) return;

  container.innerHTML = reasons
    .map(
      (reason, index) => `
        <div class="reason-item">
          ${reason}
          <span class="reason-delete" onclick="deleteReason(${index})">✕</span>
        </div>
      `
    )
    .join('');
}

function addReason() {
  const input = document.getElementById('newReasonInput');
  if (!input) return;

  const value = input.value.trim();
  if (!value) return;

  reasons.push(`${reasons.length + 1}. ${value}`);
  input.value = '';
  displayReasons();
}

function deleteReason(index) {
  reasons.splice(index, 1);
  reasons = reasons.map((reason, i) => reason.replace(/^\d+\./, `${i + 1}.`));
  displayReasons();
}

function setupMusic() {
  const musicInput = document.getElementById('musicUrlInput');
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');

  if (musicInput) musicInput.value = defaultMusicUrl;
  if (musicBtn) musicBtn.textContent = 'Music playing';

  if (bgMusic) {
    bgMusic.src = defaultMusicUrl;
    bgMusic.load();
  }
}

function updateMusicSource() {
  const musicInput = document.getElementById('musicUrlInput');
  const bgMusic = document.getElementById('bgMusic');
  if (!musicInput || !bgMusic) return;

  const url = musicInput.value.trim();
  if (!url) return;

  bgMusic.src = url;
  bgMusic.load();
  bgMusic.play().catch(() => {
    console.log('Audio play requires interaction.');
  });
}

function toggleMusic() {
  const bgMusic = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');
  if (!bgMusic || !musicBtn) return;

  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.textContent = 'Music playing';
  } else {
    bgMusic.pause();
    musicBtn.textContent = 'Music paused';
  }
}

function updateCDLabel() {
  const input = document.getElementById('cdLabelInput');
  const label = document.getElementById('cdLabel');
  if (!input || !label) return;

  const value = input.value.trim();
  if (!value) return;

  label.textContent = value;
}

function openEnvelope() {
  const envelope = document.getElementById('envelope');
  if (!envelope) return;

  envelope.classList.add('open');
  createKissBurst();

  setTimeout(() => {
    showScreen(screens.indexOf('envelopeLetterScreen'));
  }, 900);
}

function createKissBurst() {
  const container = document.getElementById('kissesLayer');
  if (!container) return;

  for (let i = 0; i < 24; i++) {
    const kiss = document.createElement('div');
    kiss.className = 'kiss-pop';
    kiss.textContent = '💋';

    const startX = Math.random() * 80 + 10;
    const startY = Math.random() * 30 + 35;
    const dx = (Math.random() - 0.5) * 180;
    const dy = -(Math.random() * 180 + 90);

    kiss.style.left = `${startX}%`;
    kiss.style.top = `${startY}%`;
    kiss.style.setProperty('--x', `${dx}px`);
    kiss.style.setProperty('--y', `${dy}px`);
    kiss.style.animationDelay = `${i * 0.03}s`;
    container.appendChild(kiss);

    setTimeout(() => kiss.remove(), 1800);
  }
}

function updateFinalMessage() {
  const input = document.getElementById('finalMessageInput');
  const output = document.getElementById('finalMessageText');
  if (!input || !output) return;

  const value = input.value.trim();
  if (!value) return;

  output.textContent = value;
}

function saveWebsite() {
  const saveMessage = document.getElementById('saveMessage');
  if (!saveMessage) return;

  const content = {
    letterText: document.getElementById('letterText')?.textContent || '',
    musicUrl: document.getElementById('musicUrlInput')?.value || defaultMusicUrl,
    cdLabel: document.getElementById('cdLabel')?.textContent || 'Perfect',
    finalMessage: document.getElementById('finalMessageText')?.textContent || 'created with love',
    reasons,
    memories: [
      { src: document.getElementById('memImg1')?.src || '', caption: document.getElementById('memCaption1')?.value || '' },
      { src: document.getElementById('memImg2')?.src || '', caption: document.getElementById('memCaption2')?.value || '' },
      { src: document.getElementById('memImg3')?.src || '', caption: document.getElementById('memCaption3')?.value || '' },
      { src: document.getElementById('memImg4')?.src || '', caption: document.getElementById('memCaption4')?.value || '' }
    ],
    finalPhoto: document.getElementById('finalImg')?.src || '',
    savedAt: new Date().toISOString()
  };

  localStorage.setItem('boyfriendsDaySurprise', JSON.stringify(content));
  saveMessage.textContent = 'Saved successfully — ready to send with love.';

  setTimeout(() => {
    saveMessage.textContent = '';
  }, 2500);
}

function restoreSavedWebsite() {
  const saved = localStorage.getItem('boyfriendsDaySurprise');
  if (!saved) return;

  try {
    const content = JSON.parse(saved);

    if (content.letterText) {
      const target = document.getElementById('letterText');
      if (target) target.textContent = content.letterText;
    }

    if (content.musicUrl) {
      const input = document.getElementById('musicUrlInput');
      if (input) input.value = content.musicUrl;
      const audio = document.getElementById('bgMusic');
      if (audio) {
        audio.src = content.musicUrl;
        audio.load();
        audio.play().catch(() => {});
      }
    }

    if (content.cdLabel) {
      const label = document.getElementById('cdLabel');
      const labelInput = document.getElementById('cdLabelInput');
      if (label) label.textContent = content.cdLabel;
      if (labelInput) labelInput.value = content.cdLabel;
    }

    if (content.finalMessage) {
      const msg = document.getElementById('finalMessageText');
      const msgInput = document.getElementById('finalMessageInput');
      if (msg) msg.textContent = content.finalMessage;
      if (msgInput) msgInput.value = content.finalMessage;
    }

    if (Array.isArray(content.reasons) && content.reasons.length) {
      reasons = content.reasons;
      displayReasons();
    }

    if (Array.isArray(content.memories)) {
      content.memories.forEach((item, index) => {
        const img = document.getElementById(`memImg${index + 1}`);
        const caption = document.getElementById(`memCaption${index + 1}`);
        if (img && item.src) img.src = item.src;
        if (caption && item.caption) caption.value = item.caption;
      });
    }

    if (content.finalPhoto) {
      const finalImg = document.getElementById('finalImg');
      if (finalImg) finalImg.src = content.finalPhoto;
    }
  } catch (error) {
    console.log('Unable to restore saved details:', error);
  }
}

window.addEventListener('load', restoreSavedWebsite);

const letterText = document.getElementById('letterText');
if (letterText) {
  letterText.addEventListener('click', () => {
    letterText.setAttribute('contenteditable', 'true');
    letterText.focus();
  });

  letterText.addEventListener('blur', () => {
    letterText.removeAttribute('contenteditable');
  });
}

const reasonInput = document.getElementById('newReasonInput');
if (reasonInput) {
  reasonInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addReason();
  });
}

const cdLabelInput = document.getElementById('cdLabelInput');
if (cdLabelInput) {
  cdLabelInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') updateCDLabel();
  });
}

const finalMessageInput = document.getElementById('finalMessageInput');
if (finalMessageInput) {
  finalMessageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') updateFinalMessage();
  });
}
