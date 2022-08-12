<template>
  <div class="item-box">
    <div class="box-radius">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-box {
  margin-bottom: 10px;
  box-shadow: 0 2px 10px #00000030;
  border-radius: 7px;
  
  .box-radius {
    border-radius: 7px;
    overflow: hidden;

    &:deep(.item) {
      box-shadow: none;
      margin-bottom: 0px;
      border-radius: 0;
      border-bottom: 1px solid #00000015;

      &:last-child {
        border: 0px;
      }
    }
  }
}
</style>