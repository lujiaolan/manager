export default {
    data() {
        return {
            editableDate:false,
            rebateFrom: {
                tradeAccount: '',
                commAccount: '',
                rebateStatus: 'all',
                agentLevel: '0',
                startTime: '',
                endTime: '',
                tableData: []
            },
            rebateFrom_rules: {
                startTime:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value === ''){
                                callback(new Error('请选择开始时间'));
                            }else{
                                if(this.rebateFrom.endTime === ''){
                                    callback(new Error('请选择结束时间'))
                                }else{
                                    callback()
                                }
                            }
                        }
                    }
                ],
                endTime:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value === ''){
                                callback(new Error('请选择结束时间'))
                            }else{
                                if(this.rebateFrom.startTime === ''){
                                    callback(new Error('请选择开始时间'))
                                }else{
                                    if(this.rebateFrom.startTime>value){
                                        callback(new Error('开始时间不能大于结束时间'))
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            rebateFromPagination: {
                page: 1,
                pageSize: 10
            },
            totalCrmAgent: '',

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
        };
    },
    created(){
        this.getReadyRebateData(this.dateTime);
    },
    methods: {
        // 页码改变
        currentChangeRebateFrom(val){
            this.rebateFromPagination.page = val;
            this.getReadyRebateData();
        },
        // 总页数改变
        rebateFromSizeChange(val){
            this.rebateFromPagination.pageSize = val;
            this.getReadyRebateData();
        },


        getReadyRebateData(date){
            let self = this;
            var postData = {};
            postData.apId = self.$store.state.domain.domain.domain.apId;
            postData.page = self.rebateFromPagination.page.toString();
            postData.pageSize = self.rebateFromPagination.pageSize.toString();
            if(self.rebateFrom.agentLevel === '0'){
                postData.agentLevel = '';
            }else {
                postData.agentLevel = self.rebateFrom.agentLevel;
            }
            if(self.rebateFrom.rebateStatus === "all"){
                postData.status = "";
            }else {
                postData.status = self.rebateFrom.rebateStatus;
            }
            postData.tradeAccount = self.rebateFrom.tradeAccount.trim();
            postData.commAccount = self.rebateFrom.commAccount.trim();
            // console.log(postData);
            postData.startTime = date.startTime;
            postData.endTime = date.endTime;

            console.log("/commission/apCommRecord postData",postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/commission/apCommRecord'
            }).then(function (res) {
                if(res.data.retCode === 0){
                    // console.log(res);
                    self.rebateFrom.tableData = res.data.data.data;
                    self.rebateFrom.tableData.totalCountApply = res.data.data.total;
                    self.rebateFrom.tableData.moneyAmount = res.data.data.moneyAmount;
                    self.rebateFrom.tableData.count = res.data.data.count;
                    self.rebateFrom.tableData.volume = res.data.data.volume;
                    self.rebateFrom.tableData.forEach(function (item,index) {
                        self.rebateFrom.tableData[index].money = self.accounting.formatMoney(item.money,'',2,',','.');
                        self.rebateFrom.tableData[index].commissionMoney = self.accounting.formatMoney(item.commissionMoney);
                    })
                }else {
                    self.$message({
                        type: 'error',
                        message: '请求错误'
                    })
                }
            }).catch(function (err) {
                self.$message({
                    type: 'error',
                    message: '网络错误'
                })
            })
            // end
        },
        searchRebateFrom(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    const dateTime = {
                        startTime: this.moment(self.rebateFrom.startTime).format('YYYY-MM-DD'),
                        endTime: this.moment(self.rebateFrom.endTime).format('YYYY-MM-DD'),
                    };
                    self.dateSelect.forEach(function (val) {
                        val.active = false
                    });
                    self.rebateFromPagination.page = 1;
                    this.getReadyRebateData(dateTime);
                }else {
                    return false
                }
            })
        },


        exportRebateForm() {
            const self = this;
            let  startTime = '';
            let  endTime = '';
            let agentLevel,status,condition;
            if(self.rebateFrom.agentLevel === '0'){
                agentLevel = '';
            }else {
                agentLevel = self.rebateFrom.agentLevel;
            }
            if(self.rebateFrom.rebateStatus === "all"){
                status = "";
            }else {
                status = self.rebateFrom.rebateStatus;
            }
            // console.log(postData);

            // start
            if(self.rebateFrom.startTime === ''&& self.rebateFrom.endTime === ''){
                startTime = '';
                endTime = '';
            }else {
                startTime = self.moment(self.rebateFrom.startTime).format('YYYY-MM-DD');
                endTime = self.moment(self.rebateFrom.endTime).format('YYYY-MM-DD');
            }
            // TODO 导出下载地址上传的时候记得改
            const url = this.$store.state.baseUrl + '/crm/commission/apCommRecord/export?apId=' + this.$store.state.domain.domain.domain.apId
                + '&agentLevel=' + agentLevel + '&status=' + status
                + '&tradeAccount=' + this.rebateFrom.tradeAccount.trim()
                + '&commAccount=' + this.rebateFrom.commAccount.trim()
                + '&startTime=' + startTime  + '&endTime=' + endTime;
            console.log('exportOutMoneyAudit url');
            console.log(url);
            window.location.href = url
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
