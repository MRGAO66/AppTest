<template>
  <div class="list-wrapper">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: type == 'all' }" @click="changeType('all')">
        综合
      </div>
      <div :class="{ active: type == 'sale' }" @click="changeType('sale')">
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': type == 'price-up',
          'price-down': type == 'price-down',
        }"
        @click="changeType('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="isloading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <goods-card
            v-for="item in sideGoodsList"
            :key="item.id"
            v-bind="item"
            :num="counterMap[item.id]"
          ></goods-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import goodsCard from "./GoodsCard.vue";
export default {
  data() {
    return {
      type: "all",
      isloading: false,
      loading: false,
      finished: false,
      page: 1,
    };
  },
  components: {
    goodsCard,
  },
  methods: {
    ...mapMutations(['resetGoodList']),
    ...mapActions(['getGoodList']),
    changeType(type) {
      if (type === "all") {
        this.type = "all";
      } else if (type === "sale") {
        this.type = "sale";
      } else {
        if (this.type === "price-down") {
          this.type = "price-up";
        } else {
          this.type = "price-down";
        }
      }
      this.onRefresh();
    },
    onRefresh() {
      this.isloading = true;
      this.finished = false;
      this.loading = false;
      this.page = 1;
      this.resetGoodList();
      this.getGoodList({page: 1, sortType: this.type });
      this.isloading = false;
    },
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const result = await this.getGoodList({page: this.page, sortType: this.type})
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
  },
  computed: {
    ...mapState({
      sideGoodsList: (state) => state.sideGoodsList,
      counterMap: (state) => state.counterMap,
    })
  },
};
</script>

<style lang="less" scoped>
.list-header {
  width: 296px;
  position: relative;
  top: 0;
  left: 79px;
  box-sizing: border-box;
  padding: 0 8px;
  display: flex;
  justify-content: flex-end;
  > div {
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #cecece;
    position: relative;
  }
  .active,
  .price-up,
  .price-down {
    color: #ff1a90;
    font-weight: bold;
  }
  .price::after {
    content: "";
    border: 4px solid transparent;
    border-top-color: #aaa;
    position: absolute;
    right: 0;
    bottom: 4px;
  }
  .price::before {
    content: "";
    border: 4px solid transparent;
    border-bottom-color: #aaa;
    position: absolute;
    right: 0;
    top: 4px;
  }
  .price-up::before {
    border-bottom-color: #ff1a90;
  }
  .price-down::after {
    border-top-color: #ff1a90;
  }
}
.list-content {
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
.van-pull-refresh {
  overflow: unset !important;
}
</style>