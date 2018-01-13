/**
 * Created by Udea-Manager on 2017/11/16.
 */
export default {
    data(){
        return {
            bankDetailData:{
                auditTime:'',
                bankAddress:'',
                bankBranch:'',
                bankCardHeadPic:'',
                bankCardTailPic:'',
                bankCardNumbers:'',
                bankCardStatus:'',
                bankName:'',
                bankReason:'',
                bankCardType:'',
                bankSort:'',
                cardHolder:'',
                createTime:'',
                id:'',
                _id:'',
                userName:'',
                apId:'',
                userEmail:''

            },
            bankUrl:{
                imageTailUrl:'',
                imageHeadUrl:''

            },
            bankCardStatusList:[
                {
                    label:'未审核',
                    value:-1
                },
                {
                    label:'未上传',
                    value:0
                },
                {
                    label:'已通过',
                    value:1
                },
                {
                    label:'已拒绝',
                    value:2
                }
            ],
            bankDetail_rules:{
                bankReason:[
                    {
                        // required:false,
                        // validator:(rules,value,callback)=> {
                        //     if (value.maxlength > 30) {
                        //         callback(new Error('限只能输入30个字符,你已超出'))
                        //     } else {
                        //         callback()
                        //     }
                        // }
                    }
                ],
                bankCardHeadPic:[
                    {
                        required:true,
                        message:'请上传银行卡正面',
                        trigger:'blur'
                    }
                ],
                bankCardTailPic:[
                    {
                        required:true,
                        message:'请上传银行卡反面',
                        trigger:'blur'
                    }
                ] ,
                bankCardNumbers:[
                    {
                        required:true,
                        message:'请银行卡号',
                        trigger:'blur'
                    }
                ]
            }
        }
    },
    methods:{
        bankDetailSumbit(ref){
            const postData = {
                bankName:this.bankDetailData.bankName,
                bankCardType:this.bankDetailData.bankCardType,
                bankBranch:this.bankDetailData.bankBranch,
                bankAddress:this.bankDetailData.bankAddress,
                cardHolder:this.bankDetailData.cardHolder,
                bankCardStatus:this.bankDetailData.bankCardStatus,
                bankCardHeadPic:this.bankDetailData.bankCardHeadPic,
                bankCardTailPic:this.bankDetailData.bankCardTailPic,
                bankCardNumbers:this.bankDetailData.bankCardNumbers,
                bankId:this.bankDetailData.id,
                _id:this.bankDetailData._id,
                bankReason:this.bankDetailData.bankReason,
                auditTime:this.bankDetailData.auditTime,
            };
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        method:'post',
                        url:'/user/modify/bankCard',
                        data:postData
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            const bankStatus = {
                                userId:self.bankDetailData._id,
                                bankCardNumbers:self.bankDetailData.bankCardNumbers,
                                bankCardStatus:self.bankDetailData.bankCardStatus,
                                userEmail:self.bankDetailData.userEmail,
                                apId:self.bankDetailData.apId
                            };
                            self.$ajax({
                                method:'post',
                                url:'/user/bankStatus/bankCard',
                                data:bankStatus
                            }).then(function (res) {
                                if(res.data.retCode==0){
                                    self.$message({
                                        type:'info',
                                        message:'编辑成功',
                                        showClose:true
                                    });
                                    self.$router.push('/BankCardAudit');
                                }else if(res.data.retCode==-1){
                                    self.$message({
                                        type:'warning',
                                        message:'银行卡审核步骤成功，但邮件发送步骤失败',
                                        showClose:true
                                    });
                                }else{
                                    self.$message({
                                        type:'warning',
                                        message:'银行卡审核步骤已经失败，无后续步骤',
                                        showClose:true
                                    });
                                }
                            }).catch(function (err) {
                                self.$message({
                                    type:'error',
                                    message:'网络错误',
                                    showClose:true
                                })
                            })
                        }else{
                            self.$message({
                                type:'warning',
                                message:'修改失败',
                                showClose:true
                            })
                        }
                    }).catch(function (err) {
                        self.$message({
                            type:'error',
                            message:'网络错误',
                            showClose:true
                        })
                    })
                }else{
                    return false;
                }
            })
        },
        bankRedirectHistory(){
            this.$router.push('/BankCardAudit')
        },
        handleChangBKDetailHeadPic(files){
            this.bankUrl.imageHeadUrl = files.url;
        },
        handleSuccessBKDetailHeadPic(res,files){
            this.bankDetailData.bankCardHeadPic = files.response.data.fileName;
        },
        handleChangBKDetailTailPic(files){
            this.bankUrl.imageTailUrl = files.url;
        },
        handleSuccessBKDetailTailPic(res,files){
            this.bankDetailData.bankCardTailPic= files.response.data.fileName;
        },
    },
    mounted(){
       console.log( 'this.$route.query.bankDetail')
        const bankDetails = JSON.parse(this.$route.query.bankDetail);
       console.log( JSON.parse(this.$route.query.bankDetail))
        this.bankDetailData = JSON.parse(this.$route.query.bankDetail);
       this.bankDetailData.bankCardTailPic = bankDetails.bankCardTailPic.slice(7,bankDetails.bankCardTailPic.length);
       this.bankDetailData.bankCardHeadPic = bankDetails.bankCardHeadPic.slice(7,bankDetails.bankCardTailPic.length);
       this.bankUrl.imageTailUrl = bankDetails.bankCardTailPic;
       this.bankUrl.imageHeadUrl = bankDetails.bankCardHeadPic;
    }
}
