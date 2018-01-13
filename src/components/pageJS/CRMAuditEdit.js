/**
 * Created by Udea-Manager on 2017/10/13.
 */
export default {
    data(){
        let arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //18位数身份证正则表达式
        let arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
        return{
            CRMAuditEditSave:'',
            CRMAuditEdit:{
                userEngName:"",
                spell:"",
                sex:"",
                country:"",
                addressOne:"",
                addressSecond:"",//市
                birthDay:"",
                superAgentId:"",
                bankId:"",
                agentLevel:"",
                refereeId:"",
                apId:this.$store.state.domain.domain.domain.apId,
                userPhone:'',
                userEmail:'',
                userName:"",
                commissionType:"",
                IDNumber:"",
                IDName:"",
                IDCardHeadPic:"",
                verifyStatus:null,
                IDCardTailPic:"",
                bankName:"",
                bankBranch:"",
                bankAccountName:'',
                bankCardNumbers:"",
                bankAddress:"",
                bankCardTailPic:"",
                cardHolder:'',
                bankCardHeadPic:"",
                reason:"",
                _id:'',
            },
            imageUrl:{
                imageIDHeadUrl:'',
                imageIDTailUrl:'',
                imageBankHeadUrl:'',
                imageBankTailUrl:'',

            },
            stateVerify:[
                {value:null,label:'全部审核状态'},
                {value:-1,label:'认证中'},
                {value:0,label:'未认证'},
                {value:1,label:'认证成功'},
                {value:2,label:'认证失败'}
            ],
            CRMAuditEdit_rules: {
                userEngName: [{
                    required: true,
                    message: '请输入英文名称',
                    trigger: 'blur'
                }],
                spell: [{
                    required: true,
                    message: '请输入名字拼音',
                    trigger: 'blur'
                }],
                sex: [{
                    required: true,
                    message: '请输入性别',
                    trigger: 'blur'
                }],

                country: [{
                    required: true,
                    message: '请输入国籍',
                    trigger: 'blur'
                }],
                addressOne: [{
                    required: true,
                    message: '请输入省份',
                    trigger: 'blur'
                }],
                addressSecond: [{
                    required: true,
                    message: '请输入市区',
                    trigger: 'blur'
                }],//市
                birthDay: [{
                    required: true,
                    message: '请输入出生年月',
                    trigger: 'blur'
                }],
                cardHolder: [{
                    required: true,
                    message: '请输入持卡人',
                    trigger: 'blur'
                }],
                userPhone: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入手机号'))
                        }  else{
                            if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                callback();
                            }else{

                                callback(new Error('手机号格式错误,请重新输入'))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                userEmail: [{
                    required: true,
                    validator:(rule,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入邮箱'))
                        } else{
                            if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                callback();
                            }else {
                                callback(new Error('请输入有限邮箱!'));
                            }
                        }
                    },
                    trigger: 'blur'
                }],

                IDNumber: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入身份证'))
                        }  else{
                            if( value.match(arg1) == null && value.match(arg2) == null){
                                callback(new Error('身份证格式错误,请重新输入'))
                            }else{
                                callback();
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                IDName: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                IDCardHeadPic: [{
                    required: true,
                    message: '身份证正面图片上传错误,请重新选择',
                    trigger: 'blur'
                }],
                IDCardTailPic: [{
                    required: true,
                    message: '身份证反面图片上传错误,请重新选择',
                    trigger: 'blur'
                }],
                bankName: [{
                    required: true,
                    message: '请输入开户行',
                    trigger: 'blur'
                }],
                bankBranch: [{
                    required: true,
                    message: '请输入开户支行',
                    trigger: 'blur'
                }],
                bankCardNumbers: [{
                    required: true,
                    message: '请输入银行卡号',
                    trigger: 'blur'
                }],
                bankAddress: [{
                    required: true,
                    message: '请输入居住地址',
                    trigger: 'blur'
                }],
                bankCardTailPic: [{
                    required: true,
                    message: '银行卡面图片上传错误,请重新选择',
                    trigger: 'blur'
                }],
                bankCardHeadPic: [{
                    required: true,
                    message: '银行卡反面图片上传错误,请重新选择',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods:{
        handleSuccessIDHeadPic(res,file){
            console.log('onSuccess');
            console.log(file);
            console.log(this.CRMAuditEdit.IDCardHeadPic );
            this.imageUrl.imageIDHeadUrl =file.url;
            this.CRMAuditEdit.IDCardHeadPic = file.response.data.fileName;
        },
        handleSuccessIDTailPic(res,file){
            console.log('handleSuccessIDTailPic')
            console.log(file.response.data.fileName)
            this.imageUrl.imageIDTailUrl =file.url;
            this.CRMAuditEdit.IDCardTailPic = file.response.data.fileName;
        },
        handleSuccessBankHeadPic(res,file){
            this.imageUrl.imageBankHeadUrl =file.url;
            this.CRMAuditEdit.bankCardHeadPic =file.response.data.fileName;
        },
        beforeBankPicEditUpload(file){
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt500K = file.size / 1024  < 500;

            if (!isJPG||isPNG) {
                this.$message.error('上传头像图片只能是 JPG 格式或 PNG 格式!');
            }
            if (!isLt500K) {
                this.$message.error('上传头像图片大小不能超过 500KB!');
            }
            return isJPG && isLt500K;
        },
        handleSuccessBankTailPic(res,file){
            this.imageUrl.imageBankTailUrl =file.url;
            this.CRMAuditEdit.bankCardTailPic = file.response.data.fileName;
        },
        saveCRMAuditEdit(ref){
            const addr = [];
            addr.push(this.CRMAuditEdit.addressOne);
            addr.push(this.CRMAuditEdit.addressSecond);
            const postData = {
                userEngName:this.CRMAuditEdit.userEngName,
                spell:this.CRMAuditEdit.spell,
                sex:this.CRMAuditEdit.sex,
                apId:this.CRMAuditEdit.apId,
                country:this.CRMAuditEdit.country,
                reason:this.CRMAuditEdit.reason,
                address:addr,
                IDName:this.CRMAuditEdit.IDName,
                birthDay:this.CRMAuditEdit.birthDay,
                userPhone:this.CRMAuditEdit.userPhone,
                userEmail:this.CRMAuditEdit.userEmail,
                verifyStatus:this.CRMAuditEdit.verifyStatus,
                IDCard:{
                    IDNumber:this.CRMAuditEdit.IDNumber,
                    IDName:this.CRMAuditEdit.IDName,
                    IDCardHeadPic:this.CRMAuditEdit.IDCardHeadPic,
                    IDCardTailPic:this.CRMAuditEdit.IDCardTailPic,
                },
                bankCard:[{
                    bankCardStatus:this.CRMAuditEdit.verifyStatus,
                    bankSort:0,
                    id:this.CRMAuditEdit.bankId,
                    bankName:this.CRMAuditEdit.bankName,
                    bankBranch:this.CRMAuditEdit.bankBranch,
                    cardHolder:this.CRMAuditEdit.cardHolder,
                    bankCardNumbers:this.CRMAuditEdit.bankCardNumbers,
                    bankAddress:this.CRMAuditEdit.bankAddress,
                    bankCardTailPic:this.CRMAuditEdit.bankCardTailPic,
                    bankCardHeadPic:this.CRMAuditEdit.bankCardHeadPic
                }]
            };
            console.log("postData");
            console.log(postData);
            console.log("this.CRMAuditEdit.birthDay");
            console.log(typeof this.CRMAuditEdit.birthDay);
            const self = this;
            const userId = this.$route.query.crmRowId;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        method:'post',
                        data:postData,
                        url:'/user/'+userId+'/update'
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            const postVerfy = {
                                _id:userId,
                                verifyStatus:self.CRMAuditEdit.verifyStatus,
                                bankCardNumbers:self.CRMAuditEdit.bankCardNumbers,
                                reason:self.CRMAuditEdit.reason,
                                apId:self.CRMAuditEdit.apId,
                                userEmail:self.CRMAuditEdit.userEmail
                            };
                          self.$ajax({
                              method:'post',
                              url:'/user/cardAndIdentity/verify',
                              data:postVerfy
                          }).then(function (res) {
                              if(res.data.retCode==0){
                                  self.$message({
                                      type:"info",
                                      message:'审核修改成功',
                                      showClose:'true'
                                  });
                                  self.getCRMAuditEdit();
                                  self.$router.push('/CrmAudit');
                              }else{
                                  self.$message({
                                      type:"warning",
                                      message:'审核修改失败',
                                      showClose:'true'
                                  })
                              }
                          }).catch(function (err) {
                              self.$message({
                                  type:"error",
                                  message:'网络错误',
                                  showClose:'true'
                              })
                          })
                        }else{
                            self.$message({
                                type:"warning",
                                message:'审核修改失败',
                                showClose:'true'
                            })
                        }

                    }).catch(function (err) {
                        self.$message({
                            type:"error",
                            message:'网络错误',
                            showClose:'true'
                        })
                    })
                }else {
                    return false;
                }
            })
        },
        redirectHistory(){
            console.log("redirectHistory");
            this.$router.push('./CrmAudit');
        },
        getCRMAuditEdit(){
          console.log(this.$route.query.crmRowId);
          const self = this;
            if(this.$route.query.crmRowId){
                this.$ajax({
                    method:'get',
                    url:'/user/'+this.$route.query.crmRowId
                }).then(function (res) {
                    if(res.data.retCode==0){
                        console.log(res);
                        const getUserInfo = res.data.data;
                        if(res.data.data.IDCard){
                            self.CRMAuditEditSave = '修改';
                           if(getUserInfo.IDCard.IDCardHeadPic){
                               self.imageUrl.imageIDHeadUrl ="http://"+getUserInfo.IDCard.IDCardHeadPic;
                               self.imageUrl.imageIDTailUrl ="http://"+getUserInfo.IDCard.IDCardTailPic;
                           }else{
                               self.imageUrl.imageIDHeadUrl ='';
                               self.imageUrl.imageIDTailUrl ='';
                           }
                           if(getUserInfo.IDCard.IDCardHeadPic){
                               self.CRMAuditEdit.IDCardHeadPic = getUserInfo.IDCard.IDCardHeadPic;
                               self.CRMAuditEdit.IDCardTailPic = getUserInfo.IDCard.IDCardTailPic;
                           }else{
                               self.CRMAuditEdit.IDCardHeadPic = '';
                               self.CRMAuditEdit.IDCardTailPic = '';
                           }
                            self.CRMAuditEdit.IDNumber = getUserInfo.IDCard.IDNumber;
                            self.CRMAuditEdit.IDName = getUserInfo.IDCard.IDName;
                            self.CRMAuditEdit.cardHolder = self.CRMAuditEdit.IDName;
                            console.log('  self.imageUrl.imageBankHeadUrl')
                            console.log(self.imageUrl.imageIDHeadUrl)
                        }
                        console.log("res.data.data.bankCard");
                        console.log(res.data.data.bankCard);

                        if(res.data.data.bankCard===undefined ||res.data.data.bankCard==[]){
                            self.imageUrl.imageBankHeadUrl ='';
                            self.imageUrl.imageBankTailUrl ='';
                            self.CRMAuditEdit.bankCardNumbers = '';
                            self.CRMAuditEdit.bankBranch = '';
                            self.CRMAuditEdit.bankId = '';
                            self.CRMAuditEdit.bankName = '';
                            self.CRMAuditEdit.bankAddress = '';
                            self.CRMAuditEdit.bankCardHeadPic = '';
                            self.CRMAuditEdit.bankCardTailPic = '';
                        }else{
                            let importCart = null;
                            for(let i=0;i<res.data.data.bankCard.length;i++){
                                if(res.data.data.bankCard[i].importantCard===1){
                                    importCart = i;
                                }
                            }
                            self.imageUrl.imageBankHeadUrl ="http://"+getUserInfo.bankCard[importCart].bankCardHeadPic;
                            self.imageUrl.imageBankTailUrl ="http://"+getUserInfo.bankCard[importCart].bankCardTailPic;
                            self.CRMAuditEdit.bankCardNumbers = getUserInfo.bankCard[importCart].bankCardNumbers;
                            self.CRMAuditEdit.bankBranch = getUserInfo.bankCard[importCart].bankBranch;
                            self.CRMAuditEdit.bankId = getUserInfo.bankCard[importCart].id;
                            self.CRMAuditEdit.bankName = getUserInfo.bankCard[importCart].bankName;
                            self.CRMAuditEdit.bankAddress = getUserInfo.bankCard[importCart].bankAddress;
                            self.CRMAuditEdit.bankCardHeadPic = getUserInfo.bankCard[importCart].bankCardHeadPic;
                            self.CRMAuditEdit.bankCardTailPic = getUserInfo.bankCard[importCart].bankCardTailPic;
                        }
                        console.log(getUserInfo.IDCard.IDCardHeadPic);
                        console.log('getUserInfo');
                        console.log(self.CRMAuditEdit.IDCardHeadPic);
                        self.CRMAuditEdit.birthDay =getUserInfo.birthDay;
                        self.CRMAuditEdit.userEmail =getUserInfo.userEmail;
                        self.CRMAuditEdit.userPhone =getUserInfo.userPhone;
                        self.CRMAuditEdit.role =getUserInfo.role;
                        self.CRMAuditEdit.country =getUserInfo.country;
                        if(getUserInfo.address){
                            self.CRMAuditEdit.addressOne =getUserInfo.address[0];
                            self.CRMAuditEdit.addressSecond =getUserInfo.address[1];
                        }
                        self.CRMAuditEdit.spell =getUserInfo.spell;
                        self.CRMAuditEdit.verifyStatus =getUserInfo.verifyStatus;
                        self.CRMAuditEdit.reason =getUserInfo.reason;
                        self.CRMAuditEdit.sex =getUserInfo.sex;
                        self.CRMAuditEdit.userEngName =getUserInfo.userEngName;
                        self.CRMAuditEdit._id =getUserInfo._id;

                    }
                }).catch(function (err) {

                })
            }
        }
    },
    mounted(){
        console.log("this.CRMAuditEdit")
        console.log(this.$route.query.crmRow);
        this.getCRMAuditEdit();
    }
}
