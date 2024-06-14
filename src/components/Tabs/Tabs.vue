<script setup lang="ts">
defineProps<{
  labWidth: string
  labLeft: string
}>()
</script>

<template>
  <div bg="#ddd" shadow="[inset_0_1px_2px_0_rgba(0,0,0,0.05)]" fixed top-3 z-1 rounded-full p-4px no-drag>
    <nav relative flex>
      <slot name="header" />
      <slot />
      <slot name="footer" />
      <div
        :style="{
          width: labWidth,
          left: labLeft,
        }" absolute bottom-0 h-full rounded-full bg-white shadow-sm transition="all 300"
      />
    </nav>
  </div>
</template>
