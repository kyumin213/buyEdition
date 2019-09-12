<template>
	<div>
		<!--任务类型-->
		<el-tabs v-model="taskType" type='border-card' @tab-click="handleClick">
			<el-tab-pane label="FBA任务" name="all">
				<!-- 创建任务-->
				<fba-task></fba-task>
			</el-tab-pane>
			<el-tab-pane label="点赞任务" name="second">
				<!-- 点赞任务-->
				<like-task></like-task>
			</el-tab-pane>
			<el-tab-pane label="购物车任务" name="third">
				<!-- 购物车任务-->
				<buycar-task></buycar-task>
			</el-tab-pane>
			<el-tab-pane label='QA任务' name="four">
				<!-- QA任务-->
				<qa-task></qa-task>
			</el-tab-pane>
			<el-tab-pane label='心愿任务' name="five">
				<!-- 心愿任务-->
				<wish-task></wish-task>
			</el-tab-pane>
		</el-tabs>
		<!-- 付款-->
		<el-dialog title="付款" :visible.sync="paymentModel" :close-on-click-modal="false" width="40%" :before-close="paymentClose" top='5vh'>
			<el-form :model="paymentForm" :rules="taskRule" class="demo-ruleForm">
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
	import wishTask from './wishTask'
	import qaTask from './QaTask'
	import buycarTask from './buyCarTask'
	import likeTask from './likesTask'
	import fbaTask from './FbaTask'
	export default {
		name:'Promotion',
		data() {
			return {
				paymentModel: false,
				searchType: false,
				taskType: 'all',
				nolp: true,
				btnTask: false,
				disabled: true,
				disabled2: true,
				disabled3: true,
				errorMes: false,
				rateTab: false,
				addFreeTab: false,
				serviceTab: false,
				QaType: true,
				rateData: [], // 费率
				addFreeData: [], // 增值费
				serviceData: [], // 服务费
				pickerOptions0: this.startDate(),
				paymentForm: {
					balancePayment: '',
					cashPayment: '',
					paymentType: '支付宝',
					recceiveAccount: '圭贤',
					PayAccount: '',
					tradingFlow: ''
				},
				problemForm: {
					serviceCharge: '0.00',
					problemData: [{
						country: '',
						proAnsi: '',
						problem: '',
						startTime: ''
					}]
				},
				answerForm: {
					ansServiceCharge: '0.00',
					answerData: [{
						country: '',
						address: '',
						answer: '',
						startTime: ''
					}]
				},

				countryData: [{
						country: '美国'
					},
					{
						country: '加拿大'
					}
				],
				likesForm: {
					likeData: [{
						proService: '33',
						address: '',
						selectType: '',
						nums: ''
					}],
					total: '0.00',
					TerminalPlatform: 'PC'

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
					monthSales: '',
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
					Delivery: '否',
					productTotal: '0.00',
					serviceCharge: '0.00',
					total: '0.00',
					links: '',
					remark: ''
				},
				QaForm: {
					TerminalPlatform: 'PC',
					QA: '我要提问'
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
		components:{
			wishTask,
			qaTask,
			buycarTask,
			likeTask,
			fbaTask
		},
		methods: {
			//时间范围
			timePicker() {
				let _this = this
				let pickTimes = _this.taskForm.taskData[0].pickTime
				let len = _this.taskForm.taskData.length
				for(let i = 0; i < len; i++) {
					_this.taskForm.taskData[i].pickTime = pickTimes
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
			// 付款关闭页面
			paymentClose() {
				let _this = this
				_this.paymentModel = false
			},
			// 创建任务提交订单到支付
			submitPay(formName) {
				let _this = this
				let errorMes = _this.errorMes
				_this.$refs[formName].validate((valid) => {
					if(valid && !errorMes) {
						_this.paymentModel = true
					}
				})
			},
			//购物车任务提交
			buyCarComfir(formName) {
				let _this = this
				let errorMes = _this.errorMes
				_this.$refs[formName].validate((valid) => {
					if(valid && !errorMes) {
						_this.paymentModel = true
					}
				})
			},
			//心愿订单任务提交
			wishComfir(formName) {
				let _this = this
				let errorMes = _this.errorMes
				_this.$refs[formName].validate((valid) => {
					if(valid && !errorMes) {
						_this.paymentModel = true
					}
				})
			},
			// QA任务问题提交
			problemComfir(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.paymentModel = true
					}
				})
			},
			// QA任务回答提交
			answerComfir(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.paymentModel = true
					}
				})
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

			// QA任务我要回答新增一行
			addAnswerTask() {
				let _this = this
				_this.answerForm.answerData.push({
					country: '',
					proAsin: '',
					problem: ''
				})
				let len = _this.answerForm.answerData.length
				if(len > 1) {
					_this.disabled3 = false
				}
			},
			// QA任务我要回答删除一行
			removeAnswerTask(item, index) {
				let _this = this
				_this.index = _this.answerForm.answerData.indexOf(item)
				let len = _this.answerForm.answerData.length
				if(index !== -1) {
					_this.answerForm.answerData.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled3 = true
				}
			},
			// 选择QA任务类型
			selectQA() {
				let _this = this
				let qa = _this.QaForm.QA
				if(qa === '我要提问') {
					_this.QaType = true
				} else if(qa === '我要回答') {
					_this.QaType = false
				}
			},
			// QA任务我要提问新增一行
			addproblemTask() {
				let _this = this
				_this.problemForm.problemData.push({
					country: '',
					proAsin: '',
					problem: ''
				})
				let len = _this.problemForm.problemData.length
				if(len > 1) {
					_this.disabled2 = false
				}
			},
			// QA任务删除一行
			removeProblemTask(item, index) {
				let _this = this
				_this.index = _this.problemForm.problemData.indexOf(item)
				let len = _this.problemForm.problemData.length
				if(index !== -1) {
					_this.problemForm.problemData.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled2 = true
				}
			},
			// 购物车任务新增一行
			addCarNewTask() {
				let _this = this
				_this.taskForm.taskData.push({
					pickTime: [new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 23, 59)]
				})
				let len = _this.taskForm.taskData.length
				if(len > 1) {
					_this.disabled = false
				}
			},
			// 购物车任务删除一行
			removeBuyCarTask(item, index) {
				let _this = this
				_this.index = _this.taskForm.taskData.indexOf(item)
				let len = _this.taskForm.taskData.length
				console.log(len)
				if(index !== -1) {
					_this.taskForm.taskData.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled = true
				}
			},
			// 购物车加购平台选择
			platFormCar() {
				let _this = this
				let forms = _this.taskForm.AddPlatform
				if(forms === '链接加购') {
					_this.searchType = true
				} else {
					_this.searchType = false
				}
			},
			//  购物车任务代购数量
			buyCheckNum(index) {
				let _this = this
				_this.index = index
				let buyNum = _this.buyCarForm.buyNum
				let taskTime = _this.buyCarData
				var result = 0
				for(let i = 0; i < taskTime.length; i++) {
					result += parseInt(taskTime[i].numbers)
				}
				if(result > buyNum) {
					_this.errorMes = true
					return false
				} else {
					_this.errorMes = false
				}
			},
			// 心愿任务代购数量
			checkNums(index) {
				let _this = this
				_this.index = index
				let buyNum = _this.wishForm.buyNum
				let taskTime = _this.wishData
				var result = 0
				for(let i = 0; i < taskTime.length; i++) {
					result += parseInt(taskTime[i].numbers)
				}
				if(result > buyNum) {
					_this.errorMes = true
					return false
				} else {
					_this.errorMes = false
				}
			},
			// FB任务代购数量
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
				let len = _this.likesForm.likeData.length
				if(index !== -1) {
					_this.likesForm.likeData.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled2 = true
				}
			},
			// 服务费显示与隐藏
			toggleService() {
				let _this = this
				let tabs = _this.serviceTab
				if(tabs) {
					_this.serviceTab = false
				} else {
					_this.serviceTab = true
				}
			},
			// 增值费显示与隐藏
			toggleAddFree() {
				let _this = this
				let tabs = _this.addFreeTab
				if(tabs) {
					_this.addFreeTab = false
				} else {
					_this.addFreeTab = true
				}
			},
			// 汇率显示与隐藏
			toggleRate() {
				let _this = this
				let tabs = _this.rateTab
				if(tabs) {
					_this.rateTab = false
				} else {
					_this.rateTab = true
				}
			},
			// 新增一行任务
			addNewTask() {
				let _this = this
				_this.taskForm.taskData.push({
					pickTime: [new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 23, 59)]
				})
				let len = _this.taskForm.taskData.length
				if(len > 1) {
					_this.disabled = false
				}
			},
			// 删除一项任务
			removeTask(item, index) {
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
			handleClick(tab, event) {
				console.log(tab, event)
			},
			startDate() {
				return {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7
					}
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
			wishCheckBuyNum() {
				let _this = this
				let nums = _this.taskForm.buyNum
				if(parseInt(nums) === 1) {
					_this.btnTask = true
					_this.taskForm.taskData[0].numbers = 1
				} else {
					_this.btnTask = false
					_this.taskForm.taskData[0].numbers = ''
				}
			},
			checkBuyCarNum() {
				let _this = this
				let nums = _this.buyCarForm.buyNum
				if(parseInt(nums) === 1) {
					_this.buyCarData[0].numbers = 1
				} else {
					_this.buyCarData[0].numbers = ''
				}
			},
			// 留评类型
			lpType() {
				let _this = this
				let lp = _this.taskForm.commentType
				if(lp === '不留评') {
					_this.nolp = false
				} else {
					_this.nolp = true
				}
			},
			// 当前日期
			getDate() {
				let _this = this
				let date = new Date()
				let y = date.getFullYear()
				let m = date.getMonth() + 1
				let d = date.getDate()
				m = m < 10 ? "0" + m : m
				d = d < 10 ? "0" + d : d
				let startTime = y + '-' + m + '-' + d
				_this.taskForm.taskData[0].startTime = startTime
				_this.buyCarData[0].startTime = startTime
				_this.wishData[0].startTime = startTime
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
				_this.taskData[0].startTime = startTime
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
				console.log(len)
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
		}
	}
</script>

<style>

</style>