# CVT Treinamentos — Landing page

Site estático (HTML + CSS + JavaScript), sem dependências nem etapa de build.

## Estrutura

```
cvt-landing/
├── index.html            Página principal (todos os textos ficam aqui)
├── privacidade.html      Política de privacidade
├── 404.html              Página de erro (o GitHub Pages usa automaticamente)
├── robots.txt / sitemap.xml   Ajudam o Google a encontrar o site (trocar o endereço ao mudar de domínio)
└── assets/
    ├── css/style.css     Estilos (cores e fontes no topo, em :root)
    ├── js/config.js      ← TELEFONES, MENSAGENS DO WHATSAPP E REDES SOCIAIS
    ├── js/main.js        Interações (menu, abas, WhatsApp, galeria)
    ├── img/              Logo, favicon, imagem de compartilhamento e foto da seção Sobre
    │   └── galeria/      Fotos da galeria: nome.jpg (ampliada) + nome-thumb.jpg (600×600)
    └── video/            hero-loop.mp4 (topo, sem som) e brigada-florestal-aceiro.mp4 (galeria)
```

## Como visualizar

- Abra `index.html` com dois cliques no navegador; ou
- Rode um servidor local na pasta: `python -m http.server` e acesse http://localhost:8000

## Como alterar

| O quê | Onde |
|---|---|
| Telefones, setores, mensagens do WhatsApp, Instagram e Facebook | `assets/js/config.js` |
| Formulário de e-mail | `formEndpoint` em `assets/js/config.js` e o `action` do formulário no `index.html`. Na primeira mensagem, o FormSubmit manda um e-mail de ativação para a CVT; é preciso clicar no link uma vez |
| Endereço do site (ao trocar de domínio) | `canonical`, `og:url`, `og:image` e o campo `_next` do formulário no `index.html`, além de `robots.txt` e `sitemap.xml` |
| Textos, treinamentos e serviços | `index.html` (cada seção está marcada com um comentário) |
| Cores | topo de `assets/css/style.css` (bloco `:root`) |
| Tamanhos, espaçamentos e raios | também no `:root`; use só os valores da escala listada no topo do CSS |
| Fonte (Manrope) | link do Google Fonts no `<head>` das páginas + `--font` no `:root` |
| Fotos | substitua os arquivos em `assets/img/` mantendo o nome, ou troque o `src` no `index.html` |
| Vídeos | substitua os arquivos em `assets/video/` (MP4, H.264) |

Para adicionar um treinamento, copie uma linha `<li><button class="course" ...>` dentro da lista
correspondente e ajuste o código (`NR xx`), o nome, o `data-title` e o `data-desc` (título e descrição
mostrados na janela de atendimento) e o `data-subject` (assunto que vai na mensagem do WhatsApp).

## Como publicar

Qualquer hospedagem de sites estáticos serve. Envie **todo o conteúdo da pasta** mantendo a estrutura:

- **Hostinger, Locaweb, HostGator etc.:** gerenciador de arquivos → pasta `public_html` → enviar os arquivos.
- **Netlify:** app.netlify.com/drop → arrastar a pasta.
- **GitHub Pages:** criar repositório, enviar os arquivos, Settings → Pages → branch `main`.

Depois de ter o domínio, troque `https://www.seudominio.com.br/` no `index.html` (tags `canonical` e `og:url`)
e use o endereço completo na `og:image` (ex.: `https://www.cvttreinamentos.com.br/assets/img/og-image.jpg`).
