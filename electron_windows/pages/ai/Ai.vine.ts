import AiContext from '../../../src/components/Ai/AiContext.vine';
import { isMac } from '../../../src/util/os';
import { usePreferredDark } from '@vueuse/core';

function About() {
  const isDark = usePreferredDark()

  return vine`
    <div h-screen :class="isDark ? 'dark' : ''">
      <div v-if="isMac()" h-32px w-full drag></div>
      <AiContext h="![calc(100%-45px)]" :show-btn="false"/>
    </div>
  `
}

export default About
