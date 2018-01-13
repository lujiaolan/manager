export default {
    data() {
        return {
            commissionAudit: {
                tradeAccount: '',
                commAccount: '',
                select_status: '2',
                dateValue1: '',
                dateValue2: '',
                tableData: [],
            },
            comAuditVisible: false,
            comAuditForm: {
                comment: '',
                tableData: []
            },
            comAuditPaginationData:{
                page: 1,
                pageSize:10
            },
            // 结算佣金查询的条件
            options: [{
                value: "desc",
                label: '日期从前往后'
            }, {
                value: "asc",
                label: '日期从后往前'
            }],
            orderValue: 'desc',

            indexEdit:null,
            comAuditStatus: '',
            commissionAudit_rules: {
                dateValue1:[
                    {
                        required:false,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.commissionAudit.dateValue2==''){
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
                                if(this.commissionAudit.dateValue1==''){
                                    callback(new Error('请选择开始时间'))
                                }else{
                                    if(this.commissionAudit.dateValue1>value){
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

            sureText: ''
        }
    },
    created(){
        this.getCommissionAuditData();
    },
    methods: {
        // 当前页数据
        auditCurrentChange(val){
            this.comAuditPaginationData.page = val;
            this.getCommissionAuditData();
        },
        auditSizeChange(val){
            this.comAuditPaginationData.pageSize = val;
            this.getCommissionAuditData();
        },

        // 请求列表数据和输入条件时搜索数据
        getCommissionAuditData(){
            let self = this;
            var postData = {};
            postData.apId = self.$store.state.domain.domain.domain.apId;
            postData.page = self.comAuditPaginationData.page.toString();
            postData.pageSize = self.comAuditPaginationData.pageSize.toString();
            if(self.commissionAudit.select_status === 0){
                postData.status = '';
            }else {
                postData.status = self.commissionAudit.select_status;
            }
            postData.sort = self.orderValue;
            postData.tradeAccount = self.commissionAudit.tradeAccount.trim();
            postData.commAccount = self.commissionAudit.commAccount.trim();
            if(self.commissionAudit.dateValue1 === ''&&self.commissionAudit.dateValue2 === ''){
                postData.startTime = '';
                postData.endTime = '';
            }else {
                postData.startTime = self.moment(self.commissionAudit.dateValue1).format('YYYY-MM-DD');
                postData.endTime = self.moment(self.commissionAudit.dateValue2).format('YYYY-MM-DD');
            }
            // console.log("postData",postData);
            self.$ajax({
                method:'post',
                data:postData,
                url:'/commission/apComplete'
            }).then(function (res) {
                console.log(res);
                if (res.data.retCode === 0) {
                    self.commissionAudit.tableData = res.data.data.data;
                    self.commissionAudit.tableData.moneyAmount = res.data.data.moneyAmount;
                    self.commissionAudit.tableData.recordsNum = res.data.data.records;
                    self.commissionAudit.tableData.totalCountApply = res.data.data.total;
                    self.commissionAudit.tableData.forEach(function (item,index) {
                        self.commissionAudit.tableData[index].money = self.accounting.formatMoney(item.money,'',2,',','.');
                        self.commissionAudit.tableData[index].commissionMoney = self.accounting.formatMoney(item.commissionMoney);
                    });
                    console.log(self.commissionAudit);
                }
            }).catch(function (err) {
            });
        },
        // 搜索
        searchCommission(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.comAuditPaginationData.page = 1;
                    self.getCommissionAuditData();
                }else {
                    return false
                }
            })
        },
        // 表格数据时间排序
        orderData(){
            this.getCommissionAuditData();
        },

        // 导出Excel表格
        exportCommissionAudit() {
            let  startTime = '';
            let  endTime = '';
            let status;
            if(this.commissionAudit.select_status === 0 ){
                status = '';
            }else {
                status = this.commissionAudit.select_status;
            }
            if(this.commissionAudit.dateValue1){
                startTime = this.moment(this.commissionAudit.dateValue1).format('YYYY-MM-DD')
            }
            if(this.commissionAudit.dateValue2){
                endTime =  this.moment(this.commissionAudit.dateValue2).format('YYYY-MM-DD')
            }
            // console.log('/financial/withdraw/ap/export postData');
            // TODO 导出下载地址上传的时候记得改
            const url = 'http://120.77.55.98:8080/crm/commission/apComplete/export?apId=' + this.$store.state.domain.domain.domain.apId
                + '&sort=' + this.orderValue
                + '&tradeAccount=' + this.commissionAudit.tradeAccount.trim()
                + '&commAccount=' + this.commissionAudit.commAccount.trim()
                + '&status=' + status  + '&startTime=' + startTime  + '&endTime=' + endTime;
            console.log('exportOutMoneyAudit url');
            console.log(url);
            window.location.href = url
        },

        // 审核按钮
        ComAudit(index){
            this.indexEdit = index;
            this.comAuditStatus = 0;
        },
        // 拒绝按钮
        ComRefuse(index){
            this.indexEdit = index;
            this.comAuditStatus = 1;
        },
        // 取消按钮
        cancelComAudit(){
            this.indexEdit = null;
            this.getCommissionAuditData();
        },
        // 确认按钮（确认审核通过还是不通过）
        ComAuditConfirm(row){
            var self = this;
            var postData = {};
            postData.commId = row._id;
            postData.comment = row.comment;
            console.log('/commission/apCheck res');
            // console.log(self.$store.state.user.userinfo._id);
            if(self.comAuditStatus == 0){
                this.sureText = '审核';
                postData.userId = row.userId;
                console.log(postData);
                self.$ajax({
                    method: 'post',
                    data:postData,
                    url: '/commission/apCheck'
                }).then(function (res) {
                    console.log(res);
                    if(res.data.retCode == 0){
                        self.$message({
                            type:'info',
                            message:'审核成功',
                            showCloe:true
                        });
                    }else {
                        self.$message({
                            type:'error',
                            message: res.data.data.errMsg,
                            showCloe:true
                        });
                    }
                    self.getCommissionAuditData();
                }).catch(function (err) {
                    self.$message({
                        type:'error',
                        message:'网络错误',
                        showCloe:true
                    })
                });
            }else {
                this.sureText = '拒绝';
                self.$ajax({
                    method: 'post',
                    data:postData,
                    url: '/commission/apCancel'
                }).then(function (res) {
                    // console.log(res);
                    if(res.data.retCode == 0){
                        self.$message({
                            type:'info',
                            message:'审核不通过',
                            showCloe:true
                        });
                    }else {
                        self.$message({
                            type:'error',
                            message:res.data.data.errMsg,
                            showCloe:true
                        });
                    }
                    self.getCommissionAuditData();
                }).catch(function (err) {
                    self.$message({
                        type:'error',
                        message:'网络错误',
                        showCloe:true
                    })
                });
            }
            self.indexEdit = '';
        },


        refuseRow(row){
            // console.log('refuseRow row');
            // console.log(row)
            if(row.status == -1){
                return 'refuse-row'
            }else {
                return ''
            }
        }
    }
}
