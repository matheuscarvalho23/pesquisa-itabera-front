<template>
  <div class="footer">
    <slot name="footer-actions" />
  </div>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
