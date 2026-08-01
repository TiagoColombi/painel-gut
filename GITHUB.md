# Publicar no GitHub Pages — passo a passo

Faça pelo **computador**. Pelo celular o upload de vários arquivos costuma falhar.

---

## Antes de começar: uma decisão

O GitHub Pages gratuito **só funciona com repositório público**. Isso significa que qualquer pessoa pode ver o código do app.

- **O código não tem segredo** — é HTML e JavaScript, sem senhas nem chaves.
- **Seus dados NÃO vão para o GitHub.** Tarefas, contatos e telefones ficam só no seu aparelho.

Então publicar é seguro. O único incômodo é a vitrine: um concorrente poderia copiar a ideia do sistema GUT. Se isso te preocupar, o Netlify hospeda privado de graça e o resultado é idêntico.

---

## Passo 1 — Criar a conta e o repositório

1. Entre em `github.com` e crie a conta (se ainda não tem).
2. Clique no **+** no canto superior direito → **New repository**.
3. Preencha:
   - **Repository name:** `painel-gut`
   - **Public** (obrigatório para o Pages gratuito)
   - **NÃO** marque "Add a README file" — já temos um
4. **Create repository**.

## Passo 2 — Subir os arquivos

1. Na tela que aparece, clique em **uploading an existing file**.
2. Descompacte o zip no seu computador.
3. **Selecione os arquivos de dentro da pasta** (não a pasta em si) e arraste para a área do navegador.

   > **Importante:** os arquivos precisam ficar na raiz do repositório. Se você arrastar a pasta, eles ficam dentro de `painel-gut-site/` e o endereço fica errado.

4. Confira que subiram **10 itens**:

   ```
   .nojekyll        index.html       icone-192.png
   LEIA-ME.md       manifest.json    icone-512.png
   README.md        sw.js            icone-512-m.png
   favicon.png      icone-180.png
   ```

   > O `.nojekyll` começa com ponto e pode ficar escondido. No Windows: Explorador → Exibir → marque "Itens ocultos". No Mac: `Cmd + Shift + .`

5. Escreva algo em **Commit changes** (ex.: "primeira versão") e confirme.

## Passo 3 — Ligar o Pages

1. No repositório, clique em **Settings** (engrenagem, no menu de cima).
2. Menu lateral esquerdo → **Pages**.
3. Em **Source**, escolha **Deploy from a branch**.
4. Em **Branch**: `main` e pasta `/ (root)` → **Save**.
5. Espere 1 a 3 minutos. Recarregue a página — aparece o endereço no topo.

Seu app estará em:

```
https://SEU-USUARIO.github.io/painel-gut/
```

## Passo 4 — Instalar no celular

1. Abra esse endereço no **Chrome** do Android.
2. Menu ⋮ → **Adicionar à tela inicial** (ou "Instalar aplicativo").
3. **Abra pelo ícone**, não pelo navegador.

Teste nesta ordem, que é a ordem em que costumam falhar:

| Teste | O que esperar |
|---|---|
| 📇 Buscar na agenda | Chrome pede permissão, abre a lista de contatos |
| 🎙 Ditar tarefa | Chrome pede o microfone, o botão fica vermelho |
| WhatsApp → segurar mensagem → Compartilhar | "Painel GUT" aparece na lista |

Se algum falhar, o app escreve na tela o motivo específico.

---

## Como atualizar depois

1. No repositório, clique no arquivo (ex.: `index.html`).
2. Ícone de lápis ✏️ → **Delete file** → confirme.
3. **Add file → Upload files** → suba a versão nova → confirme.

Ou, mais simples: **Add file → Upload files** e arraste o arquivo novo com o mesmo nome — o GitHub substitui.

Em 1–2 minutos entra no ar. Quem já tem o app instalado vê "Nova versão disponível — toque para atualizar".

---

## Se algo der errado

**Erro 404 ao abrir o endereço**
Os arquivos estão dentro de uma subpasta. Volte ao repositório: se aparecer uma pasta em vez dos arquivos soltos, entre nela, apague tudo e suba de novo, selecionando os arquivos e não a pasta.

**A página abre sem cor nenhuma, texto puro**
Faltou o `.nojekyll`, ou o `index.html` não subiu. Confira a lista de arquivos.

**O ícone não aparece ao instalar**
Falta algum PNG. Todos os 5 precisam estar lá.

**Settings → Pages não mostra a opção**
O repositório está como Private. Vá em Settings → role até o fim → **Change repository visibility** → Public.

**Instalei mas continua abrindo com barra de endereço**
Você abriu pelo histórico do navegador. Feche e abra pelo ícone da tela inicial.

---

## Guardar as versões antigas

Toda vez que você sobe um arquivo, o GitHub guarda a versão anterior. Se uma atualização quebrar algo, vá em **Commits** (o relógio com a seta, acima da lista de arquivos), escolha uma versão anterior e recupere o arquivo. É uma rede de segurança que o Netlify não dá de graça — bom motivo para ter escolhido o GitHub.
