// //designWidth:设计稿的实际宽度值，需要根据实际设置
// //maxWidth:制作稿的最大宽度值，需要根据实际设置
// //这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
(function (designWidth, maxWidth) {
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 750;
        width > maxWidth && (width = maxWidth);
        var rem = width * 100 / designWidth;
        console.log(rem);
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function () {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "12px";
    } else {
        doc.addEventListener("DOMContentLoaded", function (e) {
            doc.body.style.fontSize = "12px";
        }, false);
    }
})(750, 750);


// !function(win) {
//     function resize() {
//         var domWidth = domEle.getBoundingClientRect().width;
//         if(domWidth / v > 750){
//             domWidth = 750 * v;
//         }
//         console.log("win.rem",domWidth)
//         win.rem = domWidth / 16;
//         domEle.style.fontSize = win.rem + "px";
//         console.log(win.rem)
//     }
//     var v, initial_scale, timeCode, dom = win.document, domEle = dom.documentElement, viewport = dom.querySelector('meta[name="viewport"]'), flexible = dom.querySelector('meta[name="flexible"]');
//     if (viewport) {
//         //viewport：<meta name="viewport"content="initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5,user-scalable=no,minimal-ui"/>
//         var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
//         if(o){
//             initial_scale = parseFloat(o[2]);
//             v = parseInt(1 / initial_scale);
//         }
//     } else {
//         if (flexible) {
//             var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
//             if(o){
//                 v = parseFloat(o[2]);
//                 initial_scale = parseFloat((1 / v).toFixed(2))
//             }
//         }
//     }
//     if (!v && !initial_scale) {
//         var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
//         v = win.devicePixelRatio;
//         v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, initial_scale = 1 / v
//     }
//     //没有viewport标签的情况下
//     if (domEle.setAttribute("data-dpr", v), !viewport) {
//         if (viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
//             domEle.firstElementChild.appendChild(viewport)
//         } else {
//             var m = dom.createElement("div");
//             m.appendChild(viewport), dom.write(m.innerHTML)
//         }
//     }
//     win.dpr = v;
//     win.addEventListener("resize", function() {
//         clearTimeout(timeCode), timeCode = setTimeout(resize, 300)
//     }, false);
//     win.addEventListener("pageshow", function(b) {
//         b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300))
//     }, false);
//     /* 个人觉得没必要完成后就把body的字体设置为12
//     "complete" === dom.readyState ? dom.body.style.fontSize = 12 * v + "px" : dom.addEventListener("DOMContentLoaded", function() {
//      //dom.body.style.fontSize = 12 * v + "px"
//     }, false);
//     */
//     resize();
// }(window);
