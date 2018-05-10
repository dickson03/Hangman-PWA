var cacheTitle = "hangman:";
var version = "1.2";
var staticCacheName = cacheTitle+version;
var offlineURL = 'hangman/index.html';
self.addEventListener('install', function(event){
	console.log('Service Worker Installed');
    event.waitUntil(
        caches.open(staticCacheName).then( function(cache){
            return cache.addAll([
                '/',
                'index.html',
                'hangman/',
                'hangman/index.html',
                'hangman/js/jquery.min.js',
                'hangman/js/bootstrap.js',
                'hangman/css/bootstrap.css',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event){
	console.log('Fecth activated');
    event.respondWith(
        caches.match(event.request).then( function(response){
            if(response){
                return response;
            }else{
                return  fetch(event.request);
            }
        })
    );
});

self.addEventListener('activate', function(event) {
  console.log('Sevice Worker activated');
  var cacheWhitelist = [staticCacheName];
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