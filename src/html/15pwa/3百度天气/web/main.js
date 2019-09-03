import skeleton from './skeleton.js'

window.addEventListener('load', function() {
    DOM.addCity();
    if (navigator.onLine) {
        WEATHERINFO.getLocation().then((Response) => {
            localStorage.setItem('city', Response);
            WEATHERINFO.buildNewCity(Response);
        })
    } else {
        let city = localStorage.getItem('city');
        WEATHERINFO.buildNewCity(city);
    }
})

// 注册service worker
window.addEventListener('DOMContentLoaded', function() {
    SW.register();
})

const CityList = [];
// 城市天气类
function City(name, time, tem, weather, humidity, winddirection, windpower) {
    this.name = name;
    this.time = time;
    
    this.tem = tem;
    
    this.weather = weather;
    this.humidity = humidity;
    this.winddirection = winddirection;
    this.windpower = windpower;

    this.forecast = [];

    this.setForecast = function(list) {
        let temp = {};
        for (let item in list) {
            for (let i in list[item]) {
                if (i == 'date') {
                    temp.day = dataCount(new Date(list[item][i]));
                } else if (i == 'cond_txt_d') {
                    switch (list[item][i]) {
                        case '多云':
                            temp.weather = './images/partly-cloudy.png'
                            break;
                        case '阴':
                            temp.weather = './images/cloudy.png'
                            break;
                        case '晴':
                            temp.weather = './images/clear.png'
                            break;
                        case '小雨':
                            temp.weather = './images/rain.png'
                            break;
                        case '中雨':
                            temp.weather = './images/rain.png'
                            break;
                        case '大雨':
                            temp.weather = './images/rain.png'
                            break;
                        default:
                            temp.weather = './images/wind.png'
                            break;
                    }
                } else if (i == 'tmp_max') {
                    temp.tmp_max = list[item][i];
                } else if (i == 'tmp_min') {
                    temp.tmp_min = list[item][i];
                }
            }
            this.forecast.push(temp);   
            temp = {};
        }
        this.render();
    }

    let dataCount = function(time) {
        switch (time.getDay()) {
            case 0:
                return 'Sun';
                break;
            case 1:
                return 'Mon';
                break;
            case 2:
                return 'Tue';
                break;
            case 3:
                return 'Wed';
                break;
            case 4:
                return 'Thu';
                break;
            case 5:
                return 'Fri';
                break;
            case 6:
                return 'Sat';
                break;
            default:
                break;
        }
    };

    this.render = function() {
        let _this = this;

        let imgSrc = null;
        switch (_this.weather) {
            case '多云':
                imgSrc = './images/cloudy_s_sunny.png'
                break;
            case '阴':
                imgSrc = './images/cloudy.png'
                break;
            case '晴':
                imgSrc = './images/clear.png'
                break;
            case '小雨':
                imgSrc = './images/rain.png'
                break;
            case '中雨':
                imgSrc = './images/rain.png'
                break;
            case '大雨':
                imgSrc = './images/rain.png'
                break;
            case '雾':
                imgSrc = './images/fog.png'
                break;
            default:
                imgSrc = './images/wind.png'
                break;
        }

        let model = (function() {
            let time = new Date(_this.time);
            let temp = `
                <img src="./images/icons/delete.svg" class="delete" id="delete_${ _this.name }"/>
                <h3>${ _this.name }</h3>
                <p>${ time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() }</p>
                <div class="show">
                    <div>
                        <img src="${ imgSrc }" alt="" class="img_now">
                        <span>${ _this.tem }℃</span>
                    </div>
                    <div>
                        <ul>
                            <li>天气 : <span>${ _this.weather }</span></li>
                            <li>空气湿度 : <span>${ _this.humidity }</span></li>
                            <li>风向 : <span>${ _this.winddirection }</span></li>
                            <li>风力 : <span>${ _this.windpower }</span></li>
                        </ul>
                    </div>
                </div>
                <div class="future">
                    <ul class="mg">
                        <li>
                            <h4>${ _this.forecast[1].day }</h4>
                            <img src="${ _this.forecast[1].weather }" alt="">
                            <p>${ _this.forecast[1].tmp_max }℃</p>
                            <p>${ _this.forecast[1].tmp_min }℃</p>
                        </li>
                    </ul>
                    <ul class="mg">
                        <li>
                            <h4>${ _this.forecast[2].day }</h4>
                            <img src="${ _this.forecast[2].weather }" alt="">
                            <p>${ _this.forecast[2].tmp_max }℃</p>
                            <p>${ _this.forecast[2].tmp_min }℃</p>
                        </li>
                    </ul>
                </div>
            `
            return document.createRange().createContextualFragment(temp);
        })();

        // 在线时才需要骨架屏
        if (navigator.onLine) {
            let container = document.getElementById(this.name);
            setTimeout(() => {
                container.classList.remove('preload');
                container.innerHTML = "";
                container.appendChild(model);

                // 为删除键绑定事件
                document.getElementById('delete_' + this.name).addEventListener('click', function() {
                    WEATHERINFO.deleteCity(_this.name);
                })
            }, 200);
        } else {
            let card = document.createElement('div');
            card.classList = ['card ' + 'mg'];
            card.id = _this.name;
            card.appendChild(model);

            let container = document.getElementById('container');
            container.appendChild(card);

            // 为删除键绑定事件
            document.getElementById('delete_' + this.name).addEventListener('click', function() {
                WEATHERINFO.deleteCity(_this.name);
            })
        }
    };
}

