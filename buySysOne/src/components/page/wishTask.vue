<template>
	<div>
		<el-form :model="taskForm" class="demo-ruleForm" ref="wishFrom" :rules="taskRule">
			<div class="mb20">产品信息</div>
			<el-row>
				<el-col :span="12" :xs="24">
					<el-form-item label="国家" class="disInline minWid" prop="CountryId">
						<el-select v-model="taskForm.CountryId" placeholder="请选择" class="disInline wid100">
							<el-option v-for="(item,index) in countryData" :key="index" :value="index" :label="item.country"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" :xs="24">
					<el-form-item label="产品ASIN" class="disInline minWid" prop="ProductByASIN">
						<el-input v-model="taskForm.ProductByASIN" maxlength="10" show-word-limit placeholder="长度为10的数字和字母组合"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>

				<el-col :span="12" :xs="24">
					<el-form-item label="店铺名称" class="disInline minWid">
						<el-select v-model="taskForm.shopName" placeholder="请选择" class="disInline wid100">
								
							</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" :xs="24">
					<el-form-item label="产品名称" class="disInline minWid">
						<el-input v-model="taskForm.productName"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>

				<el-col :span="12" :xs="24">
					<el-form-item label="产品价格" class="disInline minWid" prop="productPrice">
						<el-input type="text" v-model="taskForm.productPrice" placeholder="请输入数字">
							<template slot="prepend">￥</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :xs="24">
					<p class="lh40">产品评分</p>
					<el-rate v-model="taskForm.productScore" show-text class="mt5"></el-rate>
				</el-col>
			</el-row>
			<div>
				<el-col :span="12" :xs="24" class="fleft">
					<el-form-item label="评论数" class="disInline minWid">
						<el-input v-model="taskForm.comments" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :xs="24" class="fright">
					<el-form-item label="产品图片" class="disInline">
						<img alt="" :src="taskForm.productImg" class="proImg">
					</el-form-item>
				</el-col>
				<el-col :span="12" :xs="24">
					<el-form-item label="品类排名" class="wid">
						<el-input type="text" v-model="taskForm.categoryRanking" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
			</div>
			<el-row>
				<el-col :span="12" :xs="24" class="fleft">
					<el-form-item label="产品链接" class="wid" prop="productLink">
						<el-input type="text" v-model="taskForm.productLink" placeholder="请以http://或https://开头"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>

			</el-row>
			<el-form-item label="下单信息"></el-form-item>
			<el-row>
				<el-col :span="12" :xs="24">
					<el-form-item label="添加方式">
						<el-radio-group v-model="taskForm.keywordTypes" @change="searchBtn">
							<el-radio label="产品关键字" class="min10"></el-radio>
							<el-radio label="CPC关键字" class="min10"></el-radio>
							<el-radio label="链接"></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" :xs="24">
					<el-form-item label="终端平台">
						<el-radio-group v-model="taskForm.TerminalPlatform">
							<el-radio label="PC"></el-radio>
							<el-radio label="Android"></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12" :xs="24" v-show="searchType===false">
					<el-form-item label="搜索关键词" class="disInline minWid">
						<el-input v-model="taskForm.searchKeyword"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :xs="24" v-show="searchType">
					<el-form-item label="链接" class="disInline wid">
						<el-input type="textarea" v-model="taskForm.links"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :xs="24">
					<el-form-item label="代购数量" class="disInline minWid" prop="buyNum">
						<el-input type="text" v-model="taskForm.buyNum" @change="checkBuyNum" placeholder="请输入正整数"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="con">
				<el-row :gutter="20">
					<el-col :span="7" :xs="12" :md="8" :sm="6" :lg="8" :xl="8">
						<span class="mb20 disInline">任务开始时间</span>
					</el-col>
					<el-col :span="10" :md="10" :sm="12" :xs="24" :lg="8" :xl="8">
						<el-button type="primary" size="small" @click="oneDay" :disabled="btnTask">一天一单</el-button>
						<el-button type="primary" size="small" @click="twoDay" :disabled="btnTask">一天两单</el-button>
						<el-button type="primary" size="small" @click="threeDay" :disabled="btnTask">一天三单</el-button>
					</el-col>
					<el-col :span="7" :md="6" :sm="6" :lg="8" :xl="8" class="mb10 mt10">
						<span>数量</span>
					</el-col>
				</el-row>
				<div v-for="(item,index) in taskForm.taskData" :key="index" class="mb10">
					<el-row :gutter="20">
						<el-col :span="7" :xs="24" :md="8" :sm="8">
							<el-form-item :prop="`taskData[${index}].startTime`" :rules="{ required: true, message: '任务时间不能为空', trigger: 'change' }">
								<el-date-picker style="width: 100%" v-model="item.startTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="10" :xs="24" :md="8" :sm="8" class="mb10">
							<el-time-picker style="width: 100%" is-range v-model="item.pickTime" format='HH:mm' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" :picker-options="{
      selectableRange: '00:00:00 - 23:59:00'
    }">
							</el-time-picker>
						</el-col>
						<el-col :span="7" :xs="24" :md="8" :sm="8">
							<el-form-item :prop="`taskData[${index}].numbers`" :rules="{ required: true, message: '数量不能为空', trigger: 'change' }">
								<el-input type="text" v-model="item.numbers" style="width: 60%;" placeholder="请输入正整数" @change="allBuyNum(index)"></el-input>
								<el-button type="danger" size="small" class="delMb" @click="removeWishTask(item, index)" :disabled="disabled">删除
								</el-button>
							</el-form-item>

							<div class="tipRed mt10" v-if="errorMes">数量不能超过代购数量</div>
						</el-col>
					</el-row>
				</div>
				<el-row class="mt20 mb20">
					<el-button @click="addWishTask"><i class="el-icon-circle-plus-outline"></i>添加新任务</el-button>
				</el-row>
			</div>
			<el-form-item label="服务费">
				<span class="colTxt labels">￥{{taskForm.serviceCharge}}</span>
				<span class="labels col9">(服务费单价) * 0 (数量) + 0 (增值费单价) * 0 (数量)</span>
			</el-form-item>
			<el-form-item style="display: block
