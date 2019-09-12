<template>
    <div>
      <div class="mt20 mb20 tabsTxt">
        <span>首页</span>
        <span class="fg">/</span>
        <a>账户设置</a>
        <span class="fg">/</span>
        <span>修改密码</span>
      </div>
      <div class="pwdBox pwdForm">
      	<h3 class="txtCenter fz16 mb20">修改密码</h3>
        <el-form :model="updatePwdForm">
        <el-row>
          <el-col :xs="24">
            <el-form-item>
              <el-input v-model="updatePwdForm.oldPwd" placeholder='请输入旧密码' type='password'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-form-item>
            <el-input v-model="updatePwdForm.newPwd" placeholder='请输入新密码' type='password'></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="updatePwdForm.comfirePwd" placeholder='请再次输入新密码' type='password'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class='loginBtn'>确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'updatePwd',
  data () {
    return {
      updatePwdForm: {
        oldPwd: '',
        newPwd: '',
        comfirePwd: ''
      }
    }
  }
}
</script>

<style scoped>
.pwdForm{
	-webkit-box-shadow: 1px 1px 7px 2px #ddd;
	box-shadow: 1px 1px 7px 2px #ddd;
	padding: 25px 35px;
	width: 350px;
	box-sizing: border-box;
	background: #fff;
}
</style>
