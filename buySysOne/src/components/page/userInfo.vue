<template>
  <div>
    <div class="mt20 mb20 tabsTxt">
        <span>首页</span>
        <span class="fg">/</span>
        <a>账户设置</a>
        <span class="fg">/</span>
        <span>基本信息</span>
    </div>
    <el-form class="userInfo">
      <el-form-item label="姓名" class="userList">
        <el-form-item>
          <span>kyumin</span>
        </el-form-item>
      </el-form-item>
      <el-form-item label="QQ" class="userList">
        <el-form-item>
          <span>796544354</span>
          <span class="editBtn edit2" @click="editPwdHandel"><i class="el-icon-edit"></i>修改</span>
        </el-form-item>
      </el-form-item>
      <el-form-item label="微信" class="userList">
        <el-form-item>
          <span>kyumin</span>
          <span class="editBtn edit3" @click="editWxHandel"><i class="el-icon-edit"></i>修改</span>
        </el-form-item>
      </el-form-item>
    </el-form>
<!--  修改QQ-->
    <el-dialog title="修改信息" :visible.sync="editQaModel" width="30%" center :close-on-click-modal="false">
      <el-form :model="formQq" ref="formQq" :rules='rules' label-width='50px' class='demo-form' status-icon>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="formQq.qq" placeholder='请输入QQ'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      	<el-button type="primary">确定</el-button>
          <el-button @click="editQaModel=false">取消</el-button>
        </span>
    </el-dialog>
    <!--修改微信-->
    <el-dialog title="修改信息" :visible.sync="editWxModel" width="30%" center :close-on-click-modal="false">
      <el-form :model="formWx" ref="formWx" :rules='rules' label-width='50px' class='demo-form' status-icon>
        <el-form-item label="微信" prop="wx">
          <el-input v-model="formWx.wx" placeholder='请输入微信'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      	<el-button type="primary">确定</el-button>
          <el-button @click="editWxModel=false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return {
      editQaModel: false,
      editWxModel: false,
      userNames: 'kyumin',
      pwds: '123434',
      formName: {
        names: ''
      },
      formQq: {
        qq: ''
      },
      formWx: {
        wx: ''
      },
      rules:{
      	qq:[{
      		required: true,
					message: '请输入QQ',
					trigger: 'change'
      	}],
      	wx:[{
      		required: true,
					message: '请输入微信',
					trigger: 'change'
      	}],
      }
    }
  },
  methods: {
    //  修改密码弹窗
    editPwdHandel () {
      let _this = this
      _this.editQaModel = true
    },
    //  修改微信
    editWxHandel () {
      let _this = this
      _this.editWxModel = true
    }
  }
}
</script>

<style scoped>
	.demo-form{
		margin: 20px 50px 50px;
	}
  @media screen  and (max-width: 768px){
    .infoItem .names{
      font-size: 12px;
      margin-right: 10px;
    }
  }
</style>
