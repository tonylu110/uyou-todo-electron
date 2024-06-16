<script setup lang="ts">
defineProps<{
  labWidth: string
  labLeft: string
}>()

const menuBlur = localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null
</script>

<template>
  <div
    :bg="menuBlur ? 'primary-sidebar dark:primary-sidebard' : 'primary-sidebar/50 dark:primary-sidebard/50'"
    shadow="[inset_0_1px_2px_0_rgba(0,0,0,0.05)]" border="1px solid primary-a/15"
    top="2.5" fixed z-1 rounded-full p-4px backdrop-blur-xl no-drag
  >
    <nav relative flex>
      <slot name="header" />
      <slot />
      <slot name="footer" />
      <div
        :style="{
          width: labWidth,
          left: labLeft,
        }"
        absolute bottom-0 h-full rounded-full
        bg="white dark:#333" shadow-sm transition="all duration-250"
      />
    </nav>
  </div>
</template>
