/*
 * CVT Treinamentos — configuração de contatos
 * ------------------------------------------------------------
 * Altere aqui telefones, mensagens e redes sociais.
 * Todos os botões de WhatsApp do site usam estes dados.
 * Telefones: somente números, com 55 + DDD + número.
 */
window.CVT_CONFIG = {
  whatsapp: [
    {
      id: "atendimento1",
      label: "Atendimento 1",
      phone: "5567992934994",
      display: "(67) 9 9293-4994"
    },
    {
      id: "atendimento2",
      label: "Atendimento 2",
      phone: "5517996580793",
      display: "(17) 9 9658-0793"
    },
    {
      id: "atendimento3",
      label: "Atendimento 3",
      phone: "5567993249344",
      display: "(67) 9 9324-9344"
    },
    {
      id: "administrativo",
      label: "Administrativo e financeiro",
      phone: "5517991213921",
      display: "(17) 9 9121-3921",
      message: "Olá! Vim pelo site da CVT Treinamentos e gostaria de falar com o setor administrativo e financeiro."
    }
  ],

  // Mensagem padrão (quando o visitante não escolheu um treinamento/serviço)
  defaultMessage: "Olá! Vim pelo site da CVT Treinamentos e gostaria de solicitar um orçamento.",

  // Mensagem quando o visitante clica em um treinamento ou serviço ({assunto} é substituído)
  subjectMessage: "Olá! Vim pelo site da CVT Treinamentos e gostaria de informações sobre: {assunto}.",

  email: "cvt.treinamento@outlook.com",

  // Formulário de e-mail (FormSubmit). Na primeira mensagem, a CVT recebe um
  // e-mail de ativação e precisa clicar no link para o formulário funcionar.
  formEndpoint: "https://formsubmit.co/ajax/cvt.treinamento@outlook.com",
  instagram: "https://www.instagram.com/cvt.treinamentos/",
  facebook: "https://www.facebook.com/profile.php?id=100077913902114" // Vazio = ícone oculto.
};
