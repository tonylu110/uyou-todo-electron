/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module 'element-plus/dist/locale/zh-cn.mjs' {
//   const zhCn: any;
//   export default zhCn;
// }

// declare module 'element-plus/dist/locale/en.mjs' {
//   const en: any;
//   export default en;
// }

// declare module 'element-plus/dist/locale/zh-tw.mjs' { 
//   const zhTw: any;
//   export default zhTw;
// }

// declare module 'element-plus/dist/locale/es.mjs' {
//   const es: any;
//   export default es;
// }

// declare module 'element-plus/dist/locale/ja.mjs' {
//   const ja: any;
//   export default ja;
// }