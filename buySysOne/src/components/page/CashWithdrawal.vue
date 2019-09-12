<template>
	<div>
		<div class="mb20 tabsTxt">
			<span>首页</span>
			<span class="fg">/</span>
			<span>提现</span>
		</div>
		<div class="balanceBox mb20">
			<div class="ml30 mr30">账户余额</div>
			<div>￥<span class="money">0.00</span></div>
			<div class="ml30">
				<div v-if="hasMoney<=0">
					<el-tooltip placement="top" effect="light" popper-class="tipBox">
						<div slot="content" class="fz14">不可提现原因<br/><span class="col9 reason">可提现金额不足</span></div>
						<el-button type="info" size="medium">立即提现</el-button>
					</el-tooltip>
				</div>
				<div v-else>
					<el-button type="primary" size="medium" @click='cashWithdrawal'>立即提现</el-button>
				</div>
			</div>
		</div>
		<div class="searchBox">
			<el-form :model="cashSearchForm" label-width="80px" class="form-item" :inline='true'>
				<el-row>
					<el-col :span='10' :xs='24'>
						<el-form-item label="提现状态">
							<el-radio-group v-model="cashSearchForm.status">
								<el-radio label="全部"></el-radio>
								<el-radio label="已申请"></el-radio>
								<el-radio label="已完成"></el-radio>
								<el-radio label="失败"></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span='14' :xs='24'>
						<el-form-item label="交易时间">
							<el-date-picker class="mb10" v-model="cashSearchForm.startTime" type="date" placeholder="选择开始时间" value-format="yyyy-MM-dd" :picker-options="pickerStartDate"></el-date-picker>
							<el-date-picker v-model="cashSearchForm.endTime" type="date" placeholder="选择结束时间" value-format="yyyy-MM-dd" :picker-options="pickerEndDate"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='6' :xs='24'>
						<el-form-item label="业务编码" class="labelNum pb10">
							<el-input v-model="cashSearchForm.numNo" placeholder="请输入业务编码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='5' :xs='24' class='txtLeft'>
						<el-form-item>
							<el-button type="primary" size="medium">搜索</el-button>
							<el-button size="medium" @click=resetForm>重置</el-button>
						</el-form-item>
					</el-col>

				</el-row>
			</el-form>
		</div>
		<el-table :data="allCashData" border style="width: 100%">
			<el-table-column prop="Numbers" label="业务编码" align="center"></el-table-column>
			<el-table-column prop="cashMoney" label="提现金额" align="center"></el-table-column>
			<el-table-column prop="cashTime" label="提现时间" align="center"></el-table-column>
			<el-table-column prop="banks" label="开户银行" align="center"></el-table-column>
			<el-table-column prop="accountName" label="开户名" align="center"></el-table-column>
			<el-table-column prop="accountNo" label="开户银行账号" align="center"></el-table-column>
			<el-table-column prop="cashStatus" label="提现状态" align="center"></el-table-column>
			<!--<el-table-column label="操作" align="center" width="150">
				<template slot-scope="scope">
					<el-button size="small" type="primary">查看</el-button>
				</template>
			</el-table-column>-->
		</el-table>
		<!--立即提现-->
		<el-dialog title='提现' :visible.sync='cashModal' :close-on-click-modal='false'>
			<div class='txtCenter'>
				<el-radio-group v-model="cashForm.cahsType" @change='cashTypeSelect'>
				<el-radio-button label="银行卡"></el-radio-button>
				<el-radio-button label="支付宝"></el-radio-button>
			</el-radio-group>
			</div>
			<el-form :model='cashForm' ref="cashForm" class="demo-ruleForm" :rules='cashRules' v-show='cashType' status-icon>
				<el-form-item label='提现金额' class='wid' prop='money'>
					<el-input v-model='cashForm.money' placeholder='请输入提现金额'>
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label='开户银行' class='wid' prop='bank'>
					<el-input v-model='cashForm.bank' placeholder='请输入开户银行'></el-input>
				</el-form-item>
				<el-form-item label='开户名' class='wid' prop='accountName'>
					<el-input v-model='cashForm.accountName' placeholder='请输入开户名'></el-input>
				</el-form-item>
				<el-form-item label='开户银行账号' class='wid' prop='accountNo'>
					<el-input v-model='cashForm.accountNo' placeholder='请输入开户银行账号'></el-input>
				</el-form-item>
			</el-form>
			<el-form :model='cashAlipayForm' ref="cashAlipayForm" class="demo-ruleForm" :rules='cashRules' v-show='!cashType' status-icon>
				<el-form-item label='提现金额' class='wid' prop='money'>
					<el-input v-model='cashAlipayForm.money' placeholder='请输入提现金额'>
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label='姓名' class='wid' prop='userName'>
					<el-input v-model='cashAlipayForm.userName' placeholder='请输入姓名'></el-input>
				</el-form-item>
				<el-form-item label='支付宝账号' class='wid' prop='alipayAccount'>
					<el-input v-model='cashAlipayForm.alipayAccount' placeholder='请输入支付宝账号'></el-input>
				</el-form-item>
			</el-form>
			<div slot='footer' class="dialog-footer" v-show='cashType'>
				<el-button type='primary'>确定</el-button>
				<el-button @click='cashModal=false'>取消</el-button>
			</div>
			<div slot='footer' class="dialog-footer" v-show='!cashType'>
				<el-button type='primary'>确定</el-button>
				<el-button @click='cashModal=false'>取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import vali from '../common/validate'
	export default {
		name: 'CashWithdrawal',
		data() {
			return {
				hasMoney: '2',
				cashType: true,
				cashModal: false, //提现
				pickerEndDate: this.pickerOptionsEnd(),
				pickerStartDate: this.searchStartDate(),
				allCashData: [{
						"Numbers": "20190605105636229596",
						"cashMoney": "100.00",
						"cashStatus": "已完成",
						"cashTime": "2019-02-03T00:00:00",
						"banks": "中国农业银行",
						"accountName": "圭贤",
						"accountNo": '5228480130445498723'
					},
					{
						"Numbers": "20190605105636229596",
						"cashMoney": "100.00",
						"cashStatus": "已完成",
						"cashTime": "2019-02-03T00:00:00",
						"banks": "中国农业银行",
						"accountName": "圭贤",
						"accountNo": '5228480130445498723'
					},
				],
				cashAlipayForm:{
					money:'',
					userName:'',
					alipayAccount:''
				},
				cashForm: {
					cahsType: '银行卡',
					money: '',
					bank: '',
					accountName: '',
					accountNo: ""
				},
				cashSearchForm: {
					status: '全部',
					startTime: '',
					endTime: '',
					numNo: ''
				},
				cashRules: {
					money: [{
							required: true,
							message: '请输入提现金额',
							trigger: 'blur'
						},
						{
							validator: vali.proPrice,
							trigger: 'change'
						}
					],
					bank: [{
						required: true,
						message: '请输入开户银行',
						trigger: 'blur'
					}],
					accountName: [{
						required: true,
						message: '请输入开户名',
						trigger: 'blur'
					}],
					accountNo: [{
						required: true,
						message: '请输入开户银行账号',
						trigger: 'blur'
					},
					{
							validator: vali.bankNo,
							trigger: 'change'
						}],
					userName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					alipayAccount: [{
						required: true,
						message: '请输入支付宝账号',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			//选择提现方式
			cashTypeSelect(value){
				let _this = this
				if(value=='银行卡'){
					_this.cashType = true
				} else if(value=='支付宝'){
					_this.cashType = false
				}
			},
			//立即提现
			cashWithdrawal() {
				let _this = this
				_this.cashModal = true
			},
			// 重置
			resetForm() {
				let _this = this
				_this.cashForm = {
					status: '全部',
					startTime: '',
					endTime: '',
					numNo: ''
				}
			},
			// 搜索开始时间
			searchStartDate() {
				return {
					disabledDate: time => {
						let endDateVal = this.cashForm.endTime
						if(endDateVal) {
							return time.getTime() > new Date(endDateVal).getTime()
						}
					}
				}
			},
			// 搜索下单结束时间
			pickerOptionsEnd() {
				return {
					disabledDate: time => {
						let beginDateVal = this.cashForm.startTime
						if(beginDateVal) {
							return(
								time.getTime() <
								new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
							)
						}
					}
				}
			}
		}
	}
</script>

<style scoped>
	@import '../../assets/css/mystyle.css';
</style>