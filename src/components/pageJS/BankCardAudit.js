/**
 * Created by Udea-Manager on 2017/11/10.
 */

export default {
    data() {
        return {
            bankAuditTotal:null,
            BankCardAuditList:[],
            BankCardAudit: {
                apId:this.$store.state.user.userinfo.apId,
                bankCardStatus:'',
                userNameLike:'',
                page:1,
                currentPage:1,
                pageSize:10
            },
            levelList:[
                {
                    label:"1:10",
                    value:10
                },
                {
                    label:'1:20',
                    value:20
                },
                {
                    label:'1:50',
                    value:50
                },
                {
                    label:'1:100',
                    value:100
                },
                {
                    label:'1:200',
                    value:200
                },
                {
                    label:'1:400',
                    value:400
                },
                {
                    label:'1:500',
                    value:500
                },
                {
                    label:'1:800',
                    value:800
                }],
            bankStatusList:[
                {
                    label:'全部审核状态',
                    value:''
                },
                {
                    label:'未上传',
                    value:0
                },
                {
                    label:'待审核',
                    value:-1
                },
                {
                    label:'已审核',
                    value:1
                },
                {
                    label:'已拒绝',
                    value:2
                }
            ]
        }
    },
    created(){
        this.bankCardSearch();
    },
    methods: {
        getData(){

        },
        bankAudit(index,row){
            const detail = JSON.stringify(row)
            console.log(row)
            this.$router.push('/bankAuditDetail?bankDetail='+detail)
        },
        bankAuditSizeChange(val){
            this.BankCardAudit.pageSize = val;
            this.bankCardSearch();
        },
        bankAuditCurrentChange(val){
            this.BankCardAudit.currentPage = val;
            this.bankCardSearch();
        },
        bankCardSearch(){
            let bankStatus = [];
            if(this.BankCardAudit.bankCardStatus===''){
                bankStatus = [-1,1,2,0]
            }else if(this.BankCardAudit.bankCardStatus===1){
                bankStatus = [1]
            }else if(this.BankCardAudit.bankCardStatus===2) {
                bankStatus = [2]
            }else if(this.BankCardAudit.bankCardStatus===-1){
                bankStatus = [-1]
            }else if(this.BankCardAudit.bankCardStatus===0){
                bankStatus = [0]
            }
            else{
                bankStatus = [-1,1,2,0]
            }
            const postData = {
                apId:this.BankCardAudit.apId,
                bankCardStatus:bankStatus,
                userNameLike:this.BankCardAudit.userNameLike,
                // page:this.BankCardAudit.page,
                currentPage:this.BankCardAudit.currentPage,
                pageSize:this.BankCardAudit.pageSize
            };
            console.log('postData')
            console.log(postData)
            const self = this;
            this.$ajax({
                method:'post',
                url:'/user/bankCardList/verify',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    const cardList = [];
                    if(res.data.data.content.length>0){
                        const content =  res.data.data.content;
                        self.bankAuditTotal = res.data.data.totalAmount;
                        content.forEach(function (item) {
                            // const star = item.bankCardNumbers.substr(0,4)+'*******'+item.bankCardNumbers.substr(-4);
                            let CardHead = '';
                            let CardHeadShow = '';
                            let CardTail = '';
                            let CardTailShow = '';
                            if(item.bankCard.bankCardHeadPic){
                                CardHead = 'http://'+item.bankCard.bankCardHeadPic;
                                CardHeadShow = '已上传'
                            }else{
                                CardHead = '';
                                CardHeadShow = '未上传';
                            }
                            if(item.bankCard.bankCardTailPic){
                                CardTail = 'http://'+item.bankCard.bankCardTailPic;
                                CardTailShow = '已上传'
                            }else{
                                CardTail = '';
                                CardTailShow = '未上传';
                            }
                           const card = {
                               auditTime:item.bankCard.auditTime,
                               bankAddress:item.bankCard.bankAddress,
                               bankBranch:item.bankCard.bankBranch,
                               bankCardHeadPic:CardHead,
                               bankCardTailPic:CardTail,
                               CardTailShow:CardTailShow,
                               CardHeadShow:CardHeadShow,
                               bankCardNumbers:item.bankCard.bankCardNumbers,
                               bankCardStatus:item.bankCard.bankCardStatus,
                               bankName:item.bankCard.bankName,
                               bankReason:item.bankCard.bankReason,
                               bankCardType:item.bankCard.bankCardType,
                               bankSort:item.bankCard.bankSort,
                               importantCard:item.bankCard.importantCard,
                               cardHolder:item.bankCard.cardHolder,
                               id:item.bankCard.id,
                               createTime:item.bankCard.createTime,
                               userEmail:item.userEmail,
                               apId:item.apId,

                               _id:item._id,
                               userName:item.userName,
                           };
                            cardList.push(card)
                        })
                    }
                    self.BankCardAuditList = cardList;
                }
            }).catch(function (err) {

            })
        },
        bankUserDel(row){
            const self = this;
            this.$confirm('删除用户银行卡','确定要删除'+row.cardHolder+'的银行卡吗?',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type:'warning'
            }).then(()=>{
                self.$ajax({
                    method:'post',
                    url:'/user/remove/bankCard',
                    data:{
                        userId:row._id,
                        bankCardNumbers:row.bankCardNumbers
                    }
                }).then(function (res) {
                    if(res.data.retCode==0){
                        self.$message({
                            message:'删除成功',
                            type:'info',
                            showClose:true
                        });
                        self.bankCardSearch();
                    }else{
                        self.$message({
                            message:'删除失败',
                            type:'warning',
                            showClose:true
                        });
                    }
                }).catch(function (err) {
                    self.$message({
                        message:'网络错误',
                        type:'error',
                        showClose:true
                    });
                })
            }).catch(()=> {

            })
        },


        refuseRow(row){
            // console.log('refuseRow row');
            // console.log(row)
            if(row.bankCardStatus == 2){
                return 'refuse-row'
            }else {
                return ''
            }
        },

    }
}
