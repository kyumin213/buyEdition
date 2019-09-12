<template>
  <div class="mb20 mt20 tabsTxt">
      <span>首页</span>
      <span class="fg">/</span>
      <span>帮助中心</span>
    <div>
      <ul class="article-list">
        <li class="articleItem" @click="viewDetail()">
          <h4>手动填写内容下单</h4>
          <p>下单内容查看全文</p>
          <div class="art-time">
            <span>2019-05-05</span>
            <el-button  size="small" >查看全文</el-button>
          </div>
        </li>
      </ul>
     <div class="mt30">
       <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage4"
         :page-sizes="[10, 20, 30, 40]"
         :page-size="10"
         layout="total, sizes, prev, pager, next, jumper"
         :total="1">
       </el-pagination>
     </div>
    </div>
<!--    <el-dialog title="全文" width="60%" :visible.sync="addVisible" center :close-on-click-modal="false">-->
<!--      <ul class="articleDetail">-->
<!--        <li>下单查看全文</li>-->
<!--        <li>下单查看全文</li>-->
<!--        <li>下单查看全文</li>-->
<!--        <li>下单查看全文</li>-->
<!--        <li>下单查看全文</li>-->
<!--      </ul>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
      addVisible: false,
      currentPage4: 4
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    viewDetail () {
      let _this = this
      _this.$router.push('/helpDetails')
    }
  }
}
</script>

<style scoped>

</style>
