# uyou-todo-electron

![](https://img.shields.io/badge/electron-2a2d38?style=for-the-badge&logo=electron)
![](https://img.shields.io/badge/vue-33475b?style=for-the-badge&logo=vuedotjs)
[![](https://img.shields.io/github/downloads/tonylu110/uyou-todo-electron/total?style=for-the-badge&color=7a695c)](https://github.com/tonylu110/uyou-todo-electron/releases)
![](https://img.shields.io/github/license/tonylu110/uyou-todo-electron?style=for-the-badge)
![](https://img.shields.io/github/stars/tonylu110/uyou-todo-electron?style=for-the-badge&color=e6a400)
![](https://img.shields.io/github/issues/tonylu110/uyou-todo-electron?style=for-the-badge&color=5985eb)

English | [中文简体](https://github.com/tonylu110/uyou-todo-electron/blob/main/README/zh_cn.md)

## Run and build

- run in development mode

  ```sh
  # If you didn't install `@antfu/ni` yet, I highly recommend you to install it.
  ni
  nr electron:servewin # run in Windows
  nr electron:servemac # run in macOS
  nr electron:servelinux # run in Linux

  # When running for the first time, you need to run
  pnpm vite build
  ```

- build
  ```sh
  # If you didn't install `@antfu/ni` yet, I highly recommend you to install it.
  ni
  nr electron:buildwin # build for Windows
  nr electron:buildwinarm # build for Windows arm64
  nr electron:buildmac # build for macOS
  nr electron:buildlinux # build for Linux
  ```

## Preview

![](./demo/demo1.png)
![](./demo/demo2.png)
![](./demo/demo6.png)
![](./demo/demo3.png)
![](./demo/demo4.png)
![](./demo/demo5.png)

## Font

If you want to use the built-in fonts before 2.1.3, you can click the link below

[Smartisan T Regular](https://github.com/tonylu110/uyou-todo-electron/releases/download/2.1.3/Smartisan_Compact-Regular.ttf) |
[Smartisan T Bold](https://github.com/tonylu110/uyou-todo-electron/releases/download/2.1.3/Smartisan_Compact-Bold.ttf)

## Sponsor

<p float="left">
  <img src="./public/images/donate/paypal.png" width="300" />
  <img src="./public/images/donate/afd.png" width="300" />
<p/>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tonylu110/uyou-todo-electron&type=Date)](https://star-history.com/#tonylu110/uyou-todo-electron&Date)
