<template>
	<div>
		<div class="mb20 mt20 tabsTxt">
			<span>首页</span>
			<span class="fg">/</span>
			<span>提现</span>
		</div>
		<div class="balanceBox mb20">
			<div class="ml30 mr10">账户余额</div>
			<div class="money">￥{{hasMoney}}</span></div>
			<div class="ml30">
				<div v-if="hasMoney<=0">
					<el-tooltip placement="top" effect="light" popper-class="tipBox">
						<div slot="content" class="fz14">不可提现原因<br/><span class="col9 reason">可提现金额不足</span></div>
						<el-button type="info" size="medium">立即提现</el-button>
					</el-tooltip>
				</div>
				<div v-else>
					<el-button type="primary" size="medium" @click="cashWith">立即提现</el-button>
				</div>
			</div>
		</div>
		<div class="searchBox">
			<el-form :model="cashSearchForm" :inline="true" label-width="80px" class="form-item">
				<div>
					<el-form-item label="提现状态">
						<el-radio-group v-model="cashSearchForm.status">
							<el-radio label="全部"></el-radio>
							<el-radio label="已申请"></el-radio>
							<el-radio label="已完成"></el-radio>
							<el-radio label="失败"></el-radio>
						</el-radio-group>
					</el-form-item>
				</div>
					<el-form-item label="交易时间">
						<el-date-picker class="mb10" v-model="cashSearchForm.startTime" type="date" placeholder="选择开始时间" value-format="yyyy-MM-dd" :picker-options="pickerStartDate"></el-date-picker>
						<el-date-picker v-model="cashSearchForm.endTime" type="date" placeholder="选择结束时间" value-format="yyyy-MM-dd" :picker-options="pickerEndDate"></el-date-picker>
					</el-form-item>

					<el-form-item label="业务编码" class="labelNum">
						<el-input v-model="cashSearchForm.numNo" style="width: 220px" placeholder="请输入业务编码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium" class="ml30">搜索</el-button>
						<el-button size="medium" @click="resetForm">重置</el-button>
					</el-form-item>
			</el-form>
		</div>
		<el-table :data="allCashData" border style="width: 100%" :header-cell-style="{background:'#edf5fc'}">
			<el-table-column prop="Numbers" label="业务编码" align="center"></el-table-column>
			<el-table-column prop="Picture" label="提现金额" align="center"></el-table-column>
			<el-table-column prop="CountryId" label="提现状态" align="center"></el-table-column>
			<el-table-column prop="ProductByASIN" label="提现时间" align="center"></el-table-column>
			<el-table-column prop="ProductPrice" label="开户银行" align="center"></el-table-column>
			<el-table-column prop="ServiceType" label="开户名" align="center"></el-table-column>
			<el-table-column prop="OrderNote" label="开户银行账号" align="center"></el-table-column>
			<el-table-column label="操作" align="center" width="150">
				<template slot-scope="scope">
					<el-button size="small" type="primary">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--提现-->
		<el-dialog title='提现' :visible.sync='CashWithdrawalModal' :close-on-click-modal="false" :before-close="closeModel">
			<el-form :model="cashForm" ref="cashForm" label-width='120px' :rules="rules" status-icon>
				<el-form-item label='开户名'>
					<span>{{cashForm.AccountName}}</span>
				</el-form-item>
				<el-form-item label='开户银行' prop="accountBank">
					<el-input v-model='cashForm.accountBank' placeholder="请输入开户银行"></el-input>
				</el-form-item>
				<el-form-item label='开户银行账号' prop="accountBankNumber">
					<el-input v-model='cashForm.accountBankNumber' placeholder="请输入开户银行账号"></el-input>
				</el-form-item>
				<el-form-item label='提现金额' prop='CashWithdrawal'>
					<el-input v-model='cashForm.CashWithdrawal' placeholder="请输入提现金额"></el-input>
				</el-form-item>
			</el-form>
			<span slot='footer' class="dialog-footer">
    		<el-button type='primary' @click="comfirCash('cashForm')">确定</el-button>
    			<el-button @click="closeModel">取消</el-button>
    	</span>
		</el-dialog>
	</div>
</template>

<script>
	import vali from '../common/validate'
	export default {
		name: 'CashWithdrawal',
		data() {
			var checkMoney = (rule, value, callback) => {
				const reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
				if(!value) {
					return callback(new Error('提现金额不能为空'));
				} else if(!reg.test(value)) {
					callback(new Error('提现金额格式不正确'));
				} else if(value > this.hasMoney) {
					callback(new Error('提现金额不能大于余额'));
				} else {
					callback();
				}
			};
			return {
				hasMoney: '2',
				pickerEndDate: this.pickerOptionsEnd(),
				pickerStartDate: this.searchStartDate(),
				allCashData: [],
				CashWithdrawalModal: false,
				cashSearchForm: {
					status: '全部',
					startTime: '',
					endTime: '',
					numNo: ''
				},
				cashForm: {
					AccountName: 'kyumin',
					accountBank: '',
					accountBankNumber: '',
					CashWithdrawal: ''
				},
				rules: {
					accountBank: [{
						required: true,
						message: '请输入开户银行',
						trigger: 'change'
					}],
					accountBankNumber: [{
						required: true,
						message: '请输入开户银行账号',
						trigger: 'change'
					}],
					CashWithdrawal: [{
							required: true,
							message: '请输入提现金额',
							trigger: 'change'
						},
						{
							validator: checkMoney,
							trigger: 'change'
						}
					]
				}
			}
		},
		methods: {
			//立即提现
			cashWith() {
				let _this = this
				_this.CashWithdrawalModal = true
			},
			//提现确定
			comfirCash(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.CashWithdrawalModal = false
						_this.cashForm = {
							AccountName: '',
							accountBank: '',
							accountBankNumber: '',
							CashWithdrawal: ''
						}
					}
				})
			},
			//关闭提现弹窗
			closeModel() {
				let _this = this
				_this.CashWithdrawalModal = false
				_this.cashForm = {
					AccountName: '',
					accountBank: '',
					accountBankNumber: '',
					CashWithdrawal: ''
				}
			},
			// 重置
			resetForm() {
				let _this = this
				_this.cashSearchForm = {
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