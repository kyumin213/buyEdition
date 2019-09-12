<template>
  <div>
    <div class="mt20 mb20 tabsTxt">
        <span>首页</span>
        <span class="fg">/</span>
        <a>账户设置</a>
        <span class="fg">/</span>
        <span>安全设置</span>
    </div>
    <el-form class="userInfo">
      <el-form-item label="邮箱" class="userList">
        <el-form-item>
          <span>79434334@qq.com</span>
          <span class="tips">绑定密保邮箱后可用于找回密码~</span>
          <span class="editBtn edit1" @click="editEmailHandel"><i class="el-icon-edit"></i>修改</span>
        </el-form-item>
      </el-form-item>
      <el-form-item label="手机" class="userList">
        <el-form-item>
          <span>135****4543</span>
          <span class="tips">手机可用于登录系统，找回密码，请勿泄露手机信息~</span>
          <span class="editBtn edit1" @click="editPhoneHandel"><i class="el-icon-edit"></i>修改</span>
        </el-form-item>
      </el-form-item>
    </el-form>
    <!--  修改邮箱-->
    <el-dialog title="修改邮箱" :visible.sync="editEmailModel" width="30%" center :close-on-click-modal="false">
      <el-form :model="formEmail" ref="formEmail" class='demo-form'>
        <el-form-item>
        	 <span class="col9">为了保障您的帐号安全，变更信息前需验证身份</span>
        </el-form-item>
        <el-form-item>
          <span>79434334@qq.com</span>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16" :xs='15'>
              <el-input v-model="formEmail.code" placeholder='请输入验证码'></el-input>
            </el-col>
            <el-col :span="8" :xs='9'>
              <el-button type='primary'>获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click='newEmail'>下一步</el-button>
          <el-button @click="editEmailModel=false">取消</el-button>
        </span>
    </el-dialog>
    <!--验证新邮箱-->
		<el-dialog title="修改邮箱" :visible.sync="editNewEmailModel" width="30%" center :close-on-click-modal="false">
			<el-form :model="formNewEmail" ref="formNewEmail" class='demo-form'>
				<el-form-item>
					<span class="col9">为了保障您的帐号安全，请完成邮箱验证</span>
				</el-form-item>
			<el-form-item prop="email">
					<el-input v-model="formNewEmail.email" placeholder='请输入新邮箱'></el-input>
				</el-form-item>
				<el-form-item>
					<el-row>
						<el-col :span="14">
							<el-input v-model="formNewEmail.code" placeholder='请输入验证码'></el-input>
						</el-col>
						<el-col :span="10">
							<el-button type='primary'>获取验证码</el-button>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
          <el-button type="primary">确定</el-button>
          <el-button @click="editNewEmailModel=false">取消</el-button>
        </span>
		</el-dialog>
    <!--修改手机号-->
    <el-dialog title="修改手机号" :visible.sync="editPhoneModel" width="30%" center :close-on-click-modal="false">
      <el-form :model="formPhone" ref="formPhone" class='demo-form'>
        <el-form-item>
        	<span class="col9">为了保障您的帐号安全，变更信息前需验证身份</span>
        </el-form-item>
        <el-form-item>
          <span>135****3243</span>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16" :xs='15'>
              <el-input v-model="formPhone.code"></el-input>
            </el-col>
            <el-col :span="8" :xs='9'>
              <el-button type='primary'>获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click='newPhone'>下一步</el-button>
          <el-button @click="editPhoneModel=false">取消</el-button>
        </span>
    </el-dialog>
    <!--验证新手机-->
		<el-dialog title="修改手机" :visible.sync="editNewPhoneModel" width="30%" center :close-on-click-modal="false">
			<el-form :model="formNewPhone" ref="formNewPhone" class='demo-form'>
				<el-form-item>
					<span class="col9">为了保障您的帐号安全，请完成手机验证</span>
				</el-form-item>
				<el-form-item prop="phone">
					<el-input v-model="formNewPhone.phone" placeholder='请输入新手机号'></el-input>
				</el-form-item>
				<el-form-item>
					<el-row>
						<el-col :span="12">
							<el-input v-model="formNewPhone.code" placeholder='请输入验证码'></el-input>
						</el-col>
						<el-col :span="12">
							<el-button type='primary'>获取验证码</el-button>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
          <el-button type="primary">确定</el-button>
          <el-button @click="editNewPhoneModel=false">取消</el-button>
        </span>
		</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'securitySet',
  data () {
    return {
      editEmailModel: false,
      editPhoneModel: false,
      editNewEmailModel: false,
			editNewPhoneModel: false,
      userNames: 'kyumin',
      pwds: '123434',
      formName: {
        names: ''
      },
      formEmail: {
        email: '',
        code: ''
      },
      formPhone: {
        phone: '',
        code: ''
      },
      	formNewEmail: {
					email:'',
					code: ''
				},
					formNewPhone: {
					phone:'',
					code: ''
				}
    }
  },
  methods: {
    // 修改账号弹窗
    editHandel () {
      let _this = this
      _this.editNameModel = true
    },
    //  修改邮箱弹窗
    editEmailHandel () {
      let _this = this
      _this.editEmailModel = true
    },
    //  修改手机号
    editPhoneHandel () {
      let _this = this
      _this.editPhoneModel = true
    },
    //验证新邮箱
			newEmail() {
				let _this = this
				_this.editEmailModel = false
				_this.editNewEmailModel = true
			},
			//验证新手机
			newPhone(){
				let _this = this
				_this.editPhoneModel = false
				_this.editNewPhoneModel = true
			}
  }
}
</script>

<style scoped>
.demo-form{
	margin: 20px 50px 50px;
}
</style>
