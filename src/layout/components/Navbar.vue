<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <span class="system-title">智能安全生产分析预警系统</span>

    <div class="right-menu">
      <div class="search_icon"><i class="el-icon-search"></i></div>
      <div class="notice_icon"><i class="el-icon-bell"></i></div>
      <div class="info">
        <span class="avatar"><img :src="avatar" alt=""></span>
        <span class="name">欢迎您 {{ name }}</span>
      </div>
      <div class="logout" @click="logout"><i class="el-icon-right"></i>退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      name: '管理员',
      avatar: require('@/assets/nav_header_images/city.png')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .system-title {
    line-height: 50px;
  }

  .hamburger-container {
    line-height: 48px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    width: 400px;
    height: 100%;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    i {
      cursor: pointer;
    }
    .info {
      cursor: pointer;
      line-height: 50px;
      .avatar img {
        transform: translateY(5px);
        margin-right: 5px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }
    .logout {
      cursor: pointer;
      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
