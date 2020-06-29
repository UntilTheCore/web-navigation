$('.searchForm').on('submit', e => {
    let val = $('.search input').val().trim()
    window.open(`https://baidu.com/s?wd=${val}`)
    return false
})

$('.addBtn').click(e => {
    let str = prompt('请输入要添加的地址!')
    $('<li><div class="div-url"><svg class="icon-close">' +
        '<use xlink:href="#iconclose1"></use>' +
        '</svg></div><span></span></li>').insertBefore('.addBtn')
})

$('.list > ul').on('click', '.icon-close', e => {
    let parent = $(e.target).parents('li').hide('slow')
    console.log(parent)
    e.stopPropagation()
})

$('.list > ul').on('click','.div-url',e => {
    console.log(123)
})



