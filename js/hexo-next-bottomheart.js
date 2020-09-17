var element = document.getElementById("bottomheart");
! function (element, document) {
  function setup() {
    setStyle(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
    setClick();
    animation();
  }

  function animation() {
    for (var e = 0; e < heartlist.length; e++)
        heartlist[e].alpha <= 0 ? (document.body.removeChild(heartlist[e].el), heartlist.splice(e, 1)) 
        : (heartlist[e].y--, heartlist[e].scale += .006, heartlist[e].alpha -= .010, heartlist[e].el.style.cssText = "left:" + heartlist[e].x + "px;top:" + heartlist[e].y + "px;opacity:" + heartlist[e].alpha + ";transform:scale(" + heartlist[e].scale + "," + heartlist[e].scale + ") rotate(45deg);background:" + heartlist[e].color + ";z-index:99999");
    requestAnimationFrame(animation)
  }

  function setClick() {
    var t = "function" == typeof element.onclick && element.onclick;
    element.onclick = function (element) {
      t && t(), createHeart(element)
    }
  }

  function createHeart(element) {
    var heart_div = document.createElement("div");
    heart_div.className = "heart";
    heartlist.push({
      el: heart_div,
      x: element.clientX - 5 - 8*(Math.random() - 0.5),
      y: element.clientY - 3,
      scale: 1,
      alpha: 1,
      color: getColor()
    });
    document.body.appendChild(heart_div)
  }

  function setStyle(stylestring) {
    var heart_style = document.createElement("style");
    heart_style.type = "text/css";
    try {
      heart_style.appendChild(document.createTextNode(stylestring))
    } catch (event) {
      heart_style.styleSheet.cssText = stylestring
    }
    document.getElementsByTagName("head")[0].appendChild(heart_style)
  }

  function getColor() {
    return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
  }

  var heartlist = [];
  element.requestAnimationFrame = function () {
    return element.requestAnimationFrame || element.webkitRequestAnimationFrame || element.mozRequestAnimationFrame || element.oRequestAnimationFrame || element.msRequestAnimationFrame || function (element) {
      setTimeout(element, 1e3 / 60)
    }
  }();
  setup();
}(element, document);