// DOM节点操作
const DOM = {
    addCity() {
        let btn = document.getElementById('add');
        let cover = document.getElementById('cover');
        let cityList = document.getElementById('cityList');
        let item = document.getElementsByClassName('city_item');

        for (let i = 0; i < item.length; i ++) {
            item[i].onclick = function() {
                WEATHERINFO.buildNewCity(this.innerHTML);
                cover.style.display = "none";
                cityList.style.display = "none";
                document.documentElement.style.overflowY = 'scroll'; 
            }
        }

        btn.addEventListener('click', function() {
            if (cover.style.display == 'none') {
                document.documentElement.style.overflowY = 'hidden';
                cover.style.height = document.documentElement.scrollHeight + 'px';
                cover.style.display = "block";
                cityList.style.display = "flex";
            } else {
                document.documentElement.style.overflowY = 'scroll'; 
                cover.style.display = "none";
                cityList.style.display = "none";
            }
        })
    }
}

const WEATHERINFO = {
    // 获取当前位置
    getLocation() {
        return new Promise(
            function(resolve, reject) {
                if (navigator.onLine) {
                    resolve((returnCitySN.cname).substr(0, 2));
                    localStorage.setItem('city', (returnCitySN.cname).substr(0, 1));
                } else if (!navigator.onLine) {
                    let city = localStorage.getItem('city');
                    resolve(city);
                }
            }
        )
    },

    // 根据位置获取当前天气
    getInfoNow(city) {
        let baseURL = 'https://restapi.amap.com/v3/weather/weatherInfo';
        let KEY = 'd856a0dbdd337bf52068a3f8c127e345';
        let URL = baseURL + '?city=' + city + '&key=' + KEY;

        fetch(URL).then((Response) => {
            if (Response.status === 200) {
                Response.json().then((data) => {
                    let list = data.lives[0];
                    for (let i = 0; i < CityList.length; i ++) {
                        if (CityList[i].name == (list.city).substr(0, 2)) {
                            alert('你已经添加过该城市了');
                            let preload = document.getElementsByClassName('preload')[0];
                            preload.remove();
                            return;
                        }
                    }
                    let city = new City((list.city).substr(0, 2), list.reporttime, list.temperature, list.weather, list.humidity, list.winddirection, list.windpower);
                    CityList.push(city);
                    this.getInfoFutre(city.name);
                })
            }
        })
    },

    // 根据位置获取天气预报
    getInfoFutre(city) {
        let baseURL = 'https://free-api.heweather.net/s6/weather/forecast'
        let KEY = '2b0f813dcb5847cf95a5ceacd141ea7d';
        let URL = baseURL + '?location=' + city + '&key=' + KEY;

        fetch(URL).then((Response) => {
            if (Response.status === 200) {
                Response.json().then((data) => {
                    for (let i = 0; i < CityList.length; i ++) {
                        if (CityList[i].name == data.HeWeather6[0].basic.location) {
                            CityList[i].setForecast(data.HeWeather6[0].daily_forecast);
                        }
                    }
                })
            }
        })
    },

    // 新建一个新的城市天气实例
    buildNewCity(city) {
        if (navigator.onLine) {
            // 骨架屏先行渲染
            let preModel = (function() {
                return skeleton.Render(city, 'title', 3);
            })();
            let container = document.getElementById('container');
            container.appendChild(preModel);
        }

        this.getInfoNow(city);
    },

    // 删除一个城市天气实例
    deleteCity(cityName) {
        let dom = document.getElementById(cityName);
        dom.style.height = '0px';
        setTimeout(() => {
            dom.remove();
        }, 500);
        for (let i = 0; i < CityList.length; i ++) {
            if (CityList[i].name === cityName) {
                CityList.pop(i);
                return;
            }
        }
        return;
    },
}

const SW = {
    // 注册
    register() {
        if('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('./sw.js')
            .then(function() {
                console.log('Service Worker Registered');
            })
            .catch(function() {
                console.log('Service Worker failed');
            })
        }
    }
}