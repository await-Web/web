/**
 * changeAlertStyle
 * @param data
 */
// window.alert = alert("mj");
//type: 1:取消订单 2：确认收货 3：买断
function changeAlert(data) {

    var a = document.createElement("div"),

        p = document.createElement("p"),

        btn = document.createElement("div"),

        textNode = document.createTextNode(data ? data : ""),

        span1 = document.createElement("span"),

        span2 = document.createElement("span");

        // span1.innerText = "确认";

        // span2.innerText = "取消";

// 控制样式

    css(a, {
        "position": "fixed",
        "left": "0",
        "right": "0",
        "top": "27%",
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
    })

    css(p, {
        "color": "#2a8ffe",
        "font-size": "16px",
        "width": "100%",
        "height": "70px",
        "line-height": "120px",
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
    var opacity = 1;
    var colse = setInterval(function () {
        opacity -= 0.01
        opacity = opacity.toFixed(2);
        if (opacity < 0.10) {
            clearInterval(colse);
            a.parentNode.removeChild(a);
            $(".zed").css("display","none");
            // window.history.back(-1);
            console.log("定時器已清除")
        } else {
            $(".zed").css("display","block");
            a.style.opacity = opacity
        }
       // console.log(opacity);

    }, 50)

    // 确定绑定点击事件删除标签
    // span1.onclick = function () {
    //     if(type == 1){//取消
    //         delAwaitPay(orderno,that);
    //     }else if(type == 2 || type == 3){//确认收货
    //         confirmReceipt(orderno,that);
    //     }else if(type == 4){//买断
    //         getPay(orderno,that);
    //     }
    //     a.parentNode.removeChild(a);
    //     console.log(orderno);
    //     // console.log(span1.innerText)
    //
    // }
    // span2.onclick = function () {
    //     a.parentNode.removeChild(a);
    //     // console.log(span2.innerText)
    // }

}

function css(targetObj, cssObj) {

    var str = targetObj.getAttribute("style") ? targetObj.getAttribute("style") : "";

    for (var i in cssObj) {

        str += i + ":" + cssObj[i] + ";";

    }

    targetObj.style.cssText = str;

}

