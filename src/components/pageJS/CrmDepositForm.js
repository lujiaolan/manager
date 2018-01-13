import WaterAccount from  '../page/WaterAccount.vue';
import CrmDrawForm from '../page/CrmDrawForm.vue';
import Mt4DepositForm from '../page/Mt4DepositForm.vue';
export default {
    components:{
        CrmDrawForm,
        Mt4DepositForm,
        WaterAccount
    },
    data() {
        return {
            CRMdeposit_rules:{},
            depositVisible:false,
            depositAddMoney:{
                userEmail:'',
                deposit:'',
                desc:'',
                type:'1',
                userId:''
            },
            activeName: 'first',
            depositTotal:null,
            CRMdeposit: {
                apId:this.$store.state.domain.domain.domain.apId,
                page:1,
                pageSize:10,
                condition:'',
                orderNum:'',
                status:'',
                startTime:'',
                endTime:''
            },
            depositAddMoney_rules:{
                deposit:[
                    {
                        required:true,
                        message:'请填写金额',
                        trigger:'blur'
                    }
                ]

            },
            CRMdepositList:[],
            statusList:[
                {
                    value:"1",
                    label:'支付成功'
                },
                {
                    value:'0',
                    label:'未支付'
                },
                {
                    value:'-1',
                    label:'支付失败'
                }
            ]
        };
    },
    created(){
        this.searchCRMdeposit();
    },
    methods: {
        depositAdd(ref){
            const postData = {
                deposit:this.depositAddMoney.deposit,
                desc:this.depositAddMoney.desc,
                type:this.depositAddMoney.type,
                userId:this.depositAddMoney.userId
            };
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    this.$ajax({
                        method:'post',
                        url:'/deposit/sys',
                        data:postData
                    }).then(function (res) {
                        console.log(res)
                        if(res.data.retCode==0){
                            self.$message({
                                message:'人工加钱成功',
                                showClose:true,
                                type:'info'
                            });
                            self.depositVisible = false;
                            self.searchCRMdeposit();
                        }else{
                            self.$message({
                                message:'人工加钱失败',
                                showClose:true,
                                type:'warning'
                            });
                        }
                    }).catch(function (err) {
                        self.$message({
                            message:'网络错误',
                            showClose:true,
                            type:'error'
                        });
                    })
                }else{
                    return false;
                }
            })
        },
        depositCurrentChange(val){
            this.CRMdeposit.page = val;
            this.searchCRMdeposit();
        },
        depositSizeChange(val){
            this.CRMdeposit.pageSize = val;
            this.searchCRMdeposit();
        },


        exportCrmDeposit() {
            let  startTime = '';
            let  endTime = '';
            let orderNum = '',status = '',condition= '';
            orderNum = this.CRMdeposit.orderNum;
            status = this.CRMdeposit.status;
            condition = this.CRMdeposit.condition;
            // start
            if(this.CRMdeposit.startTime === ''&& this.CRMdeposit.endTime === ''){
                startTime = '';
                endTime = '';
            }else {
                startTime = this.moment(this.CRMdeposit.startTime).format('YYYY-MM-DD');
                endTime = this.moment(this.CRMdeposit.endTime).format('YYYY-MM-DD');
            }
            // TODO 导出下载地址上传的时候记得改
            const url = 'http://120.77.55.98:8080/crm/financial/plus/ap/export?apId=' + this.$store.state.domain.domain.domain.apId
                + '&orderNum=' + orderNum + '&status=' + status
                + '&condition=' + condition
                + '&startTime=' + startTime  + '&endTime=' + endTime;
            console.log('/crm/financial/plus/ap/export url');
            console.log(url);
            window.location.href = url
        },
        DrpositAgentCrm(index,row){
            this.depositVisible = true;
            console.log(row)
            this.depositAddMoney = {
                userEmail:row.userEmail,
                deposit:'',
                desc:'',
                type:'1',
                userId:row.userId
            }
            console.log(this.depositAddMoney)
        },

        searchCRMdeposit(){
            const self = this;
            this.$ajax({
                method:'post',
                url:'/financial/deposit/ap',
                data:this.CRMdeposit
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log(res)
                    self.CRMdepositList = res.data.data.data;
                    self.depositTotal = res.data.data.records;
                    self.CRMdepositList.forEach(function (item,index) {
                        self.CRMdepositList[index].amount = self.accounting.formatMoney(item.amount,'',2,',','.');
                        self.CRMdepositList[index].flowMoney = self.accounting.formatMoney(item.flowMoney,'',2,',','.');
                    })
                }
            }).catch(function (err) {

            })
        },
        depositAddCancel(){
            this.depositVisible = false;
            this.searchCRMdeposit();
        }
    }
}
