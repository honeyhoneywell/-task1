/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */
'use strict';
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    let y = dat.getFullYear();
    let m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    let returnData = {};
    let dat = new Date("2016-01-01");
    let datStr = '';
    for (let i = 1; i < 92; i++) {
        datStr = getDateStr(dat);   //2016-01-01
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1); //2016-01-02(1-91一共随机生成91天的数据)
    }
    return returnData;
}

let aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
let chartData = {};

// 记录当前页面的表单选项
let pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart(cityValue,time) {
    let chart = document.getElementsByClassName('aqi-chart-wrap')[0];       //柱状图的盒子
    let backColor = ['#11d511','#eaf624','#ffc000','#d56411','#d51111','#4b0000'];      //存储柱状条的颜色
    chart.style.cssText = 'height:520px; position:relative;';       //设置好柱状图盒子的样式
    let w = 1;
    switch(time){
        case 'day':
            w=1;
            break;
        case 'week':
            w=4;
            break;
        default:
            w=6;
    }
    let  cityData = chartData[cityValue][time];    //存储当前选择城市的数据
    chart.innerHTML = '';
    for(let i in cityData){
        chart.innerHTML += '<div style="width:'+ 8*w +'px; height:' + cityData[i] + 'px; position: absolute; bottom: 0; background:' + backColor[Math.floor(cityData[i]/90)] + ';"></div>';
    }
    let aDiv = chart.getElementsByTagName('div');
    for( let j=0,len=aDiv.length; j<len; j++){
        aDiv[j].style.left = 12*j*w + 'px';
    }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    let formTime = document.getElementById('form-gra-time');
    let radios = formTime.getElementsByTagName('input');
    // 确定是否选项发生了变化
    for(let i=0,len=radios.length; i<len; i++){
        if(radios[i].checked){
            pageState.nowGraTime = radios[i].value
        }
    }
    // 设置对应数据
    renderChart(pageState.nowSelectCity,pageState.nowGraTime);
    // 调用图表渲染函数

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    let citySelect = document.getElementById('city-select');
    pageState.nowSelectCity = citySelect.value;
    // 设置对应数据
    // 调用图表渲染函数
    renderChart(pageState.nowSelectCity,pageState.nowGraTime);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    let formTime = document.getElementById('form-gra-time');
    let radios = formTime.getElementsByTagName('input');
    for(let i=0,len=radios.length; i<len; i++){
        radios[i].onclick = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    let citySelect = document.getElementById('city-select');
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    let cityValue = 0;
    citySelect.innerHTML = '';
    for(let item in aqiSourceData){
        citySelect.innerHTML += '<option value="' +cityValue + '">' + item + '</option>';
        cityValue++;
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    pageState.nowSelectCity = citySelect.value;
    citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    /*json长度函数*/
    function getJsonLength(jsonData){
        let jsonLength = 0;
        for(let item in jsonData){
            jsonLength++;
        }
        return jsonLength;
    }
    let city =0;
    for(let item in aqiSourceData){
        chartData[city] = {};
        chartData[city].day = [];
        chartData[city].week = [];
        chartData[city].month = [];
        let index = 0;  //json长度计数
        //开始处理
        for(let i in aqiSourceData[item]){
            index++;    //json长度计数
            chartData[city].day.push(aqiSourceData[item][i]);
            let date = new Date(i);
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let week = date.getDay();
            week = week==0? 7:week;     //星期天数字改为7

            let weekdays = 0;       //当前星期天数的计数
            let weekdata = 0;       //当前星期数据储存
            weekdays++;
            weekdata += aqiSourceData[item][i];

            /*当到达星期天或者数据结尾时，计算数据均值，添加数据到数组，然后清空星期天数和星期数据*/
            if(week==7 || index===getJsonLength(aqiSourceData[item])){
                weekdata = weekdata/weekdays;
                chartData[city].week.push(weekdata);
                weekdays = 0;
                weekdata = 0;
            }

            let monthdays = 0;      //当前月份天数的计数
            let monthdata = 0;      //当前月份数据储存
            monthdays++;
            monthdata += aqiSourceData[item][i];

            /*当到达月底或者数据结尾时，计算数据均值，添加数据到数组，然后清空月份天数和月份数据*/
            /*new Date(year,month,0).getDate() 获取的就是当前月份的总天数；new Date(2016,2,0).getDate()===29*/
            if(day==new Date(year,month,0).getDate() || index===getJsonLength(aqiSourceData[item])){
                monthdata = monthdata/monthdays;
                chartData[city].month.push(monthdata);
                monthdays = 0;
                monthdata = 0;
            }
        }
        city++;
    }
    console.log(chartData)
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();