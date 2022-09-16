<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del" />
    </div>
    <div class="card-list" v-if="this.list.length !== 0">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <goods-card
            v-bind="item"
            :num="counterMap[item.id]"
            :nofly="true"
          ></goods-card>
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-else>
      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg">
    </div>
    <van-submit-bar
      :price="totalMoney"
      :button-text="`去提交(${totalNum})`"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Toast,Dialog } from "vant";
import goodsCard from "../components/GoodsCard.vue";

export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    totalMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return Math.round(num * next.price * 100) + prev;
      }, 0);
      return res;
    },
    totalNum() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce(
        (prev, next) => prev + this.counterMap[next.id],
        0);
      return res;
    },
  },
  methods: {
    ...mapMutations(['storageChange']),
    async getAllData() {
      const result = Object.keys(this.counterMap);
      const res = await this.$api.getGoodsByIds(result.join());
      this.list = res.list;
    },
    checkAll() {
      //全选
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    async del() {
      if (this.result.length === 0) {
        Toast("用户没有选中商品");
      }
      try {
        await Dialog.confirm({
          message: "您是否要删除已选中的商品"
        });
        this.result.forEach( (id) => {
            this.storageChange({id, value: -Infinity});
            this.list = this.list.filter((item) => !this.result.includes(item.id));
        })
      } catch (error) {
        Toast("用户点击了取消")
      }
    },
    onSubmit() {},
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  created() {
    this.getAllData();
  },
};
</script>

<style lang="less" scoped>
.shopping {
  background: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    width: 100%;
    top: 0;
  }
  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
      display: flex;
      justify-items: center;
    }
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
  .card-one {
    width: 100%;
    position: absolute;
    top: 46px;
    img{
      width: 100%;
    }
  }
}
</style>