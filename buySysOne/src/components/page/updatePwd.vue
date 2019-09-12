<template>
    <div>
      <div class="mt20 mb20 tabsTxt">
        <span>首页</span>
        <span class="fg">/</span>
        <a>账户设置</a>
        <span class="fg">/</span>
        <span>修改密码</span>
      </div>
      <div class="pwdBox">
        <el-form :model="updatePwdForm" label-width="80px">
        <el-row>
          <el-col :xs="24">
            <el-form-item label="旧密码">
              <el-input type='password' v-model="updatePwdForm.oldPwd" placeholder='请输入旧密码'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-form-item label="新密码">
            <el-input type='password' v-model="updatePwdForm.newPwd" placeholder='请输入新密码'></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type='password' v-model="updatePwdForm.comfirePwd" placeholder='请再次输入新密码'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
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

</style>