">
				<el-button type="primary" size="medium" @click="wishComfir('wishFrom')">确定</el-button>
				<el-button @click="back" size="medium">返回</el-button>
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
	import vali from '../common/validate'
	export default {
		name: 'wishTask',
		data() {
			return {
				disabled: true,
				errorMes: false,
				paymentModel: false,
				searchType: false,
				btnTask: true,
				pickerOptions0: this.startDate(),
				countryData: [{
						country: '美国'
					},
					{
						country: '加拿大'
					}
				],
				paymentForm: {
					balancePayment: '',
					cashPayment: '',
					paymentType: '支付宝',
					recceiveAccount: '圭贤',
					PayAccount: '',
					tradingFlow: ''
				},
				taskForm: {
					taskData: [{
						startTime: '',
						pickTime: [new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 23, 59)],
						numbers: ''
					}],
					CountryId: '',
					ProductByASIN: '',
					shopName: '',
					productName: '',
					productPrice: '',
					comments: '',
					productScore: null,
					productLink: '',
					productImg: '',
					categoryRanking: '',
					keywordTypes: '产品关键字',
					AddPlatform: '关键词加购',
					TerminalPlatform: 'PC',
					searchKeyword: '',
					buyNum: '',
					commentType: '',
					fbNumber: '',
					commentImgNum: '',
					commentVedioNum: '',
					coupon: '否',
					productTotal: '0.00',
					serviceCharge: '0.00',
					total: '0.00',
					links: '',
					remark: ''
				},
				taskRule: {
					ProductByASIN: [{
							required: true,
							message: '请输入产品ASIN',
							trigger: 'change'
						},
						{
							validator: vali.flagNum,
							trigger: 'change'
						}
					],
					CountryId: [{
						required: true,
						message: '请输选择国家',
						trigger: 'change'
					}],
					productPrice: [{
							required: true,
							message: '请输入产品价格',
							trigger: 'change'
						},
						{
							validator: vali.proPrice,
							trigger: 'change'
						}
					],
					productLink: [{
							required: true,
							message: '请输入产品链接',
							trigger: 'change'
						},
						{
							validator: vali.checkLink,
							trigger: 'change'
						}
					],
					searchKeyword: [{
						required: true,
						message: '请输入关键字',
						trigger: 'change'
					}],
					buyNum: [{
							required: true,
							message: '请输入购买数量',
							trigger: 'change'
						},
						{
							validator: vali.checkNum,
							trigger: 'change'
						}
					],
					fbNumber: [{
						required: false,
						message: '请输入关键字',
						trigger: 'change'
					}, {
						validator: vali.checkNum,
						trigger: 'change'
					}],
					commentVedioNum: [{
						validator: vali.checkNum,
						trigger: 'change'
					}],
					commentImgNum: [{
						validator: vali.checkNum,
						trigger: 'change'
					}],
					commentType: [{
						required: true,
						message: '请选择留评类型',
						trigger: 'change'
					}],
					proService: [{
							required: true,
							message: '请输入数量',
							trigger: 'change'
						},
						{
							validator: vali.checkNum,
							trigger: 'change'
						}
					],
					tradingFlow: [{
						required: true,
						message: '请输入交易流水',
						trigger: 'change'
					}],
					PayAccount: [{
						required: true,
						message: '请输入付款账号',
						trigger: 'change'
					}]
				}
			}
		},
		created() {
			this.getDate()
		},
		methods: {
			// 数量验证
			allBuyNum(index) {
				let _this = this
				_this.index = index
				let buyNum = _this.taskForm.buyNum
				let taskTime = _this.taskForm.taskData
				var result = 0
				for(let i = 0; i < taskTime.length; i++) {
					result += parseInt(taskTime[i].numbers)
				}
				console.log(result)
				if(parseInt(result) > parseInt(buyNum)) {
					_this.errorMes = true
					return false
				} else {
					_this.errorMes = false
				}
			},
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
			// 代购数量为1
			checkBuyNum() {
				let _this = this
				let nums = _this.taskForm.buyNum

				_this.taskForm.taskData = [{
					startTime: '',
					pickTime: [new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 23, 59)],
					numbers: ''
				}]
				if(parseInt(nums) === 1) {
					_this.btnTask = true
					_this.taskForm.taskData[0].numbers = 1
				} else {
					_this.btnTask = false
					_this.taskForm.taskData[0].numbers = ''
				}
				_this.getDate()
			},
			// 心愿添加方式
			searchBtn() {
				let _this = this
				let wish = _this.taskForm.keywordTypes
				if(wish === '链接') {
					_this.searchType = true
				} else {
					_this.searchType = false
				}
			},
			//心愿订单任务提交
			wishComfir(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.paymentModel = true
					}
				})
			},
			// 当前日期
			getDate() {
				let _this = this
				let date = new Date()
				let y = date.getFullYear()
				let m = date.getMonth() + 1
				let d = date.getDate()
				if(m < 10) {
					m = '0' + m
				}
				if(d < 10) {
					d = '0' + d
				}
				let startTime = y + '-' + m + '-' + d
				_this.taskForm.taskData[0].startTime = startTime
			},
			// 返回按钮
			back() {
				let _this = this
				this.$router.push('/index')
			},
			startDate() {
				return {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7
					}
				}
			},
			// 心愿任务新增一行
			addWishTask() {
				let _this = this
				_this.taskForm.taskData.push({
					pickTime: [new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 23, 59)]
				})
				let len = _this.taskForm.taskData.length
				if(len > 1) {
					_this.disabled = false
				}
			},
			// 心愿任务删除一行
			removeWishTask(item, index) {
				let _this = this
				_this.index = _this.taskForm.taskData.indexOf(item)
				let len = _this.taskForm.taskData.length
				if(index !== -1) {
					_this.taskForm.taskData.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled = true
				}
			},
			// 一天一单
			oneDay() {
				let _this = this
				_this.errorMes = false
				let dates = new Date()
				let y = dates.getFullYear()
				let m = dates.getMonth() + 1
				let d = dates.getDate()
				if(m < 10) {
					m = '0' + m
				}
				if(d < 10) {
					d = '0' + d
				}
				let startTime = y + '-' + m + '-' + d
				//_this.taskData[0].startTime = startTime
				let t = _this.taskForm.taskData[0].pickTime
				let num = _this.taskForm.buyNum
				_this.taskForm.taskData = [{
					startTime: startTime,
					pickTime: t,
					numbers: ''
				}]
				if(num !== '') {
					_this.taskForm.taskData[0].numbers = '1'
					for(let i = 0; i < num - 1; i++) {
						let dateTemps = _this.taskForm.taskData[i].startTime
						var dateTemp = dateTemps.split('-')
						var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0])
						var millSeconds = Math.abs(nDate) + (24 * 60 * 60 * 1000)
						var rDate = new Date(millSeconds)
						var year = rDate.getFullYear()
						var month = rDate.getMonth() + 1
						if(month < 10) month = '0' + month
						var date = rDate.getDate()
						if(date < 10) date = '0' + date
						var times = year + '-' + month + '-' + date
						_this.taskForm.taskData.push({
							startTime: times,
							pickTime: t,
							numbers: '1'
						})
					}
				}
				let len = _this.taskForm.taskData.length
				if(len > 1) {
					_this.disabled = false
				} else {
					_this.disabled = true
				}
			},
			// 一天两单
			twoDay() {
				let _this = this
				_this.errorMes = false
				let dates = new Date()
				let y = dates.getFullYear()
				let m = dates.getMonth() + 1
				let d = dates.getDate()
				if(m < 10) {
					m = '0' + m
				}
				if(d < 10) {
					d = '0' + d
				}
				let startTime = y + '-' + m + '-' + d
				let t = _this.taskForm.taskData[0].pickTime
				let num = _this.taskForm.buyNum
				_this.taskForm.taskData = [{
					startTime: startTime,
					pickTime: t,
					numbers: ''
				}]
				if(num !== '') {
					let counts = parseInt(num) / 2
					if(counts % 1 === 0) {
						for(let i = 0; i < counts - 1; i++) {
							let dateTemps = _this.taskForm.taskData[i].startTime
							let dateTemp = dateTemps.split('-')
							let nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]) // 转换为MM-DD-YYYY格式
							let millSeconds = Math.abs(nDate) + (24 * 60 * 60 * 1000)
							let rDate = new Date(millSeconds)
							let year = rDate.getFullYear()
							let month = rDate.getMonth() + 1
							if(month < 10) month = '0' + month
							let date = rDate.getDate()
							if(date < 10) date = '0' + date
							let times = year + '-' + month + '-' + date
							_this.taskForm.taskData.push({
								startTime: times,
								pickTime: t,
								numbers: '2'
							})
						}
					} else {
						counts++
						let count = parseInt(counts)
						for(let i = 0; i < count - 1; i++) {
							// _this.taskData[count].numbers = 1
							let dateTemps = _this.taskForm.taskData[i].startTime
							var dateTemp = dateTemps.split('-')
							var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]) // 转换为MM-DD-YYYY格式
							var millSeconds = Math.abs(nDate) + (24 * 60 * 60 * 1000)
							var rDate = new Date(millSeconds)
							var year = rDate.getFullYear()
							var month = rDate.getMonth() + 1
							if(month < 10) month = '0' + month
							var date = rDate.getDate()
							if(date < 10) date = '0' + date
							var times = year + '-' + month + '-' + date
							_this.taskForm.taskData.push({
								startTime: times,
								pickTime: t,
								numbers: '2'
							})
						}
						let item = parseInt(count)
						_this.taskForm.taskData[item - 1].numbers = '1'
					}
					_this.taskForm.taskData[0].numbers = '2'
				}
				let len = _this.taskForm.taskData.length
				if(len > 1) {
					_this.disabled = false
				} else {
					_this.disabled = true
				}
			},
			// 一天三单
			threeDay() {
				let _this = this
				_this.errorMes = false
				let dates = new Date()
				let y = dates.getFullYear()
				let m = dates.getMonth() + 1
				let d = dates.getDate()
				if(m < 10) {
					m = '0' + m
				}
				if(d < 10) {
					d = '0' + d
				}
				let startTime = y + '-' + m + '-' + d
				let t = _this.taskForm.taskData[0].pickTime
				let num = _this.taskForm.buyNum
				_this.taskForm.taskData = [{
					startTime: startTime,
					pickTime: t,
					numbers: ''
				}]
				if(num !== '') {
					_this.taskForm.taskData[0].numbers = '3'
					let counts = parseInt(num) / 3
					if(counts % 1 === 0) {
						for(let i = 0; i < counts - 1; i++) {
							let dateTemps = _this.taskForm.taskData[i].startTime
							let dateTemp = dateTemps.split('-')
							let nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]) // 转换为MM-DD-YYYY格式
							let millSeconds = Math.abs(nDate) + (24 * 60 * 60 * 1000)
							let rDate = new Date(millSeconds)
							let year = rDate.getFullYear()
							let month = rDate.getMonth() + 1
							if(month < 10) month = '0' + month
							let date = rDate.getDate()
							if(date < 10) date = '0' + date
							let times = year + '-' + month + '-' + date
							_this.taskForm.taskData.push({
								startTime: times,
								pickTime: t,
								numbers: '3'
							})
						}
					} else {
						counts++
						var count = parseInt(counts)
						for(let i = 0; i < count - 1; i++) {
							// _this.taskData[count].numbers = 1
							let dateTemps = _this.taskForm.taskData[i].startTime
							var dateTemp = dateTemps.split('-')
							var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]) // 转换为MM-DD-YYYY格式
							var millSeconds = Math.abs(nDate) + (24 * 60 * 60 * 1000)
							var rDate = new Date(millSeconds)
							var year = rDate.getFullYear()
							var month = rDate.getMonth() + 1
							if(month < 10) month = '0' + month
							var date = rDate.getDate()
							if(date < 10) date = '0' + date
							var times = year + '-' + month + '-' + date
							_this.taskForm.taskData.push({
								startTime: times,
								pickTime: t,
								numbers: '3'
							})
						}
						var item = parseInt(count)
						var result = 0
						for(let j = 0; j < item - 1; j++) {
							result += parseInt(_this.taskForm.taskData[j].numbers)
						}
						_this.taskForm.taskData[item - 1].numbers = parseInt(num) - parseInt(result)
					}
				}
				let len = _this.taskForm.taskData.length
				if(len > 1) {
					_this.disabled = false
				} else {
					_this.disabled = true
				}
			},
			// 时间范围
			timePicker() {
				let _this = this
				let pickTimes = _this.taskForm.taskData[0].pickTime
				let len = _this.taskForm.taskData.length
				for(let i = 0; i < len; i++) {
					_this.taskForm.taskData[i].pickTime = pickTimes
				}
			}
		}
	}
</script>

<style>

</style>