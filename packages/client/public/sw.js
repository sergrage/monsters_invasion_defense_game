// Для обновления кеша изменить версию кеша в названии
const CACHE_NAME = "cache-v2";
const urlsToCache = ["/index.html", "/assets/", "/vite.svg"];

// const tryNetwork = (req, timeout) => {
//   console.log(req);
//   return new Promise((resolve, reject) => {
//     const timeoutId = setTimeout(reject, timeout);
//     fetch(req).then(res => {
//       clearTimeout(timeoutId);
//       const responseClone = res.clone();
//       caches.open(CACHE_NAME).then(cache => {
//         cache.put(req, responseClone);
//       });
//       resolve(res);
//       // 213
//       // Reject also if network fetch rejects.
//     }, reject);
//   });
// };

const tryNetwork = (req, timeout) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(req).then(res => {
      clearTimeout(timeoutId);
      if (res.status === 200) {
        const responseClone = res.clone();
        caches.open(CACHE_NAME).then(cache => {
          console.log(req);
          cache.put(req, responseClone);
        });
        resolve(res);
      } else {
        reject("Non-200 status code received");
      }
    }, reject);
  });
};
const getFromCache = req => {
  console.error("Service Worker: Нет соединения, данные взяты из кеша");
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(req).then(result => {
      console.log(req);
      return result || Promise.reject("Не удалось найти данные в кеше");
    });
  });
};

self.addEventListener("install", event => {
  console.log("install");
  event.waitUntil(
    caches.open(CACHE_NAME).then(
      cache => {
        return cache.addAll(urlsToCache);
      },
      e => {
        console.log("Service Worker: не удалось получить кеш приложения");
        console.error(e);
      },
    ),
  );
});

self.addEventListener("activate", event => {
  console.log("activate");

  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", event => {
  if (event.request.url.startsWith("chrome-extension://")) {
    // Пропускаем запросы с схемой chrome-extension
    return;
  }
  console.log("fetch");

  event.respondWith(
    tryNetwork(event.request, 400).catch(() => getFromCache(event.request)),
  );
  // event.respondWith(
  //   caches.match(event.request).then(response => {
  //     if (response) {
  //       return response;
  //     }
  //     return fetch(event.request)
  //       .then(response => {
  //         if (
  //           !response ||
  //           response.status !== 200 ||
  //           response.type !== "basic"
  //         ) {
  //           return response;
  //         }
  //
  //         const responseToCache = response.clone();
  //         caches.open(CACHE_NAME).then(cache => {
  //           cache.put(event.request, responseToCache);
  //         });
  //
  //         return response;
  //       })
  //       .catch(() => {
  //         // Логика показа уведомления о потере сети
  //         alert("Вы оффла");
  //         // self.registration.showNotification("Нет сети", {
  //         //   body: "Вы оффлайн, данные загружены из кэша",
  //         // });
  //         return caches.match("/offline.html");
  //       });
  //   }),
  // );
});
