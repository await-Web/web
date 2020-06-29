/**
 * changeAlertStyle
 * @param data
 */
// window.alert = alert("mj");
//type: 1:取消订单 2：确认收货 3：买断
function changeAlert(data, orderno, that, type) {
    var res = res;
    console.log("changeAlert：", orderno, "  type:", type);
    var a = document.createElement("div"),

        p = document.createElement("p"),

        btn = document.createElement("div"),

        textNode = document.createTextNode(data ? data : ""),

        span1 = document.createElement("span"),

        span2 = document.createElement("span");

    span1.innerText = "确认";

    span2.innerText = "取消";

// 控制样式

    css(a, {
        "position": "fixed",
        "left": "0",
        "right": "0",
        "top": "40%",
        "width": "245px",
        "margin": "0 auto",
        "background-color": "rgba(255,254,254,0.9)",
        "font-size": "12px",
        "text-align": "center",
        "height": "120px",
        "-webkit-box-shadow": "rgb(240, 240, 240) 0px 0px 46px",
        "border-radius": "1em 1em 1em 1em",
        "z-index": "99999"

    });


    css(btn, {
        "color": "#2a8ffe",
        "font-size": "15px",
        "width": "98%",
        "height": "45px",
        "border-top": "1px solid #f9f9f9",
        "position": "absolute",
        "bottom": "3px",
        "line-height": "45px",
        "left": "50%",
        "transform": "translate(-50%,0)",
        "background-color": "rgba(255,254,254,.3)",

    });

    if (type == 41 || type == 44 || type == 47) {//买断
        css(span1, {
            "width": "50%",
            "display": "inline-block",
            "text-align": "center",
            "color": "#2a8ffe"
        })

        css(span2, {
            "width": "50%",
            "display": "inline-block",
            "text-align": "center",
            "color": "#666"
        })
    }else{
        css(span1, {
            "width": "50%",
            "display": "inline-block",
            "text-align": "center",
            "color": "#666"

        })

        css(span2, {
            "width": "50%",
            "display": "inline-block",
            "text-align": "center",
            "color": "#2a8ffe"
        })
    }


    css(p, {
        "color": "#2a8ffe",
        "font-size": "16px",
        "width": "100%",
        "height": "70px",
        "line-height": "82px",
        "text-align": "center",
    });

    // css(btn, {
    //
    //     "background" : "#ffffff",
    //
    // });

// 内部结构套入

    p.appendChild(textNode);

    btn.appendChild(span1);

    btn.appendChild(span2);

    a.appendChild(p);

    a.appendChild(btn);

// 整体显示到页面内
    document.getElementsByTagName("body")[0].appendChild(a);

    //设置弹窗过渡//定时器关闭弹窗
    // var opacity = 1;
    // var colse = setInterval(function () {
    //     opacity -= 0.01
    //     opacity = opacity.toFixed(2);
    //     if (opacity < 0.10) {
    //         clearInterval(colse);
    //         a.parentNode.removeChild(a);
    //         console.log("定時器已清除")
    //     } else {
    //         a.style.opacity = opacity
    //     }
    //     console.log(opacity)
    // }, 150)

    // 确定绑定点击事件删除标签
    span1.onclick = function () {
        res = false;
        /*立刻删除弹窗*/
        a.parentNode.removeChild(a);
        $(".zed").css("display", "none")
        console.log(orderno);
        /*500毫秒后跳转*/
        var stopTimeOut = setTimeout(function () {
            jub_page();
            clearTimeout(stopTimeOut)
        }, 500);
    };

    /*每个状态的跳转*/
    function jub_page() {
        /*订单详情页*/
        if (type == 44) {
            getPay3(orderno, that);
        } else if (type == 45) {

        } else if (type == 46) {
            applyOutRent(orderno, that)
        } else if (type == 47){
            getPay3(orderno, that);
        }
        /*订单页*/
        if (type == 1) {//取消
            delAwaitPay(orderno, that);
        } else if (type == 2 || type == 3) {//确认收货
            confirmReceipt(orderno, that);
        } else if (type == 41) {//买断
            getPay(orderno, that);
        } else if (type == 42) {//退租
            getOutRentOrdernoData(orderno, that);
        } else if (type == 5) {
            getPay2(orderno, that, 5)
        } else if (type == 6){
            getPay2(orderno, that, 6)
        }
    }

    /*点击弹窗的取消按钮*/
    span2.onclick = function () {
        /*删除弹窗*/
        a.parentNode.removeChild(a);
        /*隐藏遮挡层*/
        $(".zed").css("display", "none")
        res = false;
    }
}

function css(targetObj, cssObj) {

    var str = targetObj.getAttribute("style") ? targetObj.getAttribute("style") : "";

    for (var i in cssObj) {

        str += i + ":" + cssObj[i] + ";";

    }

    targetObj.style.cssText = str;

}

