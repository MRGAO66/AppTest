<template>
  <div class="sidebar-warpper" ref="sidebar">
    <div
      v-for="(item, i) in sideList"
      :key="item"
      :class="{ active: index === i }"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ i == 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import tools from "../utils/tools.js" 

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodList']),
    ...mapActions(["getGoodList"]),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      //计算移动的距离
      const { sidebar } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = sidebar.getBoundingClientRect().top;
      const pHeight = sidebar.offsetHeight;
      tools(sidebar.scrollTop,sonTop - pTop - pHeight / 2 + sonHeight / 2, sidebar, "scrollTop")
      // 获取列表操作
      this.resetGoodList();
      this.getGoodList({
        type:this.sideList[i],
        page:1,
        sortType:'all',
      })
    },
  },
  mounted() {
    // this.resetGoodList();
    // this.getGoodList({
    //     type:this.sideList[0],
    //     page:1,
    //     sortType:'all',
    //   })
  }
};
</script>

<style lang="less" scoped>
.sidebar-warpper {
  position: fixed;
  left: 0px;
  width: 79px;
  top: 135px;
  bottom: 50px;
  overflow: auto;
  background: #f8f8f8;
  div {
    width: 79px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}
.sidebar-warpper::-webkit-scrollbar {
    width: 0;
    background: none;
}
</style>