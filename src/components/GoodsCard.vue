<template>
  <div class="card-wrapper">
    <div class="card-img">
      <img :src="images[0]" ref="img" />
    </div>
    <div class="card-content ">
      <div class="overflow-hidden title">{{ title }}</div>
      <div class="overflow-hidden desc">{{ desc }}</div>
      <div class="overflow-hidden tags">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class=".overflow-hidden prices">￥ {{ price }}</div>
      <div class="counter">
        <div @touchend="counter(id, -1)" v-if="num">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
        </div>
        <div class="num"  v-if="num">{{ num }}</div>
        <div @touchend="counter(id, 1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from "../tools/Animate";

export default {
  props: ["tags", "images", "title", "price", "desc", "id", "num","nofly"],
  methods: {
    ...mapMutations(['storageChange']),
    counter(id, num) {
      this.storageChange({id, value: num});
      if (num === -1) {
        return
      }
      if (this.nofly) {
        return 
      }
      //图片的位置
      const { top, left } = this.$refs.img.getBoundingClientRect();
      //图片的大小
      const { offsetWidth: imgX, offfsetHeight: imgY } = this.$refs.img
      //购物车的位置
      const shopCar = document.getElementById("shop-car") 
      const { top:carY, left:carX } = shopCar.getBoundingClientRect();
      //购物车的大小
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.src,
        width: imgX,
        height: imgY
      })
    }
  }
};
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    position: relative;
    flex: 1;
    > div {
      width: 170px;
    }
    .title {
      margin-top: 5px;
      font-size: 13px;
      color: #1a1a1a;
    }
    .desc {
      margin-top: 5px;
      color: #aaa;
      font-size: 11px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      >div {
        font-size: 10px;
        padding: 1px 2px 2px 2px;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
        color: #aaa;
      }
    }
    .prices {
      font-size: 14px;
      color: #ff1a90;
      margin-top: 4px;
      font-weight: 600;
    }
    
}
  .counter {
      position: absolute;
      bottom: 10px;
      right: 15px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      >div:not(".num") {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
    }
    .num {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
.overflow-hidden {
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}
</style>