export default {
    data() {
        return {
            options: [
                {
                    value: 0,
                    label: '所有流水类型'
                },
                {
                    value: 1,
                    label: '在线入金'
                },
                {
                    value: 2,
                    label: '申请出金'
                },
                {
                    value: 4,
                    label: '钱包转MT4'
                },
                {
                    value: 5,
                    label: 'MT4转钱包'
                },
                {
                    value: 6,
                    label: 'MT4转MT4'
                },
                {
                    value: 7,
                    label: '钱包转钱包'
                },
                {
                    value: 9,
                    label: '佣金转入'
                },
                {
                    value: 21,
                    label: '系统入金'
                },
                {
                    value: 22,
                    label: '系统出金'
                },
                {
                    value: 23,
                    label: '添加佣金'
                },
                {
                    value: 24,
                    label: '减少佣金'
                },
            ],
            WaterAccount: {
                orderId: '',
                condition: '',
                selectType: 0,
                dateValue1: '',
                dateValue2: '',
                tableData: [],
                page: 1,
                pageSize: 10,
            },
            WaterAccount_rules: {
                orderId: {
                    required:false,
                    validator: (rules,val,callback)=>{
                        if(/^[0-9]*$/.test(val)){
                            callback()
                        }else {
                            callback(new Error('请输入正确的订单编号'))
                        }
                    }
                },
                dateValue1:[
                    {
                        required:false,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.MT4deposit.dateValue2==''){
                                    callback(new Error('请选择结束时间'))
                                }else{
                                    callback()
                                }
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                dateValue2:[
                    {
                        required:false,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.MT4deposit.dateValue1==''){
                                    callback(new Error('请选择开始时间'))
                                }else{
                                    if(this.MT4deposit.dateValue1>value){
                                        callback(new Error('开始时间不能大于结束时间'))
                                    }else{
                                        callback()
                                    }
                                }
                            }else{
                                callback()
                            }
                        }
                    }
                ]
            }
        };
    },
    created(){
        this.getData();
    },
    methods: {
        CurrentChange(val){
            this.WaterAccount.page = val;
            this.getData();
        },
        SizeChange(val){
            this.WaterAccount.pageSize = val;
            this.getData();
        },
        getData(){
            const self = this;
            const postData = {
                apId: self.$store.state.domain.domain.domain.apId,
                page: self.WaterAccount.page.toString(),
                pageSize: self.WaterAccount.pageSize.toString(),
                billNum: self.WaterAccount.orderId,
                condition: self.WaterAccount.condition,
            };
            if(self.WaterAccount.selectType === 0){
                postData.type = ''
            }else {
                postData.type = self.WaterAccount.selectType
            }
            if(self.WaterAccount.dateValue1 === ''&& self.WaterAccount.dateValue2 === ''){
                postData.startTime = '';
                postData.endTime = '';
            }else {
                postData.startTime = self.moment(self.WaterAccount.dateValue1).format('YYYY-MM-DD');
                postData.endTime = self.moment(self.WaterAccount.dateValue2).format('YYYY-MM-DD');
            }
            console.log("流水账 postData",postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/deposit/apFlowBill'
            }).then(function (res) {
                console.log('/deposit/apFlowBill res');
                console.log(res);
                if(res.data.retCode === 0){
                    self.WaterAccount.tableData = res.data.data.data;
                    self.WaterAccount.tableData.records = res.data.data.records;
                    console.log('res.data.data.records');
                    console.log(self.WaterAccount.tableData);
                    self.WaterAccount.tableData.forEach(function (item,index) {
                        self.WaterAccount.tableData[index].billMoney = self.accounting.formatMoney(item.billMoney,'',2,',','.')
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
        },
        searchWaterAccount(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.WaterAccount.page = 1;
                    this.getData();
                }else {
                    return false
                }
            })
        },


        exportWaterAccount() {
            let  startTime = '';
            let  endTime = '';
            let billNum = '',type = '',condition= '';
            billNum = this.WaterAccount.orderId;
            condition = this.WaterAccount.condition;
            if(this.WaterAccount.selectType === 0){
                type = ''
            }else {
                type = this.WaterAccount.selectType
            }
            // start
            if(this.WaterAccount.dateValue1 === ''&& this.WaterAccount.dateValue2 === ''){
                startTime = '';
                endTime = '';
            }else {
                startTime = this.moment(this.WaterAccount.dateValue1).format('YYYY-MM-DD');
                endTime = this.moment(this.WaterAccount.dateValue2).format('YYYY-MM-DD');
            }
            // TODO 导出下载地址上传的时候记得改
            const url = 'http://120.77.55.98:8080/crm/deposit/apFlowBill/export?apId=' + this.$store.state.domain.domain.domain.apId
                + '&billNum=' + billNum + '&condition=' + condition
                + '&type=' + type
                + '&startTime=' + startTime  + '&endTime=' + endTime;
            console.log('/crm/order/history/export url');
            console.log(url);
            window.location.href = url
        },
    }
}
