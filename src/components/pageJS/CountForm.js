export default {
    data() {
        return {
            editableDate:false,
            orderSelect: {
                startTime: '',
                endTime: '',
                orderValue: '1'
            },
            options: [
                {
                    value: "1",
                    label: '按天统计'
                }, {
                    value: "2",
                    label: '按月统计'
                }
            ],
            orderSelect_rules: {
                startTime: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.orderSelect.endTime==''){
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
                endTime:[
                    {
                        required:false,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.orderSelect.startTime==''){
                                    callback(new Error('请选择开始时间'))
                                }else{
                                    if(this.orderSelect.startTime>value){
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
            },
            customCount: '234',

            countFormData: [],

            pageModel: {
                page: 1,
                pageSize: 10
            }
        };
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            let self = this;
            const postData = {
                apId: self.$store.state.domain.domain.domain.apId,
                page: self.pageModel.page.toString(),
                pageSize: self.pageModel.pageSize.toString(),
                type: self.orderSelect.orderValue,
            };
            if(self.orderSelect.startTime){
                postData.startTime = self.moment(self.orderSelect.startTime).format('YYYY-MM-DD');
            }else {
                postData.startTime = ''
            }
            if(self.orderSelect.endTime){
                postData.endTime = self.moment(self.orderSelect.endTime).format('YYYY-MM-DD');
            }else {
                postData.endTime = ''
            }
            console.log('CountForm postData',postData);
            self.$ajax.post('/statistics/ap',postData).then(function (res) {
                console.log('/statistics/ap CountForm ',res);
                if(res.data.retCode == 0){
                    self.countFormData = res.data.data.data;
                    self.countFormData.records = res.data.data.records;
                    res.data.data.data.forEach(function (item,index) {
                        if(item.userAmount){
                            self.countFormData[index].userAmount = item.userAmount
                        }else {
                            self.countFormData[index].userAmount = 0
                        }
                        if(item.volumeAmount){
                            self.countFormData[index].volumeAmount = item.volumeAmount
                        }else {
                            self.countFormData[index].volumeAmount = 0
                        }
                        if(item.tradeAmount){
                            self.countFormData[index].tradeAmount = item.tradeAmount
                        }else {
                            self.countFormData[index].tradeAmount = 0
                        }
                        if(item.plusAmount){
                            self.countFormData[index].plusAmount = self.accounting.formatMoney(item.plusAmount,'',2,',','.')
                        }else {
                            self.countFormData[index].plusAmount = self.accounting.formatMoney(0,'',2,',','.')
                        }
                        if(item.minusAmount){
                            self.countFormData[index].minusAmount = self.accounting.formatMoney(item.minusAmount,'',2,',','.')
                        }else {
                            self.countFormData[index].minusAmount = self.accounting.formatMoney(0,'',2,',','.')
                        }
                        if(item.closedAmount){
                            self.countFormData[index].closedAmount = self.accounting.formatMoney(item.closedAmount,'',2,',','.')
                        }else {
                            self.countFormData[index].closedAmount = self.accounting.formatMoney(0,'',2,',','.')
                        }
                        if(item.commissionAmount){
                            self.countFormData[index].commissionAmount = self.accounting.formatMoney(item.commissionAmount,'',2,',','.')
                        }else {
                            self.countFormData[index].commissionAmount = self.accounting.formatMoney(0,'',2,',','.')
                        }
                        if(item.profitAmount){
                            self.countFormData[index].profitAmount = self.accounting.formatMoney(item.profitAmount,'',2,',','.')
                        }else {
                            self.countFormData[index].profitAmount = self.accounting.formatMoney(0,'',2,',','.')
                        }
                    })
                }
            }).catch(function (err) {

            })
        },
        searchCount(ref){
            const self = this;
            self.$refs[ref].validate((valid) => {
                if(valid){
                    self.pageModel.page = 1;
                    self.getData();
                }
            })
        },
        SizeChange(val){
            this.pageModel.pageSize = val;
            this.getData()
        },
        CurrentChange(val){
            this.pageModel.page = val;
            this.getData();
        },

        orderData(val){
            console.log('选择搜索条件',val);
            this.orderSelect.orderValue = val;
            this.getData();
        },

        exportExcel() {
        },
    }
}
