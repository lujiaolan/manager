/**
 * Created by Udea-Manager on 2017/11/16.
 */
export default {
    data(){
        return {
            // bankUpload: this.$store.state.baseUrl + '/crm/ap/img/upload',
            bankCardHeadPicUpload: 'http://120.77.234.9:8080/crm/aider/oss/udeacrm/bankCardHeadPic'+ new Date().getTime() + '?dir=ap-logo/&contentType=image/jpeg',
            bankCardTailPicUpload: 'http://120.77.234.9:8080/crm/aider/oss/udeacrm/bankCardTailPic'+ new Date().getTime() + '?dir=ap-logo/&contentType=image/jpeg',
            bankDetailData:{
                auditTime:'',
                bankBranch:'',
                bankCardHeadPic:'',
                bankCardTailPic:'',
                bankCardNumbers:'',
                bankCardStatus:null,
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
                bankCardStatus:[
                    {
                        required:true,
                        validator:(rules,value,callback)=> {
                           if(value==null||value==undefined){
                               callback(new Error('请选择你审核状态'+value))
                           }else{

                               callback()
                           }
                        }
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
            console.log('this.bankDetailData')
            console.log(this.bankDetailData)
            const postData = {
                bankName:this.bankDetailData.bankName,
                bankCardType:this.bankDetailData.bankCardType,
                bankBranch:this.bankDetailData.bankBranch,
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
            console.log('this.bankDetailData')
            console.log(postData)
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
                                        // message:'审核成功',
                                        message:'邮件发送成功，请注意查收',
                                        showClose:true
                                    });
                                    this.$store.dispatch('update_tab_active','three');
                                    self.$router.push('/DataAudit');
                                }else if(res.data.retCode==1){
                                    self.$message({
                                        type:'warning',
                                        // message:'银行卡审核步骤成功，但邮件发送步骤失败',
                                        message:'操作成功，请稍后查收邮件',
                                        showClose:true
                                    });
                                    this.$store.dispatch('update_tab_active','three');
                                    self.$router.push('/DataAudit');
                                }else{
                                    self.$message({
                                        type:'warning',
                                        // message:'银行卡审核步骤已经失败，无后续步骤',
                                        message:'操作失败，请稍后再试',
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
            this.$store.dispatch('update_tab_active','three');
            this.$router.push('/DataAudit')
        },
        handleChangBKDetailHeadPic(files){
            this.bankUrl.imageHeadUrl = files.url;
        },
        handleSuccessBKDetailHeadPic(res,files){
            this.bankUrl.imageHeadUrl = files.url;
            this.bankDetailData.bankCardHeadPic = res.data;
        },
        handleChangBKDetailTailPic(files){
            this.bankUrl.imageTailUrl = files.url;
        },
        handleSuccessBKDetailTailPic(res,files){
            this.bankUrl.imageHeadUrl = files.url;
            this.bankDetailData.bankCardTailPic= res.data;
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
