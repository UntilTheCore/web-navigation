// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Focm":[function(require,module,exports) {
$('.searchForm').on('submit', function (e) {
  return startSearch();
});
$('.icon-search').on('click', function (e) {
  startSearch();
});

function startSearch() {
  var val = $('.search input').val().trim();

  if ('' === val) {
    return false;
  }

  window.open("https://baidu.com/s?wd=".concat(val));
  return false;
} // 获取站点 logo 地址


$('.addBtn').click(function (e) {
  var src = prompt('请输入要添加的地址!');
  var spanStr;
  var urlObject = getLocalStorage();
  urlObject = urlObject === null ? {} : urlObject;

  if (src) {
    if (checkChinese(src)) return alert('请输入正确的域名！');
    src = src.trim().toLowerCase();

    if (!src.startsWith('https://')) {
      src = 'https://' + src;
    }

    spanStr = src.slice(8).split('.');
    spanStr = spanStr.length > 2 ? spanStr[1] : spanStr[0]; // 是否有相同的链接存在

    for (key in urlObject) {
      if (compare(urlObject[key], src)) {
        alert('链接已存在');
        return;
      }
    }

    urlObject[spanStr] = src;
    setLocalStorage(urlObject);
    createElement(src, spanStr);
  }
}); // 中文检测

function checkChinese(val) {
  var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");

  if (reg.test(val)) {
    return true;
  } else {
    return false;
  }
} // 1、隐藏 li
// 2、删除 localStorage 中对应的键


$('.list > ul').on('click', '.icon-close', function (e) {
  var isTouchDevice = ('ontouchstart' in document.documentElement);

  if (isTouchDevice) {
    $(e.target).parents('li').hide('slow');
  } else {
    $(e.target).parents('li').fadeOut('slow');
  } // 后续更新span的值以用户输入的为主，所以取 background-image 的值来判断


  var value = $(e.target).parents('div').children('.bgc-div').css('backgroundImage'); // 直接获取的值为 url("xxxx") 的字符串,要从 " 开始分割

  value = value.split("\"")[1].split("\"")[0];
  value = value.slice(0, -12);
  var key = findKey(value, compare);
  var urls = getLocalStorage();
  key && delete urls[key] && setLocalStorage(urls);
  e.stopPropagation();
});

var compare = function compare(a, b) {
  return a === b;
};

function findKey(value, compare) {
  var urls = getLocalStorage();

  for (key in urls) {
    if (compare(urls[key], value)) {
      return key;
    }
  }
}

function setLocalStorage(value) {
  localStorage.setItem('urls', JSON.stringify(value));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('urls'));
}

var isCloseBtnShow = false;
var startTime;
var endTime;
var timeStep = 0; // 移动端长按显示删除按钮

$('.list > ul').on({
  'touchstart': function touchstart(e) {
    startTime = new Date();
  },
  'touchend': function touchend() {
    endTime = new Date();
    var touchTime = endTime - startTime;

    if (touchTime > 400) {
      showCloseBtn();
    }
  }
}); // PC 端长按显示删除按钮

$('.list > ul').on('mousedown', 'li', function (e) {
  if (0 === e.button) {
    startTime = new Date();
  }
});
$('.list > ul').on('mouseup', 'li', function (e) {
  if (0 === e.button) {
    endTime = new Date();
    timeStep = endTime - startTime;

    if (timeStep > 500) {
      showCloseBtn();
    }
  }
}); // 点击任意地方隐藏删除按钮
// $('.container').on('mousedown',e => {
//     if(2 === e.button){
//         if(isCloseBtnShow) {
//             $('.list .icon-close').css({'display' : 'none'})
//             e.stopPropagation()
//             isCloseBtnShow = false
//         }
//     }
// })

$('.container').on({
  'mousedown': function mousedown(e) {
    if (2 === e.button) {
      hideCloseBtn(e);
    }
  },
  'touchstart': function touchstart(e) {
    hideCloseBtn(e);
  }
});

function hideCloseBtn(event) {
  if (isCloseBtnShow) {
    $('.list .icon-close').css({
      'display': 'none'
    });
    event.stopPropagation();
    isCloseBtnShow = false;
  }
} // 响应点击跳转


$('.list > ul').on('click', '.li-url', function (e) {
  if (timeStep < 100) {
    var url = $(e.target).parents('.li-url').data('url');
    window.open(url);
  }
}); // 阻止长按出现菜单

$('ul').on('contextmenu', function (e) {
  e.preventDefault();
});

function showCloseBtn() {
  $('.list .icon-close').css({
    'display': 'block'
  });
  isCloseBtnShow = true;
}

$(document).ready(function () {
  var urls = getLocalStorage();

  for (key in urls) {
    createElement(urls[key], key);
  }
}); // 创建节点
// 为避免使用 img 在安卓浏览器长按出现图片下载菜单，使用背景图

function createElement(imgSrc, spanStr) {
  var image = new Image();
  image.src = imgSrc + "/favicon.ico";
  $("<li class=\"li-url\" data-url=".concat(imgSrc, ">\n              <div>\n                 <h1>").concat(spanStr.slice(0, 1).toUpperCase(), "</h1>\n                 <div class=\"bgc-div\" style=\"background-image: url('").concat(imgSrc + "/favicon.ico", "')\" ></div>\n                 <svg class=\"icon-close\"> \n                    <title>\u5220\u9664\u6B64\u94FE\u63A5</title>\n                    <use xlink:href=\"#iconclose1\"></use> \n                </svg>\n              </div>\n              <span>").concat(spanStr, "</span>\n           </li>")).insertBefore('.addBtn');
  $(image).on('load', function (e) {
    $('ul > li').each(function (index, element) {
      var el = $(element);

      if (el.data('url') === imgSrc) {
        el.find('h1').css({
          'display': 'none'
        });
        el.find('.bgc-div').css({
          'display': 'block'
        });
      }
    });
  });
}
},{}]},{},["Focm"], null)
//# sourceMappingURL=src.7fff65de.js.map