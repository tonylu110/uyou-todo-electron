<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { shell } from 'electron'
import { ElPagination } from 'element-plus'
import TabBar from '../../components/TabBar/TabBar.vue'
import router from '../../router'
import SettingList from '../../components/SettingList'
import emitter from '../../util/bus'
import ItemSpace from '../../components/ItemBox/ItemSpace'
import Item from '../../components/ItemBox/Item/Item.vue'
import ItemText from '../../components/ItemBox/ItemText'

const { t } = useI18n()

const menuShort = ref(window.innerWidth < 750)
emitter.on('menuClose', (data) => {
  menuShort.value = data as boolean
})

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
  <TabBar
    :title="t('otherList.toDonate')"
    :right-img-show="false"
    :left-img-show="true"
    bg-color="light"
    @left-click="router.back()"
  />
  <SettingList>
    <ItemSpace flex="~ wrap" items-center justify-center>
      <img
        w-250px p-10px
        src="/images/donate/alipay.png"
        alt=""
      >
      <img
        w-250px p-10px
        src="/images/donate/wechatpay.png"
        alt=""
      >
    </ItemSpace>
    <Item :title="t('otherList.aboutSponser')" @item-fun="shell.openExternal('https://github.com/tonylu110/uyou-todo-electron/discussions/34')" />
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
  </SettingList>
</template>
