const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isOpen = answer.style.maxHeight;

    document.querySelectorAll('.faq-answer').forEach((item) => {
      item.style.maxHeight = null;
    });

    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4}).*/, '($1) $2-$3');
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else if (value.length > 0) {
    value = value.replace(/^(\d*)/, '($1');
  }

  e.target.value = value;
});

const leadForm = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');
const submitButton = document.getElementById('submitButton');

leadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !telefone || !mensagem) {
    formMessage.textContent = 'Preencha todos os campos.';
    formMessage.style.color = '#dc2626';
    return;
  }

  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('telefone', telefone);
  formData.append('mensagem', mensagem);

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';
  submitButton.classList.add('btn-loading');
  formMessage.textContent = '';

  try {
    const resposta = await fetch('./backend/save_lead.php', {
      method: 'POST',
      body: formData
    });

 const texto = await resposta.text();
  console.log('Resposta do servidor:', texto);

  if (!texto) {
    throw new Error('Resposta vazia do servidor.');
  }

  const dados = JSON.parse(texto);

  if (dados.sucesso) {
    formMessage.textContent = dados.mensagem;
    formMessage.style.color = '#16a34a';
    leadForm.reset();
  } else {
    formMessage.textContent = dados.mensagem;
    formMessage.style.color = '#dc2626';
  }
} catch (erro) {
  formMessage.textContent = 'Erro ao enviar o formulário.';
  formMessage.style.color = '#dc2626';
  console.error('Erro:', erro);
} finally {
  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar agora';
    submitButton.classList.remove('btn-loading');
  }, 600);
}
});

const animatedElements = document.querySelectorAll(
  '.hero-text, .form-card, .about-image, .about-text, .benefit-card, .faq-item, .cta-text, .cta-box'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

animatedElements.forEach((element) => {
  element.classList.add('hidden');
  observer.observe(element);
});