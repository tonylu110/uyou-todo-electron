import { isMac } from '../../src/util/os'
import CloseButton from '../../src/components/CloseButton'
import { versionText } from '../../src/util/appVersionCode'

const About: SetupFC = () => {
  return () => (
    <div
      drag
      bg-transparent
      flex="~ col"
      justify-center
      items-center
      w-screen
      h-screen
    >
      <img
        w-130px
        h-130px
        m="b-30px t-20px"
        src="../../logo.png"
        alt=""
      />
      <span c="#555 dark:#bbb" font-bold text-24px>
        uyou ToDo v
        {versionText}
      </span>
      <span
        block
        mt-15px
        text-14px
        c="#555 dark:#bbb"
        font-bold
      >
        Copyright (c) 2022-
        {new Date().getFullYear()}
        , Anthony Lu
      </span>
      <div
        flex
        justify-center
        items-center
        mt-35px
        text-12px
        c="#555/50 dark:#bbb/50"
        font-bold
      >
        Power By
        <div p-5px bg="#2c2e3a" rounded-full mx-7px>
          <div i-logos:electron text-3 block></div>
        </div>
        Electron v
        {/* eslint-disable-next-line node/prefer-global/process */}
        {process.versions.electron}
      </div>
      {/* eslint-disable-next-line ts/ban-ts-comment */}
      {/* @ts-expect-error */}
      {!isMac() ? <CloseButton windowName="about" /> : null}
    </div>
  )
}

export default About
