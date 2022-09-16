<template>
  <div class="classify-warpper">
    <router-link class="search-btn" tag="div" to="/search">
      <van-icon name="search" />
      <div>榴莲二十块一斤</div>
    </router-link>
    <one-tab></one-tab>
    <template v-if="showContent">
      <side-bar></side-bar>
    </template>
    <van-loading type="spinner" vertical v-else />
    <goods-list></goods-list>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import oneTab from "../components/oneTab.vue";
import SideBar from "../components/SideBar.vue";
import goodsList from "../components/GoodsList.vue";

export default {
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideList: (state) => state.sideList
    }),
  },
  methods: {
    ...mapMutations(['resetGoodList']),
    ...mapActions(['getGoodList'])
  },
  components: {
    oneTab,
    SideBar,
    goodsList,
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodList();
        this.getGoodList({type:this.sideList[0], page:1, sortType:'all'})
      }
    },
  }
};
</script>

<style lang="less" scoped>
.classify-warpper {
  width: 375px;
  .search-btn {
    width: 335px;
    height: 33px;
    line-height: 33px;
    margin: 11px auto 0;
    background-color: #eee;
    border-radius: 10px;
    font-size: 14px;
    color: #a1a1a1;
    text-align: center;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>