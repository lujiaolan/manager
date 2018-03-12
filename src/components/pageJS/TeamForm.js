export default {
    data() {
        return {
            editableDate:false,
            historyList:[],
            teamForm: {
                apId:this.$store.state.domain.domain.domain.apId,
                agentNameLike:'',
                startTime:'',
                endTime:'',
                currentPage:1,
                pageSize:10,
            },
            historyTeamInfo:{
                apId:this.$store.state.domain.domain.domain.apId,
                agentNameLike:'',
                startTime:'',
                endTime:'',
                page:1,
                currentPage:1,
                pageSize:10,
                agentLevel:null,
                role:'',
                userName:'',
                userId:'',
                IDName:'',
                userEmail:''

            },
            teamFormTotal:null,
            teamInfoList: [],
            teamForm_rules: {
                startTime:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.teamForm.endTime>value){
                                    callback()
                                }else{
                                    callback(new Error('选择的开始日期不能大于结束日期'))
                                }
                            }else{
                                if(this.teamForm.endTime){
                                    callback(new Error('请选择开始日期'))
                                }else{
                                    callback();
                                }
                            }
                        }
                    }
                ],
                endTime:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.teamForm.startTime<value){
                                    callback()
                                }else{
                                    callback(new Error('选择的开始日期不能大于结束日期'))
                                }
                            }else{
                                if(this.teamForm.startTime){
                                    callback(new Error('请选择结束日期'))
                                }else{
                                    callback();
                                }
                            }
                        }
                    }
                ]
            },



            dateSelect: [
                {
                    value: '当天',
                    active: true
                },
                {
                    value: '昨天',
                    active: false
                },
                {
                    value: '近3天',
                    active: false
                },
                {
                    value: '本周',
                    active: false
                },
                {
                    value: '上周',
                    active: false
                },
                {
                    value: '本月',
                    active: false
                },
                {
                    value: '上月',
                    active: false
                }
            ],
            dateTime: {
                startTime: this.moment(new Date()).format('YYYY-MM-DD'),
                endTime: this.moment(new Date()).format('YYYY-MM-DD')
            }
        }
    },
    created(){
        this.teamInfoSeach();
    },
    methods: {
        getAgent(row){
            const self = this;
            console.log(row)
            if(row._id){
                this.$ajax({
                    method:'post',
                    url:'/snooping',
                    data:{
                        apId:row.apId,
                        userId:row._id
                    }
                }).then(function (res) {
                    if(res.data.retCode==0){
                        if(res.data.data.status===1){
                            const userId = res.data.data._id;
                            const urlPost = res.data.data.bindingDomain+'/#/userCommission/myTeamInfo?'+userId;
                            window.open(urlPost);
                        }else if(res.data.data.status===0){
                            self.$message({
                                message:'用户未激活,请先修改用户状态',
                                type:'warning',
                                showClose:true
                            })
                        }else if(res.data.data.status===-1){
                            self.$message({
                                message:'用户已冻结,请先修改用户状态',
                                type:'warning',
                                showClose:true
                            })
                        }
                        else if(res.data.data.status===2){
                            self.$message({
                                message:'用户已暂停,请先修改用户状态',
                                type:'warning',
                                showClose:true
                            })
                        }
                    }else{
                        self.$message({
                            message:'用户已暂停,请先修改用户状态',
                            type:'warning',
                            showClose:true
                        })
                    }
                }).catch(function (err) {
                    self.$message({
                        message:'网络错误',
                        type:'error',
                        showClose:true
                    })
                })
            }
        },
        teamInfoSizeChange(val){
            this.teamForm.pageSize = val;
            this.teamInfoSeach();
        },
        teamInfoCurrentChange(val){
            this.teamForm.page = val;
            this.teamInfoSeach();
        },
        searchTeamInfo(ref){
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    this.teamInfoSeach()
                }else{
                    return false;
                }
            })
        },
        teamInfoSeach(){
            this.teamInfoList = [];
            const self = this;
            this.$ajax({
                method:'post',
                url:'/ap/teamStat/financialStat',
                data:this.teamForm
            }).then(function (res) {
                if(res.data.retCode===0){
                    console.log(res)
                    self.teamFormTotal = res.data.data.totalAmount;
                    console.log( 'financialStat:');
                    console.log( res.data.data);
                    self.teamInfoList = res.data.data;
                    self.teamInfoList.forEach(function (item,index) {
                        self.teamInfoList[index].totalDeposit = self.accounting.formatMoney(item.totalDeposit,'',2,',','.')
                        self.teamInfoList[index].totalWithdraw = self.accounting.formatMoney(item.totalWithdraw,'',2,',','.')
                        self.teamInfoList[index].totalCommisssion = self.accounting.formatMoney(item.totalCommisssion,'',2,',','.')
                        self.teamInfoList[index].totalProfitAmount = self.accounting.formatMoney(item.totalProfitAmount,'',2,',','.')
                        self.teamInfoList[index].totalProcedureAmount = self.accounting.formatMoney(item.totalProcedureAmount,'',2,',','.')
                        self.teamInfoList[index].totalStoreCostAmount = self.accounting.formatMoney(item.totalStoreCostAmount,'',2,',','.')
                    })
                }else{

                }
            }).catch(function (err) {

            })

        },

        exportExcel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../vendor/Export2Excel');
                const tHeader = ['用户名', '客户数', '总交易量', '总存款($)', '总取款($)','总佣金','未平仓','止损','手续费','利息'];
                const filterVal = ['agentId', 'name', 'higherLeverAgent', 'agentLever', 'auditStatus','country','region','allOutMoney','balance','phone','Email','Rebate','Rebate','Rebate'];
                const list = this.teamInfoList;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '团队报表');
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },



        setTime(val) {
            const self = this;
            // 当天，近3天
            if(val === 0 || val === 2){
                const date = new Date();
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD');
                date.setTime(date.getTime() - 3600 * 1000 * 24 * val);
                self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD');
            }
            // 昨天
            if(val === 1){
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * val);
                self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD');
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD');
            }
            // 本周
            if(val === 6){
                const date = new Date();
                let week;
                week = date.getDay()-1;
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD');
                date.setTime(date.getTime() - 3600 * 1000 * 24 * week);
                self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD');
            }
            //上周
            if(val === 7){
                const date = new Date();
                let week;
                week = date.getDay();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * week);
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD');
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 6);
                self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD');
            }
            // 本月
            if(val === 3){
                const date = new Date();
                let nowDate;
                nowDate = date.getDate()-1;
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD');
                date.setTime(date.getTime() - 3600 * 1000 * 24 * nowDate);
                self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD');

            }
            // 上月
            if(val === 4){
                const date = new Date();
                let month,year,days,nowDate;
                month = date.getMonth() + 1;
                year = date.getFullYear();
                nowDate = date.getDate();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * nowDate);
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD');
                const cond1 = year % 4 === 0;
                const cond2 = year % 100 !== 0;
                const cond3 = year % 400 === 0;
                const cond = cond1 && cond2 || cond3;
                if(month === 1 || month === 2 || month === 4 || month === 6 || month === 8 || month === 9 || month === 11){
                    days = 30;
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * days);
                    self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD');
                }
                if(month === 5 || month === 7 || month === 10 || month === 12){
                    days = 29;
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * days);
                    self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD');
                }
                if(month === 3){
                    if(cond){
                        days = 28
                    }else {
                        days = 27
                    }
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * days);
                    self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD');
                }
            }
        },
        getDateData(item){
            const self = this;
            this.dateSelect.forEach(function (val) {
                if(val.value === item.value){
                    val.active = true
                }else {
                    val.active = false
                }
            });
            if(item.value === '当天'){
                self.setTime(0);
            }else if(item.value === '昨天'){
                self.setTime(1);
            }else if(item.value === '近3天'){
                self.setTime(2);
            }else if(item.value === '本周'){
                self.setTime(6);
            }else if(item.value === '上周'){
                self.setTime(7);
            }else if(item.value === '本月'){
                self.setTime(3);
            }else if(item.value === '上月'){
                self.setTime(4);
            }
            console.log('startTime,endTime');
            console.log(self.dateTime.startTime,self.dateTime.endTime);
            this.rebateFrom.startTime = self.dateTime.startTime;
            this.rebateFrom.endTime = self.dateTime.endTime;
            // console.log( this.rebateFrom.startTime);
            // console.log(this.rebateFrom.endTime);
            this.getReadyRebateData(self.dateTime);
        }
    }
}
