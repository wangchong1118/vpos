<template>
  <el-row class="main">
      <el-col :span="8" class="oder">
          <h3 class="mtitle">冲哥陕西美食屋</h3>
          <el-tabs type="border-card" class="otab">
            <el-tab-pane label="点餐">
                <el-table class="otable" :data="orderList" height="480" style="width: 100%">
                  <el-table-column prop="goodsName" label="美食" width="180"></el-table-column>
                  <el-table-column prop="count" label="数量" width="100"></el-table-column>
                  <el-table-column prop="price" label="价格" width="100"></el-table-column>
                  <el-table-column label="操作" width="180" fixed="right">
                      <template slot-scope="scope">
                          <el-button @click="fnAddFood(scope.row)" type="success" size="small">增加</el-button>
                          <el-button @click="fnDltFood(scope.row)" type="danger" size="small">删除</el-button>
                      </template>
                  </el-table-column>
                </el-table>
                <div class="operate">
                    <div class="total">
                        您已选用了 <span class="count">{{totalCount}}</span> 份美食，共计 <span class="cost">{{totalCost}}</span> 元
                    </div>
                    <el-button type="success" @click="checout">支付</el-button>
                    <el-button type="warning" @click="guadan">挂单</el-button>
                    <el-button type="danger" @click="dltAllOrder">全部删除</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="挂单">
                <div class="wait">
                    敬请期待上线 ...
                </div>
            </el-tab-pane>
            <el-tab-pane label="外卖">
                <div class="wait">
                    敬请期待上线 ...
                </div>
            </el-tab-pane>
          </el-tabs>
      </el-col>
      <el-col :span="16" class="goods">
          <div class="often">
              <h2 class="title">特色美食</h2>
              <ul class="list">
                  <li @click="fnAddFood(item)" v-for="item in oftenList" :key="item.goodsId">
                      <span>{{item.goodsName}}</span>
                      <span class="price">￥{{item.price}}元</span>
                  </li>
              </ul>
          </div>
          <div class="all">
              <h2 class="title">全部美食</h2>
              <el-tabs  class="gtab">
                    <el-tab-pane label="特色套餐">
                        <ul class="list">
                            <li @click="fnAddFood(item)" v-for="item in taocanList" :key="item.goodsId">
                              <img :src="item.goodsImg" :alt="item.goodsName">
                              <h4>{{item.goodsName}}</h4>
                              <p>{{item.price}}元</p>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="小吃">
                        <ul class="list">
                            <li @click="fnAddFood(item)" v-for="item in xiaochiList" :key="item.goodsId">
                              <img :src="item.goodsImg" :alt="item.goodsName">
                              <h4>{{item.goodsName}}</h4>
                              <p>{{item.price}}元</p>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="主食">
                        <ul class="list">
                          <li @click="fnAddFood(item)" v-for="item in zhushiList" :key="item.goodsId">
                            <img :src="item.goodsImg" :alt="item.goodsName">
                            <h4>{{item.goodsName}}</h4>
                            <p>{{item.price}}元</p>
                          </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="饮品">
                        <ul class="list">
                          <li @click="fnAddFood(item)" v-for="item in yinpinList" :key="item.goodsId">
                            <img :src="item.goodsImg" :alt="item.goodsName">
                            <h4>{{item.goodsName}}</h4>
                            <p>{{item.price}}元</p>
                          </li>
                        </ul>
                    </el-tab-pane>
              </el-tabs>
          </div>
      </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default{
    name:"pos",
    data(){
        return {
          orderList: [],
          totalCost: 0,
          totalCount: 0,
          oftenList: [],
          taocanList: [],
          yinpinList: [],
          xiaochiList: [],
          zhushiList: []
        }
    },
    mounted(){
       axios.get('http://wangchonghaha.cn:3499/api/vpos/list').then(res => {
         this.oftenList = res.data
       })
        axios.get('http://wangchonghaha.cn:3499/api/vpos/type').then(res => {
          this.xiaochiList = res.data[0]
          this.zhushiList = res.data[1]
          this.yinpinList = res.data[2]
          this.taocanList = res.data[3]
        })
    },
    methods: {
      fnAddFood(food){
          let isHave = false
          for(let i=0; i<this.orderList.length; i++){
              if(this.orderList[i].goodsId == food.goodsId){
                  isHave = true
              }
          }
          if(isHave){
              let arr = this.orderList.filter(item => item.goodsId == food.goodsId)
              arr[0].count++
          }else{
              let order = {
                  goodsId: food.goodsId,
                  goodsName: food.goodsName,
                  price: food.price,
                  count: 1
              }
              this.orderList.push(order)
          }

          this.getTotal()
      },
      fnDltFood(food){
          this.orderList = this.orderList.filter(item => food.goodsId != item.goodsId)
          this.getTotal()
      },
      dltAllOrder(){
          if(this.isCost()){
              return
          }
        this.$confirm('删除全部订单', '您确认要删除全部订单吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.orderList = []
            this.totalCount = 0
            this.totalCost = 0
            this.$message({
                type: 'success',
                message: '订单删除成功!'
            });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
      },
      getTotal(){
          this.totalCount = 0
          this.totalCost = 0
          this.orderList.forEach(item => {
              this.totalCount += item.count
              this.totalCost = this.totalCost + (item.count*item.price)
          })
      },
      checout(){
          if(this.isCost()){
              return
          }
          this.$message({
              message: '支付成功，感谢您的信任',
              type: 'success'
          });
      },
      guadan(){
            if(this.isCost()){
                return
            }
            this.$alert('你脑子进屎了?', '想挂单?', {
                  confirmButtonText: '不挂了'
            });
      },
      isCost(){
          if(this.totalCost == 0){
              this.$message({
                  message: '您还没有选餐哟....',
                  type: 'warning'
              });
              return true
          }else{
              return false
          }
      }
    }
  }
</script>

<style scoped>
  .main{float: left;width: 95%;height: 100%;overflow: hidden;}
  .mtitle{line-height: 40px;text-align: center;font-size: 24px;color: #FF2B44;font-weight: normal;}

  .oder{background: white;height: 100%;border-right: 1px solid #E4E7ED;}
  .oder .operate{text-align: center;padding: 48px 0 1080px 0;}
  .oder .operate .total{text-align: right;line-height: 64px;font-size: 14px;color: #606266;padding-right: 24px;}
  .oder .operate .total span{color: #FF2B44;font-weight: bold;padding: 0 6px;}
  .oder .operate .total span.cost{font-size: 24px;}
  .oder .wait{padding: 128px 0;line-height: 36px;font-size: 14px;color: #909399;text-align: center;}

  .goods{padding: 20px 0;}
  .goods .title{color: #FF2B44;font-size: 15px;line-height: 36px;border-bottom: 1px solid #E4E7ED;padding: 0 24px;margin-top: 32px;}

  .often .list{list-style: none;width: 92%;padding-inline-start: 0;line-height: 24px;padding: 0 20px;overflow: hidden;}
  .often .list li{float: left;background: white;border: 1px solid #E4E7ED;padding: 8px 16px;border-radius: 4px;margin: 5px 12px 5px 0;cursor: pointer;}
  .often .list li .price{color: #FF2B44;margin-left: 4px;}
  .often .list li:hover{border: 1px solid #FF2B44;box-shadow: 0 0 4px rgba(255, 43,68, 0.6);}
  .often .list li.active{background: #FF2B44;border-color: #FF2B44;}
  .often .list li.active span{color: white;}

  .all .gtab{padding: 0 24px;}
  .all .gtab .list{list-style: none;width: 92%;overflow: hidden;padding-inline-start: 0;}
  .all .gtab .list li{float: left;width: 230px;height: 68px;padding: 12px;margin: 0 10px 10px 0;background: white;border: 1px solid #E4E7ED;cursor: pointer;border-radius: 3px;}
  .all .gtab .list img{float: left;width: 68px;height: 68px;margin-right: 14px;border-radius: 3px;}
  .all .gtab .list h4{float: left;width: 148px;line-height: 38px;color: #242424;margin: 0;font-size: 15px;}
  .all .gtab .list p{float: left;width: 148px;line-height: 24px;font-size: 13px;margin: 0;}
  .all .gtab .list li:hover, .all .gtab .list li.active{border-color: #FF2B44;}
  .all .gtab .list li.active h4,.all .gtab .list li.active p{color: #FF2B44;}
</style>
