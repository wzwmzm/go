// service worker 逻辑

// 首次打开页面 -> 注册service worker -> 获取当地位置 -> 将卡片信息存入indexedDB -> 追加新信息 -> 将卡片信息存入indexedDB -> 
// 再次打开页面 -> fetch请求 -> 获取App Shell
//                           -> 检查网络情况 -> 离线：展示indexDB中的卡片信息
//                                           -> 在线：先展示indexDB，再更新
// 千万不能把sw.js也缓存进去，不然你的应用就永远更新不了了
const CACHENAME = 'weather-' + 'v8';
const PATH = '';
const fileToCache = [
    PATH + '/',
    PATH + '/index.html',
    PATH + '/main.js',
    PATH + '/fontSet.js',
    PATH + '/skeleton.js',
    PATH + '/reset.css',
    PATH + '/style.css',
    PATH + '/images/icons/delete.svg',
    PATH + '/images/icons/plus.svg',
    PATH + '/images/partly-cloudy.png',
    PATH + '/images/wind.png',
    PATH + '/images/cloudy_s_sunny.png',
    PATH + '/images/cloudy.png',
    PATH + '/images/clear.png',
    PATH + '/images/rain.png',
    PATH + '/images/fog.png',
    PATH + '/images/icons/icon-32x32.png',
    PATH + '/images/icons/icon-128x128.png',
    PATH + '/images/icons/icon-144x144.png',
    PATH + '/images/icons/icon-152x152.png',
    PATH + '/images/icons/icon-192x192.png',
    PATH + '/images/icons/icon-256x256.png'
];
//CACHE版本检测及更新(只是增加了新版本的CACHE,并没有删除旧版本的CACHE)
self.addEventListener('install', e => {
    console.log('Service Worker Install');
    e.waitUntil(
        caches.open(CACHENAME).then(function (cache) {	//CACHENAME为版本检测
            self.skipWaiting();
            console.log('Service Worker Caching');
            return cache.addAll(fileToCache);		//更新cache
        })
    )
})
//清理旧版本的CACHE
self.addEventListener('activate', function (event) {
    event.waitUntil(
        // 遍历 caches 里所有缓存的 keys 值
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (NAME) {
                    if (NAME != CACHENAME) {
                        // 删除 v1 版本缓存的文件
                        return caches.delete(NAME);
                    }
                })
            );
        })
    );
});
//service worker是通过监听fetch事件来拦截所有的请求
self.addEventListener('fetch', e => {
	// e是所有的请求，每调用一次请求，都会被fetch监听到
    e.respondWith(
		//在caches中寻找response，如果有就返回response，如果没有，就继续fetch（即不在本地查找，调用接口去查找）
        caches.match(e.request).then(function (res) {
            if (res) {	//1,网页请求有缓存
                if (e.request.url.indexOf(self.location.host) !== -1) {
                    	//1.1 有缓存,且同源--->直接把cache中结果返回
                    return res;
                } else {//1.2 有缓存,不同源
                    	//1.2.1 有缓存,不同源,不在线--->直接返回缓存结果
                    if (!navigator.onLine) {
                        return res;
                    } else {	//1.2.2 有缓存,不同源,在线--->从网络获取,并更新缓存
                        return fetch(e.request).then((response) => {
                            let responeClone = response.clone();
                            let responeClone_2 = response.clone();
                            responeClone_2.json().then(data => {
                                caches.open(CACHENAME).then(cache => {//更新缓存
                                    cache.put(e.request, responeClone);
                                })
                            }).catch(e => {
                                console.log(e);
                            })
                            return response;
                        })
                    }
                }
            }
			//2,无缓存,  获取IP及所在城市--->这个值不缓存,所以单列
            if (e.request.url.indexOf('https://pv.sohu.com/cityjson?ie=utf-8') !== -1) {
                return fetch(e.request);
            }
			//3,无缓存,  从网络获取,并更新缓存
            return fetch(e.request).then((response) => {
                let responeClone = response.clone();
                let responeClone_2 = response.clone();
                responeClone_2.json().then(data => {
                    caches.open(CACHENAME).then(cache => {//更新缓存
                        cache.put(e.request, responeClone);
                    })
                }).catch(e => {
                    
                })
                return response;
            }).catch(e => {
                
            })
        })
    )
})


