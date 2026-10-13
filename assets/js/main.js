/**
 * PORTALE SNODI FORMATIVI - ALFABETIZZAZIONE INTELLIGENZA ARTIFICIALE
 * Script Interattivi, Simulatori e Logica dell'Applicazione Web
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inizializzazione Tema (Dark / Light)
  initTheme();

  // 2. Menu Mobile Responsive
  initMobileNav();

  // 3. Sistema di Copia Prompt con Toast
  initCopyButtons();

  // 4. Tab Simulator Homepage (Approccio Critico vs Passivo)
  initCriticalThinkingTabs();

  // 5. Moduli Specifici per le Pagine
  initDay1PromptBuilder();
  initDay2MultimodalViewer();
  initDay3RiskInspector();
  initDay4SocraticChat();
  initDay5FlowMusicSynth();
});

/* ==========================================================================
   1. GESTIONE DEL TEMA
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('ai-course-theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('theme-light');
    if (themeToggle) themeToggle.textContent = '🌙';
  } else {
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      const isLight = document.body.classList.contains('theme-light');
      localStorage.setItem('ai-course-theme', isLight ? 'light' : 'dark');
      themeToggle.textContent = isLight ? '🌙' : '☀️';
      showToast(isLight ? 'Tema chiaro attivato' : 'Tema scuro attivato');
    });
  }
}

/* ==========================================================================
   2. MOBILE NAV TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
  }
}

/* ==========================================================================
   3. CLIPBOARD COPY CON FEEDBACK TOAST
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function initCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const textToCopy = targetElement.innerText || targetElement.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Prompt copiato negli appunti!');
          const origText = button.innerHTML;
          button.innerHTML = '<span>✓</span> Copiato!';
          setTimeout(() => {
            button.innerHTML = origText;
          }, 2000);
        });
      }
    });
  });
}

/* ==========================================================================
   4. SIMULATORE DI PENSIERO CRITICO (Homepage)
   ========================================================================== */
