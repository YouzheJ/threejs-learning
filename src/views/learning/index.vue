<template>
    <div class="home">
        <div class="home-nav">
            <router-list :data="routerMenu" :props="props" />
        </div>
        <div class="home-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import RouterList from '@/components/RouterList.vue';
import RouterMenu from './router.menu';

export default {
  name: 'home',
  components: {
    RouterList
  },
  data() {
      return {
          routerMenu: RouterMenu,
          props: {
              children: 'children',
              label: 'name',
              router: 'link',
          },
      }
  },
}
</script>

<style lang="scss">
.home {
    position: relative;
    width: 100%;
    height: 100%;
    &-nav {
        width: 240px;
        height: 100%;
        padding: 8px;
        border-right: 1px solid #ccc;
    }
    &-content {
        position: absolute;
        top: 0;
        left: 248px;
        right: 0;
        bottom: 0;
        z-index: 1;
    }
}
</style>

