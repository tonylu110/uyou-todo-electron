import { isMac } from '../../src/util/os'
import CloseButton from '../../src/components/CloseButton/CloseButton.vine'
import { versionText } from '../../src/util/appVersionCode'
import vitePackage from 'vite/package.json'
import vuePackage from 'vue/package.json'

function About() {
  // eslint-disable-next-line node/prefer-global/process
  const electronVersion = process.versions.electron

  const viteVersion = vitePackage.version
  const vueVersion = vuePackage.version

  return vine`
    <div
      drag bg-transparent flex="~ col"
      justify-center items-center 
      w-screen h-screen
    >
      <img 
        w-130px h-130px
        m="b-30px t-20px"
        src="../../logo.png"
        alt="logo"
      />
      <span c="#555 dark:#bbb" font-bold text-24px>
        uyou ToDo v{{ versionText }}
      </span>
      <span
        block mt-15px text-14px
        c="#555 dark:#bbb" font-bold
      >
        Copyright (c) 2022-{{ new Date().getFullYear() }}, Anthony Lu
      </span>
      <div
        flex justify-center items-center
        mt-8 text-12px mb-4
        c="#555/50 dark:#bbb/50" font-bold
      >
        <span>Power By</span>
        <div flex="~">
          <div flex items-center>
            <div p-4px bg="#2c2e3a" rounded-full mx-2 mr-1>
              <div i-logos:electron text-3 block></div>
            </div>
            <span>v{{ electronVersion }} </span>
          </div>
          <div flex items-center>
            <div i-logos:vitejs text-5 block mx-2 mr-1 mt--1></div>
            <span>v{{ viteVersion }} </span>
          </div>
          <div flex items-center>
            <div i-logos:vue text="4.3" block mx-2 mr-1></div>
            <span>v{{ vueVersion }} </span>
          </div>
        </div>
      </div>
      <CloseButton v-if="!isMac()" windowName="about" />
    </div>
  `
}

export default About
