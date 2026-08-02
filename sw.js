/* Agenda Tarefas — service worker
   Rede primeiro, cache como rede de segurança.
   Também recebe o que o Android compartilha (texto e arquivos). */

const VERSAO = "agenda-tarefas-v12";
const TEMP = "compartilhado-temp";
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
        nomes.filter(n => n !== VERSAO && n !== TEMP).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", evento => {
  const req = evento.request;
  const url = new URL(req.url);

  /* Recebe o compartilhamento do Android (contatos .vcf, convites .ics, texto) */
  if (req.method === "POST" && url.pathname.endsWith("/share")) {
    evento.respondWith(receberCompartilhamento(req));
    return;
  }

  if (req.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    evento.respondWith(
      fetch(req)
        .then(resp => {
          if (!url.searchParams.has("compartilhado")) guardar(req, resp.clone());
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

async function receberCompartilhamento(req) {
  try {
    const fd = await req.formData();
    const texto = [fd.get("title"), fd.get("text"), fd.get("url")]
      .filter(Boolean).join("\n");

    const cache = await caches.open(TEMP);
    const arquivos = fd.getAll("arquivos") || [];
    const nomes = [];

    for (let i = 0; i < arquivos.length; i++) {
      const f = arquivos[i];
      if (!f || typeof f === "string" || !f.size) continue;
      await cache.put(
        new Request("./__arq-" + i),
        new Response(f, { headers: { "Content-Type": f.type || "text/plain" } })
      );
      nomes.push(f.name || ("arquivo-" + i));
    }
    await cache.put(
      new Request("./__meta"),
      new Response(JSON.stringify({ texto, nomes }), {
        headers: { "Content-Type": "application/json" }
      })
    );
  } catch (e) { /* segue mesmo assim: a página avisa que nada chegou */ }

  return Response.redirect("./index.html?compartilhado=1", 303);
}

function guardar(req, resp) {
  if (!resp || resp.status !== 200 || resp.type === "opaque") return;
  caches.open(VERSAO).then(c => c.put(req, resp)).catch(() => {});
}

self.addEventListener("message", e => {
  if (e.data === "atualizar") self.skipWaiting();
});
