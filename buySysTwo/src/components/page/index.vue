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
					<!--登录-->
					<div v-show='loginStatus==1' class="disflex mt50 el-col-24">
						<div class="loginIcon">
							<img src="../../assets/image/bjlogin.png" alt="" />
						</div>
						<el-form :model="formLogin" ref="formLogin" :rules='rules' class="loginForm" status-icon>
							<h2 class="txtCenter mb20 fz18">登录</h2>
							<el-form-item prop='PhoneNumber'>
								<el-row>
									<el-col class="loginItem mr10" :span="7" :xs="24">
										<el-input placeholder="请输入手机号/邮箱" v-model="formLogin.PhoneNumber">
										</el-input>

									</el-col>
								</el-row>
							</el-form-item>
							<el-form-item class="loginItem" prop='passwords'>
								<el-input type='password' v-model="formLogin.passwords" minlength="6" maxlength='16' placeholder='请输入密码'>

								</el-input>
							</el-form-item>
							<el-row>
								<el-col :span='10' :xs='24'>
									<el-form-item class="loginItem" prop='imgsCode'>
										<el-input v-model="formLogin.imgsCode" style='width: 100%;' placeholder='请输入图形码'>

										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span='14' :xs='24' class='txtLeft'>
									<div class="identifybox">
										<el-tooltip content="点击切换图片" placement="top">
											<img :src="codeImg" class="avatar" @click='getImgCode'>
										</el-tooltip>
									</div>
								</el-col>
							</el-row>
							<el-form-item class='mt50'>
								<el-button type="primary" class="loginBtn" @click="loginIn('formLogin')">立即登录</el-button>
								<span class="forgetTxt" @click="register">立即注册</span>
								<span class="forgetTxt">|</span>
								<span class="forgetTxt" @click="forgetPwd">忘记密码</span>
							</el-form-item>
						</el-form>
					</div>
					<!--注册-->
					<div v-show="loginStatus==2" class='disflex'>
						<el-form :model="formReg" ref="formReg" :rules="rules" class="regForm" status-icon>
							<h3 class="mb20 fz18 txtCenter">注册</h3>
							<el-form-item prop="PhoneNumber" class="loginItem">
								<el-input v-model="formReg.PhoneNumber" placeholder='请输入手机号'>

								</el-input>
							</el-form-item>

							<el-row>
								<el-col :span='14'>
									<el-form-item class="loginItem" prop='VerificationCode'>
										<el-input v-model="formReg.VerificationCode" style='width: 100%;' placeholder='请输入验证码'>

										</el-input>

									</el-form-item>
								</el-col>
								<el-col :span='10'>
									<el-button type="primary" @click='getPhoneCode' :disabled="codedisabled">
										<span v-show="show">获取验证码</span>
										<span v-show='!show'>{{count}}秒</span>
									</el-button>
								</el-col>
							</el-row>
							<el-form-item prop="name" class="loginItem">
								<el-input v-model="formReg.name" placeholder='请正确填写您的姓名,填写后不可修改'>

								</el-input>
								<!--<p class="tipTxt">请正确填写您的姓名,填写后不可修改</p>-->
							</el-form-item>
							<el-form-item prop="passwords" class="loginItem">
								<el-input v-model="formReg.passwords" minlength='6' maxlength='16' type='password' placeholder='密码为6-16位英文字母和数字组成'>

								</el-input>
								<!--<p class="tipTxt">6-16位英文字母和数字组成</p>-->
							</el-form-item>
							<el-form-item prop="confirmPassWord" class="loginItem">
								<el-input v-model="formReg.confirmPassWord" minlength='6' maxlength='16' type='password' placeholder='请确认密码'>

								</el-input>
							</el-form-item>
							<el-form-item class="loginItem">
								<el-input v-model="formReg.RecommendCode" placeholder='请输入推荐码'>

								</el-input>
							</el-form-item>
							<el-form-item class='txtCenter'>
								<el-checkbox-group v-model="formReg.agreeService">
									<el-checkbox label="同意服务条款" class='col9' name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" class='loginBtn' @click="submitRegister('formReg')">立即注册</el-button>
							</el-form-item>
							<p class="txtCenter">已有账号?<span @click='loginBtn' class="forgetTxt">马上登录</span></p>
						</el-form>
					</div>
					<div v-show='loginStatus==3' class="loginForm">
						<div v-show='switchTab!=3'>
							<el-button :class="active === 1?'activeThis':''" size='small' @click="useEmail">通过邮箱找回</el-button>
							<el-button size='small' :class="active === 2?'activeThis':''" @click='usePhone'>通过手机找回</el-button>
						</div>
						<el-form :model="forgetEmail" ref="forgetEmail" :rules='rules' class='mt20' status-icon v-show='active==1'>
							<el-form-item class="loginItem" prop='email'>
								<el-input placeholder="请输入邮箱" v-model="forgetEmail.email">

								</el-input>
							</el-form-item>
							<el-row>
								<el-col :span='10' :xs='24'>
									<el-form-item class="loginItem" prop='imgsCode'>
										<el-input v-model="forgetEmail.imgsCode" style='width: 100%;' placeholder='请输入图形码'>

										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span='14' :xs='24' class='txtLeft'>
									<div class="identifybox">
										<div>
											<el-tooltip content="点击切换图片" placement="top">
												<img :src="codeImg" class="avatar" @click='getImgCode'>
											</el-tooltip>
										</div>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='15'>
									<el-form-item>
										<el-input placeholder="请输入验证码" style='width: 100%;' v-model="forgetEmail.VerificationCode">

										</el-input>

									</el-form-item>
								</el-col>
								<el-col :span='9'>
									<el-button type='primary' class='getCodeBtn' :disabled='getEmailPwd'>获取验证码</el-button>
								</el-col>
							</el-row>
							<el-form-item>
								<el-button type='primary' class='loginBtn' @click='resetPwdEmail'>确定</el-button>
							</el-form-item>

						</el-form>
						<el-form :model="forgetPhone" ref="forgetPhone" :rules='rules' class='mt20' status-icon v-show='active==2'>

							<el-form-item class="loginItem" prop='PhoneNumber'>
								<el-input placeholder="请输入手机号" v-model="forgetPhone.PhoneNumber">

								</el-input>
							</el-form-item>
							<el-row>
								<el-col :span='10' :xs='24'>
									<el-form-item class="loginItem" prop='imgsCode'>
										<el-input v-model="forgetPhone.imgsCode" style='width: 100%;' placeholder='请输入图形码'>

										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span='14' :xs='24' class='txtLeft'>
									<div class="identifybox">
										<div>
											<el-tooltip content="点击切换图片" placement="top">
												<img :src="codeImg" class="avatar" @click='getImgCode'>
											</el-tooltip>
										</div>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='15'>
									<el-form-item class="loginItem" prop='VerificationCode'>
										<el-input placeholder="请输入验证码" style='width: 100%;' v-model="forgetPhone.VerificationCode">

										</el-input>

									</el-form-item>
								</el-col>
								<el-col :span='9'>
									<el-button type='primary' :disabled="getPhonePwd" @click='forgetPhoneCode'>
										<span v-show="show">获取验证码</span>
										<span v-show='!show'>{{count}}秒</span>
									</el-button>
								</el-col>
							</el-row>
							<el-form-item>
								<el-button type='primary' class='loginBtn' @click="RetrievePwdPhone('forgetPhone')">确定</el-button>
							</el-form-item>

						</el-form>

						<el-form :model='resetPwdForm' ref='resetPwdForm' :rules="setPwdRule" status-icon v-show='switchTab==3'>
							<p class="mb20 fz18">重置密码</p>
							<el-form-item class="loginItem" prop="newPwd">
								<el-input v-model="resetPwdForm.newPwd" maxlength='16' type="password" autocomplete="off" placeholder='请输入新密码'>

								</el-input>
							</el-form-item>
							<el-form-item class="loginItem" prop="comfirPwd">
								<el-input v-model="resetPwdForm.comfirPwd" maxlength='16' type="password" autocomplete="off" placeholder='请再次输入新密码'>

								</el-input>
							</el-form-item>
							<el-form-item>
								<el-button type='primary' class='loginBtn' @click="comfirPwdBtn('resetPwdForm')">确定</el-button>
							</el-form-item>

						</el-form>
						<p class='mt30'>记得密码<span @click='loginBtn' class="forgetTxt">马上登录</span></p>
					</div>
				</div>
				<!--<div class="footer">
					<div>2019 © 版权所有</div>
				</div>-->
			</div>
		</div>
		<div class="index" v-show='indexShow'>
			<a id='index'></a>
			<div class="bannerBox">
				<div class="banner">
					<div class="headNav">
						<div class="navHeads">
							<div class="navImg login">
								<div class="imgBox">
									<img src="../../assets/image/logo.png" class="img-log" />
								</div>
							</div>
							<div class="navRightBox loginRi">
								<ul class="navBox">
									<li>
										<a @click="toTag('#index')">首页</a>
									</li>
									<li>
										<a @click="toTag('#Solution')">解决方案</a>
									</li>
									<li>
										<a @click="toTag('#about')">关于我们</a>
									</li>
									<li>
										<a class="loginBtn" @click="loginBtn">登录</a><span class="col">|</span>
										<a class="registerBtn" @click="register">注册</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="bannerTxt">
						<p class="col p2">各类海外电商平台,我们都能服务，行业第一</p>
						<!--<p class="col p2">我们都能服务，行业第一</p>-->
						<p class="col p2">"最专业 最稳定 最安全"</p>
						<el-button type='primary' class="addIn mt20" @click='loginBtn'>立即加入</el-button>
					</div>
				</div>
			</div>
			<!--平台-->
			<div class="taskShow">
				<p class="txtCenter fz30">平台</p>
				<p class="txtCenter col6 mt20 mb50">使用我们的产品轻松提高您的服务的性能，安全性和可靠性</p>
				<div class="widCon">
					<el-row :gutter="20">
						<el-col :span='8' :xs='24' class='txtCenter'>
							<div class="taskBor item1">
								<p class="fz20 taskItemTit titCol1">FBA任务</p>
								<p class="task-price"><span class="priceTask priceTxt1">￥100</span><span class="colItem">起</span></p>
								<div>
									<p class="mt20 taskDes">很棒的任务，快速简单安werrqeqrretetetetertewtetete全可靠大神的都是速简单安werrqeqrretetetetertewtetete全可靠大神的都是速简单安werrqeqrretetetetertewtetete全可靠大神的都是速简单安werrqeqrretetetetertewtetete全可靠大神的都是</p>
									<div class="buyBtn mt20">
										<el-button class='item1Btn titCol1' round @click="loginBtn">立即购买</el-button>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span='8' :xs='24' class='txtCenter'>
							<div class="taskBor item2">
								<p class="fz20 taskItemTit titCol2">加购任务</p>
								<p class="task-price"><span class="priceTask priceTxt2">￥100</span><span class="priceTxt2">起</span></p>
								<div>
									<p class="mt20 taskDes">很棒的任务，快速简单安全可靠大神的都是</p>
									<div class="buyBtn mt20">
										<el-button type='warning' class='item1Btn titCol2' round @click="loginBtn">立即购买</el-button>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span='8' :xs='24' class='txtCenter'>
							<div class="taskBor item3">
								<p class="fz20 taskItemTit titCol3">点赞任务</p>
								<p class="task-price"><span class="priceTask priceTxt3">￥100</span><span class="priceTxt3">起</span></p>
								<div>
									<p class="mt20 taskDes">很棒的任务，快速简单安全可靠大神的都是</p>
									<div class="buyBtn mt20">
										<el-button class='item1Btn titCol3' round @click="loginBtn">立即购买</el-button>
									</div>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--平台的特点-->
			<a id='Solution'></a>
			<div class="proType">
				<p class="txtCenter fz30 pt50">我们的优势</p>
				<p class="txtCenter fz16 txtCol mt20">用心满足跨境电商卖家们的多样化需求，我们定义标准，我们引领标准</p>
				<div class="mt50">
					<el-row>
						<el-col :span='8' :xs='24' class="txtCenter">
							<div>
								<div class="iconBox"><img class="iconFZ" src="../../assets/image/cx.png" /></div>
								<p class="col6 typeItem">诚信</p>
								<p class="col9 mt20">我们是最棒的</p>
							</div>
						</el-col>
						<el-col :span='8' :xs='24' class="txtCenter">
							<div>
								<p class="iconBox"><img class="iconFZ" src="../../assets/image/aq.png" /></p>
								<p class="col6 typeItem">安全</p>
								<p class="col9 mt20">长久稳定合作，铸就安全保障</p>
							</div>
						</el-col>
						<el-col :span='8' :xs='24' class="txtCenter">
							<div>
								<p class="iconBox"><img class="iconFZ" src="../../assets/image/jd.png" /></p>
								<p class="col6 typeItem">简单</p>
								<p class="col9 mt20">最智能的自动化对接ERP系统，一目了然.</p>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--关于我们-->
			<div class="aboutUs">
				<a id='about'></a>
				<div class="aboutCon">
					<p class="txtCenter fz30 aboutTit">关于我们</p>
					<p class="aboutDes col9">amzBuy研发团队，拥有精湛、深厚的技术功底，具有多年电商系统开发经验，专注于数据挖掘和跨境电商云服务开发。 管理团队，是一群资深外贸老炮，拥有超过10年的跨境电商实战与传统行业运营经验，充分了解跨境电商卖家的需求和行业发展方向，为您的跨境之路保驾护航。</p>
					<img src="../../assets/image/about.jpg" class="aboutImg" alt="" />
				</div>
			</div>
			<!--联系我们-->
			<!--<div class="contactMe">
				<p class="txtCenter col fz30 contactTitle">加入我们，为您节省99%的研发投入</p>
				<div class="txtCenter mt50">
					<el-button type='warning' class='contactBtn'>立即加入</el-button>
				</div>
			</div>-->
			<footer>
				<div class='footerTit center'>
					<!--<p class="fz20 col mb20">加入我们，为您节省99%的研发投入</p>-->
					<el-button type='warning' class='contactBtn fz16' @click='loginBtn'>立即加入</el-button>
				</div>
				<!--<p class="footerTit fz20 col">加入我们，为您节省99%的研发投入</p>-->
				<p class="txtCenter footerTxt">©2019 Buy System</p>
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
				<el-button @click="getImgCode" type='text' class="textbtn">看不清，换一张</el-button>
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
				let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				if(reg.test(value)) {
					callback()
					this.getEmailPwd = false
					this.phoneNumber = value
				} else {
					this.getEmailPwd = true
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
				} else {
					this.codedisabled = true
					this.getPhonePwd = true
					callback(new Error('请输入正确的手机号'))
				}
			}
			//注册密码
			let validatePass = (rule, value, callback) => {
				let _this = this
				if(value === '') {
					callback(new Error('请输入密码'))
				} else if(_this.formReg.confirmPassWord !== '') {
					_this.$refs.formReg.validateField('confirmPassWord')
				} else if(value.length >= 6) {
					callback()
				} else {
					callback(new Error('密码必须由6-16个英文字母和数字的字符串组成'))
				}
			};
			//重新设置密码
			let validatePwd = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入新密码'))
				} else if(this.resetPwdForm.comfirPwd !== '') {
					this.$refs.resetPwdForm.validateField('comfirPwd')
				} else if(value.length >= 6) {
					callback()
				} else {
					return callback(new Error('密码必须由6-16个英文字母和数字的字符串组成'))
				}
			};
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
			// <!--注册二次验证密码-->
			let validatePass2 = (rule, value, callback) => {
				let _this = this
				if(value === '') {
					callback(new Error('请再次输入密码'))
				} else if(value !== _this.formReg.passwords) {
					callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}
			};
			//图形码
			let validateVerifycode = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入图形码'))
				} else if(value.toLocaleUpperCase() !== this.imgcodeTxt.toLocaleUpperCase()) {
					callback(new Error('图形码不正确!'))
				} else {
					callback()
				}
			};
			return {
				loginStatus: 1, //登录注册切换
				getEmailPwd: true, //通过邮箱找回密码验证
				getPhonePwd: true, //通过手机找回密码验证
				codedisabled: true, //获取验证码按钮
				codeModal: false, //图形码弹窗
				codeImg: '',
				indexShow: true,
				active: 1,
				forgetType: 'second',
				activeName: 'first',
				typeShow: false,
				switchTab: 1,
				imgcodeTxt: '', //返回的验证码
				formReg: {
					PhoneNumber: '',
					name: '',
					passwords: '',
					confirmPassWord: '',
					imgsCode: '',
					VerificationCode: '',
					RecommendCode: null,
					agreeService: true
				},
				formLogin: {
					PhoneNumber: '',
					passwords: '',
					imgsCode: ''
				},
				forgetEmail: {
					email: null,
					imgsCode: '',
					VerificationCode: ''
				},
				forgetPhone: {
					PhoneNumber: null,
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
						message: '请输入姓名',
						trigger: 'change'
					}],
					passwords: [{
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							pattern: /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/,
							message: '密码必须由6-16个英文字母和数字的字符串组成',
							trigger: 'change'
						}
						//						{
						//							validator: validatePass,
						//							trigger: 'change'
						//						}
					],
					confirmPassWord: [{
							required: true,
							message: '请确认密码',
							trigger: 'change'
						},
						{
							validator: validatePass2,
							trigger: 'change'
						}
					],
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
					}]
				},
				setPwdRule: {
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
						validator: validatePwd2,
						trigger: 'blur'
					}]
				},
				timer: null,
				count: '',
				show: true
			}
		},
		created() {
			//			this.getImgCode()
		},
		props: [],
		methods: {
			//锚定位
			toTag(id) {
				document.querySelector(id).scrollIntoView(true)
			},

			//图形验证码
			getImgCode() {
				let _this = this
				let param = {
					SessionId: ''
				}
				_this.axios.post(this.GLOBAL.BASE_URL + '/api/imageCode', param).then((res) => {
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
					phonenumber: _this.formReg.PhoneNumber
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
			//获取手机验证码
			getPhoneCode() {
				let _this = this
				_this.getImgCode()
				_this.codeModal = true
			},
			//手机找回密码获取验证码
			forgetPhoneCode() {
				let _this = this
				const TIME_COUNT = 60
				let sessionId = sessionStorage.getItem('sessionid')
				let param = {
					SessionId: sessionId,
					phonenumber: _this.forgetPhone.PhoneNumber
				}
				_this.axios.post(_this.GLOBAL.BASE_URL + '/api/phoneCode', param).then((res) => {
					console.log(res.data.message)
					if(res.data.status == '200') {
						_this.$message({
							message: res.data.message,
							type: 'success'
						})
						if(!_this.timer) {
							_this.count = TIME_COUNT;
							_this.show = false;
							_this.timer = setInterval(() => {
								if(_this.count > 0 && _this.count <= TIME_COUNT) {
									_this.count--;
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
			//手机设置新密码
			RetrievePwdPhone(formName) {
				let _this = this
				let sessionId = sessionStorage.getItem('sessionid')
				let param = {
					SessionId: sessionId,
					resetoption: 0,
					PhoneEmail: _this.forgetPhone.PhoneNumber,
					imagecode: _this.forgetPhone.imgsCode,
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
			//邮箱找回密码
			resetPwdEmail() {
				let _this = this
				_this.active = 3
				_this.switchTab = 3
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
				_this.loginStatus = 1
				_this.switchTab = 1
			},
			//注册
			register() {
				let _this = this
				_this.indexShow = false
				_this.loginStatus = 2
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
				_this.loginStatus = 3
				_this.switchTab = 1
				_this.active = 1
				_this.forgetType = 'second'
				_this.getImgCode()
			},
			//重新设置密码确定
			comfirPwdBtn(formName) {
				let _this = this
				let param = {
					SessionId: sessionStorage.getItem('sessionid'),
					PhoneNumber: _this.forgetPhone.PhoneNumber,
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
								_this.activeName = 'first'
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
				sessionStorage.setItem('token', '1234242fddf')
				_this.$router.push('/')
				//				_this.$refs[formName].validate((valid) => {
				//					if(valid) {
				//						_this.axios.post(_this.GLOBAL.BASE_URL + '/api/userLogin', param).then((res) => {
				//							if(res.data.status == '200') {
				//								_this.$message({
				//									message: res.data.message,
				//									type: 'success'
				//								})
				//								sessionStorage.setItem('sessionid', res.data.data.sessionid)
				//								sessionStorage.setItem('token', res.data.data.sessionid)
				//								_this.$router.push('/')
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
						_this.axios.post(_this.GLOBAL.BASE_URL + 'api/userRegister', param).then((res) => {
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
			//忘记密码tab切换
			forgetClick(tab, event) {
				let _this = this
				_this.getImgCode()
				if(tab.index == '0') {
					_this.typeShow = false
				} else {
					_this.typeShow = true
				}
			}
		}
	}
</script>

<style scoped>
	.getCodeBtn {
		background: #60A19D;
		border-color: #60A19D;
	}
	
	.identifybox {
		display: flex;
		justify-content: space-between;
		width: 120px;
	}
	
	.iconstyle {
		color: #409EFF;
	}
	
	.headNav {
		width: 100%;
		min-width: 1024px;
		height: 60px;
		background: #ad5dd8;
		position: fixed;
		top: 0;
		left: -17px;
		right: 0;
		z-index: 9999;
	}
	
	.nav li {
		display: inline-block;
		width: 100px;
		height: 60px;
		line-height: 60px;
	}
	
	.navHeads {
		/*width: 80%;*/
		display: flex;
		align-items: center;
		background: transparent;
		justify-content: space-between;
		/*padding-top: 20px;*/
		width: 65%;
		margin: 0 auto;
	}
	
	.navHeads .navBox {
		text-align: right;
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
		background: #ad5dd8;
	}
	
	.loginBox {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	
	.loginMain {
		background: #fff;
		padding: 30px;
	}
	
	.footer {
		margin-top: 50px;
		padding: 30px 0;
		border-top: #e2e2e2 solid 1px;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.forgetTxt {
		cursor: pointer;
		margin-left: 10px;
		color: #60A19D;
	}
	
	.forgetTxt:hover {
		color: #0099F0;
	}
	
	.activeThis {
		color: #FFF;
		background-color: #60A19D;
		border-color: #60A19D;
	}
	
	.addIn {
		width: 200px;
	}
	
	.taskDes {
		padding: 0 50px;
		line-height: 25px;
		height: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
		-moz-box-orient: vertical;
		font-size: 16px;
		color: #666;
	}
	.index{
		min-width: 1024px;
	}
	@media only screen and (max-width: 1024px) {
		.navHeads {
			width: 90%;
		}
		.headNav {
			left: 0;
		}
		.widCon{
			width: 90%;
		}
		.proType{
			width: 90%;
		}
	}
</style>