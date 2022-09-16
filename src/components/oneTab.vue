<template>
  <div class="one-tab-warpper" ref="container">
    <div
      class="tab-item"
      v-for="(item, i) in menuList"
      :key="item.title"
      :class="{ active: index == i }"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      <div class="img-warpper">
        <img :src="item.imgURL" />
      </div>
      <div class="img-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import tools from "../utils/tools.js"
export default {
  data() {
    return {
      move: false,
      index: 0,
      menuList: [
        {
          title: "时令水果",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg",
        },
        {
          title: "酒水冲调",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg",
        },
        {
          title: "安心乳品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg",
        },
        {
          title: "休闲零食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg",
        },
        {
          title: "肉蛋食材",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg",
        },
        {
          title: "新鲜蔬菜",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg",
        },
        {
          title: "熟食餐饮",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg",
        },
        {
          title: "海鲜水产",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg",
        },
        {
          title: "粮油调味",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg",
        },
        {
          title: "某手美食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg",
        },
        {
          title: "纸杯清洁",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg",
        },
        {
          title: "个人护理",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg",
        },
        {
          title: "美妆护肤",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg",
        },
        {
          title: "家居收纳",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg",
        },
        {
          title: "家用电器",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg",
        },
        {
          title: "3C数码",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg",
        },
        {
          title: "母婴用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg",
        },
        {
          title: "鲜花绿植",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg",
        },
        {
          title: "宠物用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg",
        },
        {
          title: "图书玩具",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg",
        },
        {
          title: "手表配饰",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg",
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getSideList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      // 计算移动距离
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const warpperWidth = this.$refs.container.offsetWidth;
      tools(this.$refs.container.scrollLeft,itemWidth / 2 + itemLeft - warpperWidth / 2,this.$refs.container, "scrollLeft");
      //获取侧边栏数据(sider + data)
      this.getSideList(this.menuList[i].title);
    },
  },
  mounted() {
    this.getSideList(this.menuList[0].title);
  }
};
</script>

<style lang="less" scoped>
.one-tab-warpper {
  width: 375px;
  height: 100px;
  overflow: auto;
  display: flex;
  .tab-item {
    width: 50px;
    height: 70px;
    padding: 10px 5px;
    .img-warpper {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 23px;
      border-width: 2px;
      border-style: solid;
      border-color: #fff;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        align-self: center;
      }
    }
    .img-title {
      font-size: 12px;
      text-align: center;
      margin-top: 5px;
    }
  }
  .active {
    .img-warpper {
      border-color: #d13193;
    }
    .img-title {
      color: #fff;
      background-color: #d13193;
      border-radius: 30px;
      font-weight: bold;
    }
  }
}
.one-tab-warpper::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>