function initCriticalThinkingTabs() {
  const tabs = document.querySelectorAll('.sim-tab-btn');
  const panels = document.querySelectorAll('.sim-panel');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(`tab-${target}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ==========================================================================
   GIORNO 1: Interactive Prompt Builder & Slides Preview
   ========================================================================== */
function initDay1PromptBuilder() {
  const roleSelect = document.getElementById('builderRole');
  const topicInput = document.getElementById('builderTopic');
  const levelSelect = document.getElementById('builderLevel');
  const formatSelect = document.getElementById('builderFormat');
  const outputElem = document.getElementById('builderOutput');

  if (!roleSelect || !outputElem) return;

  function updatePrompt() {
    const role = roleSelect.value;
    const topic = topicInput ? topicInput.value.trim() || 'I cambiamenti climatici' : 'I cambiamenti climatici';
    const level = levelSelect ? levelSelect.value : 'Scuola secondaria di II grado';
    const format = formatSelect ? formatSelect.value : 'Slide scaletta per Google Gemini Canvas';

    let promptText = `Agisci come un ${role}.\\n` +
      `CONTESTO & DESTINATARI: Studenti di ${level}.\\n` +
      `OBIETTIVO DIDATTICO: Guidare un percorso di analisi critica su: "${topic}".\\n` +
      `VINCOLI PEDAGOGICI:\\n` +
      `- Non limitarti a fornire risposte definitive, ma stimola il pensiero socratico e il dubbio metodico.\\n` +
      `- Evidenzia possibili bias o informazioni contrastanti che richiedono fact-checking.\\n` +
      `FORMATO DI OUTPUT RICHIESTO:\\n` +
      `- Genera una struttura ${format} con titolo, 3 concetti chiave, 2 domande provocatorie per la classe e un compito di realtà.`;

    outputElem.textContent = promptText;
  }

  [roleSelect, topicInput, levelSelect, formatSelect].forEach(elem => {
    if (elem) elem.addEventListener('input', updatePrompt);
  });

  updatePrompt();
}

/* ==========================================================================
   GIORNO 2: Multimodal Image Transformation Viewer
   ========================================================================== */
function initDay2MultimodalViewer() {
  const stageBtns = document.querySelectorAll('.stage-select-btn');
  const previewImg = document.getElementById('day2MainPreview');
  const stageDesc = document.getElementById('day2StageDescription');

  if (!stageBtns.length || !previewImg) return;

  const stageData = {
    'bw': {
      src: 'assets/img/owl-bw.jpg',
      title: 'Fase 1: Analisi Grayscale & Tonalità Monocromatica',
      desc: 'Partenza da un\'immagine fotografica o incisione in bianco e nero. Il modello multimodale scompone l\'input nei canali di luminosità e mappa i volumi geometrici senza informazioni cromatiche.'
    },
    'color': {
      src: 'assets/img/owl-color.jpg',
      title: 'Fase 2: Generazione a Colori ad Alta Definizione (Imagen)',
      desc: 'Prompting multimodale con istruzioni di resa stilistica: il modello reinterpreta il soggetto arricchendolo con sfumature iridescenti smeraldo, metallo ottonato ed illuminazione volumetrica cinematografica.'
    },
    'contour': {
      src: 'assets/img/owl-contour.jpg',
      title: 'Fase 3: Estrazione e Generazione dei Soli Contorni (Line Art)',
      desc: 'Applicazione di vincoli grafici ferrei per la didattica: isolamento puro dei contorni vettoriali e line-art pulita, perfetta per schede operative da colorare, schemi tecnici di laboratorio e attività manuali.'
    }
  };

  stageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const stage = btn.getAttribute('data-stage');
      const data = stageData[stage];

      if (data) {
        previewImg.style.opacity = '0.3';
        setTimeout(() => {
          previewImg.src = data.src;
          previewImg.alt = data.title;
          previewImg.style.opacity = '1';
        }, 150);

        if (stageDesc) {
          stageDesc.innerHTML = `<strong>${data.title}</strong><p class="mt-2 text-muted">${data.desc}</p>`;
        }
      }
    });
  });
}

/* ==========================================================================
   GIORNO 3: AI ACT Risk Pyramid Interactive Inspector
   ========================================================================== */
function initDay3RiskInspector() {
  const tiers = document.querySelectorAll('.pyramid-tier-interactive');
  const detailBox = document.getElementById('riskDetailBox');

  if (!tiers.length || !detailBox) return;

  const riskInfo = {
    'unacceptable': {
      title: '🔴 Rischio Inaccettabile (Proibito tassativamente)',
      badge: 'VIETATO DAL REGOLAMENTO UE',
      desc: 'Sistemi di social scoring, manipolazione comportamentale subliminale dei minori, identificazione biometrica remota di massa in tempo reale nei luoghi pubblici. Incompatibile con la scuola democratica.'
    },
    'high': {
      title: '🟠 Alto Rischio (High-Risk AI - Include la Scuola!)',
      badge: 'SEVERI OBBLIGHI DI AUDIT, TRASPARENZA E SUPERVISIONE UMANA',
      desc: '<strong>Attenzione Docenti:</strong> L\'AI Act classifica esplicitamente i sistemi utilizzati per l\'ammissione degli studenti, la valutazione delle prove e l\'attribuzione di punteggi scolastici come <em>Sistemi ad Alto Rischio</em>. È obbligatoria la supervisione umana, la spiegabilità dell\'algoritmo e l\'assenza di bias.'
    },
    'transparency': {
      title: '🟡 Rischio Specifico di Trasparenza (Chatbot, Deepfake, Generazione)',
      badge: 'OBBLIGO DI COMUNICAZIONE CHIARA',
      desc: 'ChatGPT, Google Gemini, sintetizzatori vocali e video generativi. È obbligatorio avvisare l\'utente che sta interagendo con un\'IA e apporre filigrane (watermarking) o dichiarare i contenuti sintetici.'
    },
    'minimal': {
      title: '🟢 Rischio Minimo o Nullo',
      badge: 'UTILIZZO LIBERO',
      desc: 'Filtri antispam della posta della scuola, videogiochi didattici basati su AI predittiva semplice, correttori ortografici standard. Nessun obbligo normativo gravoso.'
    }
  };

  tiers.forEach(tier => {
    tier.addEventListener('click', () => {
      tiers.forEach(t => t.classList.remove('active-tier'));
      tier.classList.add('active-tier');

      const level = tier.getAttribute('data-risk');
      const data = riskInfo[level];

      if (data) {
        detailBox.innerHTML = `
          <div style="border-left: 4px solid var(--accent-secondary); padding-left: 1rem;">
            <span class="stage-badge" style="background: rgba(99, 102, 241, 0.2); color: var(--accent-primary); font-weight:700;">${data.badge}</span>
            <h3 style="margin: 0.6rem 0; color: var(--text-main);">${data.title}</h3>
            <p style="font-size: 1.02rem; color: var(--text-subtle); line-height: 1.6;">${data.desc}</p>
          </div>
        `;
      }
    });
  });
}

/* ==========================================================================
   GIORNO 4: Chat Simulator con Gem Socratica
   ========================================================================== */
function initDay4SocraticChat() {
  const chatForm = document.getElementById('gemChatForm');
  const chatInput = document.getElementById('gemChatInput');
  const messagesBox = document.getElementById('gemChatMessages');

  if (!chatForm || !chatInput || !messagesBox) return;

  const responses = [
    {
      trigger: 'riassunto',
      reply: 'Posso aiutarti a strutturare il riassunto! Prima di cominciare, quale ritieni che sia la tesi principale sostenuta dall\'autore nel testo? Prova a dirmela in una sola frase.'
    },
    {
      trigger: 'risolvi',
      reply: 'Invece di darti subito la soluzione, guardiamo il primo passaggio insieme. Cosa noti nell\'equazione/problema come primo dato certo? Quale legge o formula ti viene in mente per iniziare?'
    },
    {
      trigger: 'tema',
      reply: 'Un ottimo tema nasce da una domanda provocatoria. Per il tuo argomento, quale punto di vista alternativo potrebbe mettere in discussione l\'opinione comune? Proviamo a fare una scaletta a due voci.'
    },
    {
      default: 'Come tutor socratico, il mio compito non è darti una risposta preconfezionata, ma farti le domande giuste. Cosa ne pensi tu di questo aspetto? Quali fonti hai verificato finora?'
    }
  ];

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    // Aggiungi bolla utente
    const userBubble = document.createElement('div');
    userBubble.className = 'message-bubble bubble-user';
    userBubble.textContent = userMsg;
    messagesBox.appendChild(userBubble);

    chatInput.value = '';
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Simula risposta ragionata del Gem
    setTimeout(() => {
      const botBubble = document.createElement('div');
      botBubble.className = 'message-bubble bubble-bot';

      const lower = userMsg.toLowerCase();
      let match = responses.find(r => r.trigger && lower.includes(r.trigger));
      let replyText = match ? match.reply : responses[responses.length - 1].default;

      botBubble.innerHTML = `<strong>🤖 Gem Socratica (Tutor):</strong><br>${replyText}`;
      messagesBox.appendChild(botBubble);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 600);
  });
}

/* ==========================================================================
   GIORNO 5: Web Audio API Synthesizer (Flow Music Experience)
   ========================================================================== */
function initDay5FlowMusicSynth() {
  const playBtn = document.getElementById('flowMusicPlayBtn');
  const bars = document.querySelectorAll('.wave-bar');
  const statusLabel = document.getElementById('musicStatusLabel');

  if (!playBtn) return;

  let isPlaying = false;
  let audioCtx = null;
  let synthInterval = null;

  // Scala pentatonica rilassante per sound design didattico (C4, D4, E4, G4, A4, C5)
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

  function playTone(freq, duration = 1.2) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  playBtn.addEventListener('click', () => {
    if (!isPlaying) {
      isPlaying = true;
      playBtn.innerHTML = '⏸';
      if (statusLabel) statusLabel.textContent = 'Traccia generativa in esecuzione (Flow Music Ambient)';

      bars.forEach(b => b.classList.add('active'));

      // Suona note armoniche a intervalli casuali
      playTone(notes[0], 2.0);
      playTone(notes[2], 2.2);

      synthInterval = setInterval(() => {
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        playTone(randomNote, 1.5);
      }, 700);

      showToast('Generatore sonoro Web Audio avviato!');
    } else {
      isPlaying = false;
      playBtn.innerHTML = '▶';
      if (statusLabel) statusLabel.textContent = 'Audio in pausa. Clicca play per ascoltare il synth generativo.';
      bars.forEach(b => b.classList.remove('active'));
      if (synthInterval) clearInterval(synthInterval);
    }
  });
}
