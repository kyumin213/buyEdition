<template>
	<div>
		<!--<div class="mb20"><span class="tabsTxt">首页</span></div>-->
		<div class="mb20">
			<div class="userBox">
				<el-row>
					<el-col :span='10' :xs='24'>
						<div>
							<img src="../../assets/image/headImg.jpg" alt="" class="headImg" />
						</div>						
					</el-col>
					<el-col :span='12' :xs='24'>
						<div class="bg-purple">
						<div class="userMsg">
							<span>您好</span>
							<span>kyumin</span>
							<!--<span class="level">普通会员lve1</span>-->
						</div>
<!--						<div>-->
							<div class="accountMoney">账户余额:￥<span class="money">12.00</span></div>
							<el-col>
								<el-button class="el-button" type="primary" size="medium" @click='recharge'>充值</el-button>
							<el-button class="el-button cashWish" type="success" @click="cashMoney" size="medium">提现</el-button>
							</el-col>
						<!--</div>-->
					</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="boxBorder mb20">
			<el-row class='bgTask'>
				<el-col :span="6" :xs="24" class='txtCenter'>
					<div class="grid-content bg-purple taskBox">
						<div class="items items1">
							<span class="count">0</span>
						</div>
						<div class="txtCenter col fz20 mt20">总任务</div>
					</div>
				</el-col>
				<el-col :span="6" :xs="24">
					<div class="grid-content bg-purple taskBox">
						<div class="items items2">
							<span class="count">0</span>
						</div>
						<div class="txtCenter col fz20 mt20">进行中的任务</div>
					</div>
				</el-col>
				<el-col :span="6" :xs="24">
					<div class="grid-content bg-purple taskBox">
						<div class="items items3">
							<span class="count">0</span>
						</div>
						<div class="txtCenter col fz20 mt20">已完成的任务</div>
					</div>
				</el-col>
				<el-col :span="6" :xs="24">
					<div class="grid-content bg-purple taskBox">
						<div class="items items4">
							<span class="count">{{errorNum}}</span>
						</div>
						<div class="txtCenter col fz20 mt20">异常任务</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<el-tabs type="border-card">
			<el-tab-pane>
				<span slot="label"><i class="el-icon-date"></i>亚马逊任务</span>
				<el-table :data="taskData" style="width: 100%;overflow-x: auto" id="allOrder" :show-header='false' :row-class-name="tableRowClassName">
					<el-table-column prop="taskName" label="任务名称" align="center" width="250"></el-table-column>
					<el-table-column prop="taskDes" label="任务描述" align="center" width="800"></el-table-column>
					<el-table-column prop="minPrice" label="价格(起)" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="150">
						<template slot-scope="scope">
							<el-button size="small" type="primary" v-show="scope.row.taskName=='FBA任务'" @click="fbaTask">立即购买</el-button>
							<el-button size="small" type="success" v-show="scope.row.taskName=='加购任务'" @click="buyCarTask">立即购买</el-button>
							<el-button size="small" v-show="scope.row.taskName=='心愿任务'" type='warning' @click="wishTask">立即购买</el-button>
							<el-button size="small" v-show="scope.row.taskName=='点赞任务'" type='danger' @click="likesTask">立即购买</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane>
				<span slot="label"><i class="el-icon-tickets"></i>速卖通任务</span>
				<el-table :data="taskTwoData" style="width: 100%;overflow-x: auto" :show-header='false' :row-class-name="tableRowClassName" id="allOrder">
					<el-table-column prop="taskName" label="任务名称" align="center" width='250'></el-table-column>
					<el-table-column prop="taskDes" label="任务描述" align="center" width='800'></el-table-column>
					<el-table-column prop="minPrice" label="价格(起)" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="150">
						<template slot-scope="scope">
							<el-button size="small" type="primary" v-show="scope.row.taskName=='速卖通FBA任务'" @click="fbaTask">立即购买</el-button>
							<el-button size="small" type='success' v-show="scope.row.taskName=='加购任务'" @click="buyCarTask">立即购买</el-button>
							<el-button size="small" type='warning' v-show="scope.row.taskName=='心愿任务'" @click="wishTask">立即购买</el-button>
							<el-button size="small" type='danger' v-show="scope.row.taskName=='点赞任务'" @click="likesTask">立即购买</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>

		<!--提示-->
		<div class="errTip">
			<el-dialog title="提示" :visible.sync="errorModel" width="30%" center>
				<span>您有<span class="fz16 redRequired">{{errorNum}}</span>条异常信息，请前往处理！</span>
				<span slot="footer" class="dialog-footer">
               <el-button type="primary" @click="toErrorList">确 定</el-button>
                </span>
			</el-dialog>
		</div>
		<!--充值-->
		<el-dialog title='充值' :visible.sync='RechargeModal' :close-on-click-modal='false'>
			<el-form :model='rechargeForm' ref='rechargeForm' class="form-item" status-icon :rules='rechargeRules' :inline="true" label-width="80px">
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
	import bus from '../common/bus'
	import vali from '../common/validate'
	export default {
		name: 'loginHome',
		data() {
			return {
				taskData: [{
					"taskName": "FBA任务",
					"taskDes": "加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏",
					"minPrice": "100起"
				}, {
					"taskName": "加购任务",
					"taskDes": "加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏",
					"minPrice": "100起"
				}, {
					"taskName": "心愿任务",
					"taskDes": "加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏",
					"minPrice": "100起"
				}, {
					"taskName": "点赞任务",
					"taskDes": "加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏",
					"minPrice": "100起"
				}, ],
				taskTwoData: [{
					"taskName": "速卖通FBA任务",
					"taskDes": "加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏",
					"minPrice": "100起"
				}, {
					"taskName": "加购任务",
					"taskDes": "加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏",
					"minPrice": "100起"
				}, {
					"taskName": "心愿任务",
					"taskDes": "加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏",
					"minPrice": "100起"
				}, {
					"taskName": "点赞任务",
					"taskDes": "加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏加购点赞收藏",
					"minPrice": "100起"
				}, ],
				item: '1',
				RechargeModal: false, //充值
				errorModel: false,
				collapse: false,
				errorNum: '0',
				// hashBd: false,
				name: sessionStorage.getItem('userName'),
				times: sessionStorage.getItem('times'),
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
			//自定义金额
			checkMoney(){
				let _this = this
				let money = _this.rechargeForm.moneys
				if(money!=''){
					_this.rechargeForm.money=''
				}
			},
			//表格颜色
			tableRowClassName({
				row,
				rowIndex
			}) {
				if(rowIndex === 0) {
					return 'one-row';
				} else if(rowIndex === 1) {
					return 'two-row';
				} else if(rowIndex === 2) {
					return 'three-row'
				} else if(rowIndex === 3) {
					return 'four-row'
				}
				return '';
			},
			//充值
			recharge() {
				let _this = this
				_this.RechargeModal = true
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
	/*.el-row {
		margin-bottom: 20px;
	}*/
	
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