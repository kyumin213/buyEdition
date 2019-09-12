<template>
	<div>
		<div v-show="!indexShow">
			<div class="loginBox">
				<div class="navCon">
					<div class="navHead">
						<div class="navImg login">
							<div class="imgBox" @click='checkIndex'>
								<img src="../../assets/image/logo.png" class="img-log" />
							</div>
						</div>
					</div>
				</div>
				<div class="loginMain">
					<div>
						<el-row :gurre='20'>
							<el-col :span='12' :xs='24'>
								<div>
									<img src="../../assets/image/log-in.png" alt="" style="width: 100%;" />
								</div>
							</el-col>
							<el-col :span='12' :xs='24' style='margin-top: 50px;'>
								<el-tabs v-model="forgetType" class='ml50' v-show='LoginShow==1' @tab-click="forgetClick">
									<el-tab-pane label="登录" name="first">

									</el-tab-pane>
									<el-tab-pane label="找回密码" name="second">
										<div v-show='switchTab!=3'>
											<el-button :class="active === 1?'activeThis':''" size='small' @click="useEmail">通过邮箱找回</el-button>
											<el-button size='small' :class="active === 2?'activeThis':''" @click='usePhone'>通过手机找回</el-button>
										</div>
										<!--      <img :src="imgCode" alt="" class="avatar">-->
										<el-form :model="forgetEmail" ref="forgetEmail" :rules='rules' class='mt20' status-icon v-show='active==1'>
											<el-form-item label='邮箱' prop='email'>
												<el-input  placeholder="请输入邮箱" v-model="forgetEmail.email">

												</el-input>
											</el-form-item>
											<el-form-item label='验证码' prop='VerificationCode'>
												<el-input placeholder='请输入邮箱验证码' v-model='forgetEmail.VerificationCode'></el-input>
												<el-button type='primary' class='mt10' size='medium' @click='getEmailCode' :disabled='getEmailPwd'>
													<span v-show="show">获取验证码</span>
													<span v-show='!show'>{{count}}秒</span>
												</el-button>
											</el-form-item>
											<el-form-item>
												<el-button type='primary' class='confirmLogin'>确定</el-button>
											</el-form-item>
										</el-form>
										<el-form :model="forgetPhone" ref="forgetPhone" :rules='rules' class='mt20' status-icon v-show='active==2'>
											<el-form-item class="disInline wid100" label='手机号' prop='PhoneNumber'>
												<el-input placeholder="请输入手机号" v-model="forgetPhone.PhoneNumber">

												</el-input>
											</el-form-item>
											<el-form-item label='验证码' prop='VerificationCode'>
												<el-input placeholder="请输入验证码" v-model="forgetPhone.VerificationCode">

												</el-input>
												<el-button type='primary' class='mt10' size='medium' @click='getPhoneCode' :disabled='getPhonePwd'>
													<span v-show="show">获取验证码</span>
													<span v-show='!show'>{{count}}秒</span>
												</el-button>
											</el-form-item>
											<el-form-item>
												<el-button type='primary' class='confirmLogin' @click="RetrievePwdPhone('forgetPhone')">确定</el-button>
											</el-form-item>
										</el-form>
										<el-form :model='resetPwdForm' ref='resetPwdForm' :rules="rules" status-icon v-show='switchTab==3'>
											<el-form-item prop="newPwd" label='新密码'>
												<el-input v-model="resetPwdForm.newPwd" maxlength='16' type="password" autocomplete="off" placeholder='请输入新密码'>

												</el-input>
												<span class="tipTxt">6-16位英文字母和数字组成</span>
											</el-form-item>
											<el-form-item prop="comfirPwd" label='确认密码'>
												<el-input v-model="resetPwdForm.comfirPwd" maxlength='16' type="password" autocomplete="off" placeholder='请再次输入新密码'>

												</el-input>
											</el-form-item>
											<el-form-item>
												<el-button type='primary' class='confirmLogin' @click="comfirPwdBtn('resetPwdForm')">确定</el-button>
											</el-form-item>
										</el-form>
									</el-tab-pane>
								</el-tabs>
								<el-form :model="formLogin" ref="formLogin" :rules='rules' class="demo-ruleForm" status-icon v-show='LoginShow==2'>
									<div class="txtCenter fz30">登录</div>
									<el-form-item prop='PhoneNumber' label='手机/邮箱'>
										<el-input placeholder="请输入手机号/邮箱" v-model="formLogin.PhoneNumber">
										</el-input>
										<span class="tipTxt" style="font-size: 12px;">使用手机或者邮箱中的任意一个均可（若采用邮箱，请确保你的帐号已绑定过该邮箱）</span>
									</el-form-item>
									<el-form-item prop='passwords' label='密码'>
										<el-input type='password' v-model="formLogin.passwords" placeholder='请输入密码'>

										</el-input>
									</el-form-item>
									<el-form-item label='图形码' prop='imgsCode'>
										<el-input v-model="formLogin.imgsCode" placeholder='请输入图形码'>
										</el-input>
									</el-form-item>
									<div class="identifybox">
										<div class='mb10'>
											<img :src="codeImg" alt="" class="avatar">
										</div>
										<el-button type='text' class="textbtn ml20">看不清，换一张</el-button>
									</div>
									<el-form-item>
										<el-button type="primary" @click="loginIn('formLogin')" class='confirmLogin'>立即登录</el-button>
										<div class="flexBox">
											<span class="forgetTxt" @click="register">立即注册</span>
											<span class="forgetTxt2" @click="forgetPwd">忘记密码</span>
										</div>
									</el-form-item>
								</el-form>
								<el-form :model="formReg" ref="formReg" :rules="rules" class="demo-ruleForm demo-dynamic" status-icon v-show='LoginShow==3'>
									<div class="txtCenter fz30">注册</div>
									<el-form-item prop="PhoneNumber" label='手机号'>
										<el-input v-model="formReg.PhoneNumber" placeholder='请输入手机号'>
										</el-input>
									</el-form-item>
									<el-form-item label='验证码' prop='VerificationCode'>
										<el-input v-model="formReg.VerificationCode" placeholder='请输入验证码'>

										</el-input>
										<el-button type="primary" size="medium" class='mt10' @click='getPhoneCode' :disabled="codedisabled">
											<span v-show="show">获取验证码</span>
											<span v-show='!show'>{{count}}秒</span>
										</el-button>
									</el-form-item>
									<el-form-item prop="name" label='姓名'>
										<el-input v-model="formReg.name" placeholder='请输入姓名'>

										</el-input>
										<span class="tipTxt">请正确填写您的姓名,填写后不可修改</span>
									</el-form-item>
									<el-form-item prop="passwords" label='密码'>
										<el-input v-model="formReg.passwords" type='password' placeholder='请输入密码'>

										</el-input>
										<span class="tipTxt">6-16位英文字母和数字组成</span>
									</el-form-item>
									<el-form-item prop="confirmPassWord" label='确认密码'>
										<el-input v-model="formReg.confirmPassWord" type='password' placeholder='请确认密码'>

										</el-input>
									</el-form-item>
									<el-form-item label='推荐码'>
										<el-input v-model="formReg.RecommendCode" placeholder='请输入推荐码'>

										</el-input>
									</el-form-item>
									<el-form-item>
										<el-checkbox-group v-model="formReg.agreeService">
											<el-checkbox label="同意服务条款" class='col9' name="type"></el-checkbox>
										</el-checkbox-group>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="submitRegister('formReg')" class='confirmLogin'>立即注册</el-button>
									</el-form-item>
									<p>已有账号 <span class="forgetTxt" @click='loginBtn'>登录</span></p>
								</el-form>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="footer">
					<div>2019 © 版权所有</div>
				</div>
			</div>
		</div>
		<div class="index" v-show='indexShow'>
			<a name='index'></a>
			<div class="bannerBox">
				<div class="banner" ref='box'>
					<div class="headNav" :class="{'bgCol':1 == headBg}">
						<div class="navHeads">
							<div class="navImg login">
								<div class="imgBox">
									<img src="../../assets/image/logo.png" class="img-log" />
								</div>
							</div>
							<div class="navRightBox loginRi">
								<ul class="navBox">
									<li>
										<a href="#index" :class="{'bgCol':1 == headBg}">首页</a>
									</li>
									<li>
										<a href="#Solution" :class="{'bgCol':1 == headBg}">解决方案</a>
									</li>
									<li>
										<a href="#about" :class="{'bgCol':1 == headBg}">关于我们</a>
									</li>
									<li>
										<a class="loginBtn" @click="loginBtn" :class="{'bgCol':1 == headBg}">登录</a><span class="col">|</span>
										<a class="registerBtn" @click="register" :class="{'bgCol':1 == headBg}">注册</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="bannerTxt">
						<p class="col p1">用Amzbuy 提升亚马逊销量</p>
						<p class="col p2">诚信，安全，简单，让电商更有价值</p>
						<el-button class='mt20 joinBtn' type='primary' @click='register'>立即加入</el-button>
					</div>
				</div>
			</div>
			<div class="itemBg">
				<a name='Solution'></a>
				<div class="proType">
					<p class="txtCenter fz30"><span class="fzTxtCol">平台的特点</span></p>
					<p class="txtCenter fz16 txtCol mt20">诚信，安全，简单，让电商更有价值</p>
					<div class="mt50">
						<el-row>
							<el-col :span='8' :xs='24'>
								<div class="flexItem">
									<div class="mr30 ml30">
										<p><i class="el-icon-trophy iconFZ"></i></p>
									</div>
									<div>
										<p class="typeItem">诚信</p>
										<p class="col9 mt20">我们的服务，值得您信赖</p>
									</div>
								</div>
							</el-col>
							<el-col :span='8' :xs='24'>
								<div class="flexItem nthTwo">
									<div class="mr30 ml30">
										<p><i class="el-icon-lock iconFZ"></i></p>
									</div>
									<div>
										<p class="typeItem">安全</p>
										<p class="col9 mt20">我们是最可靠的</p>
									</div>
								</div>
							</el-col>
							<el-col :span='8' :xs='24'>
								<div class="flexItem nthThree">
									<div class="mr30 ml30">
										<p><i class="el-icon-aim iconFZ"></i></p>
									</div>
									<div>
										<p class="typeItem">简单</p>
										<p class="col9 mt20 TypeDes">操作简单，实现快速下单，节省时间</p>
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
			<div class="taskListBox">
				<div class="taskShow">
					<p class="txtCenter fz30 TaskTitle">平台</p>
					<p class="txtCenter col6 mt20 mb50 TaskTitle">使用我们的产品轻松提高您的服务的性能，安全性和可靠性</p>
					<div class="widCon">
						<el-row :gutter="20">
							<el-col :span='8' :xs='24' class='txtCenter'>
								<div class="taskBor" :class="{'boxActive':1==hoverIndex}" @mouseover="hoverIndex=1" @mouseout="hoverIndex = -1">
									<p class="card"><i class="el-icon-s-shop iconFZ"></i></p>
									<p class="fz20 mt10">FBA任务</p>
									<p class="mt20"><span class="priceTask">￥100</span><span class="colItem">起</span></p>
									<!--<p class="br"></p>-->
									<div class="itemBom">
										<p class="mt30 col9 taskDes">很棒的任务，快速简单安werrqeqrretetetetertewtetete全可靠大神的都是速简单安werrqeqrretetetetertewtetete全可靠大神的都是速简单安werrqeqrretetetetertewtetete全可靠大神的都是速简单安werrqeqrretetetetertewtetete全可靠大神的都是</p>
										<div class="buyBtn">
											<el-button type='primary' round @click="loginBtn">立即购买</el-button>
										</div>
									</div>
								</div>
							</el-col>
							<el-col :span='8' :xs='24' class='txtCenter'>
								<div class="taskBor" :class="{'boxActive':2==hoverIndex}" @mouseover="hoverIndex=2" @mouseout="hoverIndex = -1">
									<p class="card"><i class="el-icon-s-flag iconFZ"></i></p>
									<p class="fz20 mt10">加购任务</p>
									<p class="mt20"><span class="priceTask">￥100</span><span class="colItem">起</span></p>
									<!--<p class="br"></p>-->
									<div class="itemBom">
										<p class="mt30 col9 taskDes">很棒的任务，快速简单安全可靠大神的都是</p>
										<div class="buyBtn">
											<el-button type='primary' round @click="loginBtn">立即购买</el-button>
										</div>
									</div>
								</div>
							</el-col>
							<el-col :span='8' :xs='24' class='txtCenter'>
								<div class="taskBor" :class="{'boxActive':3==hoverIndex}" @mouseover="hoverIndex=3" @mouseout="hoverIndex = -1">
									<p class="card"><i class="el-icon-message-solid iconFZ"></i></p>
									<p class="fz20 mt10">点赞任务</p>
									<p class="mt20"><span class="priceTask">￥100</span><span class="colItem">起</span></p>
									<!--<p class="br"></p>-->
									<div class="itemBom">
										<p class="mt30 col9 taskDes">很棒的任务，快速简单安全可靠大神的都是</p>
										<div class="buyBtn">
											<el-button type='primary' round @click="loginBtn">立即购买</el-button>
										</div>
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
			<!--关于我们-->
			<div class="aboutUs">
				<a name='about'></a>
				<div class="aboutCon">
					<p class="txtCenter fz30 aboutTit"><span class="fzTxtCol">关于我们</span></p>
					<!--<div class="aboutBox">
						<div class="picLeft">
							<img src="../../assets/image/about1.jpg" alt="" style="height: 100%;width: 100%;" />
						</div>
						<div style="width: 50%;">
							<div class="aboutUsDes">
								<p class="aboutDes">amzBuy研发团队，拥有精湛、深厚的技术功底，具有多年电商系统开发经验，专注于数据挖掘和跨境电商云服务开发。 管理团队，是一群资深外贸老炮，拥有超过10年的跨境电商实战与传统行业运营经验，充分了解跨境电商卖家的需求和行业发展方向，为您的跨境之路保驾护航。</p>
							</div>
							<div style="height: 50%;">
								<img src="../../assets/image/about2.jpg" style="height: 100%;width: 100%;" alt="" />
							</div>
						</div>
					</div>-->
					<el-row class='aboutBox'>
						<el-col :span='12' :xs='24'>
							<img src="../../assets/image/about1.jpg" alt="" class="aboutLeftImg" />
						</el-col>
						<el-col :span='12' :xs='24' style='height: 100%;'>
							<div class="aboutUsDes" style='height: 50%;'>
								<p class="aboutDes">amzBuy研发团队，拥有精湛、深厚的技术功底，具有多年电商系统开发经验，专注于数据挖掘和跨境电商云服务开发。 管理团队，是一群资深外贸老炮，拥有超过10年的跨境电商实战与传统行业运营经验，充分了解跨境电商卖家的需求和行业发展方向，为您的跨境之路保驾护航。</p>
							</div>
							<div style="height: 50%;">
								<img src="../../assets/image/about2.jpg" style="height: 100%;width: 100%;" alt="" />
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--联系我们-->
			<!--<div class="contactMe">
				<p class="txtCenter col fz30 contactTitle">加入我们，为您节省99%的研发投入</p>
				<div class="txtCenter mt50">
					<el-button type='warning' class='contactBtn'>立即加入</el-button>
				</div>
			</div>-->
			<footer class="mt30">
				<div class='footerTit txtCenter '>
					<p class="fz20 col mb20">加入我们，为您节省99%的研发投入</p>
					<el-button type='warning' class='contactBtn' @click='register'>立即加入</el-button>
				</div>
				<!--<p class="footerTit fz20 col">加入我们，为您节省99%的研发投入</p>-->
				<p class="txtCenter footerTxt">Copyright ©2019 Buy System</p>
			</footer>
		</div>
		<el-dialog title='验证码' :visible.sync='codeModal' :close-on-click-modal="false" width="30%">
			<el-form :model="formReg" ref='formReg' :rules='rules' status-icon>
				<el-form-item prop='imgsCode'>
					<el-input v-model="formReg.imgsCode" placeholder='请输入图形码'>

					</el-input>
				</el-form-item>
			</el-form>
			<div class="identifybox">
				<div>
					<img :src="codeImg" alt="" class="avatar" @click="getImgCode">
				</div>
				<el-button @click="getImgCode" type='text' class="textbtn ml20">看不清，换一张</el-button>
			</div>
			<div slot='footer' class="dialog-footer">
				<el-button type='primary' @click="regSendCode('formReg')">确定</el-button>
				<el-button @click='codeModal=false'>取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import vali from '../common/validate'
	export default {
		data() {
			// 邮箱
			let validateEmail = (rule, value, callback) => {
				let reg  =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				if(reg.test(value)) {
					callback()
					this.getEmailPwd = false
					this.phoneNumber = value
				} else {
					callback(new Error('请输入正确的邮箱'))
				}
			};
			// 手机号
			let validatePhone = (rule, value, callback) => {
				const reg = /^[1][3,4,5,7,8][0-9]{9}$/
				if(reg.test(value)) {
					callback()
					this.codedisabled = false
					this.getPhonePwd = false
					this.phoneNumber = value
				} else {
					this.codedisabled = true
					this.getPhonePwd = true
					callback(new Error('请输入正确的手机号'))
				}
			}
			let validatePass = (rule, value, callback) => {
				const reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/
				if(value === '') {
					callback(new Error('请输入密码'))
				} else if(this.formReg.confirmPassWord !== '') {
					this.$refs.formReg.validateField('confirmPassWord')
				} else if(reg.test(value) && value.length >= 6) {
					callback()
				} else {
					callback(new Error('密码必须由6-16个英文字母和数字的字符串组成'))
				}
			}
			//重新设置确认密码
			let validatePwd2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入新密码'))
				} else if(value !== this.resetPwdForm.newPwd) {
					return callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}
			};
			// <!--二次验证密码-->
			let validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'))
				} else if(value !== this.formReg.passwords) {
					callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}
			}
			const validateVerifycode = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入验证码'))
				} else if(value.toLocaleUpperCase() !== this.imgcodeTxt.toLocaleUpperCase()) {
					callback(new Error('验证码不正确!'))
				} else {
					callback()
				}
			}
			return {
				phoneNumber: '',
				switchTab: 1,
				imgcodeTxt: "", //返回图形码
				LoginShow: 2,
				hoverIndex: -1,
				getEmailPwd: true, //邮箱找回密码验证按钮
				getPhonePwd: true, //找回密码获取验证码按钮
				codedisabled: true, //获取验证码按钮
				getCodeBtn: '获取验证码',
				codeModal: false, //图形码弹窗
				codeImg: '',
				indexShow: true,
				active: 1,
				forgetType: 'second',
				activeName: 'first',
				typeShow: false,
				imgCode: '',
				formReg: {
					PhoneNumber: '',
					name: '',
					passwords: '',
					confirmPassWord: '',
					verification: '',
					verification2: '',
					mobileVerification: '',
					RecommendCode: '',
					agreeService: true
				},
				formLogin: {
					PhoneNumber: '',
					passwords: '',
					imgsCode: ''
				},
				forgetEmail: {
					email: '',
					imgsCode: '',
					VerificationCode: ''
				},
				forgetPhone: {
					PhoneNumber: '',
					imgsCode: '',
					VerificationCode: ''
				},
				//设置新密码
				resetPwdForm: {
					newPwd: '',
					comfirPwd: ''
				},
				rules: {
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							validator: validateEmail,
							trigger: ['blur', 'change']
						}
					],
					PhoneNumber: [{
							required: true,
							message: '请输入手机号',
							trigger: 'change'
						},
						{
							validator: validatePhone,
							trigger: 'change'
						}
					],
					name: [{
						required: true,
						message: '请输入昵称',
						trigger: 'change'
					}],
					passwords: [{
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$',
							message: '密码必须由6-16个英文字母和数字的字符串组成',
							trigger: 'change'
						}
					],
					confirmPassWord: [{
						required: true,
						message: '请确认密码',
						trigger: 'change'
					}, {
						validator: validatePass2,
						trigger: 'change'
					}],
					verification2: [{
						required: true,
						trigger: 'blur',
						validator: validateVerifycode
					}],
					imgsCode: [{
						required: true,
						trigger: 'blur',
						validator: validateVerifycode
					}],
					VerificationCode: [{
						required: true,
						message: '请输入手机验证码',
						trigger: 'change'
					}],
					newPwd: [{
							required: true,
							trigger: "change",
							message: '请输入新密码'
						},
						{
							pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$',
							message: '密码必须由6-16个英文字母和数字的字符串组成',
							trigger: 'change'
						}
					],
					comfirPwd: [{
						required: true,
						trigger: "change",
						message: '请确认新密码'
					}, {
						validator: validatePwd2,
						trigger: 'blur'
					}]
				},
				timer: null,
				count: '',
				show: true,
				headBg: -1
			}
		},
		created() {
//			this.getImgCode()
		},
		mounted() {
			window.addEventListener("scroll", this.showIcon, true);
		},
		methods: {
			//图形验证码
			getImgCode() {
				let _this = this
				let param = {
					SessionId: ''
				}
				this.axios.post(this.GLOBAL.BASE_URL + '/api/imageCode', param).then((res) => {
					if(res.data.status == '200') {
						_this.codeImg = 'data:image/png;base64,' + res.data.data.imagedata
						let sessionid = res.data.data.sessionid
						sessionStorage.setItem('sessionid', sessionid)
						_this.imgcodeTxt = res.data.data.imagecode
					}
				})
			},
			//注册获取手机验证码方法
			getPhoneCodeApi() {
				let _this = this
				const TIME_COUNT = 60
				let sessionId = sessionStorage.getItem('sessionid')
				let param = {
					SessionId: sessionId,
					phonenumber: _this.phoneNumber
				}
				_this.axios.post(_this.GLOBAL.BASE_URL + '/api/phoneCode', param).then((res) => {
					console.log(res.data.message)
					if(res.data.status == '200') {
						_this.$message({
							message: res.data.message,
							type: 'success'
						})
						_this.codeModal = false
						if(!_this.timer) {
							_this.count = TIME_COUNT;
							_this.show = false;
							_this.timer = setInterval(() => {
								if(_this.count > 0 && _this.count <= TIME_COUNT) {
									_this.count--;
									_this.codedisabled = true
								} else {
									_this.show = true;
									_this.codedisabled = false
									clearInterval(_this.timer); // 清除定时器
									_this.timer = null;
								}
							}, 1000)
						}
					} else {
						_this.$message({
							message: res.data.message,
							type: 'error'
						})
					}
				})
			},
			//注册获取手机验证码确定
			regSendCode(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						this.getPhoneCodeApi()
					} else {
						return false
					}
				})
			},
			showIcon(e) {
				let _this = this
				let scrollTop = e.target.scrollTop
				if(
					scrollTop > 200
				) {
					_this.headBg = 1
				} else {
					_this.headBg = -1
				}
			},
			//获取手机验证码
			getPhoneCode() {
				let _this = this
				_this.getImgCode()
				_this.codeModal = true
			},
			//获取邮箱验证码
			getEmailCode() {
				let _this = this
				_this.getImgCode()
				_this.codeModal = true
			},
			//手机设置新密码
			RetrievePwdPhone(formName) {
				let _this = this
				let sessionId = sessionStorage.getItem('sessionid')
				let param = {
					SessionId: sessionId,
					resetoption: 0,
					PhoneEmail: _this.forgetPhone.PhoneNumber,
					imagecode: _this.imgcodeTxt,
					validationcode: _this.forgetPhone.VerificationCode
				}
				_this.$refs[formName].validate((vali) => {
					if(vali) {
						_this.axios.post(_this.GLOBAL.BASE_URL + '/api/passRetrieve', param).then((res) => {
							if(res.data.status == '200') {
								_this.active = 3
								_this.switchTab = 3
							} else {
								_this.$message({
									message: res.data.message,
									type: 'error'
								})
							}
						}).catch(error => {
							console.log(error)
						})
					} else {
						return false
					}
				})

			},
			// 切换验证码
			refreshCode() {
				let _this = this
			},

			//切换首页
			checkIndex() {
				let _this = this
				_this.indexShow = true
			},
			//登录
			loginBtn() {
				let _this = this
				_this.indexShow = false
				_this.LoginShow = 2
			},
			//注册
			register() {
				let _this = this
				_this.indexShow = false
				_this.LoginShow = 3
			},
			//登录
			loginShow() {
				let _this = this
				_this.typeShow = true
				console.log(12)
			},
			//使用邮箱找回密码
			useEmail() {
				let _this = this
				_this.getImgCode()
				_this.active = 1
			},
			//使用手机找回密码
			usePhone() {
				let _this = this
				_this.getImgCode()
				_this.active = 2
			},
			//忘记密码
			forgetPwd() {
				let _this = this
				_this.typeShow = true
				_this.forgetType = 'second'
				_this.LoginShow = 1
			},
			//重新设置密码确定
			comfirPwdBtn(formName) {
				let _this = this
				let param = {
					SessionId: sessionStorage.getItem('sessionid'),
					PhoneNumber: '13510287137',
					emial: _this.forgetEmail.email,
					password: _this.resetPwdForm.newPwd
				}
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.axios.post(_this.GLOBAL.BASE_URL + '/api/doPassReset', param).then((res) => {
							if(res.data.status == '200') {
								_this.$message({
									message: res.data.message,
									type: 'success'
								})
								_this.typeShow = false
								_this.active = 1
								_this.switchTab = 1
								//								_this.activeName = 'first'
								_this.LoginShow = 2
								_this.getImgCode()
							} else {
								_this.$message({
									message: res.data.message,
									type: 'error'
								})
							}
						})

					} else {
						console.log('error submit!!');
						return false
					}
				})
			},
			// 登录
			loginIn(formName) {
				let _this = this
				let sessionid = sessionStorage.getItem('sessionid')
				let param = {
					SessionId: sessionid,
					PhoneEmail: _this.formLogin.PhoneNumber,
					Password: _this.formLogin.passwords,
					imagecode: _this.formLogin.imgsCode
				}
				sessionStorage.setItem('token','23424jd')
				_this.$router.push('/')
//				_this.$refs[formName].validate((valid) => {
//					if(valid) {
//						_this.axios.post(_this.GLOBAL.BASE_URL + '/api/userLogin', param).then((res) => {
//							if(res.data.status == '200') {
//								_this.$message({
//									message: res.data.message,
//									type: 'success'
//								})
//								_this.$router.push('/')
//								sessionStorage.setItem('sessionid', res.data.data.sessionid)
//							} else {
//								_this.$message({
//									message: res.data.message,
//									type: 'error'
//								})
//							}
//
//						}).catch((error) => {
//							console.log(error)
//						})
//
//					} else {
//						_this.getImgCode()
//						return false
//
//					}
//				})
			},
			//注册
			submitRegister(formName) {
				let _this = this
				let sessionid = sessionStorage.getItem('sessionid')
				let param = {
					sessionid: sessionid,
					phonenumber: _this.formReg.PhoneNumber,
					name: _this.formReg.name,
					password: _this.formReg.passwords,
					phonecode: _this.formReg.VerificationCode,
					RecommendCode: _this.formReg.RecommendCode
				}
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.axios.post(_this.GLOBAL.BASE_URL + '/api/userRegister', param).then((res) => {
							if(res.data.status == '200') {
								_this.$message({
									message: res.data.message,
									type: 'success'
								})
								sessionStorage.setItem('name', res.data.data.name)
								_this.$router.push('/')
							} else {
								_this.$message({
									message: res.data.message,
									type: 'error'
								})
							}
						}).catch((error) => {
							console.log(error)
						})
					} else {
						_this.getImgCode()
						return false
					}
				})
			},
			// 子组件选中的
			showMessageFromChild(data) {
				let _this = this
				_this.indexShow = data
				_this.tabCheck = 'second'
			},
			handleClick(tab, event) {
				this.getImgCode()
			},
			//忘记密码tab切换
			forgetClick(tab, event) {
				let _this = this
				_this.getImgCode()
				if(tab.index == '0') {
					_this.typeShow = false
					_this.LoginShow = 2
				} else {
					_this.typeShow = true
				}
			}
		}
	}
