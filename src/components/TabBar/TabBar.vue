<template>
  <div class="title-bar">
    <img v-if="leftImgShow" class="left-img" :src="leftImg" alt="" @click="() => emits('leftClick')">
    <span>{{ title }}</span>
    <img v-if="rightImgShow" class="right-img" src="/images/plus.png" alt="" @click="() => emits('rightClick')" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    default: 'uyou ToDo',
    type: String
  },
  leftImgShow: {
    default: true,
    type: Boolean
  },
  rightImgShow: {
    default: true,
    type: Boolean
  },
  leftImg: {
    default: './images/setting.png',
    tyoe: String
  }
})

const emits = defineEmits<{
  (e: 'rightClick'): void,
  (e: 'leftClick'): void
}>()
</script>

<style lang="scss" scoped>
.title-bar {
  position: relative;
  height: 55px;
  width: 100%;
  background-color: #7a695c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 5px #594b4270;
  z-index: 10;

  span {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  img {
    position: absolute;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &.left-img {
      left: 10px;
      width: 22px;
      height: 22px;
      padding: 4px;
    }

    &.right-img {
      right: 10px;
    }

    &:hover {
      background-color: #00000010;
    }

    &:active {
      background-color: #00000020;
    }
  }
}
</style>