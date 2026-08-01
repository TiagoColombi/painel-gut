# Painel GUT — como colocar no ar

São 8 arquivos. Todos precisam ficar **na mesma pasta**, e o endereço final precisa ser **HTTPS** (não `http://`, não `file://`). É o HTTPS que destrava agenda de contatos, microfone e o "Compartilhar → Painel GUT".

```
index.html        ← o app
manifest.json     ← identidade do app (nome, ícone, atalhos)
sw.js             ← funcionamento offline
icone-192.png
icone-512.png
icone-512-m.png   ← versão para ícones redondos do Android
icone-180.png     ← iPhone
favicon.png
```

---

## Opção A — Netlify (mais rápido, ~5 minutos)

1. Entre em `app.netlify.com` e crie a conta (pode ser com o Google).
2. Clique em **Add new site → Deploy manually**.
3. Arraste a pasta inteira para a área indicada.
4. Pronto. Ele devolve um endereço tipo `https://algo-aleatorio.netlify.app`.
5. Em **Site configuration → Change site name**, troque para algo como `painel-gut-tiago`.

Para atualizar depois: arraste a pasta de novo em **Deploys**.

## Opção B — GitHub Pages (gratuito e permanente)

1. Crie um repositório em `github.com` — pode ser **privado**? **Não**: o Pages gratuito exige repositório público. Se os dados forem sensíveis, prefira o Netlify.
2. **Add file → Upload files**, jogue os 8 arquivos, **Commit**.
3. **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. Em 1–2 minutos sai em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Opção C — servidor próprio

Se a IGRO ou a Fios.com já têm hospedagem, jogue os arquivos numa subpasta (ex.: `/painel/`) e garanta o certificado SSL. Funciona igual.

---

## No celular, depois de publicado

1. Abra o endereço no **Chrome** (Android) ou **Safari** (iPhone).
2. Menu ⋮ → **Adicionar à tela inicial** / **Instalar aplicativo**.
3. Abra **pelo ícone**, não pelo navegador — é isso que faz o app rodar em tela cheia e liberar os recursos.

### O que só funciona depois de instalado assim

| Recurso | Onde ativar |
|---|---|
| Contatos do telefone | botão "📇 Buscar na agenda" — o Chrome vai pedir permissão |
| Ditado por voz | botão 🎙 — permita o microfone quando perguntar |
| Compartilhar do WhatsApp | no WhatsApp: segure a mensagem → Compartilhar → **Painel GUT** |
| Atalhos rápidos | segure o ícone na tela inicial |
| Funcionar sem internet | automático, a partir da segunda abertura |

### iPhone

Contatos e ditado por voz **não funcionam** — a Apple não implementou essas APIs no Safari. O resto funciona normalmente. Use o microfone do próprio teclado para ditar.

---

## Sincronizar entre celular e computador

Em ⚙ → **Sincronizar entre aparelhos**:

- No aparelho que tem os dados: **Enviar meus dados** → escolha WhatsApp → mande para você mesmo.
- No outro: abra o arquivo → **Receber e mesclar**.

Não sobrescreve nada: cada tarefa tem carimbo de hora e vence sempre a versão mais recente. Tarefa apagada não volta.

---

## Atualizar o app depois

Troque o `index.html` no servidor. Quem já tem instalado recebe o aviso "Nova versão disponível — toque para atualizar" na próxima abertura. Se quiser forçar, incremente `VERSAO` no `sw.js` (de `painel-gut-v1` para `v2`).

---

## Onde ficam os dados

No próprio aparelho (armazenamento do navegador). **Não vão para servidor nenhum** — nem o meu, nem o do Netlify. Isso significa:

- Privacidade total: telefones dos seus clientes não saem do seu celular.
- Mas: se você desinstalar o app ou limpar os dados do Chrome, **some tudo**. Exporte o JSON de tempos em tempos (⚙ → Dados → Exportar JSON). O app já guarda as 5 últimas versões como backup interno, mas isso não sobrevive à desinstalação.
