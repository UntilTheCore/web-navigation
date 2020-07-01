$('.searchForm').on('submit', e => {
    return startSearch()
})
$('.icon-search').on('click',e => {
   startSearch()
})

function startSearch() {
    let val = $('.search input').val().trim()
    if('' === val){
        return false
    }
    window.open(`https://baidu.com/s?wd=${val}`)
    return false
}

// 获取站点 logo 地址
$('.addBtn').click(e => {
    let src = prompt('请输入要添加的地址!')
    let spanStr
    let urlObject = getLocalStorage()
    urlObject = urlObject === null ? {} : urlObject
    if(src){
        if(checkChinese(src)) return alert('请输入正确的域名！')
        src = src.trim().toLowerCase()
        if(!src.startsWith('https://')){
            src = 'https://' + src
        }
        spanStr = src.slice(8).split('.')
        spanStr = spanStr.length > 2 ? spanStr[1] : spanStr[0]
        // 是否有相同的链接存在
        for(key in urlObject){
           if(compare(urlObject[key],src)){
               alert('链接已存在')
               return
           }
        }
        urlObject[spanStr] = src
        setLocalStorage(urlObject)
        createElement(src,spanStr)
    }
})

// 中文检测
function checkChinese(val){
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(val)){
        return true
    }else {
        return false
    }
}

// 1、隐藏 li
// 2、删除 localStorage 中对应的键
$('.list > ul').on('click', '.icon-close', e => {
    let isTouchDevice = 'ontouchstart' in document.documentElement
    if(isTouchDevice){
        $(e.target).parents('li').hide('slow')
    }else {
        $(e.target).parents('li').fadeOut('slow')
    }

    // 后续更新span的值以用户输入的为主，所以取 background-image 的值来判断
    let value = $(e.target).parents('div').children('.bgc-div').css('backgroundImage')
    // 直接获取的值为 url("xxxx") 的字符串,要从 " 开始分割
    value = value.split("\"")[1].split("\"")[0];
    value = value.slice(0,-12)
    let key = findKey(value,compare)
    let urls = getLocalStorage()
    key && delete urls[key] && setLocalStorage(urls)
    e.stopPropagation()
})

let compare = (a,b) => a === b
function findKey(value,compare) {
    let urls = getLocalStorage()
    for(key in urls){
        if(compare(urls[key],value)){
            return key
        }
    }
}

function setLocalStorage(value){
   localStorage.setItem(('urls'),JSON.stringify(value))
}

function getLocalStorage(){
    return JSON.parse(localStorage.getItem('urls'))
}

let isCloseBtnShow = false
let startTime
let endTime
let timeStep = 0

// 移动端长按显示删除按钮
$('.list > ul').on({
    'touchstart':function(e) {
        startTime = new Date()
    },
    'touchend':function() {
        endTime = new Date()
        let touchTime = endTime - startTime
        if(touchTime > 400){
            showCloseBtn()
        }
    }
})

// PC 端长按显示删除按钮
$('.list > ul').on('mousedown','li',
    e => {
        if(0 === e.button){
            startTime = new Date()
        }
    }
)

$('.list > ul').on('mouseup','li',e => {
    if(0 === e.button) {
        endTime = new Date()
        timeStep = endTime - startTime
        if(timeStep > 500) {
            showCloseBtn()
        }
    }
})

// 点击任意地方隐藏删除按钮
$('.container').on('mousedown',e => {
    if(2 === e.button){
        if(isCloseBtnShow) {
            $('.list .icon-close').css({'display' : 'none'})
            e.stopPropagation()
            isCloseBtnShow = false
        }
    }
})

// 响应点击跳转
$('.list > ul').on('click','.li-url',e => {
    if(timeStep < 100) {
        let url = $(e.target).parents('.li-url').data('url')
        window.open(url)
    }
})

// 阻止长按出现菜单
$('ul').on('contextmenu',e => {
    e.preventDefault()
})


function showCloseBtn(){
    $('.list .icon-close').css({'display': 'block'})
    isCloseBtnShow = true
}

$(document).ready(function() {
    let urls = getLocalStorage()
    for(key in urls){
        createElement(urls[key],key)
    }
})


// 创建节点
// 为避免使用 img 在安卓浏览器长按出现图片下载菜单，使用背景图
function createElement(imgSrc,spanStr) {
    let image = new Image()
    image.src = imgSrc + "/favicon.ico"

    $(`<li class="li-url" data-url=${imgSrc}>
              <div>
                 <h1>${spanStr.slice(0,1).toUpperCase()}</h1>
                 <div class="bgc-div" style="background-image: url('${imgSrc + "/favicon.ico"}')" ></div>
                 <svg class="icon-close"> 
                    <title>删除此链接</title>
                    <use xlink:href="#iconclose1"></use> 
                </svg>
              </div>
              <span>${spanStr}</span>
           </li>`).insertBefore('.addBtn')
    $(image).on('load',e => {
        $('ul > li').each((index,element) => {
            let el = $(element)
            if(el.data('url') === imgSrc){
                el.find('h1').css({'display' : 'none'})
                el.find('.bgc-div').css({'display' : 'block'})
            }
        })
    })

}