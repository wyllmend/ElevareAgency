/* form-briefing.js - Briefing Rápido Elevare Agency
   Autor: Wyllen / VNTMKT
   Página exclusiva do formulário
*/

document.addEventListener('DOMContentLoaded', () => {
  const WHATS_PHONE = '5588999999999'; // número oficial Elevare Agency
  const form = document.getElementById('briefingForm');
  const resumoBox = document.getElementById('resumoBox');
  const reviewSection = document.getElementById('reviewSection');
  const sendBtn = document.getElementById('sendBtn');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const steps = Array.from(document.querySelectorAll('.form-step'));
  let current = 0;

  // Mostrar etapa
  function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    prevBtn.classList.toggle('d-none', index === 0);
    nextBtn.textContent = index === steps.length - 1 ? 'Revisar' : 'Próxima';
  }

  // Validar etapa atual
  function validateStep() {
    const currentStep = steps[current];
    const requiredFields = currentStep.querySelectorAll('[required]');
    for (let field of requiredFields) {
      if (field.type === 'radio' || field.type === 'checkbox') {
        const group = currentStep.querySelectorAll(`[name="${field.name}"]:checked`);
        if (group.length === 0) return false;
      } else if (!field.value.trim()) {
        return false;
      }
    }
    return true;
  }

  // Reunir dados
  function gatherData() {
    const getVal = id => document.getElementById(id)?.value.trim() || '';
    const servicos = Array.from(document.querySelectorAll('input[name="servico"]:checked'))
      .map(el => el.value)
      .join(', ') || '-';
    const identidade = document.querySelector('input[name="identidade"]:checked')?.value || '-';

    return {
      Nome: getVal('nome'),
      Marca: getVal('marca'),
      Servico: servicos,
      Objetivo: getVal('objetivo'),
      Identidade: identidade,
      Redes: getVal('redes'),
      Publico: getVal('publico'),
      Observacao: getVal('observacao')
    };
  }

  // Montar texto pro WhatsApp
  function buildTexto(data) {
    return `
📋 *Briefing Rápido – Elevare Agency*

👤 *Nome:* ${data.Nome}
🏢 *Marca:* ${data.Marca || '-'}
🧩 *Serviços:* ${data.Servico}
🎯 *Objetivo:* ${data.Objetivo}
🎨 *Identidade visual / Site:* ${data.Identidade}
📱 *Redes sociais:* ${data.Redes}
👥 *Público-alvo:* ${data.Publico}
💬 *Observações:* ${data.Observacao || '-'}
    `.trim();
  }

  // Avançar
  nextBtn.addEventListener('click', () => {
    if (!validateStep()) {
      nextBtn.classList.add('shake');
      setTimeout(() => nextBtn.classList.remove('shake'), 300);
      if (navigator.vibrate) navigator.vibrate(30);
      return;
    }

    current++;
    if (current === steps.length) {
      const data = gatherData();
      resumoBox.textContent = buildTexto(data);
      reviewSection.classList.add('visible');
      form.classList.add('hidden');
    } else {
      showStep(current);
    }
  });

  // Voltar
  prevBtn.addEventListener('click', () => {
    if (current > 0) {
      current--;
      showStep(current);
    }
  });

  // Enviar pro WhatsApp
  sendBtn.addEventListener('click', () => {
    const texto = encodeURIComponent(buildTexto(gatherData()));
    const link = `https://api.whatsapp.com/send?phone=${WHATS_PHONE}&text=${texto}`;
    window.open(link, '_blank');
  });

  // Iniciar
  showStep(0);
});

let currentQuestion = 0;
const questions = document.querySelectorAll('.question');

function nextQuestion() {
  questions[currentQuestion].classList.remove('active');
  currentQuestion++;
  if (currentQuestion < questions.length) {
    questions[currentQuestion].classList.add('active');
  }
}

document.getElementById('briefingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Briefing enviado com sucesso! 🚀');
});
