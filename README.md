# CVT Treinamentos — Landing page

Site estático (HTML + CSS + JavaScript), sem dependências nem etapa de build.

## Estrutura

```
cvt-landing/
├── index.html            Página principal (todos os textos ficam aqui)
├── privacidade.html      Política de privacidade
└── assets/
    ├── css/style.css     Estilos (cores e fontes no topo, em :root)
    ├── js/config.js      ← TELEFONES, MENSAGENS DO WHATSAPP E REDES SOCIAIS
    ├── js/main.js        Interações (menu, abas, WhatsApp, galeria)
    ├── img/              Logo, fotos, favicon e imagem de compartilhamento
    └── video/            hero-loop.mp4 (topo, sem som) e vídeo completo da galeria
```

## Como visualizar

- Abra `index.html` com dois cliques no navegador; ou
- Rode um servidor local na pasta: `python -m http.server` e acesse http://localhost:8000

## Como alterar

| O quê | Onde |
|---|---|
| Telefones, nomes dos setores, mensagens do WhatsApp | `assets/js/config.js` |
| Link do Facebook | `assets/js/config.js` → `facebook: "https://..."` (o ícone aparece sozinho) |
| Textos, treinamentos e serviços | `index.html` (cada seção está marcada com um comentário) |
| Cores e fontes | topo de `assets/css/style.css` (bloco `:root`) |
| Fotos | substitua os arquivos em `assets/img/` mantendo o nome, ou troque o `src` no `index.html` |
| Vídeos | substitua os arquivos em `assets/video/` (MP4, H.264) |

Para adicionar um treinamento, copie uma linha `<li><button class="course" ...>` dentro da lista
correspondente e ajuste o código (`NR xx`), o nome e o `data-subject` (assunto que vai na mensagem).

## Como publicar

Qualquer hospedagem de sites estáticos serve. Envie **todo o conteúdo da pasta** mantendo a estrutura:

- **Hostinger, Locaweb, HostGator etc.:** gerenciador de arquivos → pasta `public_html` → enviar os arquivos.
- **Netlify:** app.netlify.com/drop → arrastar a pasta.
- **GitHub Pages:** criar repositório, enviar os arquivos, Settings → Pages → branch `main`.

Depois de ter o domínio, troque `https://www.seudominio.com.br/` no `index.html` (tags `canonical` e `og:url`)
e use o endereço completo na `og:image` (ex.: `https://www.cvttreinamentos.com.br/assets/img/og-image.jpg`).
