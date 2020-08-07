<template>
  <div>
    <el-button type="info" round @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // 清空sessionStorage
      window.sessionStorage.clear()
      // 通过编程式导航跳转到登陆页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>>
