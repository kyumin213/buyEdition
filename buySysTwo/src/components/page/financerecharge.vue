<template>
	<div>
		<div class="accountTab">
			<div @click='accountManage'>账户总览</div>
			<!--<div @click='accountManage' class="itemOne">资金明细</div>-->
		</div>
		<div class="rechargeBox">
			<div>当前余额：<span class="fz18 colTxt">￥0</span></div>
			<el-form :model='rechargeForm' ref='rechargeForm' class='mt20 ml20' :rules='rechargeRules' :inline="true" label-width="80px">
				<el-row>
					<el-col>
						<el-form-item label='充值金额'>
							<el-radio-group v-model="rechargeForm.money">
								<el-radio-button label="100元"></el-radio-button>
								<el-radio-button label="300元"></el-radio-button>
								<el-radio-button label="500元"></el-radio-button>
								<el-radio-button label="800元"></el-radio-button>
								<el-radio-button label="1000元"></el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item label='自定义' prop='moneys'>
							<el-input v-model='rechargeForm.moneys' class='disInline'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label='付款方式'>
					<el-radio-group v-model="rechargeForm.payType">
						<el-radio label="1">支付宝</el-radio>
						<!--<el-radio label="2">微信</el-radio>-->
						<el-radio label="3">银行卡</el-radio>
					</el-radio-group>
				</el-form-item>
				<div class="ml30">
					<el-button type='primary' @click="comfirPay">确认</el-button>
					<el-button @click='RechargeModal=false'>取消</el-button>
				</div>
			</el-form>
		</div>

		<!--支付宝付款-->
		<el-dialog title="支付宝" :visible.sync="AlipayPaymentModal">
			<div class="txtCenter">
				<img class="alipayImg" src="../../assets/image/alipay.jpg" />
				<div class="mt20 colred fz20">充值到账，请联系客服</div>
			</div>
		</el-dialog>
		<!--银行卡付款-->
		<el-dialog title="银行卡" :visible.sync="bankPayModal" :close-on-click-modal="false" :before-close="closeModel">
			<p>请打款至以下指定账户</p>
			<div class="accountCon">
				<p>
					<span>户名：</span><span>{{bankPayForm.accountName}}</span>
				</p>
				<p>
					<span>银行名称：</span>
					<span>{{bankPayForm.openBank}}</span>
				</p>
				<p>
					<span>银行账号：</span>
					<span>{{bankPayForm.accountNumber}}</span>
				</p>
				<p>
					<span>识别码：</span>
					<span>{{bankPayForm.IdentificationCode}}</span>
					<span class="colred fz18">(请将识别码填写在转账备注信息内)</span>
				</p>
			</div>
			<div>到账时间一般为1-5个工作日,请留意账户余额变化.如有疑问请向客服咨询.</div>
			<span slot='footer' class="dialog-footer">
				<el-button @click="closeModel">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import vali from '../common/validate'
	export default {
		data() {
			return {
				activeName: 'first',
				AlipayPaymentModal: false,
				bankPayModal: false,
				rechargeForm: {
					money: '100元',
					moneys: '',
					payType: '1'
				},
				//银行卡信息
				bankPayForm: {
					accountName: '',
					openBank: '',
					accountNumber: '',
					IdentificationCode: ''
				},
				rechargeRules: {
					moneys: [{
							validator: vali.proPrice,
							trigger: 'change'
						},
						{
							required: false,
							trigger: 'change'
						}
					]
				},
			}
		},
		methods: {
			//充值确定
			comfirPay() {
				let _this = this
				let types = _this.rechargeForm.payType
				console.log(types)
				if(types === '1') {
					_this.AlipayPaymentModal = true
					_this.RechargeModal = false
				}
				if(types === '3') {
					_this.bankPayModal = true
					_this.RechargeModal = false
				}
			},
			//关闭银行卡充值弹窗
			closeModel() {
				let _this = this
				_this.bankPayModal = false
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			//账户总览
			accountManage(){
				let _this = this
				_this.$router.push('/accountManage')
			}
		}
	}
</script>

<style scoped>
	.accountTab {
		display: flex;
		justify-content: flex-start;
	}
	
	.accountTab div {
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #fff;
		border: #eee solid 1px;
		border-bottom: none;
		cursor: pointer;
	}
	.accountTab div:hover{
		color: #009688;
	}
	.itemOne {
		border-right: none;
	}
	
	.rechargeBox {
		border: #eee solid 1px;
		padding: 30px;
	}
	
	.alipayImg {
		width: 350px;
	}
	
	.accountCon {
		width: 85%;
		margin: 20px auto;
		padding: 20px;
		box-sizing: border-box;
		background: #eee;
	}
		.accountCon p {
		line-height: 40px;
	}
</style>