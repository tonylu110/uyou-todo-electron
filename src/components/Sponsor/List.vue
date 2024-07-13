<script setup lang="ts">
import { ElPagination } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import ItemSpace from '../ItemBox/ItemSpace/ItemSpace.vine'
import ItemText from '../ItemBox/ItemText/ItemText.vine'

const { t } = useI18n()

const list = ref<{
  _id: string
  name: string
  money: string
}[]>([])
const listLength = ref(0)

onMounted(() => {
  fetch('https://api.todo.uyou.org.cn/getsponsors?page=1').then((res) => {
    return res.json()
  }).then((res) => {
    list.value = res.data
  })
  fetch('https://api.todo.uyou.org.cn/getsponsorlenght').then((res) => {
    return res.json()
  }).then((res) => {
    listLength.value = res
  })
})

function chagePage(page: number) {
  fetch(`https://api.todo.uyou.org.cn/getsponsors?page=${page}`).then((res) => {
    return res.json()
  }).then((res) => {
    list.value = res.data
  })
}
</script>

<template>
  <ItemText>{{ t('sponsor.thanks') }}</ItemText>
  <ItemSpace flex-gap-10px>
    <div
      v-for="item in list"
      :key="item._id"
      bg="black/5" w="[calc(100%-20px)]"
      flex items-center justify-between rounded-5px p-10px
    >
      <span>{{ item.name }}</span>
      <span>{{ item.money }}</span>
    </div>
    <ElPagination background layout="prev, pager, next" :total="listLength" @current-change="chagePage" />
  </ItemSpace>
</template>
