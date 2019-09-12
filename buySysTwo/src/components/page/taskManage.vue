<template>
	<div>
		<div>
			<div class="mb20 mt20">
				<span class="tabsTxt">
            <span>首页</span>
				<span class="fg">/</span>
				<a>任务管理</a>
				</span>
			</div>
		</div>
		<div class="searchBox">
			<el-form :model="formAll" ref="formAll" class="form-item" label-width="80px" :inline="true">
				<el-row>
					<el-col :xs="24" :sm="24" :md="24">
						<el-form-item label='平台' class="disInline">
							<el-radio-group v-model="formAll.resource" class="disInline">
								<el-radio label="全部"></el-radio>
								<el-radio label="Amazon"></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
					<el-form-item label='下单时间'>
						<el-date-picker v-model="formAll.orderStartTime" type="date" placeholder="选择开始时间" :picker-options="pickerStartDate" value-format="yyyy-MM-dd" class="mb10"></el-date-picker>
						<el-date-picker v-model="formAll.orderEndTime" type="date" placeholder="选择结束时间" :picker-options="pickerEndDate" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>

					<el-form-item class="labelNum">
						<el-input v-model="formAll.name" style="width: 220px" placeholder="请输入关键字"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium">搜索</el-button>
						<el-button size="medium" @click="resetTask">重置</el-button>
						<el-button type="warning" size="medium" @click="exportExcel">导出</el-button>
					</el-form-item>
			</el-form>
		</div>
		<div class="tabBox">
			<div class="tabList">
				<ul class="tabBlock">
					<li :class="active === 1 ? 'active':''" @click="getAllData()" :data-index="1">全部<span>({{allNum}})</span></li>
					<li :class="active === 3 ? 'active':''" :data-index="3" @click="daiPay">待付款<span>(0)</span></li>
					<li :class="active === 2 ? 'active':''" :data-index="2" @click="daiBuy">待购买<span>(0)</span></li>
					<li :class="active === 4 ? 'active':''" :data-index="4" @click="daifh">待发货<span>(0)</span></li>
					<li :class="active === 5 ? 'active':''" :data-index="5" @click="daish">待收货<span>(0)</span></li>
					<li :class="active === 6 ? 'active':''" :data-index="6" @click="daipj">待评价<span>(0)</span></li>
					<li :class="active === 7 ? 'active':''" :data-index="7" @click="ywc">已完成<span>(0)</span></li>
					<li :class="active === 8 ? 'active':''" :data-index="8" @click="daiCancel">已取消<span>(0)</span></li>
					<li :class="active === 9 ? 'active':''" :data-index="9" @click="errData">异常<span>(0)</span></li>
				</ul>
			</div>
			<div class="tabRight">
				<el-button type="primary" size="medium" @click="createTask">创建任务</el-button>
			</div>
		</div>
		<div class="mt10" style="overflow-x: auto">
			<el-table :data="allOrderData" border style="width: 100%;overflow-x: auto" id="allOrder" :header-cell-style="{background:'#edf5fc'}">
				<el-table-column prop="Numbers" label="任务编码" align="center" width="200">
					<template slot-scope="scope">
						<el-button type="text" @click="viewDetails(scope.$index,scope.row)">{{scope.row.Numbers}}</el-button>
					</template>
				</el-table-column>
				<!--<el-table-column prop="Picture" label="图片" align="center" width="100"></el-table-column>-->
				<el-table-column prop="CountryId" label="平台/国家" align="center" width="100"></el-table-column>
				<el-table-column prop="ProductByASIN" label="产品ASIN" align="center" width="120"></el-table-column>
				<el-table-column prop="ProductPrice" label="产品价格" align="center"></el-table-column>
				<el-table-column prop="ServiceType" label="服务类型" align="center"></el-table-column>
				<el-table-column prop="OrderNote" label="订单备注" align="center"></el-table-column>
				<el-table-column prop="Status" label="状态" align="center" width="100"></el-table-column>
				<el-table-column prop="OrderNumber" label="订单号" align="center"></el-table-column>
				<el-table-column prop="OrderTime" label="下单时间" align="center" width="200"></el-table-column>
				<!--<el-table-column prop="Remark" label="备注" align="center"></el-table-column>-->
				<el-table-column label="操作" align="center" width="550">
					<template slot-scope="scope">
						<!--<el-button size="small" type="primary" @click="viewDetails">查看</el-button>-->
						<el-button size="small" type="primary" @click="payMent">付款</el-button>
						<el-button size="small" @click="cancelHandel">取消</el-button>
						<el-button size="small" type="success" @click="evalEdit">填写评价</el-button>
						<el-button size="small" type="warning" @click="viewDaily">日志</el-button>
						<el-button size="small" type="danger" @click="delhandel">删除</el-button>
						<el-button size="small" v-show="scope.row.Status == '已完成'" type="primary" @click="confirmBtn">确认完成</el-button>
						<el-button size="small" type="danger" v-show="scope.row.Status=='已分配'" @click="refundBtn">申请退款</el-button>
						<el-button size="small" v-show="scope.row.Status=='已分配'" @click="cancelRefundBtn">取消退款</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="mt30 txtRight">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="allNum">
				</el-pagination>
			</div>
		</div>
		<!-- 填写评价-->
		<el-dialog title="评价" :visible.sync="assessModel" width="30%" :close-on-click-modal="false" center="">
			<el-form :model="assessForm">
				<el-form-item label="产品评价星级">
					<el-rate v-model="assessForm.assessValue"></el-rate>
				</el-form-item>
				<el-form-item label="产品评价标题">
					<el-input v-model="assessForm.proTitle" class="wid"></el-input>
				</el-form-item>
				<el-form-item label="产品评价内容">
					<el-input type="textarea" v-model="assessForm.proCon" class="wid"></el-input>
				</el-form-item>
				<el-form-item class='txtCenter'>
					<p>评论图片 可上传图片数1，（单张图片大小不应超过5M）
					</p>
					<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item class="center">
					<el-button type="primary" size="medium">确认</el-button>
					<el-button @click="assessModel=false" size="medium">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 日志-->
		<el-dialog title="日志" :visible.sync="dailyModel" :close-on-click-modal="false">
			<el-timeline :reverse="reverse">
				<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
					{{activity.content}}
				</el-timeline-item>
			</el-timeline>
		</el-dialog>
		<!-- 删除-->
		<el-dialog title="温馨提示" :visible.sync="delModel" :close-on-click-modal="false" center="" width="30%">
			<div class="del-dialog-cnt">是否删除此数据?</div>
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium">确定</el-button>
        <el-button @click="delModel=false" size="medium">取消</el-button>
      </span>
		</el-dialog>
		<!--确认-->
		<el-dialog title="温馨提示" :visible.sync="submitModal" :close-on-click-modal="false" center="" width="30%">
			<div class="del-dialog-cnt">是否确认此订单?</div>
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium">确定</el-button>
        <el-button @click="submitModal=false" size="medium">取消</el-button>
      </span>
		</el-dialog>
		<!--申请退款-->
		<el-dialog title="温馨提示" :visible.sync="refundModal" :close-on-click-modal="false" center="" width="30%">
			<div class="del-dialog-cnt">是否确定申请退款?</div>
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium">确定</el-button>
        <el-button @click="refundModal=false" size="medium">取消</el-button>
      </span>
		</el-dialog>
		<!--取消退款-->
		<el-dialog title="温馨提示" :visible.sync="cancelRefundModal" :close-on-click-modal="false" center="" width="30%">
			<div class="del-dialog-cnt">是否确定取消退款申请?</div>
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium">确定</el-button>
        <el-button @click="cancelRefundModal=false" size="medium">取消</el-button>
      </span>
		</el-dialog>
		<!--取消-->
		<el-dialog title="取消订单" :visible.sync="cancelModal" :close-on-click-modal="false" center="" width="30%">
			<el-input placeholder='请输入取消原因' v-model='reasonTxt'></el-input>
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium">确定</el-button>
        <el-button @click="cancelModal=false" size="medium">取消</el-button>
      </span>
		</el-dialog>
		<!-- 付款-->
		<el-dialog title="付款" :visible.sync="paymentModel" :close-on-click-modal="false" width="40%" :before-close="paymentClose" top='5vh'>
			<el-form :model="paymentForm"  class="demo-ruleForm">
				<el-row>
					<el-col :span="12" :xs="24">
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
			<div slot="footer" class="dialog-footer">
				<el-button type="primary">确定</el-button>
				<el-button @click="paymentClose">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import vali from '../common/validate'
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	export default {
		name: 'taskManage',
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				loading: true,
				status: this.$route.params.taskTypeModel,
				errorStatus: this.$route.params.active,
				pageSize: '0',
				currentPage: 1,
				cancelModal: false,
				delModel: false, // 删除
				reverse: true,
				paymentModel: false,
				submitModal: false, //确认
				refundModal: false, //申请退款
				cancelRefundModal: false, //取消退款
				reasonTxt: '', //取消原因
				activities: [{
					content: '已发货',
					timestamp: '2019-04-15'
				}, {
					content: '已付款',
					timestamp: '2019-04-13'
				}, {
					content: '已创建',
					timestamp: '2019-04-11'
				}],
				active: 1,
				allNum: 0,
				dailyModel: false,
				searchType: false,
				assessModel: false,
				startTime: '',
				buyNumData: [],
//				pickerOptions0: this.startDate(),
				pickerEndDate: this.pickerOptionsEnd(),
				pickerStartDate: this.searchStartDate(),
				paymentForm: {
					balancePayment: '',
					cashPayment: '',
					paymentType: '支付宝',
					recceiveAccount: '圭贤',
					PayAccount: '',
					tradingFlow: ''
				},
				countryData: [{
						country: '美国'
					},
					{
						country: '加拿大'
					}
				],
				formAll: {
					resource: '全部',
					name: '',
					orderStartTime: '',
					orderEndTime: ''
				},
				assessForm: {
					assessValue: null,
					proTitle: '',
					proCon: ''
				},
				allOrderData: [{
						"Numbers": "20190605105636229596",
						"Picture": "",
						"CountryId": "美国",
						"Forum": "Amazon",
						"ProductByASIN": "777888999a",
						"ProductPrice": 15.99,
						"ServiceType": "不留评",
						"OrderNote": "待付款",
						"Status": "已完成",
						"OrderNumber": 1314520,
						"OrderTime": "2019-02-03T00:00:00",
						"Remark": ""
					},
					{
						"Numbers": "20190611174157617041",
						"Picture": "",
						"CountryId": "德国",
						"Forum": "Amazon",
						"ProductByASIN": "B07P6KVGF8",
						"ProductPrice": 18.99,
						"ServiceType": "不留评",
						"OrderNote": "待确认",
						"Status": "已完成",
						"OrderNumber": 7758258,
						"OrderTime": "2019-04-02T00:00:00",
						"Remark": ""
					}
				],


				
			}
		},
		created() {
//			this.getAllData()
			this.getTaskLeng()
			this.getError()
			let status = this.status
			if(status) {
				this.taskTypeModel = true
			} else {
				this.taskTypeModel = false
			}
		},
		methods: {
			//创建任务
			createTask(){
				let _this = this
				_this.$router.push('/Promotion')
			},
			// 付款关闭页面
			paymentClose() {
				let _this = this
				_this.paymentModel = false
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//列表确认付款
			payMent() {
				let _this = this
				_this.paymentModel = true
			},
			//申请退款
			refundBtn() {
				let _this = this
				_this.refundModal = true
			},
			//确认
			confirmBtn() {
				let _this = this
				_this.submitModal = true
			},
			// 任务管理全部状态信息
			getAllData() {
				let _this = this
				_this.active = 1
				_this.axios.get(_this.GLOBAL.BASE_URL + '/OrderManagement/AddOrderByType').then((res) => {
					_this.allOrderData = res.data.data
					_this.allNum = res.data.data.length
					_this.loading = false
				}).catch((error) => {
					console.log(error)
				})
			},
			// 获取异常
			getError() {
				let _this = this
				let errors = _this.errorStatus
				if(errors != undefined) {
					this.errData()
				}
			},

			// 重置
			resetTask() {
				let _this = this
				//				 this.$refs[formName].resetFields()
				_this.formAll = {
					resource: '全部',
					name: '',
					orderStartTime: '',
					orderEndTime: ''
				}
			},
			// 导出
			exportExcel() {
				var xlsxParam = {
					raw: true
				}
				// 导出的内容只做解析，不进行格式转换
				var wb = XLSX.utils.table_to_book(document.querySelector('#allOrder'), xlsxParam)
				var wbout = XLSX.write(wb, {
					bookType: 'xlsx',
					bookSST: true,
					type: 'array'
				})
				try {
					FileSaver.saveAs(new Blob([wbout], {
						type: 'application/octet-stream'
					}), '任务订单表.xlsx')
				} catch(e) {
					if(typeof console !== 'undefined') {
						console.log(e, wbout)
					}
				}
				return wbout
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
			},
			
//			// 时间范围
//			timePicker() {
//				let _this = this
//				let pickTimes = _this.taskForm.taskData[0].pickTime
//				let len = _this.taskForm.taskData.length
//				for(let i = 0; i < len; i++) {
//					_this.taskForm.taskData[i].pickTime = pickTimes
//				}
//			},			
			// 取消
			cancelHandel() {
				let _this = this
				_this.cancelModal = true
			},
			// 删除
			delhandel() {
				let _this = this
				_this.delModel = true
			},
			//取消退款
			cancelRefundBtn() {
				let _this = this
				_this.cancelRefundModal = true
			},
			// 日志
			viewDaily() {
				let _this = this
				_this.dailyModel = true
			},
			// 待购买
			daiBuy() {
				let _this = this
				_this.active = 2
				_this.allOrderData = []
			},
			//待付款
			daiPay() {
				let _this = this
				_this.active = 3
				_this.allOrderData = []
			},
			// 待发货
			daifh() {
				let _this = this
				_this.active = 4
				_this.allOrderData = []
			},
			// 待收货
			daish() {
				let _this = this
				_this.active = 5
				_this.allOrderData = []
			},
			// 待评价
			daipj() {
				let _this = this
				_this.active = 6
				_this.allOrderData = []
			},
			// 已完成
			ywc() {
				let _this = this
				_this.active = 7
				_this.allOrderData = []
			},
			// 已取消
			daiCancel() {
				let _this = this
				_this.active = 8
				_this.allOrderData = []
			},
			// 异常
			errData() {
				let _this = this
				_this.active = 9
				_this.allOrderData = []
			},
			searchStartDate() {
				return {
					disabledDate: time => {
						let endDateVal = this.formAll.orderEndTime
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
						let beginDateVal = this.formAll.orderStartTime
						if(beginDateVal) {
							return(
								time.getTime() <
								new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
							)
						}
					}
				}
			},
			endTimeStatus: function(value) {
				this.orderEndTime = value
			},
			
			// 填写评价
			evalEdit() {
				let _this = this
				_this.assessModel = true
			},
			// 查看任务详情
			viewDetails() {
				this.$router.push('/viewTaskDetails')
			},
					
			getTaskLeng() {
				let _this = this
				let len = _this.allOrderData.length
				if(len === 1) {
					_this.disabled = true
				}
			},			
			startDate() {
				return {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7
					}
				}
			},
			handleClick(tab, event) {
				console.log(tab, event)
			},
		}
	}
</script>

<style scoped>
	.footer {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		right: 0;
		background: #eee;
		padding: 20px;
		box-sizing: border-box;
	}
	.tabBlock li:first-child{
		border-top-left-radius: 4px;
	}
	.tabBlock li:last-child{
		border-top-right-radius: 4px;
	}
</style>