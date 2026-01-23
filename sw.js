// Service Worker para Maze Hunter Web
// Proporciona funcionalidad PWA y caché offline

const CACHE_NAME = 'mazehunter-v1';
const urlsToCache = [
    'index.html',
    'classes.js',
    'sw.js',
    'imagenes/llavenegra.png',
    'imagenes/llave.png',
    'imagenes/energia.png',
    'imagenes/niebla2.png',
    'imagenes/jugador5.png',
    'imagenes/victoria.png',
    'imagenes/jugador4.png',
    'imagenes/muro.jpeg',
    'imagenes/jugador3.png',
    'imagenes/jugador2.png',
    'imagenes/salida2.png',
    'imagenes/advertencia.png',
    'imagenes/trampa2.png',
    'imagenes/suelo2.png',
    'imagenes/cristal.png',
    'imagenes/fosforo.png',
    'imagenes/derrota.png',
    'imagenes/muro_rojo.png',
    'imagenes/bomba2.png',
    'imagenes/energia2.png',
    'imagenes/cristal2.png',
    'imagenes/portal2.png',
    'imagenes/salida.png',
    'imagenes/portal.png',
    'imagenes/vida.png',
    'imagenes/boton3.jpg',
    'imagenes/boton2.jpg',
    'imagenes/gameover.png',
    'imagenes/muro2.jpeg',
    'imagenes/mazmorra.png',
    'imagenes/llave2.png',
    'imagenes/fosforo2.png',
    'imagenes/suelo.png',
    'imagenes/fondo4.jpg',
    'imagenes/bomba.png',
    'imagenes/trampa.png',
    'imagenes/niebla.png',
    'imagenes/muro_rojo2.png',
    'imagenes/explosion.png',
    'imagenes/mazmorra.avif',
    'imagenes/fondo2.jpg',
    'imagenes/fondo3.jpg',
    'imagenes/jugador.png',
    'audio/estadisticas.mp3',
    'audio/cristal.wav',
    'audio/energia.wav',
    'audio/llave.wav',
    'audio/teleport.wav',
    'audio/trampa.wav',
    'audio/juego.mp3',
    'audio/derrota.mp3',
    'audio/recoger.wav',
    'audio/explosion.wav',
    'audio/victoria.mp3',
    'audio/principal.mp3'
];

// Evento de instalación
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de fetch
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                // Clone request because it can only be used once
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone response because it can only be used once
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    }
                );
            })
    );
});

// Evento de activación
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
