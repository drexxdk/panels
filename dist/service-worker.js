/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/ajax/layout/navigation.html","d3295f767d251d2758e92843cb97f391"],["/ajax/layout/settings.html","ab56284fb39eade2415146653974c07f"],["/ajax/pages/accordion.html","3d5a98387a11c581120eea3ad3ba7e7a"],["/ajax/pages/alert.html","bce0ff71aad833e62559059ba47e0283"],["/ajax/pages/button.html","06e42d4240b1c04e90d9f8c536d32b0c"],["/ajax/pages/color.html","b07af04ff721cbb7f2a638c4bbaa539e"],["/ajax/pages/cover-and-two-content.html","c4348176a1699e4ea86b1c50a173bcc3"],["/ajax/pages/cover.html","9ecf48e0987e9d6340cead1bb7c7c24a"],["/ajax/pages/datatables.html","5cf432220b0c93a90dde63cb491e1c4a"],["/ajax/pages/drag-and-drop.html","6cf1b5096a6ee20307fe4b91f48a43a3"],["/ajax/pages/error.html","258d4fefb4e0243f98f96139488fba48"],["/ajax/pages/form.html","f2c1693b95c9223cad9a77503ddd19cf"],["/ajax/pages/full-width-content.html","5c46857c1bfbdf75f531ef0d3e61749e"],["/ajax/pages/headline.html","5d0b2c72241cce4a768488303dba82e8"],["/ajax/pages/home.html","d9fb9e24393891cdd31295f5df87cb68"],["/ajax/pages/img.html","52a9b951c98347fe36b4275f42f5b9a3"],["/ajax/pages/list.html","d440893c0104587116fda85373789176"],["/ajax/pages/map.html","db4485b115b5ed77735de140e0fb8abf"],["/ajax/pages/math.html","f53d30671a48a0a579d82667b4c90a39"],["/ajax/pages/media.html","c9204aa838cc233e8368ca701c9c38c9"],["/ajax/pages/modal.html","52fe87513945b72e8859d40324cffa23"],["/ajax/pages/percentage.html","d3222efec259d7f530af9f70b029feeb"],["/ajax/pages/popup.html","68c4c231fb335811503b77f368169761"],["/ajax/pages/progress.html","56bae51dec1d2c771d5832fecfb62984"],["/ajax/pages/quote.html","2f02503b7bdaafa488b81075ef7d2e33"],["/ajax/pages/sort.html","c5223e4e1f12790e3677d2d0111d3abd"],["/ajax/pages/swiper.html","20b2c50796a7dc700f1330b5473fac63"],["/ajax/pages/table.html","1e04011bdc34578e0d1d4bd65627f3a7"],["/ajax/pages/tooltip.html","05f950752d98e37c991d5af6162736c2"],["/ajax/pages/two-content.html","b47f008e94fd35502bf25611014b27ce"],["/ajax/svg/base.html","ce1535dc1ecd67868e51ea1efdcf4ea3"],["/ajax/svg/browser.html","3b53fce1b72af83b7066f3269ce5e296"],["/ajax/svg/os.html","2611353dff1b9ddeefd7a41ec3ec991c"],["/css/initial.css","9c349805377d6c7f8dfe62172fc46b9e"],["/css/initial.min.css","0e095d2e8d33252469deb8388aa07844"],["/css/katex.css","65313373ee7c6718f8bad4f0456af60f"],["/css/katex.min.css","2f76d5526eabdea854016b49f38f2ea5"],["/css/plyr.css","757b7f58e115760bc92f3ee615edc12a"],["/css/plyr.min.css","055f51ba05ab3e72ce92134d621ee5db"],["/css/swiper.css","b51414dbba364317b795fc3ab2e70778"],["/css/swiper.min.css","fc163a17582e0b73753445fd49c612f2"],["/css/theme/dark.css","6f2582cb49d8c138f5c6c6c2758a3a4b"],["/css/theme/dark.min.css","fc9552d0d550af6e255aee373bb1253d"],["/css/theme/light.css","26a0d8768b98974e779f1c4cee0692c7"],["/css/theme/light.min.css","7870cc061ca187f5faf705879122b131"],["/fonts/katex/KaTeX_AMS-Regular.woff","e78f217c38267703d444fb8f3940a431"],["/fonts/katex/KaTeX_Caligraphic-Bold.woff","bac61997af03ef4747cd73b3757749ca"],["/fonts/katex/KaTeX_Caligraphic-Regular.woff","a64e134208e4b556aa9adfd286aa46ab"],["/fonts/katex/KaTeX_Fraktur-Bold.woff","0a0aa194aa39cc284a3d8826cd23cfa9"],["/fonts/katex/KaTeX_Fraktur-Regular.woff","f980ca72a0d0876d0451f9e8d7b25c02"],["/fonts/katex/KaTeX_Main-Bold.woff","d8a629d21894b90448b5f42f457c2060"],["/fonts/katex/KaTeX_Main-Italic.woff","8dd42e02d20082db960018b6488338f7"],["/fonts/katex/KaTeX_Main-Regular.woff","2dffc87573a6d6dd440e801b5cce5c8e"],["/fonts/katex/KaTeX_Math-BoldItalic.woff","65a38aa60d8e857bc2b8b9d6373b1152"],["/fonts/katex/KaTeX_Math-Italic.woff","da586018a5f1b55beb343d53bf804007"],["/fonts/katex/KaTeX_Math-Regular.woff","91cb3688dbc54686b7c8032a511dd77c"],["/fonts/katex/KaTeX_SansSerif-Bold.woff","bfe58d70050dee17e6520b383d519b98"],["/fonts/katex/KaTeX_SansSerif-Italic.woff","dabdeee17ca945eb5382550288ccee34"],["/fonts/katex/KaTeX_SansSerif-Regular.woff","48c7df6f4d3d4df25748a666d0520b5c"],["/fonts/katex/KaTeX_Script-Regular.woff","5acb381b12b66ca6afef5d9edb948672"],["/fonts/katex/KaTeX_Size1-Regular.woff","bdd0d5e034ab4a8641bd05736d5ed84f"],["/fonts/katex/KaTeX_Size2-Regular.woff","fd67fb35731da39667ae210a98c60ef4"],["/fonts/katex/KaTeX_Size3-Regular.woff","943c94f89c864bae86f603aee2bf83ea"],["/fonts/katex/KaTeX_Size4-Regular.woff","68537743d23b63655387918e39fe65c1"],["/fonts/katex/KaTeX_Typewriter-Regular.woff","9bd7cfe51b99f09cb1e82144804f0e89"],["/img/avatar-60-60.jpg","1f56b72b61093bfde089b073c48cd566"],["/img/error/background.jpg","3cd7389b23426bb5d653bd45412fa93c"],["/img/error/hydra.png","791ea93282b315eaa8b373a971670422"],["/img/favicon/android-chrome-192x192.png","fc1ff404cae7ede6a7e34c91bbcac253"],["/img/favicon/android-chrome-512x512.png","521ae0a8308e7aa3216ac9d5c3f82ebb"],["/img/favicon/apple-touch-icon.png","fe3072b0bf19e4a6fcfc024c33864f7b"],["/img/favicon/mstile-150x150.png","36734055181ca700629d0a10b84c0845"],["/img/favicon/mstile-310x150.png","f89f573d6a0a69c540c0d4dbca0f46cb"],["/img/favicon/mstile-310x310.png","03dff20dfb6d07dd1763d088f477b6be"],["/img/favicon/mstile-70x70.png","15c55df245d7c4dcc13514cb1da73e6d"],["/img/favicon/original/hexagons-blue.svg","a10ea0e018aeed0569fe720f7fff73bf"],["/img/favicon/original/hexagons-white.svg","23b106321838605fb680de666ad16ca5"],["/img/favicon/safari-pinned-tab.svg","5b11a1034d8caffb8d7a341b1933b838"],["/img/pages/avengers-infinity-war-1920-1080-min.jpg","2ef63f3ba12d7df876ba073223053fcd"],["/img/pages/avengers-infinity-war-1920-1080.jpg","06d9524141354cfc81b5d704d6e57a8e"],["/img/pages/deadpool-1920-1080-min.jpg","2654f466aab0ed8e8326c359f80f64e7"],["/img/pages/deadpool-1920-1080.jpg","aeef9e11d6efdc0735412dd49c74365f"],["/img/pages/deadpool-200-200.jpg","9302e755e37c24cb8691f4a98a1aedbb"],["/img/pages/guardians-of-the-galaxy-vol.-2-1920-1080-min.jpg","4abba18e973c5b9884723074256e3904"],["/img/pages/guardians-of-the-galaxy-vol.-2-1920-1080.jpg","f438ad5bd5ca973b9229bc5d27349b28"],["/img/pages/justice-league-1920-1080-min.jpg","dd57e56c444a65d8a415b22990eb74ed"],["/img/pages/justice-league-1920-1080.jpg","63bcbca0325037e5d64ba8551b26849b"],["/img/pages/spider-man-homecoming-1920-1080-min.jpg","8237696fd5d4fa7ac4d696dd048264aa"],["/img/pages/spider-man-homecoming-1920-1080.jpg","442405e40132d0f6bc530825af996dac"],["/img/rb/thor-ragnarok-1024.jpg","b945f9beb5734f22e569ff9d9d55b6c4"],["/img/rb/thor-ragnarok-1200.jpg","05f79f511bde0d9a8abf0342c19c732d"],["/img/rb/thor-ragnarok-1920.jpg","df83d367a66d4f69c2c4dbb95e32150b"],["/img/rb/thor-ragnarok-3840.jpg","30a2e2ce8329275ea7b33a7462b31eba"],["/img/rb/thor-ragnarok-800.jpg","a26d0f38ead675084e90e583183a3e92"],["/img/rb/wonder-woman-1024.jpg","6a7c69843ff39403eab14fad2de33bb4"],["/img/rb/wonder-woman-1200.jpg","044ba0fe69df49315c1ac6521e1c8a7b"],["/img/rb/wonder-woman-1920.jpg","dec1bec6d05a101377298f8cb1269cc5"],["/img/rb/wonder-woman-3840.jpg","80c21313cd287afc7d62d92ee9e91532"],["/img/rb/wonder-woman-800.jpg","5c2bb148481709ee7eaada2ed8a5e1d1"],["/js/app.js","7fae0afe20edfd1adeccc637a85666f2"],["/js/app.min.js","b4d9639a9812dc9a0a1ad02b6f21daa4"],["/js/assignments.js","a654d662d51387145ef91de4e3a00f83"],["/js/assignments.min.js","959643c1ec41f5e0557f554a458ef55e"],["/js/datatables.js","5a2131012cd4b32fadd0083d838c2dcb"],["/js/datatables.min.js","5b915799d08b9b64a89b6626da3ded34"],["/js/focus.js","4a4cb5f86bacdb9902cc144c745113b7"],["/js/focus.min.js","053c31c24f86993be58322d6f1588d48"],["/js/fonts.js","a2cd2478b5f9a43804720756f611969c"],["/js/fonts.min.js","4fa22f30e658c0842548eec47dca1d08"],["/js/katex.js","f80176782cc992b25e57d07245525857"],["/js/katex.min.js","39887266194b4c90aa0af13850bea624"],["/js/loadCSS.js","d7835bc758ddaccd2c34f952a57286fa"],["/js/loadCSS.min.js","ee9ea2335e10aea6c621eea105e6c11e"],["/js/plyr.js","fab8dcc4ccb12e5704b256fde7f47cbb"],["/js/plyr.min.js","41a3ce48498e431f3969210655b5adce"],["/js/polyfills.js","d2bcf2356a1e72b8d7b299d1fbd9894d"],["/js/polyfills.min.js","ea5f46b6a321589b0b1a1a286cb7e57d"],["/js/swiper.js","c2acf813ba147f34dc04ca20f7db1a9c"],["/js/swiper.min.js","7643161898d30121f45d087a2ebfa278"],["/js/tts.js","875992c3b690f062ab504ce8d88f1273"],["/js/tts.min.js","65725f0b71b0aa914585ad147cce722c"],["/video/wonder-woman-intro.jpg","b86394c9ab39223436e1c00fa73fc5c4"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});