</script>

<style scoped>
	body {
		min-width: 1200px;
	}
	
	.confirmLogin {
		width: 100%;
		padding: 17px 20px;
		background: #26d9b3;
		border-color: #26d9b3;
	}
	
	.aboutUsDes {
		height: 50%;
		background: #4f4e4c;
		color: #fff;
	}
	
	.joinBtn {
		padding: 15px 50px;
		font-size: 16px;
	}
	
	.bannerLeft {
		position: relative;
		top: 0;
		left: 0;
		transform: rotate(-30deg) skew(25deg) scale(.8);
	}
	
	.bannerItem {
		position: absolute;
		display: inline-block;
		width: 360px;
		height: 640px;
		background-color: rgba(255, 255, 255, .8);
		/*transform: rotate(-160deg);*/
		transform: translate(120px, -120px)
	}
	
	.bannerLeft .item2 {
		top: 15px;
		left: 15px;
		background-color: rgba(255, 255, 255, .7);
	}
	
	.bannerLeft .item3 {
		top: 30px;
		left: 30px;
		background-color: rgba(255, 255, 255, .6);
	}
	
	.bannerLeft .item4 {
		top: 45px;
		left: 45px;
		background-color: rgba(255, 255, 255, .5);
	}
	
	.bannerLeft .item5 {
		top: 60px;
		left: 60px;
		background-color: rgba(255, 255, 255, .4);
	}
	
	.flexItem {
		display: flex;
		align-items: center;
		/*justify-content: center;*/
		background: #f2f2f2;
		/*padding: 50px 0;*/
		height: 192px;
		padding: 0 15px
	}
	
	.nthTwo {
		background: #ededed;
	}
	
	.nthThree {
		background: #e8e8e8;
	}
	
	.itemBg {
		width: 100%;
		background: #f8f9fa;
	}
	
	.fzTxtCol {
		color: #4f4e4c;
		position: relative;
		display: inline-block;
	}
	
	.fzTxtCol:before {
		content: '';
		position: absolute;
		top: 50%;
		left: -110px;
		width: 90px;
		height: 1px;
		background: #4f4e4c;
	}
	
	.fzTxtCol:after {
		content: '';
		position: absolute;
		top: 50%;
		right: -110px;
		width: 90px;
		height: 1px;
		background: #4f4e4c;
	}
	
	.identifybox {
		display: flex;
		justify-content: space-between;
		width: 120px;
		margin-top: 30px;
	}
	
	.iconstyle {
		color: #409EFF;
	}
	
	.headNav {
		width: 100%;
		height: 60px;
		background: transparent;
		position: fixed;
		top: 0;
		left: -17px;
		z-index: 9999;
		min-width: 1200px;
	}
	
	.nav li {
		display: inline-block;
		width: 100px;
		height: 60px;
		line-height: 60px;
	}
	
	.navHeads .navBox li {
		display: inline-block;
	}
	
	.navHeads .navBox li a {
		display: inline-block;
		color: #fff;
		width: 120px;
		font-size: 16px;
		height: 60px;
		line-height: 60px;
		cursor: pointer;
		text-align: center;
	}
	
	.navHeads .navBox a:hover {
		color: rgb(254, 203, 69);
	}
	
	.navHeads .navRightBox {
		width: 100%;
	}
	
	.navHeads .navBox .loginBtn,
	.navHeads .navBox .registerBtn {
		display: inline-block;
		width: 60px;
		text-align: center;
	}
	
	.loginBox {
		width: 100%;
		height: 100%;
		background: #f2f2f2;
	}
	
	.loginMain {
		background: #fff;
		padding: 30px;
	}
	
	.footer {
		margin-top: 50px;
		padding: 80px 0;
		border-top: #e2e2e2 solid 1px;
		text-align: center;
	}
	
	.forgetTxt,
	.forgetTxt2 {
		cursor: pointer;
		color: #26D9B3;
	}
	
	.forgetTxt2 {
		color: #666;
	}
	
	.forgetTxt:hover,
	.forgetTxt2:hover {
		color: #0099F0;
	}
	
	.activeThis {
		color: #FFF;
		background-color: #26d9b3;
		border-color: #26d9b3;
	}
	
	.bgCol {
		background: #4f4e4c;
	}
	
	footer {
		width: 100%;
	}
</style>