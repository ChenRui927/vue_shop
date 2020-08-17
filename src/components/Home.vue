<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" round @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧导航栏 -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
          <!-- active-text-color 为激活文本的颜色 -->
          <!-- unique-opened 为只能保持一个子菜单展开，当结果为布尔值时，:unique-opened="true"可简写为 unique-opened -->
          <!-- collapse 为折叠菜单 -->
          <!-- collapse-transition 为折叠动画 -->
          <!-- router 为开启路由模式，启用该模式会在激活导航时以index作为path进行路由跳转 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="iscollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index=" '/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <!-- 二级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>  
        </el-menu>
      </el-aside>
      <!-- 右侧内容区 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
      return {
        // 左侧菜单数据
        menulist: [],
        iconsObj: {
          125: 'iconfont icon-user',
          103: 'iconfont icon-tijikongjian',
          101: 'iconfont icon-shangpin',
          102: 'iconfont icon-danju',
          145: 'iconfont icon-baobiao'
        },
        // 是否折叠菜单,false为不折叠
        iscollapse: false,
        // 被激活的链接地址
        activePath: ''
    }
  },
    // 刚已加载，立即获取左侧菜单，用生命周期函数
  created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      // 清空sessionStorage
      window.sessionStorage.clear()
      // 通过编程式导航跳转到登陆页面
      this.$router.push('/login')
    },
    // 获取所有的菜单
    
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      // console.log(res.data)
    },
    // 点击按钮，切换菜单的折叠和展开
    toggleCollapse() {
      this.iscollapse = !this.iscollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-header {
  display: flex;
  background-color: #373d41;
  justify-content: space-between; //左右贴边对齐
  padding-left: 0;
  align-items: center; //纵向居中对齐弹性盒模型
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center; //纵向居中对齐弹性盒模型
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle_button {
  background-color: #4A5064;
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;  //增加或减少字符间的空白
  cursor: pointer;  //鼠标经过变成手
}
</style>
