var data = [
    {
        "name":"零零一",
        "语文":65,
        "数学":89,
        "英语":70,
        "总分":-1
    },
    {
        "name":"零零二",
        "语文":88,
        "数学":65,
        "英语":74,
        "总分":-1
    },
    {
        "name":"零零三",
        "语文":90,
        "数学":93,
        "英语":99,
        "总分":-1
    },
    {
        "name":"零零四",
        "语文":64,
        "数学":65,
        "英语":61,
        "总分":-1
    },
    {
        "name":"零零五",
        "语文":54,
        "数学":59,
        "英语":32,
        "总分":-1
    },
    {
        "name":"零零六",
        "语文":76,
        "数学":72,
        "英语":74,
        "总分":-1
    }
];
for(var n in data){
    var zong = 0;
    for(var m in data[n]){
        if(Number(data[n][m])>=0){
            zong += Number(data[n][m]);
        }
        if(m==="总分"){
            data[n][m] = zong;
        }
    }
}
var oTbody = document.getElementsByTagName('tbody')[0];
for(var i in data){
    var oTr = document.createElement('tr');
    for(var j in data[i]){
        var oTd = document.createElement('td');
        oTd.innerHTML = data[i][j];
        oTr.appendChild(oTd);
    }
    oTbody.appendChild(oTr);
}