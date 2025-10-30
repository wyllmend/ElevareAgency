/* script.js - Elevare Experience (versão otimizada sem formulário)
   Autor: Wyllen 
   Atualizado com melhorias de performance e acessibilidade
*/

document.addEventListener('DOMContentLoaded', function () {
  /* ==============================
     CONFIGURAÇÃO GLOBAL
  ============================== */
  const WHATS_PHONE = '5588981645083'; // <-- coloque aqui o número oficial do WhatsApp da Elevare
  const WHATS_LINK = `https://wa.me/${WHATS_PHONE}`;

  /* ==============================
     SCROLL REVEAL (IntersectionObserver)
  ============================== */
  const revealEls = document.querySelectorAll(
    '.reveal, .animate-up, .service-card, .multi-step-card, .left-panel, .hero .container'
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback pra navegadores antigos
    const elements = document.querySelectorAll('.animate-up');
    function checkScroll() {
      const trigger = window.innerHeight * 0.85;
      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) el.classList.add('visible');
      });
    }
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
  }

  /* ==============================
     BOTÃO FLUTUANTE DO WHATSAPP
  ============================== */
  (function createFloatWhats() {
    if (document.getElementById('floatWhats')) return; // evita duplicação

    const a = document.createElement('a');
    a.id = 'floatWhats';
    a.className = 'float-whats';
    a.href = WHATS_LINK;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Abrir conversa no WhatsApp');

    a.innerHTML = `
      <span class="icon-wrap" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.4 0 .3 5.1.3 11.7c0 2.06.54 4.05 1.57 5.84L0 24l6.66-1.73A11.66 11.66 0 0 0 12 23.4c6.6 0 11.7-5.1 11.7-11.7 0-3.13-1.23-6.06-3.18-8.22z" fill="#fff"/>
          <path d="M17.2 14.1c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.21.3-.81.98-.99 1.18-.18.2-.36.22-.66.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.28-.35.42-.52.14-.18.19-.3.28-.5.09-.2.05-.37-.02-.52-.08-.15-.69-1.68-.95-2.3-.25-.6-.51-.52-.69-.53-.18-.01-.38-.01-.58-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.45 1.07 2.85 1.22 3.05.15.2 2.1 3.2 5.08 4.49 2.98 1.3 2.98.87 3.52.82.54-.05 1.78-.73 2.03-1.44.25-.7.25-1.3.18-1.44-.08-.14-.28-.22-.58-.37z" fill="#25D366"/>
        </svg>
      </span>
      <span class="badge-text">Fale com a gente</span>
    `;
    document.body.appendChild(a);
  })();

  /* ==============================
     PROGRESSO VISUAL (opcional)
  ============================== */
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    });
  }

  /* ==============================
     ACESSIBILIDADE EXTRA
  ============================== */
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.classList.add('sr-only');
  document.body.appendChild(liveRegion);

  function announce(message) {
    liveRegion.textContent = message;
  }

  // Exemplo: anunciar quando o botão do WhatsApp é criado
  announce('Botão do WhatsApp disponível para contato.');
});
