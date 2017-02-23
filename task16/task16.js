/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
// aqiData = {
//     "北京": 90,
//     "上海": 40
// };
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var aqiCityInput = document.getElementById('aqi-city-input');
    var aqiValueInput = document.getElementById('aqi-value-input');
    var re = {
        reCity:/^[a-zA-Z]+$|^[\u4e00-\u9fa5]+$/,    //匹配英文字母或者汉字
        reValue:/^[1-9]\d+$/,                       //匹配数字
        reBlank:/^\s+|\s+$/                         //去前后空格
    };

    aqiCityInput.value = aqiCityInput.value.replace(re.reBlank,'');
    aqiCityInput.value = aqiCityInput.value.replace(re.reBlank,'');

    if (!re.reCity.test(aqiCityInput.value)) {
        alert('请输入正确的城市名称：城市名必须为中文或英文字符');
        aqiCityInput.value = '';
        aqiCityInput.focus();           //输入错误就清空输入,并获得焦点
    } else if (re.reCity.test(aqiCityInput.value) && !re.reValue.test(aqiValueInput.value)) {
        alert('请输入正确的数值：空气质量指数必须为整数');
        aqiValueInput.value = '';
        aqiValueInput.focus();           //输入错误就清空输入,并获得焦点
    }else if(re.reCity.test(aqiCityInput.value) && re.reValue.test(aqiValueInput.value)){
        aqiData[aqiCityInput.value] = aqiValueInput.value;
    }
    console.log(aqiData)
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById('aqi-table');
    // var tHead = document.createElement('thead');
    // var hTr = document.createElement('tr');
    // var array = ['城市','空气质量','操作'];
    // for(let i in array){
    //     var oTh = document.createElement('th');
    //     oTh.innerHTML = array[i];
    //     hTr.appendChild(oTh);
    //     tHead.appendChild(hTr);
    // }
    // aqiTable.appendChild(tHead);

    for(let i in aqiData){
        var oTr = document.createElement('tr');
        var oTd = document.createElement('td');

        oTd.innerHTML = i;
        oTr.appendChild(oTd);

        oTd = document.createElement('td');
        oTd.innerHTML = aqiData[i];
        oTr.appendChild(oTd);

        oTd = document.createElement('td');
        var oA = document.createElement('a');
        oA.innerHTML = "操作";
        oA.href = "javascript:;";
        oA.onclick = function () {
            aqiTable.removeChild(this.parentNode.parentNode);
        };
        oTd.appendChild(oA);
        oTr.appendChild(oTd);

        aqiTable.appendChild(oTr);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.

    renderAqiList();
}

function init() {
    var addBtn = document.getElementById('add-btn');
    addBtn.onclick = addBtnHandle;
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();