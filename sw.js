/* Painel GUT — service worker
   Estratégia: rede primeiro, cache como rede de segurança.
   Assim você sempre pega a versão nova quando tem sinal,
   e o app continua abrindo no meio do talhão sem internet. */

const VERSAO = "painel-gut-v6";
const ESSENCIAIS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icone-192.png",
  "./icone-512.png",
  "./icone-512-m.png",
  "./favicon.png"
];

self.addEventListener("install", evento => {
  evento.waitUntil(
    caches.open(VERSAO)
      .then(c => c.addAll(ESSENCIAIS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", evento => {
  evento.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(
        nomes.filter(n => n !== VERSAO).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", evento => {
  const req = evento.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Compartilhamento vindo do WhatsApp/e-mail: nunca serve do cache,
     senão o texto compartilhado se perde. */
  const compartilhando = url.searchParams.has("text")
    || url.searchParams.has("title")
    || url.searchParams.has("url");

  if (req.mode === "navigate") {
    evento.respondWith(
      fetch(req)
        .then(resp => {
          if (!compartilhando) guardar(req, resp.clone());
          return resp;
        })
        .catch(() => caches.match("./index.html").then(r => r || Response.error()))
    );
    return;
  }

  evento.respondWith(
    fetch(req)
      .then(resp => { guardar(req, resp.clone()); return resp; })
      .catch(() => caches.match(req).then(r => r || Response.error()))
  );
});

function guardar(req, resp) {
  if (!resp || resp.status !== 200 || resp.type === "opaque") return;
  caches.open(VERSAO).then(c => c.put(req, resp)).catch(() => {});
}

/* Permite forçar atualização a partir da página */
self.addEventListener("message", e => {
  if (e.data === "atualizar") self.skipWaiting();
});
