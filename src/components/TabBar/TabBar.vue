<template>
  <div
    class="title-bar"
    :style="{
      borderTopLeftRadius: isRound ? '15px' : '',
      backgroundColor: bgColor === 'light' ? 'white' : '',
      boxShadow: bgColor === 'light' ? '0 5px 10px #00000030' : ''
    }"
  >
    <div v-if="leftImgShow" class="left-img" @click="() => emits('leftClick')" :style="{border: bgColor === 'light' ? '1px solid #00000020' : ''}">
      <span class="material-icons" :style="{fontWeight: leftImg === 'settings' ? 'lighter' : '', color: bgColor === 'light' ? '#555' : ''}">{{ leftImg }}</span>
    </div>
    <span :style="{color: bgColor === 'light' ? '#555' : ''}">{{ title }}</span>
    <div v-if="rightImgShow" class="right-img" @click="() => emits('rightClick')">
      <span class="material-icons">add_circle_outline</span>
    </div>
    <div v-if="syncImgShow && rightImgShow" class="sync-img" @click="sync">
      <span class="material-icons">cloud_sync</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

withDefaults(defineProps<{
  title?: string,
  leftImgShow?: boolean,
  rightImgShow?: boolean,
  leftImg?: string,
  bgColor?: string
}>(), {
  title: 'uyou ToDo',
  leftImgShow: true,
  rightImgShow: true,
  leftImg: 'arrow_back',
  bgColor: 'default'
})

const emits = defineEmits<{
  (e: 'rightClick'): void,
  (e: 'leftClick'): void,
}>()

const syncImgShow = ref(false)

onMounted(() => {
  const uid = localStorage.getItem('uid')
  if (uid !== '' && uid !== null) {
    syncImgShow.value = true
  }
})

const sync = () => {
  if (syncImgShow.value) {
    fetch('https://api.todo.uyou.org.cn/gettodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: localStorage.getItem('uid')
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      localStorage.setItem('ToDo', res.data)
      window.location.reload()
    })
  }
}

const isRound = ref(false)

const isWindows = navigator.userAgent.indexOf('Win')>=0
if (isWindows && (localStorage.getItem('menuBlur') === 'true' || localStorage.getItem('menuBlur') === null) && localStorage.getItem('systemTitle') === 'true' && !(localStorage.getItem('simpleMode') === 'true')) {
  isRound.value = true
}
</script>

<style lang="scss" scoped>
.title-bar {
  position: relative;
  height: 55px;
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

  div {
    position: absolute;
    border-radius: 5px;
    width: 22px;
    height: 22px;
    padding: 4px;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #594b4270;

    & span {
      display: block;
      font-size: 22px;
    }

    &:hover {
      background-color: #00000010;
    }

    &:active {
      background-color: #00000020;
    }

    &.left-img {
      left: 10px;
    }

    &.right-img {
      right: 10px;
    }

    &.sync-img {
      right: 47px;
    }
  }
}
</style>