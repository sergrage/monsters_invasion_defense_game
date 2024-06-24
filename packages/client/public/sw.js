// const CACHE_NAME = "cache-v3";
// let urlsToCache = ["/index.html", "/vite.svg"];
//
// const fetchAssetsList = async () => {
//   try {
//     const response = await fetch("/assets-list.json");
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     urlsToCache = [...urlsToCache, ...data.assets];
//     console.log("Assets to cache:", urlsToCache);
//   } catch (error) {
//     console.error("Service Worker: Unable to fetch assets list", error);
//   }
// };
//
// const tryNetwork = (req, timeout) => {
//   return new Promise((resolve, reject) => {
//     const timeoutId = setTimeout(reject, timeout);
//     fetch(req).then(res => {
//       clearTimeout(timeoutId);
//       if (res.status === 200) {
//         const responseClone = res.clone();
//         caches.open(CACHE_NAME).then(cache => {
//           console.log(req);
//           cache.put(req, responseClone);
//         });
//         resolve(res);
//       } else {
//         reject("Service Worker: Non-200 status code received");
//       }
//     }, reject);
//   });
// };
//
// const getFromCache = req => {
//   console.error("Service Worker: Нет соединения, данные взяты из кеша");
//   return caches.open(CACHE_NAME).then(cache => {
//     return cache.match(req).then(result => {
//       console.log(req);
//       return (
//         result ||
//         Promise.reject("Service Worker: Не удалось найти данные в кеше")
//       );
//     });
//   });
// };
//
// self.addEventListener("install", event => {
//   console.log("install");
//   event.waitUntil(
//     fetchAssetsList().then(() => {
//       return caches.open(CACHE_NAME).then(
//         cache => {
//           const cachePromises = urlsToCache.map(url => {
//             return fetch(url)
//               .then(response => {
//                 if (!response.ok) {
//                   throw new Error(
//                     `Request for ${url} failed with status ${response.status}`,
//                   );
//                 }
//                 return cache.put(url, response);
//               })
//               .catch(error => {
//                 console.error(`Failed to cache ${url}:`, error);
//               });
//           });
//           return Promise.all(cachePromises);
//         },
//         e => {
//           console.log("Service Worker: не удалось получить кеш приложения");
//           console.error(e);
//         },
//       );
//     }),
//   );
// });
//
// self.addEventListener("activate", event => {
//   console.log("activate");
//
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         }),
//       );
//     }),
//   );
// });
//
// self.addEventListener("fetch", event => {
//   if (event.request.url.startsWith("chrome-extension://")) {
//     // Пропускаем запросы со схемой chrome-extension
//     return;
//   }
//   console.log("fetch");
//
//   event.respondWith(
//     tryNetwork(event.request, 800).catch(() => getFromCache(event.request)),
//   );
// });
