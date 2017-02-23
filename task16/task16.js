/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var aqiCityInput = document.getElementById('aqi-city-input');
    var aqiValueInput = document.getElementById('aqi-value-input');
    var re = {
        reCity:/^[a-zA-Z]+$|^[\u4e00-\u9fa5]+$/,    //匹配英文字母或者汉字
        reValue:/^[1-9]\d*$/,                       //匹配数字
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
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById('aqi-table');
    var content = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for(let i in aqiData){
        var aString = '<button>操作</button>';
        content += '<tr><td>' + i + '</td><td>' + aqiData[i] + '</td><td>' + aString + '</td></tr>';
    }
    aqiTable.innerHTML ='';
    aqiTable.innerHTML = content;
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
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById('add-btn');
    var btns = '';
    addBtn.onclick = addBtnHandle;
    document.onclick = function () {
        btns = document.getElementsByTagName('button');
        for( let i=1, len=btns.length; i<len; i++){
            btns[i].onclick = function () {
                var city = this.parentNode.parentNode.children[0].innerHTML;
                delBtnHandle(city);
            }
        }
    };

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数


}

init();