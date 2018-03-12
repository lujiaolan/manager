
/**
 * Created by Udea-Manager on 2017/11/16.
 */
export default {
    data() {
        return {
            editableDate:false,
            activeName: 'first',
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
                condition:''          , //  可选  String
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
                condition:this.outMoney.condition,
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
                            amount: self.accounting.formatMoney(item.amount,'',2,',','.'),
                            apId:item.apId,
                            createTime:item.createTime,
                            handleTime:item.handleTime,
                            comment:item.comment,
                            bankBranch:item.bankBranch,
                            bankCardNo:star,
                            bankName:item.bankName,
                            currentRate:item.currentRate,
                            flowMoney: self.accounting.formatMoney(item.flowMoney,'',2,',','.'),
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
        exportCrmDrawForm() {
            let  startTime = '';
            let  endTime = '';
            let orderNum = '',status = '',condition= '';
            orderNum = this.outMoney.orderNum;
            status = this.outMoney.status;
            condition = this.outMoney.condition;
            // start
            if(this.outMoney.startTime === ''&& this.outMoney.endTime === ''){
                startTime = '';
                endTime = '';
            }else {
                startTime = this.moment(this.outMoney.startTime).format('YYYY-MM-DD');
                endTime = this.moment(this.outMoney.endTime).format('YYYY-MM-DD');
            }
            // TODO 导出下载地址上传的时候记得改
            const url = this.$store.state.baseUrl + '/crm/financial/minus/ap/export?apId=' + this.$store.state.domain.domain.domain.apId
                + '&orderNum=' + orderNum + '&status=' + status
                + '&condition=' + condition
                + '&startTime=' + startTime  + '&endTime=' + endTime;
            console.log('/crm/financial/plus/ap/export url');
            console.log(url);
            window.location.href = url
        },

    }
}
