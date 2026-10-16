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
  initGuidePage();
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

/* ==========================================================================
   POLO GUIDE E FILE: GESTIONE REPOSITORY, UPLOAD PROTETTO & MODALE VIEWER
   ========================================================================== */
function initGuidePage() {
  // 1. SIMULATORE URL (FREE.NF)
  const siteInput = document.getElementById('urlBuilderSiteName');
  const extSelect = document.getElementById('urlBuilderExt');
  const fileInput = document.getElementById('urlBuilderFile');
  const outputSpan = document.getElementById('urlPreviewOutput');
  const helperNote = document.getElementById('urlHelperNote');
  const copyBtn = document.getElementById('btnCopyGeneratedUrl');

  function updatePreview() {
    if (!siteInput || !extSelect || !fileInput || !outputSpan) return;
    let site = siteInput.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
    if (!site) site = 'tuo-sito';
    const ext = extSelect.value;
    let file = fileInput.value.trim().replace(/^\/+/, '');

    let fullUrl = `https://${site}${ext}`;
    if (file) {
      fullUrl += `/${file}`;
    }

    outputSpan.textContent = fullUrl;

    if (helperNote) {
      if (!file || file === 'index.html') {
        helperNote.innerHTML = `Poiché il file indicato è <code>${file || 'index.html'}</code> (la pagina predefinita), puoi accedere digitando semplicemente <strong>https://${site}${ext}</strong>!`;
      } else {
        helperNote.innerHTML = `Per aprire direttamente questa risorsa, digita esattamente <strong>https://${site}${ext}/${file}</strong> nel browser.`;
      }
    }
  }

  if (siteInput && extSelect && fileInput) {
    siteInput.addEventListener('input', updatePreview);
    extSelect.addEventListener('change', updatePreview);
    fileInput.addEventListener('input', updatePreview);
    updatePreview();
  }

  if (copyBtn && outputSpan) {
    copyBtn.addEventListener('click', () => {
      const text = outputSpan.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        showToast('Indirizzo web copiato negli appunti!');
        const origHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✓</span> Copiato!';
        setTimeout(() => {
          copyBtn.innerHTML = origHtml;
        }, 2000);
      });
    });
  }

  // 2. CHECKLIST DIDATTICA INTERATTIVA
  const checkboxes = document.querySelectorAll('.interactive-checklist-group .chk-step');
  const progressBar = document.getElementById('checklistProgressBar');
  const progressText = document.getElementById('checklistProgressText');

  if (checkboxes.length > 0) {
    const STORAGE_KEY = 'ai-course-guide-checklist';
    let savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      savedState = {};
    }

    function updateChecklistProgress() {
      let checkedCount = 0;
      checkboxes.forEach(chk => {
        const id = chk.getAttribute('data-step-id');
        if (chk.checked) checkedCount++;
        savedState[id] = chk.checked;
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      } catch (e) {}

      const percent = Math.round((checkedCount / checkboxes.length) * 100);
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressText) {
        progressText.textContent = `${checkedCount} di ${checkboxes.length} passaggi completati (${percent}%)`;
        if (percent === 100) {
          progressText.innerHTML = `🎉 Complimenti! Tutti i 7 passaggi sono completati: il tuo sito è online!`;
        }
      }
    }

    checkboxes.forEach(chk => {
      const id = chk.getAttribute('data-step-id');
      if (savedState[id]) {
        chk.checked = true;
      }
      chk.addEventListener('change', () => {
        updateChecklistProgress();
        if (chk.checked) {
          showToast('Passo completato!');
        }
      });
    });

    updateChecklistProgress();
  }

  // 3. SISTEMA DI AUTENTICAZIONE PASSWORD RISERVATA (fpe775uaf)
  const AUTH_PASSWORD = 'fpe775uaf';
  const AUTH_STORAGE_KEY = 'polo_guide_auth_session';
  const lockedView = document.getElementById('adminLockedView');
  const unlockedView = document.getElementById('adminUnlockedView');
  const passwordInput = document.getElementById('adminAuthPassword');
  const unlockBtn = document.getElementById('btnUnlockUpload');
  const lockBtn = document.getElementById('btnLockUpload');
  const authFeedback = document.getElementById('authStatusNotice');

  function isAuthorized() {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'authorized_' + AUTH_PASSWORD;
  }

  function updateAuthUI() {
    const authorized = isAuthorized();
    if (lockedView && unlockedView) {
      if (authorized) {
        lockedView.style.display = 'none';
        unlockedView.style.display = 'block';
      } else {
        lockedView.style.display = 'block';
        unlockedView.style.display = 'none';
      }
    }
    // Aggiorna visibilità pulsanti elimina nei file
    renderFiles();
  }

  if (unlockBtn && passwordInput) {
    unlockBtn.addEventListener('click', () => {
      const enteredPass = passwordInput.value.trim();
      if (enteredPass === AUTH_PASSWORD) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'authorized_' + AUTH_PASSWORD);
        if (authFeedback) {
          authFeedback.style.display = 'block';
          authFeedback.style.background = 'rgba(16, 185, 129, 0.2)';
          authFeedback.style.color = '#34d399';
          authFeedback.textContent = '✓ Password corretta! Area di upload sbloccata.';
        }
        showToast('Accesso autorizzato all\'Area Upload!');
        setTimeout(() => {
          passwordInput.value = '';
          if (authFeedback) authFeedback.style.display = 'none';
          updateAuthUI();
        }, 800);
      } else {
        if (authFeedback) {
          authFeedback.style.display = 'block';
          authFeedback.style.background = 'rgba(244, 63, 94, 0.2)';
          authFeedback.style.color = '#fb7185';
          authFeedback.textContent = '✕ Password errata. Verifica i caratteri e riprova.';
        }
        passwordInput.focus();
        showToast('Password errata!');
      }
    });

    passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        unlockBtn.click();
      }
    });
  }

  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      updateAuthUI();
      showToast('Area upload bloccata con successo.');
    });
  }

  // 4. STORAGE DEI FILE TRAMITE INDEXEDDB CON PERSISTENZA
  const DB_NAME = 'SnodiPoloFilesDB_v1';
  const STORE_NAME = 'uploaded_files';
  let dbInstance = null;

  function openFilesDB() {
    return new Promise((resolve, reject) => {
      if (dbInstance) return resolve(dbInstance);
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      req.onsuccess = (e) => {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };
      req.onerror = (e) => {
        console.error('Errore IndexedDB:', e);
        reject(e);
      };
    });
  }

  function getAllFilesFromDB() {
    return openFilesDB().then(db => {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    });
  }

  function saveFileToDB(fileRecord) {
    return openFilesDB().then(db => {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(fileRecord);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    });
  }

  function deleteFileFromDB(fileId) {
    return openFilesDB().then(db => {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(fileId);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    });
  }

  // File Didattici Iniziali Precaricati (Starter Resources)
  function getPreloadedFiles() {
    return [
      {
        id: 'snodi_file_1',
        title: 'Piano Didattico Completo • Snodi Formativi AI',
        shortDesc: 'Curriculum formativo quinquennale e linee guida ministeriali per l\'alfabetizzazione all\'IA.',
        longDesc: 'Documento programmatico ufficiale contenente il quadro di riferimento teorico, l\'articolazione delle 5 giornate formative, i descrittori delle competenze DigCompEdu 2.2, criteri di valutazione autentica dei compiti con l\'IA e indicazioni deontologiche per i docenti.',
        fileName: 'Piano-Didattico-Snodi-Formativi-AI.pdf',
        fileExt: 'pdf',
        fileType: 'application/pdf',
        category: 'pdf',
        fileSize: 1845200,
        formattedSize: '1.8 MB',
        uploadDate: '15/10/2026, 09:30',
        contentSample: '%PDF-1.4\nSnodi Formativi AI - Documento di Programmazione Didattica'
      },
      {
        id: 'snodi_file_2',
        title: 'Slide Incontro 1: Prompt Engineering & Gemini Canvas',
        shortDesc: 'Presentazione didattica: tecniche avanzate di prompt socratico e co-creazione per la scuola.',
        longDesc: 'Pacchetto completo di diapositive didattiche utilizzabili direttamente in classe o nei collegi docenti. Include esempi pratici di prompt socratici, strategie per evitare le scorciatoie cognitive degli studenti, utilizzo di Gemini Canvas e workflow passo-passo.',
        fileName: 'Incontro-1-Prompt-Engineering-Scuola.pptx',
        fileExt: 'pptx',
        fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        category: 'ppt',
        fileSize: 4210000,
        formattedSize: '4.2 MB',
        uploadDate: '15/10/2026, 11:15',
        contentSample: 'Slide PPTX: Snodi Formativi Incontro 1'
      },
      {
        id: 'snodi_file_3',
        title: 'Checklist di Valutazione AI Act & GDPR per Docenti',
        shortDesc: 'Modello Word editabile per verificare la conformità normativa e la privacy dei minori.',
        longDesc: 'Griglia operativa strutturata per la scuola secondo il Regolamento UE 2024/1689 (AI Act) e il GDPR. Permette ai docenti di classificare il livello di rischio delle piattaforme educative, verificare l\'anonimizzazione dei dati ed evitare l\'immissione di dati personali o voti sensibili.',
        fileName: 'Checklist-AI-Act-e-GDPR-Docenti.docx',
        fileExt: 'docx',
        fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        category: 'word',
        fileSize: 845000,
        formattedSize: '845 KB',
        uploadDate: '15/10/2026, 14:00',
        contentSample: 'Checklist Word: Conformita AI Act e Privacy'
      },
      {
        id: 'snodi_file_4',
        title: 'Calcolatore Parametrico Token & Costi Google AI Studio',
        shortDesc: 'Foglio Excel per calcolare il consumo di token, Temperature e dimensionare i laboratori.',
        longDesc: 'Tabella Excel automatizzata con formule per la stima dei token di input/output nei modelli Gemini (Flash e Pro). Permette di stimare il consumo didattico per classe, pianificare l\'uso delle API gratuite e confrontare i parametri di generazione (Temperature, Top-P, Top-K).',
        fileName: 'Calcolatore-Token-e-Parametri-LLM.xlsx',
        fileExt: 'xlsx',
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        category: 'excel',
        fileSize: 520000,
        formattedSize: '520 KB',
        uploadDate: '15/10/2026, 16:45',
        contentSample: 'Excel: Calcolo Token e Costi API'
      },
      {
        id: 'snodi_file_5',
        title: 'Single-Page Application: Sentinel Privacy & Audit Prompt',
        shortDesc: 'Sorgente HTML stand-alone funzionante interamente nel browser senza server.',
        longDesc: 'Applicazione web monopagina (Single-Page App) pronta all\'uso. Analizza in tempo reale i prompt digitati dai docenti per evidenziare potenziali violazioni della privacy prima dell\'invio ai chatbot, con regex matching client-side e feedback visivo conforme all\'Incontro 3.',
        fileName: 'Sentinel-Privacy-SPA-Standalone.html',
        fileExt: 'html',
        fileType: 'text/html',
        category: 'code',
        fileSize: 32400,
        formattedSize: '32.4 KB',
        uploadDate: '16/10/2026, 08:30',
        contentSample: '<!DOCTYPE html>\n<html lang="it">\n<head>\n  <meta charset="UTF-8">\n  <title>Sentinel Privacy Scuola</title>\n</head>\n<body>\n  <h2>Sentinel Privacy SPA</h2>\n</body>\n</html>'
      },
      {
        id: 'snodi_file_6',
        title: 'Foglio di Stile Luminescent Glassmorphism Didattica',
        shortDesc: 'Design System CSS con palette Academic Dark, glassmorphism e compatibilità Light Theme.',
        longDesc: 'Foglio di stile completo e riutilizzabile per progetti scolastici. Include variabili CSS per sfondi ad alto contrasto, bottoni neon, badge di stato, modali interattivi e regole responsive per smartphone, tablet e desktop.',
        fileName: 'Stili-Luminescent-Didattica.css',
        fileExt: 'css',
        fileType: 'text/css',
        category: 'code',
        fileSize: 48600,
        formattedSize: '48.6 KB',
        uploadDate: '16/10/2026, 09:10',
        contentSample: '/* Design System Luminescent - Snodi Formativi */\n:root {\n  --accent-primary: #6366f1;\n  --accent-secondary: #06b6d4;\n}'
      },
      {
        id: 'snodi_file_7',
        title: 'Infografica: La Bussola del Pensiero Critico a Scuola',
        shortDesc: 'Poster e mappa visuale in alta definizione sul ruolo dell\'IA come alleata cognitiva.',
        longDesc: 'Infografica visiva adatta alla stampa per aule e bacheche digitali. Schematizza il confronto tra l\'approccio passivo ("delegare la risposta") e l\'approccio critico ("governare la domanda, verificare le allucinazioni e rielaborare con creatività").',
        fileName: 'Infografica-Pensiero-Critico-AI.png',
        fileExt: 'png',
        fileType: 'image/png',
        category: 'img',
        fileSize: 1250000,
        formattedSize: '1.2 MB',
        uploadDate: '16/10/2026, 10:20',
        contentSample: 'Infografica Immagine'
      }
    ];
  }

  function initDatabasePreload() {
    return getAllFilesFromDB().then(existing => {
      if (!existing || existing.length === 0) {
        const preloaded = getPreloadedFiles();
        return Promise.all(preloaded.map(f => saveFileToDB(f)));
      }
    });
  }

  // 5. RENDERING REPOSITORY FILE E FILTRI
  let allFilesCache = [];
  let currentCategory = 'all';
  let currentSearchQuery = '';

  const cardsContainer = document.getElementById('fileCardsContainer');
  const countBadge = document.getElementById('fileCountBadge');
  const searchInput = document.getElementById('fileSearchInput');
  const filterBtns = document.querySelectorAll('.file-filter-btn');

  function getFormatBadgeInfo(ext, category) {
    const extLow = (ext || '').toLowerCase();
    if (extLow === 'pdf') return { icon: '📕', class: 'icon-pdf', label: 'PDF' };
    if (['doc', 'docx'].includes(extLow)) return { icon: '📘', class: 'icon-word', label: 'WORD' };
    if (['xls', 'xlsx'].includes(extLow)) return { icon: '📊', class: 'icon-excel', label: 'EXCEL' };
    if (['ppt', 'pptx'].includes(extLow)) return { icon: '📽️', class: 'icon-ppt', label: 'POWERPOINT' };
    if (['jpg', 'jpeg', 'png'].includes(extLow)) return { icon: '🖼️', class: 'icon-img', label: 'IMMAGINE' };
    if (['html', 'css', 'js'].includes(extLow)) return { icon: '💻', class: 'icon-code', label: extLow.toUpperCase() };
    return { icon: '📄', class: 'icon-word', label: extLow.toUpperCase() || 'FILE' };
  }

  function renderFiles() {
    if (!cardsContainer) return;

    getAllFilesFromDB().then(files => {
      allFilesCache = files;
      const authorized = isAuthorized();

      // Filtraggio per categoria e ricerca
      const filtered = files.filter(f => {
        const matchesCategory = (currentCategory === 'all') || (f.category === currentCategory);
        const query = currentSearchQuery.trim().toLowerCase();
        if (!query) return matchesCategory;

        const inTitle = (f.title || '').toLowerCase().includes(query);
        const inShortDesc = (f.shortDesc || '').toLowerCase().includes(query);
        const inLongDesc = (f.longDesc || '').toLowerCase().includes(query);
        const inName = (f.fileName || '').toLowerCase().includes(query);
        const inExt = (f.fileExt || '').toLowerCase().includes(query);

        return matchesCategory && (inTitle || inShortDesc || inLongDesc || inName || inExt);
      });

      if (countBadge) {
        countBadge.textContent = `File Disponibili: ${filtered.length} di ${files.length}`;
      }

      if (filtered.length === 0) {
        cardsContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: rgba(2, 6, 23, 0.4); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🔍</div>
            <h4 style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 0.4rem;">Nessun file trovato per i criteri selezionati</h4>
            <p style="font-size: 0.92rem; margin-bottom: 0;">Prova a modificare il termine di ricerca o seleziona un'altra categoria.</p>
          </div>
        `;
        return;
      }

      cardsContainer.innerHTML = filtered.map(file => {
        const badge = getFormatBadgeInfo(file.fileExt, file.category);
        const safeId = file.id;

        return `
          <div class="file-card" id="card_${safeId}">
            <div>
              <div class="file-card-top">
                <div class="file-format-icon ${badge.class}">
                  ${badge.icon}
                </div>
                <div class="file-card-header-info">
                  <span class="file-ext-badge">.${(file.fileExt || 'file').toUpperCase()}</span>
                  <h3 class="file-card-title">${escapeHtml(file.title)}</h3>
                </div>
              </div>

              <!-- Descrizione Breve -->
              <p class="file-card-short-desc">
                ${escapeHtml(file.shortDesc)}
              </p>

              <!-- Pulsante per espandere la Descrizione Lunga -->
              <button class="btn-toggle-desc" data-target="desc_${safeId}">
                <span>📖</span> <span>Leggi descrizione completa...</span>
              </button>

              <!-- Descrizione Lunga a comparsa -->
              <div class="file-card-long-desc-drawer" id="desc_${safeId}">
                <strong>Approfondimento Didattico:</strong>
                <p style="margin: 0.4rem 0 0 0; white-space: pre-line;">${escapeHtml(file.longDesc)}</p>
              </div>
            </div>

            <div>
              <div class="file-card-meta">
                <span>📁 ${escapeHtml(file.fileName)}</span>
                <span>⚖️ ${file.formattedSize || 'N/D'}</span>
              </div>

              <div class="file-card-actions">
                <button class="btn-file-action btn-file-view" data-file-id="${safeId}">
                  <span>👁️</span> Visualizza
                </button>
                <button class="btn-file-action btn-file-download" data-file-id="${safeId}">
                  <span>⬇️</span> Scarica
                </button>
                ${authorized ? `
                  <button class="btn-file-action btn-file-delete" data-file-id="${safeId}" title="Elimina file dal repository">
                    🗑️
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Collega eventi alle card generate
      attachCardEvents();
    }).catch(err => {
      console.error('Errore nel rendering dei file:', err);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function attachCardEvents() {
    // Accordion Descrizione Lunga
    document.querySelectorAll('.btn-toggle-desc').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const drawer = document.getElementById(targetId);
        if (drawer) {
          drawer.classList.toggle('open');
          const isOpen = drawer.classList.contains('open');
          btn.innerHTML = isOpen
            ? '<span>▲</span> <span>Nascondi descrizione</span>'
            : '<span>📖</span> <span>Leggi descrizione completa...</span>';
        }
      });
    });

    // Azione Visualizza
    document.querySelectorAll('.btn-file-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const fileId = btn.getAttribute('data-file-id');
        openFileModal(fileId);
      });
    });

    // Azione Scarica
    document.querySelectorAll('.btn-file-download').forEach(btn => {
      btn.addEventListener('click', () => {
        const fileId = btn.getAttribute('data-file-id');
        downloadFileById(fileId);
      });
    });

    // Azione Elimina (solo se autorizzati)
    document.querySelectorAll('.btn-file-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const fileId = btn.getAttribute('data-file-id');
        if (confirm('Sei sicuro di voler eliminare questo file dal repository?')) {
          deleteFileFromDB(fileId).then(() => {
            showToast('File eliminato con successo!');
            renderFiles();
          });
        }
      });
    });
  }

  // Filtri Categorie
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        renderFiles();
      });
    });
  }

  // Barra di Ricerca
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearchQuery = searchInput.value;
      renderFiles();
    });
  }

  // 6. GESTIONE UPLOAD NUOVI FILE (PER DOCENTI AUTORIZZATI)
  const fileDropzone = document.getElementById('fileDropzone');
  const fileInputElem = document.getElementById('fileInputElem');
  const dropzoneSelectedFile = document.getElementById('dropzoneSelectedFile');
  const uploadForm = document.getElementById('fileUploadForm');
  const resetFormBtn = document.getElementById('btnResetUploadForm');

  let currentSelectedFile = null;

  if (fileDropzone && fileInputElem) {
    fileDropzone.addEventListener('click', () => fileInputElem.click());

    fileDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileDropzone.classList.add('dragover');
    });

    fileDropzone.addEventListener('dragleave', () => {
      fileDropzone.classList.remove('dragover');
    });

    fileDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      fileDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelection(e.dataTransfer.files[0]);
      }
    });

    fileInputElem.addEventListener('change', () => {
      if (fileInputElem.files && fileInputElem.files.length > 0) {
        handleFileSelection(fileInputElem.files[0]);
      }
    });
  }

  function handleFileSelection(file) {
    currentSelectedFile = file;
    if (dropzoneSelectedFile) {
      dropzoneSelectedFile.style.display = 'block';
      dropzoneSelectedFile.innerHTML = `✓ <strong>File selezionato:</strong> ${escapeHtml(file.name)} (${formatBytes(file.size)})`;
    }

    // Precompila titolo se vuoto
    const titleInput = document.getElementById('newFileTitle');
    if (titleInput && !titleInput.value) {
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      titleInput.value = baseName.replace(/[-_]/g, ' ');
    }

    showToast(`File pronto: ${file.name}`);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  if (resetFormBtn && uploadForm) {
    resetFormBtn.addEventListener('click', () => {
      uploadForm.reset();
      currentSelectedFile = null;
      if (dropzoneSelectedFile) dropzoneSelectedFile.style.display = 'none';
    });
  }

  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isAuthorized()) {
        showToast('Devi inserire la password di autorizzazione per caricare!');
        return;
      }

      const title = document.getElementById('newFileTitle').value.trim();
      const shortDesc = document.getElementById('newFileShortDesc').value.trim();
      const longDesc = document.getElementById('newFileLongDesc').value.trim();
      let category = document.getElementById('newFileCategory').value;

      if (!currentSelectedFile) {
        alert('Seleziona prima un file da caricare cliccando o trascinandolo nella casella apposita!');
        return;
      }

      if (!title || !shortDesc || !longDesc) {
        alert('Compila tutti i campi obbligatori: Titolo, Descrizione Breve e Descrizione Lunga.');
        return;
      }

      const fileName = currentSelectedFile.name;
      const fileExt = (fileName.substring(fileName.lastIndexOf('.') + 1) || '').toLowerCase();

      // Rilevamento automatico categoria se 'auto'
      if (category === 'auto') {
        if (fileExt === 'pdf') category = 'pdf';
        else if (['doc', 'docx'].includes(fileExt)) category = 'word';
        else if (['xls', 'xlsx'].includes(fileExt)) category = 'excel';
        else if (['ppt', 'pptx'].includes(fileExt)) category = 'ppt';
        else if (['jpg', 'jpeg', 'png'].includes(fileExt)) category = 'img';
        else if (['html', 'css', 'js'].includes(fileExt)) category = 'code';
        else category = 'doc';
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const fileDataUrl = event.target.result;
        const now = new Date();
        const dateStr = now.toLocaleDateString('it-IT') + ', ' + now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

        const newRecord = {
          id: 'uploaded_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          title: title,
          shortDesc: shortDesc,
          longDesc: longDesc,
          category: category,
          fileName: fileName,
          fileExt: fileExt,
          fileType: currentSelectedFile.type || 'application/octet-stream',
          fileSize: currentSelectedFile.size,
          formattedSize: formatBytes(currentSelectedFile.size),
          uploadDate: dateStr,
          fileData: fileDataUrl,
          isUserUploaded: true
        };

        saveFileToDB(newRecord).then(() => {
          showToast('File caricato e pubblicato con successo!');
          uploadForm.reset();
          currentSelectedFile = null;
          if (dropzoneSelectedFile) dropzoneSelectedFile.style.display = 'none';
          renderFiles();
          // Scroll fino alla sezione dei file
          const repoSection = document.getElementById('archivioFile');
          if (repoSection) repoSection.scrollIntoView({ behavior: 'smooth' });
        }).catch(err => {
          console.error('Errore nel salvataggio del file:', err);
          alert('Errore nel salvataggio locale del file. Controlla lo spazio su disco del browser.');
        });
      };

      // Se il file è un'immagine o codice/documento, salviamo come DataURL
      reader.readAsDataURL(currentSelectedFile);
    });
  }

  // 7. MODALE DI ANTEPRIMA FILE (VIEWER)
  const modalBackdrop = document.getElementById('fileModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  let currentActiveFileRecord = null;

  function openFileModal(fileId) {
    const file = allFilesCache.find(f => f.id === fileId);
    if (!file) return;

    currentActiveFileRecord = file;

    const modalTitle = document.getElementById('modalFileTitleText');
    const modalIcon = document.getElementById('modalFileIcon');
    const modalExt = document.getElementById('modalFileExt');
    const modalCat = document.getElementById('modalFileCategory');
    const modalSize = document.getElementById('modalFileSize');
    const modalShort = document.getElementById('modalFileShortDesc');
    const modalLong = document.getElementById('modalFileLongDesc');
    const modalCanvas = document.getElementById('modalPreviewCanvas');
    const modalFooterInfo = document.getElementById('modalFileFooterInfo');

    const badge = getFormatBadgeInfo(file.fileExt, file.category);

    if (modalTitle) modalTitle.textContent = file.title;
    if (modalIcon) modalIcon.textContent = badge.icon;
    if (modalExt) modalExt.textContent = '.' + (file.fileExt || 'FILE').toUpperCase();
    if (modalCat) modalCat.textContent = 'Categoria: ' + (file.category || 'Generale').toUpperCase();
    if (modalSize) modalSize.textContent = 'Dimensione: ' + (file.formattedSize || 'N/D');
    if (modalShort) modalShort.textContent = `«${file.shortDesc}»`;
    if (modalLong) modalLong.textContent = file.longDesc;
    if (modalFooterInfo) modalFooterInfo.innerHTML = `File originale: <strong>${escapeHtml(file.fileName)}</strong> • Caricato il: ${file.uploadDate}`;

    // Riempimento dinamico canvas di anteprima
    if (modalCanvas) {
      modalCanvas.innerHTML = '';
      const ext = (file.fileExt || '').toLowerCase();

      if (['jpg', 'jpeg', 'png'].includes(ext)) {
        // Anteprima Immagine
        const imgSrc = file.fileData || (file.id === 'snodi_file_7' ? 'assets/img/hero.jpg' : '');
        if (imgSrc) {
          modalCanvas.innerHTML = `
            <div style="text-align: center; width: 100%;">
              <img src="${imgSrc}" alt="${escapeHtml(file.title)}" style="max-height: 420px; border-radius: var(--radius-sm); box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
              <div style="margin-top: 0.8rem; font-size: 0.85rem; color: var(--text-dim);">Anteprima grafica renderizzata</div>
            </div>
          `;
        } else {
          modalCanvas.innerHTML = `<div style="color: var(--text-muted); font-size: 1.1rem;">🖼️ Immagine ${ext.toUpperCase()} pronta per il download</div>`;
        }
      } else if (['html', 'css', 'js'].includes(ext)) {
        // Anteprima Codice Sorgente
        let codeSnippet = file.contentSample || '';
        if (file.fileData && file.fileData.startsWith('data:')) {
          try {
            codeSnippet = atob(file.fileData.split(',')[1]);
          } catch (e) {
            codeSnippet = file.contentSample || '// Codice sorgente ' + ext.toUpperCase();
          }
        }
        modalCanvas.innerHTML = `
          <div style="width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-secondary);">SORGENTE .${ext.toUpperCase()}</span>
              <button class="btn btn-secondary btn-sm" id="btnCopyModalCode" style="font-size: 0.78rem;">📋 Copia Codice</button>
            </div>
            <pre><code>${escapeHtml(codeSnippet)}</code></pre>
          </div>
        `;
        const copyBtn = document.getElementById('btnCopyModalCode');
        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeSnippet).then(() => {
              showToast('Codice sorgente copiato negli appunti!');
            });
          });
        }
      } else if (ext === 'pdf') {
        // Anteprima Documento PDF
        modalCanvas.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">📕</div>
            <h4 style="font-size: 1.2rem; color: var(--text-main); margin-bottom: 0.5rem;">Documento PDF Certificato</h4>
            <p style="font-size: 0.92rem; color: var(--text-subtle); max-width: 500px; margin: 0 auto 1.5rem auto;">
              Il file è strutturato e pronto per essere visualizzato sul tuo lettore PDF predefinito o salvato sul tuo computer.
            </p>
            <button class="btn btn-primary btn-sm" onclick="document.getElementById('modalDownloadBtn').click()">
              <span>⬇️</span> Apri e Scarica PDF
            </button>
          </div>
        `;
      } else {
        // Scheda Documento Office (Word, Excel, PowerPoint)
        let docIcon = '📄';
        let docTypeLabel = 'Documento';
        if (['doc', 'docx'].includes(ext)) { docIcon = '📘'; docTypeLabel = 'Documento Word Editabile'; }
        if (['xls', 'xlsx'].includes(ext)) { docIcon = '📊'; docTypeLabel = 'Foglio di Calcolo Excel'; }
        if (['ppt', 'pptx'].includes(ext)) { docIcon = '📽️'; docTypeLabel = 'Presentazione Slide PowerPoint'; }

        modalCanvas.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">${docIcon}</div>
            <h4 style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 0.4rem;">${docTypeLabel} (.${ext.toUpperCase()})</h4>
            <p style="font-size: 0.92rem; color: var(--text-subtle); max-width: 520px; margin: 0 auto 1.5rem auto;">
              Compatibile con Microsoft Office, Google Workspace, LibreOffice e Apple iWork.
            </p>
            <div style="background: rgba(2, 6, 23, 0.4); border-radius: var(--radius-sm); padding: 1rem; max-width: 440px; margin: 0 auto 1.5rem auto; font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-secondary); border: 1px solid var(--border-subtle);">
              ${escapeHtml(file.fileName)} • ${file.formattedSize || 'Pronto per il download'}
            </div>
            <button class="btn btn-primary btn-sm" onclick="document.getElementById('modalDownloadBtn').click()">
              <span>⬇️</span> Scarica File Ora
            </button>
          </div>
        `;
      }
    }

    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeFileModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      currentActiveFileRecord = null;
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeFileModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeFileModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeFileModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeFileModal();
    }
  });

  if (modalDownloadBtn) {
    modalDownloadBtn.addEventListener('click', () => {
      if (currentActiveFileRecord) {
        downloadFileRecord(currentActiveFileRecord);
      }
    });
  }

  // 8. FUNZIONE NATIVA DI DOWNLOAD FILE
  function downloadFileById(fileId) {
    const file = allFilesCache.find(f => f.id === fileId);
    if (file) {
      downloadFileRecord(file);
    }
  }

  function downloadFileRecord(file) {
    let blob = null;

    if (file.fileData && file.fileData.startsWith('data:')) {
      // Converte DataURL in Blob reale
      blob = dataUrlToBlob(file.fileData);
    } else {
      // File precaricato generato al volo come risorsa reale
      const sampleText = file.contentSample || `${file.title}\n${file.shortDesc}\n${file.longDesc}`;
      blob = new Blob([sampleText], { type: file.fileType || 'application/octet-stream' });
    }

    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = file.fileName || 'file_didattico';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);

    showToast(`Download avviato: ${file.fileName}`);
  }

  function dataUrlToBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  // Inizializzazione Database e Rendering
  initDatabasePreload().then(() => {
    renderFiles();
    updateAuthUI();
  });
}


