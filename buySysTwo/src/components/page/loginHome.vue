<template>
	<div>
		<div class="flex step">
			<div class="box-card minWid">
				<div class="cardTitle">
					<h2 class="fz16 pl10">平台使用流程</h2>
				</div>
				<el-steps class="step">
					<el-step title="充值" description="从首页/资金管理提交充值，等待审核"></el-step>
					<el-step title="创建任务" description="在任务管理，选择创建任务。"></el-step>
					<el-step title="查看任务进度" description="在任务管理，查看日志跟踪进度，查看明细"></el-step>
					<el-step title="评价" description="购买任务成功，在任务评价列表点击评价，上传评价内容。"></el-step>
					<el-step title="查看评价进度" description="提交评价后，在任务管理评价任务查看评价进度。"></el-step>
				</el-steps>
				<h2 class="fz16 finance">财务说明</h2>
				<div class="mt10 pl10">
					<p>1、发布任务，扣除余额</p>
					<p>2、任务失败，退回到账号余额</p>
				</div>
			</div>
			<div class="userBox ml30">
				<div class="flex cardTitle pl10 pr10">
					<div>
						<h3>账户</h3>
					</div>
					<div>
						<span class="col9">查看明细</span>
						<span class="accountView"></span>
					</div>
				</div>
				<div class="pl10">
					<div class="userMsg pl10 mt10">
						<span>您好</span>
						<span>kyumin</span>
						<span class="level">普通会员lve1</span>
					</div>
					<div class="pl10">
						<p>账户余额</p>
						<p class="pl30 mt20 money">￥12.00</p>
					</div>
					<div class="mt30">
						<el-button class="fz16 ml30 RechargeBtn" size="medium" @click='recharge'>充值</el-button>
						<el-button class="cashWish fz16" type="success" @click="cashMoney" size="medium">提现</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="flex step">
			<div class="box-card wid">
				<div class="cardTitle">
					<h3 class="fz16 txtCenter useFun">常用功能</h3>
				</div>
				<div class="flex taskBox">
					<div class="txtCenter">
						<i class="el-icon-bell fz120 icon1"></i>
						<p>FBA任务</p>
					</div>
					<div class="txtCenter">
						<i class="el-icon-shopping-cart-full fz120 icon2"></i>
						<p>购物车任务</p>
					</div>
					<div class="txtCenter">
						<i class="el-icon-thumb fz120 icon3"></i>
						<p>点赞任务</p>
					</div>
					<div class="txtCenter">
						<i class="el-icon-time fz120 icon4"></i>
						<p>QA任务</p>
					</div>
					<div class="txtCenter">
						<i class="el-icon-switch-button fz120 icon5"></i>
						<p>心愿任务</p>
					</div>
				</div>
			</div>
			<div class="ml30 userBox">
				<div class="cardTitle">
					<h3 class="fz16 txtCenter useFun">任务数据</h3>
				</div>
				<div class="items">
					<span class="pl10">总任务</span>
					<span class="ml50">0</span>
				</div>
				<div class="items">
					<span class="pl10">进行中的任务</span>
					<span class="ml50">0</span>
				</div>
				<div class="items">
					<span class="pl10">已完成的任务</span>
					<span class="ml50">0</span>
				</div>
				<div class="items">
					<span class="pl10">异常任务</span>
					<span class="ml50">0</span>
				</div>
			</div>
		</div>
		<!--提示-->
		<div class="errTip">
			<el-dialog title="提示" :visible.sync="errorModel" width="30%" center>
				<span>您有<span class="fz16 redRequired">{{errorNum}}</span>条异常信息，请前往处理！</span>
				<span slot="footer" class="dialog-footer">
               <el-button type="primary" @click="toErrorList">确 定</el-button>
                </span>
			</el-dialog>
		</div>		
	</div>
</template>

<script>
	import bus from '../common/bus'
	export default {
		name: 'loginHome',
		data() {
			return {
				item: '1',
				errorModel: false,
				collapse: false,
				errorNum: '0',
				// hashBd: false,
				name: sessionStorage.getItem('userName'),
				times: sessionStorage.getItem('times'),


				taskList: [{
						icon: 'el-icon-magic-stick fz120 icon1',
						taskName: '亚马逊FBA任务',
						price: '100',
						des: '信誉不错的士大夫撒'
					},
					{
						icon: 'el-icon-magic-stick fz120 icon1',
						taskName: '亚马逊加购任务',
						price: '100',
						des: '信誉不错的士大夫撒'
					},
					{
						icon: 'el-icon-magic-stick fz120 icon1',
						taskName: '亚马逊心愿任务',
						price: '100',
						des: '信誉不错的士大夫撒'
					},
					{
						icon: 'el-icon-magic-stick fz120 icon1',
						taskName: '亚马逊点赞任务',
						price: '100',
						des: '信誉不错的士大夫撒'
					},
				]
			}
		},
		created() {
			bus.$on('collapse', msg => {
				this.collapse = msg
			})
			// this.getSrc()
			this.isError()
		},
		computed: {
			role() {
				return this.name === 'admin' ? '超级管理员' : '普通用户'
			}

		},
		methods: {
			//充值
			recharge() {
				let _this = this
				_this.$router.push('/financerecharge')
			},
			isError() {
				let _this = this
				let err = _this.errorNum
				if(err > 0) {
					_this.errorModel = true
				}
			},


			// 前往异常订单
			toErrorList() {
				this.$router.push({
					name: 'taskManage',
					params: {
						active: 7
					}
				})
			},
			// 更多任务
			moreTask() {
				let _this = this
				let status = true
				_this.$router.push({
					name: "taskManage",
					params: {
						taskTypeModel: true
					}
				})
			},
			// FBA任务
			fbaTask() {
				let _this = this
				_this.$router.push('/FbaTask')
			},
			// 心愿任务
			wishTask() {
				let _this = this
				_this.$router.push({
					name: 'wishTask'
				})
			},
			//购物车任务
			buyCarTask() {
				let _this = this
				_this.$router.push('/buyCarTask')
			},
			//点赞任务
			likesTask() {
				let _this = this
				_this.$router.push('/likesTask')
			},
			// 提现
			cashMoney() {
				this.$router.push('/CashWithdrawal')
			},
			getSrc() {
				let _this = this
				if(_this.name === 'admin') {
					_this.hashBd = true
				} else {
					_this.hashBd = false
				}
			}
		}
	}
</script>

<style scoped>
	.userBox .items {
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 20px 60px;
	border-bottom: #ccc dashed 1px;
}
	.box-card {
		border-radius: 4px;
		border: #ccc solid 1px;
		height: 300px;
		box-sizing: border-box;
		background: #fff;
	}
	
	.cardTitle {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px dashed #e9ebea;
	}
	
	.step {
		padding: 10px;
	}
	
	.taskBox {
		height: 160px;
		padding: 45px 0;
		align-items: center;
		margin: 0 40px;
	}
	
	.flex {
		display: flex;
		justify-content: space-between;
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
	}
	
	.step .el-step__title.is-finish {
		color: #205081;
	}
	
	.accountView {
		display: inline-block;
		right: 5px;
		width: 8px;
		height: 8px;
		border-top: #999 1px solid;
		border-right: #999 1px solid;
		transform: rotate(45deg);
	}
	

	

	.el-row {
		margin-bottom: 20px;
	}
	
	.todo-item {
		font-size: 14px;
	}
	
	.todo-item-del {
		text-decoration: line-through;
		color: #999;
	}
	
	.isRed {
		display: inline-block;
		height: 100px;
		width: 100%;
		color: red;
	}
</style>