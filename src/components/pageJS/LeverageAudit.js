export default {
    data() {
        return {
            apId: this.$store.state.domain.domain.domain.apId,
            rowIndex:null,
            leverageEdit:{
                remark:'',
                saveStatus:''
            },
            auditVisible: false,
            leverageModify: {
                mt4: '',
                select_status: '-1',
                tableData: []
            },
            leverageModifyRules: {
                mt4: {
                    required:false,
                    validator: (rules,val,callback)=>{
                        if(/^[0-9]*$/.test(val)){
                            callback()
                        }else {
                            callback(new Error('请输入正确的MT4账号'))
                        }
                    }
                }
            },
            pageModel: {
                page: 1,
                pageSize: 10
            },
            workOrderId: '',
            totalRecords: null,
        }
    },
    methods: {
        getData(){
            const self = this;
            const postData = {
                query: {
                    apId: self.apId,
                },
                pageModel: {
                    page: self.pageModel.page,
                    pageSize: self.pageModel.pageSize,
                    sortBy: {
                        status: 1,
                        time: -1
                    }
                },
            };
            if(self.leverageModify.mt4 !== ''){
                postData.query.mt4UserId = parseInt(self.leverageModify.mt4);
            }
            if(self.leverageModify.select_status !== ''&&self.leverageModify.select_status !== '-1'){
                postData.query.status = parseInt(self.leverageModify.select_status);
            }
            console.log('/crm/leverage/mt4 postData');
            console.log(postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/leverage/mt4'
            }).then(function (res) {
                if(res.data.retCode === 0){
                    self.leverageModify.tableData = res.data.data.rows;
                    self.totalRecords = res.data.data.total;
                    res.data.data.rows.forEach(function (item,index) {
                        self.leverageModify.tableData[index].time = self.moment(item.time*1000).format('YYYY-MM-DD HH:mm:ss');
                        if(item.status != 0){
                            self.leverageModify.tableData[index].auditVisible = true;
                        }else {
                            self.leverageModify.tableData[index].auditVisible = false;
                        }
                        if(item.auditTime){
                            self.leverageModify.tableData[index].auditTime = self.moment(item.auditTime*1000).format('YYYY-MM-DD HH:mm:ss');
                        }
                    })
                }else {
                    self.leverageModify.tableData = '';
                    self.totalRecords = '';
                }
            }).catch(function () {
            })
        },
        searchLeverage(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.pageModel.page = 1;
                    this.getData();
                }else {
                    return false
                }
            })
        },

        // cancelDialog(){
        //     this.payAuditVisible = false;
        // },
        startLeverageAudit(index){
            this.rowIndex = index;
            this.leverageEdit.saveStatus = '0';
        },
        stopLeverageRefuse(index){
            this.rowIndex = index;
            this.leverageEdit.saveStatus = '1';
        },
        LeverageAudit(row){
            const self = this;
            if(self.leverageEdit.saveStatus === '0'){
                const postData = {
                    workId: row._id,
                    apId: row.apId,
                    UserLoginID: row.mt4UserId,
                    UserLeverage: row.userLeverage,
                    userEmail: row.email,
                };
                if(self.leverageEdit.remark){
                    postData.comment = self.leverageEdit.remark
                }
                console.log('LeverageAudit postData');
                console.log(postData);
                this.$ajax({
                    method: 'post',
                    data: postData,
                    url: '/modify/leverage/mt4'
                }).then(function (res) {
                    if(res.data.retCode === 0){
                        self.$message.success('操作成功，杠杆修改审核结果为通过');
                        self.getData()
                    }else {
                        self.$message.error('操作没有成功，请稍后再试')
                    }
                    self.rowIndex = null;
                    self.leverageEdit.remark = null
                }).catch(function (err) {
                    console.log(err);
                })
            }
            if(self.leverageEdit.saveStatus === '1'){
                let urlData;
                if(self.leverageEdit.remark){
                    urlData = '/reject/leverage/mt4/' + row._id + '?apId=' + row.apId + '&userEmail=' + row.email + '&comment=' + self.leverageEdit.remark
                }else {
                    urlData = '/reject/leverage/mt4/' + row._id + '?apId=' + row.apId + '&userEmail=' + row.email
                }
                console.log('LeverageRefuse urlData');
                console.log(urlData);
                this.$ajax({
                    method: 'get',
                    url: urlData
                }).then(function (res) {
                    // console.log(res.data.retCode);
                    if(res.data.retCode === 0){
                        self.$message.success('操作成功，杠杆修改审核结果为不通过');
                        self.getData()
                    }else {
                        self.$message.error('操作没有成功，请稍后再试')
                    }
                    self.rowIndex = null;
                    self.leverageEdit.remark = null
                }).catch(function (err) {
                })
            }
        },
        LeverageRefuse(){
            this.rowIndex = null;
            this.leverageEdit.remark = null
        },

        currentChange(val){
            this.pageModel.page = val;
            this.getData();
        },
        sizeChange(val){
            this.pageModel.pageSize = val;
            this.getData();
        },
        exportExcel(){},


        refuseRow(row){
            // console.log('refuseRow row');
            // console.log(row)
            if(row.status == 2){
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
