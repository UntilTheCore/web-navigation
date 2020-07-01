> 项目预览

点击 ====> [前端导航](https://untilthecore.github.io/webNavigation/dist/index.html)

> 如何开发

```bash
# 安装环境
yarn global add parcel

# 运行
parcel src/index.html

# 构建
yarn build
```

> 使用方式 - 移动端

- 长按链接 logo 约 0.5s 出现可删除按钮，点击后可删除当前链接；
- 点击 + 可以添加新的链接；
- 点击空白处可隐藏删除按钮；
- 在搜索框输入内容后，点击键盘上的“前往/开始”即可跳转链接，搜索引擎默认百度（暂不可更换）；
- 移动端具有自适应布局，在不同长宽的移动设备上保持显示效果基本一致；

> 使用方式 - PC端

- 搜索框输入内容后，使用“回车”或鼠标点击“搜索按钮”即可开始搜索。搜索引擎默认百度搜索；
- 和移动端操作逻辑类似，鼠标左键点击并长按约 0.5s 后松开按钮可显示删除按钮，点击后可删除此链接；
- 隐藏删除按钮需在链接的空白区域点击鼠标右键；

> 开发计划

1. 优化输入体验，现在使用的 prompt 并不友好；
2. 链接可修改；
3. 增加更多交互功能，比如更换背景图、链接logo更换顺序。
4. 。。。

> 须知

- 站点logo是通过链接直接加载的，为了保证正确获取，输入的链接须为 "xxx.com" 或 "https://xxx.com"。如果无法获取
将以站点的首字母作为logo显示。
- 输入的数据使用 localStorage 进行本地存储，可长久使用。
- 很多国产手机浏览器自身的功能会比较影响使用体验，比如强大的夸克，总能长按后弹出菜单（提取图片，提取文字）。所以开发和使用都推荐 “via浏览器“。