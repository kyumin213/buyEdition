<template>
	<div>
		<div class="mb20">
			<span class="tabsTxt">
            <span>首页</span>
			<span class="fg">/</span>
			<a>资金管理</a>
			</span>
		</div>
		<el-tabs type="border-card" class="mt20">
			<el-tab-pane label="账户总览">
				<div class="ml30 mt20">
					<div>账户余额</div>
					<div class="money balance">￥100</div>
					<div>
						<el-button type="primary" size="medium" @click='recharge'>充值</el-button>
						<el-button type="success" @click="cashPage" size="medium">提现</el-button>
					</div>
				</div>
				<div style="width: 100%;overflow-x: auto" class="mt30">
					<div id="account" style="width: 980px;height: 320px;overflow-x: auto;margin: 0 auto;"></div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="收支明细">
				<div class="searchBox">
					<el-form ref="searchFrom" :model="searchFrom" label-width="80px" :inline="true" class="form-item">
						<!--<div class="form-item">-->
							<el-form-item label="交易日期" class="form-item">
								<el-date-picker type="date" class="wid100 mb10" placeholder="选择开始时间" v-model="searchFrom.startTime" value-format="yyyy-MM-dd" :picker-options="pickerStartDate"></el-date-picker>
								<el-date-picker type="date" class="wid100" placeholder="选择结束时间" v-model="searchFrom.endTime" value-format="yyyy-MM-dd" :picker-options="pickerEndDate"></el-date-picker>
							</el-form-item>
						<!--</div>-->
						<el-form-item label="业务编号">
							<el-input v-model="searchFrom.orderNo" placeholder="请输入业务编号" class="mb10"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="ml30" size="medium">搜索</el-button>
							<el-button size="medium" @click='resetSearch'>重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="Numbers" label="任务编码" align='center'></el-table-column>
					<el-table-column prop="Numbers" label="业务编号" align='center'></el-table-column>
					<el-table-column prop="ProductPrice" label="交易金额" align='center'></el-table-column>
					<el-table-column prop="ProductPrice" label="账户余额" align='center'></el-table-column>
					<el-table-column prop="ServiceType" label="交易类型" align='center'></el-table-column>
					<el-table-column prop="OrderTime" label="交易时间" align='center'></el-table-column>
					<el-table-column prop="Remark" label="备注" align='center'></el-table-column>
				</el-table>
				<div class="mt30">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			</el-tab-pane>
		</el-tabs>
		<el-dialog title='充值' :visible.sync='RechargeModal' :close-on-click-modal='false'>
			<el-form :model='rechargeForm' ref='rechargeForm' :rules='rechargeRules' class="form-item" :inline="true" label-width="80px" status-icon>
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
							<el-input v-model='rechargeForm.moneys' class='disInline' @blur='checkMoney'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label='付款方式'>
					<el-radio-group v-model="rechargeForm.payType">
						<el-radio label="1">支付宝</el-radio>
						<el-radio label="2">微信</el-radio>
						<el-radio label="3">银行卡</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot='footer' class="dialog-footer">
				<el-button type='primary'>确认</el-button>
				<el-button @click='RechargeModal=false'>取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	// import echarts from 'echarts'
	var echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/bar')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	require('echarts/lib/component/legend')
	import vali from '../common/validate'
	export default {
		name: 'accountManage',
		data() {
			return {
				pageSize: '0',
				total:2,
				btnTask: false,
				currentPage: 1,
				RechargeModal: false,
				tableData: [
				{
					Numbers:'134245235435',
					ProductPrice:'12',
					ServiceType:'转账',
					OrderTime: '2019-07-29 11:12:32',
					Remark: '转账'
				},
				{
					Numbers:'134245235435',
					ProductPrice:'12',
					ServiceType:'转账',
					OrderTime: '2019-07-29 11:12:32',
					Remark: '转账'
				}],
				searchFrom: {
					orderNo: '',
					startTime: '',
					endTime: ''
				},
				rechargeForm: {
					money: '100元',
					moneys: '',
					payType: '1'
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
				pickerEndDate: this.pickerOptionsEnd(),
				pickerStartDate: this.searchStartDate(),
				name: 'fd'
			}
		},
		mounted() {
			this.account()
		},
		methods: {
			//自定义金额
			checkMoney(){
				let _this = this
				let money = _this.rechargeForm.moneys
				if(money!=''){
					_this.rechargeForm.money=''
				}
			},
			//重置
			resetSearch(){
				let _this = this
				_this.searchFrom={
					orderNo: '',
					startTime: '',
					endTime: ''
				}
			},
			//分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
			},
			//充值
			recharge() {
				let _this = this
				_this.RechargeModal = true
			},
			// 搜索时间
			searchStartDate() {
				return {
					disabledDate: time => {
						let endDateVal = this.searchFrom.endTime
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
						let beginDateVal = this.searchFrom.startTime
						if(beginDateVal) {
							return(
								time.getTime() <
								new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
							)
						}
					}
				}
			},
			// 提现
			cashPage() {
				this.$router.push('/CashWithdrawal')
			},
			account() {
				var dom = document.getElementById('account')
				var myChart = echarts.init(dom)
				myChart.setOption({
					color: ['#b095fa', '#fe7096'],
					title: {
						text: '近12个月消费趋势'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['账平', '账不平']
					},
					toolbox: {
						show: true,
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '账平',
							type: 'bar',
							data: [2.0, 450, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
							markPoint: {
								data: [{
										type: 'max',
										name: '最大值'
									},
									{
										type: 'min',
										name: '最小值'
									}
								]
							}
						},
						{
							name: '账不平',
							type: 'bar',
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
							markPoint: {
								data: [{
										name: '年最高',
										value: 400,
										xAxis: 7,
										yAxis: 183
									},
									{
										name: '年最低',
										value: 2.3,
										xAxis: 11,
										yAxis: 3
									}
								]
							}
						}
					]
				})
			}
		}
	}
</script>

<style scoped>
	/*@import '../../../static/css/mystyle.css';*/
	
	.line {
		text-align: center;
		margin-right: 10px;
	}
</style>