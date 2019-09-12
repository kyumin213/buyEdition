<template>
	<div>
		<div class="accItemBox">
			<div class="cardTitle">
				<h3 class="fz18 pl10">账户</h3>
			</div>
			<div class="flex">
				<div class="money pl30">
					<span>账户余额:</span>
					<span>￥100</span>
				</div>
				<div class="mr30">
					<el-button type="primary" class='RechargeBtn fz16' @click='recharge'>充值</el-button>
					<el-button type="success" @click="cashPage" class='cashWish fz16'>提现</el-button>
				</div>
			</div>
		</div>
		<div class="searchBox mt10">
			<el-form ref="form" :model="form" label-width="80px" :inline="true" class="form-item">
				<el-form-item class="form-item" label='交易时间'>
					<el-date-picker type="date" class="wid100 mb10" placeholder="选择开始时间" v-model="form.startTime" value-format="yyyy-MM-dd" :picker-options="pickerStartDate"></el-date-picker>
					<el-date-picker type="date" class="wid100" placeholder="选择结束时间" v-model="form.endTime" value-format="yyyy-MM-dd" :picker-options="pickerEndDate"></el-date-picker>
				</el-form-item>
				<el-form-item label='业务编号'>
					<el-input v-model="form.name" placeholder="请输入业务编号" class="mb10" style="width: 220px"></el-input>
					<el-button type="primary" class="ml30" size="medium">搜索</el-button>
					<el-button size="medium">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#edf5fc'}">
			<el-table-column prop="Numbers" label="任务编码"></el-table-column>
			<el-table-column prop="Numbers" label="业务编号"></el-table-column>
			<el-table-column prop="ProductPrice" label="交易金额"></el-table-column>
			<el-table-column prop="ProductPrice" label="账户余额"></el-table-column>
			<el-table-column prop="ServiceType" label="交易类型"></el-table-column>
			<el-table-column prop="OrderTime" label="交易时间"></el-table-column>
			<el-table-column prop="Remark" label="备注"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	import vali from '../common/validate'
	export default {
		name: 'accountManage',
		data() {
			return {
				tableData: [],
				form: {
					name: '',
					resource: '',
					startTime: '',
					endTime: ''
				},
				pickerEndDate: this.pickerOptionsEnd(),
				pickerStartDate: this.searchStartDate(),
				name: 'fd'
			}
		},
//		mounted() {
//			this.account()
//		},
		methods: {
			//充值
			recharge() {
				let _this = this
				_this.$router.push('/financerecharge')
				//				_this.RechargeModal = true
			},
			// 搜索时间
			searchStartDate() {
				return {
					disabledDate: time => {
						let endDateVal = this.form.endTime
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
						let beginDateVal = this.form.startTime
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
			}
		}
	}
</script>

<style scoped>
	/*@import '../../../static/css/mystyle.css';*/
	
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80px;
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
	
	.alipayImg {
		width: 350px;
	}
	
	.colred {
		color: #f00;
	}
	
	.line {
		text-align: center;
		margin-right: 10px;
	}
	
	.accItemBox {
		border-radius: 4px;
		border: #eee solid 1px;
		height: 120px;
		width: 50%;
		box-sizing: border-box;
		background: #fff;
	}
	
	.cardTitle {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px dashed #e9ebea;
	}
	
	.RechargeBtn {
		width: 107px;
		height: 40px;
		background-color: #e6a23c;
		border-color: #e6a23c;
		color: #fff;
	}
	
	.cashWish {
		width: 107px;
		height: 40px;
		margin-left: 0;
	}
	@media only screen and (max-width: 768px){
		.accItemBox{
			width: 100%;
		}
	}
</style>