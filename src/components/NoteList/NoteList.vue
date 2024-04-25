<script setup lang="ts">
import NoteBox from './NoteBox/NoteBox.vue'
</script>

<template>
  <div
    w-75vw no-drag col-gap-20px
    col-count="1 sm:2 md:3 lg:4 xl:5"
  >
    <NoteBox h-400px title="400-1" />
    <NoteBox h-300px title="300-2" />
    <NoteBox h-500px title="500-3" />
    <NoteBox h-200px title="200-4" />
    <NoteBox h-600px title="600-5" />
    <NoteBox h-500px title="500-6" />
    <NoteBox h-500px title="500-7" />
  </div>
</template>
