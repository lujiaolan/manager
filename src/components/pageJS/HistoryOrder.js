export default {
    data() {
        return {
            editableDate:false,
            orderSelect:{
                mt4UserId: '',
                orderId: '',
                symbolType: '全部',
                startTime: '',
                endTime: '',
            },
            orderSelect_rules: {
                mt4UserId:[
                    {
                        required:false,
                        validator:(rules,val,callback)=>{
                            if(/^[0-9]*$/.test(val)){
                                callback()
                            }else {
                                callback(new Error('请输入正确的mt4帐号'))
                            }
                        }
                    }
                ],
                orderId:[
                    {
                        required:false,
                        validator:(rules,val,callback)=>{
                            if(/^[0-9]*$/.test(val)){
                                callback()
                            }else {
                                callback(new Error('请输入正确的订单编号'))
                            }
                        }
                    }
                ],
                startTime:[
                    {
                        required:false,
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
            symbolTypeOption: [],
            historyOrderData: [],
            pageModel: {
                page: 1,
                pageSize: 10
            },

            sortByOpenTime:{
                TradeOpenTime: -1
            },
            sortByCloseTime:{
                TradeCloseTime: -1
            },
            sortBy:'',
        }
    },
    created(){
        this.getSymbolListData();
        this.getData();
    },
    methods: {
        getSymbolListData(){
            const self = this;
            this.$ajax({
                method: 'get',
                url: '/order/history/symbols/'+ this.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                console.log('history symbols res');
                console.log(res);
                res.data.forEach(function (item) {
                    let TradeSymbolObj = {};
                    TradeSymbolObj.val = item;
                    self.symbolTypeOption.push(TradeSymbolObj);
                });
                console.log(self.symbolTypeOption)
            }).catch(function (){
            });
        },
        CurrentChange(val){
            this.pageModel.page = val;
            console.log('CurrentChange this.sortBy');
            console.log(this.sortBy);
            this.getData();
        },
        SizeChange(val){
            this.pageModel.pageSize = val;
            this.getData();
        },
        getData(){
            let self = this;
            const postData = {
                query: {
                    apId: self.$store.state.domain.domain.domain.apId,
                },
                pageModel: {
                    page: self.pageModel.page,
                    pageSize: self.pageModel.pageSize,
                    sortBy: {
                        TradeCloseTime: -1
                    }
                }
            };
            if(self.sortBy !== ''){
                postData.pageModel.sortBy = self.sortBy
            }
            if(self.orderSelect.mt4UserId !== ''){
                postData.query.UserLoginID = parseInt(self.orderSelect.mt4UserId);
            }
            if(self.orderSelect.orderId !== ''){
                postData.query.TradeID = parseInt(self.orderSelect.orderId);
            }
            if(self.orderSelect.symbolType !== '全部'){
                postData.query.TradeSymbol = self.orderSelect.symbolType;
            }
            if(self.orderSelect.startTime !== ''&& self.orderSelect.endTime !== ''){
                postData.query.startTime = this.moment(self.orderSelect.startTime).format('YYYY-MM-DD 00:00:00');
                postData.query.endTime = this.moment(self.orderSelect.startTime).format('YYYY-MM-DD 23:59:59');
            }
            console.log('初始话的postData');
            console.log(postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/order/history'
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode == 0){
                    self.historyOrderData = res.data.data.rows;
                    self.historyOrderData.records = res.data.data.total;
                    res.data.data.rows.forEach(function (item,index) {
                        self.historyOrderData[index].TradeOpenTime = self.moment(item.TradeOpenTime*1000).format('YYYY-MM-DD HH:mm:ss');
                        self.historyOrderData[index].TradeCloseTime = self.moment(item.TradeCloseTime*1000).format('YYYY-MM-DD HH:mm:ss');
                        self.historyOrderData[index].TradeTP = self.accounting.formatMoney(item.TradeTP,'',2,',','.');
                        self.historyOrderData[index].TradeSL = self.accounting.formatMoney(item.TradeSL,'',2,',','.');
                        self.historyOrderData[index].TradeCommission = self.accounting.formatMoney(item.TradeCommission,'',2,',','.');
                        self.historyOrderData[index].TradeStorage = self.accounting.formatMoney(item.TradeStorage,'',2,',','.');
                        self.historyOrderData[index].TradeProfit = self.accounting.formatMoney(item.TradeProfit,'',2,',','.');
                        // self.historyOrderData[index].TradeCommission = 'MT4没有数据';
                        // self.historyOrderData[index].TradeStorage = 'MT4没有数据';
                    });
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
        searchOrder(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.pageModel.page = 1;
                    this.getData()
                }else {
                    return false
                }
            })
        },
        sortColumn(column){
            const self = this;
            console.log('@sort-changecolumn, prop, order');
            console.log(column, column.prop, column.order);
            if(column.order === 'descending'){
                self.sortByOpenTime.TradeOpenTime = -1;
                self.sortByCloseTime.TradeCloseTime = -1;
            }else {
                self.sortByOpenTime.TradeOpenTime = 1;
                self.sortByCloseTime.TradeCloseTime = 1;
            }
            if(column.prop === 'TradeOpenTime'){
                self.sortBy = self.sortByOpenTime
            }else {
                self.sortBy = self.sortByCloseTime
            }
            this.getData();
        },

        exportHistoryOrder() {
            let  startTime = '';
            let  endTime = '';
            let UserLoginID = '',TradeID = '',TradeSymbol= '';
            UserLoginID = this.orderSelect.mt4UserId;
            TradeID = this.orderSelect.orderId;
            if(this.orderSelect.symbolType !== '全部'){
                TradeSymbol = this.orderSelect.symbolType;
            }
            // start
            if(this.orderSelect.startTime === ''&& this.orderSelect.endTime === ''){
                startTime = '';
                endTime = '';
            }else {
                startTime = this.moment(this.orderSelect.startTime).format('YYYY-MM-DD');
                endTime = this.moment(this.orderSelect.endTime).format('YYYY-MM-DD');
            }
            // TODO 导出下载地址上传的时候记得改
            const url = this.$store.state.baseUrl + '/crm/order/history/export?apId=' + this.$store.state.domain.domain.domain.apId
                + '&UserLoginID=' + UserLoginID + '&TradeID=' + TradeID
                + '&TradeSymbol=' + TradeSymbol
                + '&startTime=' + startTime  + '&endTime=' + endTime;
            console.log('/crm/order/history/export url');
            console.log(url);
            window.location.href = url
        },
    }
}
