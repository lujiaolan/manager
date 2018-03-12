export default {
    data() {
        return {
            editableDate:false,
            MT4deposit: {
                orderId: '',
                condition: '',
                selectType: '0',
                dateValue1: '',
                dateValue2: '',
                tableData: [],
                page: 1,
                pageSize: 10,
            },
            MT4deposit_rules: {
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
                condition: {
                    required:false,
                    validator: (rules,val,callback)=>{
                        if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val)||/^[0-9]*$/.test(val)){
                            callback()
                        }else {
                            callback(new Error('请输入正确的MT4帐号或是邮箱'))
                        }
                    },
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
            this.MT4deposit.page = val;
            this.getData();
        },
        SizeChange(val){
            this.MT4deposit.pageSize = val;
            this.getData();
        },
        getData(){
            const self = this;
            const postData = {
                apId: self.$store.state.domain.domain.domain.apId,
                page: self.MT4deposit.page.toString(),
                pageSize: self.MT4deposit.pageSize.toString(),
                billNum: self.MT4deposit.orderId,
                condition: self.MT4deposit.condition,
            };
            if(self.MT4deposit.selectType === '0'){
                postData.type = ''
            }else {
                postData.type = self.MT4deposit.selectType
            }
            if(self.MT4deposit.dateValue1 === ''&& self.MT4deposit.dateValue2 === ''){
                postData.startTime = '';
                postData.endTime = '';
            }else {
                postData.startTime = self.moment(self.MT4deposit.dateValue1).format('YYYY-MM-DD');
                postData.endTime = self.moment(self.MT4deposit.dateValue2).format('YYYY-MM-DD');
            }
            console.log("测试时间 postData",postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/deposit/apBill'
            }).then(function (res) {
                console.log('/deposit/apBill res');
                if(res.data.retCode === 0){
                    self.MT4deposit.tableData = res.data.data.data;
                    self.MT4deposit.tableData.records = res.data.data.records;
                    console.log('res.data.data.records');
                    console.log(self.MT4deposit.tableData);
                    self.MT4deposit.tableData.forEach(function (item,index) {
                        self.MT4deposit.tableData[index].billMoney = self.accounting.formatMoney(item.billMoney,'',2,',','.');
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
        searchMT4deposit(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.MT4deposit.page = 1;
                    this.getData();
                }else {
                    return false
                }
            })
        },

        exportMT4deposit() {
            const self = this;
            let  startTime = '';
            let  endTime = '';
            let type;
            if(self.MT4deposit.selectType === '0'){
                type = ''
            }else {
                type = self.MT4deposit.selectType
            }
            if(self.MT4deposit.dateValue1 === ''&& self.MT4deposit.dateValue2 === ''){
                startTime = '';
                endTime = '';
            }else {
                startTime = self.moment(self.MT4deposit.dateValue1).format('YYYY-MM-DD');
                endTime = self.moment(self.MT4deposit.dateValue2).format('YYYY-MM-DD');
            }
            // TODO 导出下载地址上传的时候记得改
            const url =  this.$store.state.baseUrl + '/crm/deposit/apBill/export?apId=' + this.$store.state.domain.domain.domain.apId
                + '&billNum=' + this.MT4deposit.orderId
                + '&condition=' + this.MT4deposit.condition.trim()
                + '&type=' + type  + '&startTime=' + startTime  + '&endTime=' + endTime;
            console.log('exportOutMoneyAudit url');
            console.log(url);
            window.location.href = url
        },
    }
}
