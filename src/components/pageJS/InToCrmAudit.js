
/**
 * Created by Udea-Manager on 2017/11/16.
 */

export default {
    data() {
        return {
            editableDate:false,
            payAuditVisible: false,
            outMoneyList:[],
            withdrawTotal:null,
            passOrRefuse:'',
            select_statusList:[
                {
                    label:'全部审核状态',
                    value:''
                },
                {
                    label:'待审核',
                    value:'0'
                },
                {
                    label:'已审核',
                    value:'1'
                },
                {
                    label:'已拒绝',
                    value:'-1'
                }
            ],
            excelData:[],
            outMoney_rules:{
                startTime:[
                    {
                        required:false,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(this.outMoney.endTime==''){
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
                                if(this.outMoney.startTime==''){
                                    callback(new Error('请选择开始时间'))
                                }else{
                                    if(this.outMoney.startTime>value){
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
            outMoney: {
                apId:this.$store.state.domain.domain.domain.apId,
                page:1 ,
                pageSize:10,
                userEmail:''          , //  可选  String
                orderNum:'', //  订单号      可选  String
                status:'',//     审核状态    可选  ""或null 全部状态   1.审核通过  0. 待审核  -1. 审核不通过  String
                startTime:'',//  开始时间    可选  String
                endTime:''//     结束时间    可选  String
            },
            payAuditFormOut: {
                recordId:'',
                handleUserId:this.$store.state.user.userinfo.userId,
                apId:'',
                IDName:"",
                flowMoney:'' ,
                amount:'' ,
                comment:''
            }
        }
    },
    created(){
        this.withdrawList();
    },
    methods: {
        withdrawSearch(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.withdrawList();
                }else{
                    return false
                }
            })
        },
        withdrawList(){
            let  startTime = '';
            let  endTime = '';
            if(this.outMoney.startTime){
                startTime = this.moment(this.outMoney.startTime).format('YYYY-MM-DD')
            }
            if(this.outMoney.endTime){
                endTime =  this.moment(this.outMoney.endTime).format('YYYY-MM-DD')
            }
            const postData = {
                apId:this.$store.state.domain.domain.domain.apId,
                page:this.outMoney.page.toString() ,
                pageSize:this.outMoney.pageSize.toString(),
                condition:this.outMoney.userEmail,
                orderNum:this.outMoney.orderNum,
                status:this.outMoney.status,
                startTime:startTime,
                endTime:endTime
            };
            const self = this;
            this.$ajax({
                method:'post',
                url:'/financial/withdraw/ap',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log(res)
                    const  withdrawList = res.data.data.data;
                    self.excelData = res.data.data.data;
                    const startBankList = [];
                    withdrawList.forEach(function (item) {
                        const bankNo = item.bankCardNo;
                        const star = bankNo.substr(0,4)+"*******"+bankNo.substr(-4);
                        const bankStar = {
                            amount:self.accounting.formatMoney(item.amount,'',2,',','.'),
                            apId:item.apId,
                            createTime:item.createTime,
                            handleTime:item.handleTime,
                            comment:item.comment,
                            bankBranch:item.bankBranch,
                            bankCardNo:star,
                            bankName:item.bankName,
                            currentRate:item.currentRate,
                            flowMoney:self.accounting.formatMoney(item.flowMoney,'',2,',','.'),
                            minusType:item.minusType,
                            IDName:item.IDName,
                            tradeStatus:item.tradeStatus,
                            userEmail:item.userEmail,
                            userId:item.userId,
                            _id:item._id,
                        };
                        startBankList.push(bankStar)
                    });
                    self.outMoneyList = startBankList;
                    self.withdrawTotal = res.data.data.records;
                }
            }).catch(function (err) {

            })
        },
        withdrawSizeChange(val){
            this.outMoney.pageSize = val;
            this.withdrawList();
        },
        withdrawCurrentChange(val){
            this.outMoney.page = val;
            this.withdrawList();
        },


        exportOutMoneyAudit() {
            let  startTime = '';
            let  endTime = '';
            if(this.outMoney.startTime){
                startTime = this.moment(this.outMoney.startTime).format('YYYY-MM-DD')
            }
            if(this.outMoney.endTime){
                endTime =  this.moment(this.outMoney.endTime).format('YYYY-MM-DD')
            }
            // console.log('/financial/withdraw/ap/export postData');
            // TODO 导出下载地址上传的时候记得改
            const url = this.$store.state.baseUrl + '/crm/financial/withdraw/ap/export?apId=' + this.$store.state.domain.domain.domain.apId
                + '&condition=' + this.outMoney.userEmail + '&orderNum=' + this.outMoney.orderNum
                + '&status=' + this.outMoney.status  + '&startTime=' + startTime  + '&endTime=' + endTime;
            console.log('exportOutMoneyAudit url');
            console.log(url);
            window.location.href = url
        },


        payAudit(index,row){
            this.payAuditVisible = true;
            this.passOrRefuse = 1; //通过
            this.payAuditFormOut = {
                recordId:row._id,
                handleUserId:this.payAuditFormOut.handleUserId,
                apId:row.apId,
                IDName:row.IDName,
                amount:row.amount ,
                flowMoney:row.flowMoney
            }
        },
        withdrawRefuse(index,row){
            this.payAuditVisible = true;
            this.passOrRefuse = 2; //拒绝
            this.payAuditFormOut = {
                recordId:row._id,
                handleUserId:this.payAuditFormOut.handleUserId,
                apId:row.apId,
                IDName:row.IDName,
                amount:row.amount ,
                flowMoney:row.flowMoney
            }
        },
        payAuditS(){
            // this.payAuditVisible = false;
            console.log(this.payAuditFormOut)
            const postData = {
                recordId:this.payAuditFormOut.recordId,
                handleUserId:this.payAuditFormOut.handleUserId,
                apId:this.payAuditFormOut.apId,
                comment:this.payAuditFormOut.comment,
            };
            const self = this;
            let postUrl = '';
            if(this.passOrRefuse==1){
                postUrl = '/financial/withdraw/pass';
            }else{
                postUrl = '/financial/withdraw/refuse'
            }
            this.$ajax({
                method:'post',
                url:postUrl,
                data:postData
            }).then(function (res) {
                console.log(res)
                if(res.data.retCode==0){
                    self.$message({
                        type:'info',
                        message:'审核成功',
                        showClose:true
                    });
                    self.payAuditVisible = false;
                    self.withdrawList();
                }else{
                    self.$message({
                        type:'warning',
                        message:'审核失败',
                        showClose:true
                    })
                }
            }).catch(function (err) {
                console.log(err)
                self.$message({
                    type:'error',
                    message:'网络错误',
                    showClose:true
                })
            })
        },


        refuseRow(row){
            // console.log('refuseRow row');
            // console.log(row)
            if(row.tradeStatus == 2){
                return 'refuse-row'
            }else {
                return ''
            }
        }

    }
}
