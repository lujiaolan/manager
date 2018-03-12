export default {
    data() {
        return {
            editableDate:false,
            apId: this.$store.state.domain.domain.domain.apId,
            payAuditVisible: false,
            payRefuseVisible: false,
            payAuditForm: {
                userName: '',
                transNum: '',
                relUserName: '',
                desc: '',
            },
            payRefuseForm: {
                userName: '',
                transNum: '',
                relUserName: '',
                desc: '',
            },
            outMoney: {
                select_email: '',
                select_orderId: '',
                select_status: '2',
                dateValue1: '',
                dateValue2: '',
                tableData: []
            },
            searchMT4List: {
                page: 1,
                pageSize: 10
            },
            workOrderId: '',
            totalRecords: null,
            outMoney_rules: {
                select_email:[
                    {
                        require:false,
                        validator:(rules,value,callback)=>{
                            if(value===''){
                                callback();
                            }else{
                                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                    callback();
                                }else {
                                    callback(new Error('请输入有效邮箱!'));
                                }
                            }
                        }
                    }
                ],
                dateValue1:[
                    {
                        required:false,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.outMoney.dateValue2==''){
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
                                if(this.outMoney.dateValue1==''){
                                    callback(new Error('请选择开始时间'))
                                }else{
                                    if(this.outMoney.dateValue1>value){
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
            loginLoading: false
        }
    },
    methods: {
        getData(){
            const self = this;
            const postData = {
                apId: self.apId,
                page: self.searchMT4List.page.toString(),
                pageSize: self.searchMT4List.pageSize.toString(),
                userEmail: self.outMoney.select_email,
                workOrderId: self.outMoney.select_orderId,
            };
            if(self.outMoney.select_status === '2' ){
                postData.status = ''
            }else {
                postData.status = self.outMoney.select_status
            }
            if(self.outMoney.dateValue1 === ''&&self.outMoney.dateValue2 === ''){
                postData.startTime = '';
                postData.endTime = '';
            }else {
                postData.startTime = self.moment(self.outMoney.dateValue1).format('YYYY-MM-DD');
                postData.endTime = self.moment(self.outMoney.dateValue2).format('YYYY-MM-DD');
            }
            // console.log('outToCrmPostData');
            // console.log(postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/ap/workOrder'
            }).then(function (res) {
                console.log('/ap/workOrder res');
                console.log(res);
                if(res.data.retCode === 0){
                    self.outMoney.tableData = res.data.data.data;
                    self.totalRecords = res.data.data.records;
                    self.outMoney.tableData.forEach(function (item,index) {
                        if(item.status === -100){
                            item.MoneyToCrmVisible = false
                        }else {
                            item.MoneyToCrmVisible = true
                        }
                        self.outMoney.tableData[index].deposit = self.accounting.formatMoney(item.deposit,'',2,',','.')
                    });
                }else {
                    self.outMoney.tableData = '';
                    self.totalRecords = '';
                }
            }).catch(function () {
            })
        },
        searchOrder(formName){
            const self = this;
            self.$refs[formName].validate((valid) => {
                if(valid){
                    self.searchMT4List.page = 1;
                    this.getData();
                }
            });
        },
        cancelDialog(){
            this.payAuditVisible = false;
        },

        MoneyToCrmAudit(row){
            const self = this;
            self.payAuditForm.userName = row.userEmail;
            self.payAuditForm.relUserName = row.relUserEmail;
            self.payAuditForm.transNum = row.deposit;
            self.payAuditVisible = true;
            self.workOrderId = row._id;
        },
        MoneyAuditConfirm(){
            const self = this;
            self.loginLoading = true;
            const postData = {
                apId: this.apId,
                workOrderId: self.workOrderId,
                handleUserId: this.$store.state.user.userinfo.userId,
                desc: self.payAuditForm.desc
            };
            console.log('postData');
            console.log(postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/ap/workOrder/pass'
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode === 0){
                   self.$message({
                       type: 'success',
                       message: '出金审核成功',
                       showClose: true
                   });
                   self.getData();
                   self.loginLoading = false;
                   self.payAuditVisible = false;
                }else {
                    self.loginLoading = false;
                    self.$message({
                        type: 'error',
                        message: '网络错误，请稍后再试',
                        showClose: true
                    });
                }
            }).catch(function (err) {
            });
        },
        MoneyToCrmRefuse(row){
            const self = this;
            self.payRefuseForm.userName = row.userEmail;
            self.payRefuseForm.relUserName = row.relUserEmail;
            self.payRefuseForm.transNum = row.deposit;
            self.payRefuseVisible = true;
            self.workOrderId = row._id;
        },
        MoneyRefuseConfirm(){
            const self = this;
            // console.log(self.$store.state.user.userinfo._id);
            const postData = {
                apId: this.apId,
                workOrderId: self.workOrderId,
                handleUserId: this.$store.state.user.userinfo.userId,
                desc: self.payRefuseForm.desc
            };
            // console.log('postData');
            // console.log(postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/ap/workOrder/refuse'
            }).then(function (res) {
                if(res.data.retCode === 0){
                    self.$message({
                        type: 'success',
                        message: '拒绝出金审核成功',
                        showClose: true
                    });
                    self.getData();
                }else {
                    self.$message({
                        type: 'error',
                        message: res.data.data.errMsg,
                        showClose: true
                    })
                }
            }).catch(function (err) {
            });
            self.payRefuseVisible = false;
        },
        currentChange(val){
            this.searchMT4List.page = val;
            this.getData();
        },
        sizeChange(val){
            this.searchMT4List.pageSize = val;
            this.getData();
        },
        exportOutToCrmAudit(){
            const baseUrl =  this.$store.state.baseUrl + '/crm/ap/workOrder/export?apId=' + this.apId + '&userEmail=' + this.outMoney.select_email + '&workOrderId=' + this.outMoney.select_orderId;
            let url,status;
            let startTime = '';
            let endTime = '';
            if(this.outMoney.select_status === '2' ){
                status = '';
            }else {
                status = this.outMoney.select_status;
            }
            if(this.outMoney.dateValue1){
                startTime = this.moment(this.outMoney.dateValue1).format('YYYY-MM-DD')
            }
            if(this.outMoney.dateValue2){
                endTime = this.moment(this.outMoney.dateValue2).format('YYYY-MM-DD')
            }
            url = baseUrl + baseUrl + '&status=' + status
                + '&startTime=' + startTime
                + '&endTime=' + endTime;
            console.log('exportOutToCrmAudit url');
            console.log(url);
            window.location.href = url
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
    },
    mounted(){
        this.getData();
    }
}
