<template>
	<div>
		<el-form :model="likesForm" ref="likesForm" class="demo-ruleForm">
			<el-row>
				<el-form-item label="终端平台">
					<el-radio-group v-model="likesForm.TerminalPlatform ">
						<el-radio label="PC"></el-radio>
						<el-radio label="Android"></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-row>
			<el-row>
				<el-col :span="6">
					<span>链接地址</span>
				</el-col>
				<el-col :span="7" class="center">
					<span>选项操作</span>
				</el-col>
				<el-col :span="4" class="center">
					<span>数量</span>
				</el-col>
				<el-col :span="4" class="center">
					<span>服务费</span>
				</el-col>
			</el-row>
			<div v-for="(item,index) in likesForm.likeData" :key="index" class="mt30">
				<el-row>
					<el-col :span="6" :xs="24" class="center">
						<el-form-item :prop="`likeData[${index}].address`" :rules="[{required: true, message: '链接不能为空', trigger: 'blur'},{pattern:  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/, message: '请以http://或https://开头', trigger: 'change'}]">
							<el-input type="text" v-model="item.address" placeholder="请以http://或https://开头"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" :xs="24" class="center mb20">
						<el-radio-group v-model="item.selectType">
							<el-radio label="点赞"></el-radio>
							<el-radio label="点踩"></el-radio>
							<el-radio label="Report Abuse"></el-radio>
						</el-radio-group>
					</el-col>
					<el-col :span="4" :xs="24" class="center">
						<el-form-item :prop="`likeData[${index}].nums`" :rules="[{required: true, message: '数量不能为空', trigger: 'blur'},{pattern:  /^\+?[1-9][0-9]*$/, message: '数量不能小于0', trigger: 'change'}]">
							<el-input v-model="item.nums"></el-input>
						</el-form-item>

					</el-col>
					<el-col :span="3" :xs="24" class="center">
						<span class="servTxt">{{item.proService}}</span>
					</el-col>
					<el-col :span="3" :xs="24">
						<el-button type="danger" @click="removeLike(item,index)" :disabled="disabled2">删除</el-button>
					</el-col>
				</el-row>
			</div>
			<el-row class="mt20">
				<el-button @click="addLikes"><i class="el-icon-circle-plus-outline"></i>新增点赞任务</el-button>
			</el-row>
			<el-form-item label="合计结算" class="mt30">
				<span>￥{{likesForm.total}}</span>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="confirLikeForm( 'likesForm')">确定</el-button>
				<el-button @click="back">返回</el-button>
			</el-form-item>
		</el-form>
		<el-dialog title="付款" :visible.sync="paymentModel" :close-on-click-modal="false" width="40%" :before-close="paymentClose" center>
			<el-form :model="paymentForm" class="demo-ruleForm">
				<el-row :gutter="20">
					<el-col :span="11" :xs="24" :sm="11" :md="11">
						<el-form-item label="当前余额">
							<span class="tipRed">￥0</span>
						</el-form-item>
						<div>
							<el-form-item label="待付款金额">
								<span class="tipRed">￥12</span>
							</el-form-item>
						</div>						
					</el-col>
				</el-row>
			</el-form>
			<div slot='footer' class="dialog-footer">
				<el-button type="primary">确定</el-button>
				<el-button @click="paymentClose">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'likesTask',
		data() {
			return {
				paymentModel: false,
				disabled2: true,
				likesForm: {
					likeData: [{
						proService: '33',
						address: '',
						selectType: '点赞',
						nums: ''
					}],
					total: '0.00',
					TerminalPlatform: 'PC'
				},
				paymentForm: {
					balancePayment: '',
					cashPayment: '',
					paymentType: '支付宝',
					recceiveAccount: '圭贤',
					PayAccount: '',
					tradingFlow: ''
				}
			}
		},
		methods: {
			// 付款关闭页面
			paymentClose() {
				let _this = this
				_this.paymentModel = false
				_this.paymentForm = {
					balancePayment: '',
					cashPayment: '',
					paymentType: '支付宝',
					recceiveAccount: '圭贤',
					PayAccount: '',
					tradingFlow: ''
				}
			},
			// 新增一行点赞任务
			addLikes() {
				let _this = this
				_this.likesForm.likeData.push({
					proService: '22',
					address: '',
					selectType: '',
					nums: ''
				})
				let len = _this.likesForm.likeData.length
				if(len > 1) {
					_this.disabled2 = false
				}
			},
			// 删除一行点赞
			removeLike(item, index) {
				let _this = this
				_this.index = _this.likesForm.likeData.indexOf(item)
				let len =_this.likesForm.likeData.length
				if(index !== -1) {
					_this.likesForm.likeData.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled2 = true
				}
			},
			// 点赞任务提交
			confirLikeForm(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.paymentModel = true

					} else {
						return false

					}
				})
			},
			// 返回
			back() {
				let _this = this
				_this.$router.push('/index')
			},
		}
	}
</script>

<style>

</style>