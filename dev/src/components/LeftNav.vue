<template>
  <div class="left-nav">
    <ul>
        <li class="active">
            <i class="icon iconfont icon-juanbingjianbing"></i>
            <span>选餐</span>
        </li>
        <li @click="fnwait">
            <i class="icon iconfont icon-renminbi2"></i>
            <span>收银</span>
        </li>
        <li @click="fnwait">
            <i class="icon iconfont icon--shangpu"></i>
            <span>店铺</span>
        </li>
        <li @click="fnwait">
            <i class="icon iconfont icon-huiyuan"></i>
            <span>会员</span>
        </li>
        <li @click="fnwait">
            <i class="icon iconfont icon-setting"></i>
            <span>设置</span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  methods: {
      fnwait(){
          this.$notify({
              type: 'warning',
              title: '敬请期待',
              message: '该功能暂未开放',
              position: 'top-left'
          });
      }
  }
}
</script>

<style scoped>
  .left-nav {
        color: #ffffff;
        height: 100%;
        font-size: 10px;
        background-color: #01868e;
        float: left;
        width: 5%;
        padding: 15px 0;
    }
    .iconfont {
        font-size: 24px;
        line-height: 30px;
    }
    .left-nav ul {
        padding: 0;
        margin: 0;
    }
    .left-nav li {
        list-style: none;
        text-align: center;
        border-bottom: 1px solid #097379;
        padding: 10px;
        cursor: pointer;
    }
    .left-nav li:hover, .left-nav li.active {
        background: #39B6BC;
    }
    .left-nav li span{
      display: block;
      line-height: 24px;
      font-size: 15px;
    }
</style>
