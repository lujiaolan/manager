import { getCityData } from 'commMethods/getCityData'
export default {

    data() {
        return {
            totalCrmUser:null,
            toAgentVisible:false,
            toAgentInfoList:[],
            toAgentShow:'',
            toAgentInfo:{
                userId:'',
                referralCode:null,
                IDName:'',
                levelSelf:null,
                agentLevel:null,
                apId:'',
                superAgentId:''
            },
            toAgent_rules:{


            },
            postBankImg:{
                bankCardHeadPic:'',
                bankCardTailPic:''
            },
            imgUser:{
                imgUserShow:false,
                imgUserImgBig:''
            },
            editVisibleUserIndex:null,
            CRMUserSearch:{
                apId:this.$store.state.domain.domain.domain.apId,
                verifyStatus:[-1,0,1,2],
                userNameLike:'',
                address:'',
                pageSize:10,
                currentPage:1,
                referralCode:null,
                status:null
            },
            CRMUserSearch_rules:{
                referralCode:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null||value==undefined){
                                callback()
                            }else {
                                if(typeof value!=='number'){
                                    callback(new Error('请输入数字'))
                                }else{
                                    callback()
                                }
                            }
                        }
                    }
                ]
            },
            statusList:[
                {
                    value:null,
                    label:'账户状态'
                },
                {
                    value:1,
                    label:'正常'
                },
                {
                    value:0,
                    label:'未激活'
                },
                {
                    value:-1,
                    label:'冻结'
                }
            ],
            setUILocaleList:[
                {
                    label:'English',
                    value:'English'
                },
                {
                    label:'中文',
                    value:'chinese'
                }

            ],
            select_country_list: [
                {
                    index:0,
                    label:'选择省份',
                    value:''
                },
                {
                    index: 1,
                    label: '北京市',
                    value:'北京市'
                },{
                    index: 2,
                    label: '天津市',
                    value: '天津市'
                },{
                    index: 3,
                    label: '河北省',
                    value: '河北省'
                },{
                    index: 4,
                    label: '山西省',
                    value: '山西省',
                },{
                    index: 5,
                    label: '内蒙古自治区',
                    value: '内蒙古自治区'
                },{
                    index: 6,
                    label: ' 辽宁市',
                    value: ' 辽宁市'
                },{
                    index: 7,
                    label: '吉林省',
                    value: '吉林省'
                },{
                    index: 8,
                    label: '黑龙江省',
                    value: '黑龙江省',
                },{
                    index: 9,
                    label: '上海市',
                    value: '上海市',
                },{
                    index: 10,
                    label: '江苏省',
                    value: '江苏省'
                },{
                    index: 11,
                    label: '浙江省',
                    value: '浙江省'
                },{
                    index: 12,
                    label: '安徽省',
                    value: '安徽省'
                },{
                    index: 13,
                    label: '福建省',
                    value: '福建省'
                },{
                    index: 14,
                    label: '江西省',
                    value: '江西省'
                },{
                    index: 15,
                    label: '山东省',
                    value: '山东省',
                },{
                    index: 16,
                    label: '河南省',
                    value: '河南省'
                },{
                    index: 17,
                    label: '湖北省',
                    value: '湖北省'
                },{
                    index: 18,
                    label: '湖南省',
                    value: '湖南省'
                },{
                    index: 19,
                    label: '广东省',
                    value: '广东省'
                },{
                    index: 20,
                    label: '广西壮族自治区',
                    value: '广西壮族自治区'
                },{
                    index: 21,
                    label: '海南省',
                    value: '海南省'
                },{
                    index: 22,
                    label: '重庆市',
                    value: '重庆市'
                },{
                    index: 23,
                    label: '四川省',
                    value: '四川省'
                },{
                    index: 24,
                    label: '贵州省',
                    value: '贵州省'
                },{
                    index: 25,
                    label: '云南省',
                    value: '云南省'
                },{
                    index: 26,
                    label: '西藏自治区',
                    value: '西藏自治区',
                },{
                    index: 27,
                    label: '陕西省',
                    value: '陕西省'
                },{
                    index: 28,
                    label: '甘肃省',
                    value: '甘肃省'
                },{
                    index: 29,
                    label: '青海省',
                    value: '青海省'
                },{
                    index: 30,
                    label: '宁夏回族自治区',
                    value: '宁夏回族自治区'
                },{
                    index: 31,
                    label: '新疆维吾尔自治区',
                    value: '新疆维吾尔自治区'
                },{
                    index: 32,
                    label: '香港特别行政区',
                    value: '香港特别行政区'
                },{
                    index: 33,
                    label: '澳门特别行政区',
                    value: '澳门特别行政区',
                },{
                    index: 34,
                    label: '台湾省',
                    value: '台湾省'
                },],
            addAgentFormVisible: false,
            addAgentForm: {
                apId:this.$store.state.domain.domain.domain.apId,
                userEmail:'',
                IDName:'',
                referralCode:'',
                userEngName:'',
                userPhone:'',
                sex:'男',
                birthDay:'',
                country:'',
                address:[],
                setUILocale:'English'
            },
            addAgentRules: {
                IDName: [
                    {
                        required: true,
                        message: '请输入中文名',
                        trigger: 'blur'
                    },
                ],
                userEmail: [{
                    required: true,
                        trigger: 'blur',
                        validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new  Error('请输入邮箱'))
                        }else{
                            if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                this.$ajax({
                                    method:'post',
                                    url:'/user/dumpRepeat',
                                    data:{
                                        apId:this.addAgentForm.apId,
                                        userEmail:value
                                    }
                                }).then(function (res) {
                                    if(res.data.retCode==0){
                                        callback()
                                    }else {
                                        callback(new Error('邮箱被占用,请使用别的邮箱'))
                                    }
                                }).catch(function (err) {
                                    callback(new Error('邮箱被占用,请使用别的邮箱'))
                                })
                            }else {
                                callback(new Error('请输入有限邮箱!'));
                            }
                        }
                }
                }],
                userPhone: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入手机号'))
                        }else{
                            if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                this.$ajax({
                                    method:'post',
                                    url:'/user/dumpRepeat',
                                    data:{
                                        apId:this.addAgentForm.apId,
                                        userPhone:value
                                    }
                                }).then(function (res) {
                                    if(res.data.retCode==0){
                                        callback()
                                    }else {
                                        callback(new Error('手机号被占用,请使用别的手机号'))
                                    }
                                }).catch(function (err) {
                                    callback(new Error('手机号被占用,请使用别的手机号'))
                                })
                            }else{
                                callback(new Error('请输入有效的手机号'))
                            }
                        }
                        }
                    }
                ],
                referralCode:[
                    {
                        required:false,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(typeof value=='number'){
                                    this.$ajax({
                                        method:'get',
                                        url:'/user/'+value+'/superInfo',
                                    }).then(function (res) {
                                        if(res.data.retCode==0){
                                           callback();
                                        }else{
                                            callback(new Error('验证码错误,请重新输入'))
                                        }
                                    }).catch(function (err) {
                                        callback(new Error('验证码错误,请重新输入'))
                                    })
                                }else{
                                    callback(new Error('请输入数字'))
                                }
                            }else{
                               callback()
                            }
                        }
                    }
                ],
            },

            tableData: [],
            baseInfoVisible: false,
            baseInfoUserForm: {
                superUserEmail: '',
                IDName: '',
                userEngName:'',
                role:'',
                userPhone:'',
                userEmail:'',
                verifyStatus:'',
                sex:'',
                apId:'',
                address:[],
                bankCard:[],
                birthDay:'',
                country:'',
                IDCardHeadPic:'',
                IDCardTailPic:'',
                IDNumber:'',
                status:'',
                _id:'',
                setUILocale:'',
                superAgentId:''
            },
            baseInfoEditVisible: true,
            baseUserBankCard: [],
            showImg: false,

            // 调整金额
            changeBalanceVisible: false,
            changeBalanceForm: {
                userId: '',
                Name: '',
                Phone: '',
                Email: '',
                Balance: '',
                changeType: '',
                Count: '',
                AdminTip: '',
            },
            changeBalanceRules: {
                changeType:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value === ''){
                                callback(new Error('请选择调整类型'))
                            }else{
                                callback()
                            }
                        },
                        trigger:'blur'
                    }
                ],
                Count:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value === ''){
                                callback(new Error('请输入金额数'))
                            }else{
                                if(/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('金额格式不对,请重新输入'))
                                }
                            }
                        },
                        trigger:'blur'
                    }
                ]
            },

            selectedOptions: [],
            options: [],
            cur_page: 1,
        }
    },
    created(){
        this.getCRMUserList();
        this.getData();
    },
    watch:{
        'toAgentInfo.referralCode':function (val) {

                console.log(val.agentLevel)
                let level = '';
                let superId = '';
                let levelSelf = null;
                if(val.agentLevel===null){
                    level = '一级代理';
                    superId = ''
                    levelSelf = 1;

                }else if(val.agentLevel===1){
                    level = '二级代理';
                    superId = val.superAgentId
                    levelSelf = 2;
                }else if(val.agentLevel===2){
                    level = '三级代理';
                    superId = val.superAgentId
                    levelSelf = 3;
                }else if(val.agentLevel===3){
                    level = '四级代理';
                    superId = val.superAgentId
                    levelSelf = 4;
                }
                this.toAgentInfo.levelSelf = level;
                this.toAgentInfo.superAgentId = superId;
                this.toAgentInfo.agentLevel = levelSelf;
        }
    },
    methods: {
        getData(){
            // getCityData().then(response => {
            //     this.options = response.info;
            // });
            this.$ajax.get('../../static/city.json'
                // this.$ajax.get('../../static/city.json'
            ).then(response => {
                if (response.data) {
                    this.options = response.data.info

                }
            });
        },
        addAgentFormShow(){
            this.addAgentFormVisible = true;
          this.addAgentForm = {
                  apId:this.$store.state.domain.domain.domain.apId,
                  userEmail:'',
                  IDName:'',
                  referralCode:'',
                  userEngName:'',
                  userPhone:'',
                  sex:'男',
                  birthDay:'',
                  country:'',
                  address:[],
                  setUILocale:'English'
          }
        },
        getCRMUserList(){
            const self = this;
            let selfStatus = [];
            let ralCode = null;
            if(this.CRMUserSearch.status===null){
                selfStatus = [-1,1];
            }else if(this.CRMUserSearch.status==1){
                selfStatus = [1]
            }else {
                selfStatus = [-1]
            }
            if(this.CRMUserSearch.referralCode==null||this.CRMUserSearch.referralCode==''){
                ralCode = null;
            }else{
                ralCode  = this.CRMUserSearch.referralCode;
            }
            const postData  = {
                apId:this.CRMUserSearch.apId,
                verifyStatus:this.CRMUserSearch.verifyStatus,
                userNameLike:this.CRMUserSearch.userNameLike,
                address:this.CRMUserSearch.address,
                pageSize:this.CRMUserSearch.pageSize,
                currentPage:this.CRMUserSearch.currentPage,
                referralCode:ralCode,
                status:selfStatus
            }
            console.log('CRMUserSearch')
            console.log(this.CRMUserSearch)
            console.log(this.CRMUserSearch.status)
            this.$ajax({
                method:'post',
                url:'/user/list',
                data:postData
            }).then(function (res) {
                console.log('CRMUserSearch')
                console.log(res)
                if(res.data.retCode==0){
                    self.totalCrmUser = res.data.data.totalAmount;
                    const userList = [];
                    res.data.data.content.forEach(function (item) {
                        let userEmail = '';
                        let userInfo = '';
                        if(item.superUserEmail){
                            userEmail = item.superUserEmail;
                            userInfo = item.superReferralCode+' - '+item.superIDName;
                        }else {
                            userEmail = '平台';
                            userInfo = '平台';
                        }
                        const user = {
                            IDName:item.IDName,
                            apId:item.apId,
                            minusAmount:self.accounting.formatMoney(item.minusAmount,'',2,',','.'),
                            money:self.accounting.formatMoney(item.money,'',2,',','.'),
                            mt4Amount:item.mt4Amount,
                            plusAmount:self.accounting.formatMoney(item.plusAmount,'',2,',','.'),
                            superIDName:item.superIDName,
                            superUserInfo:userInfo,
                            superUserEmail:userEmail,
                            address:item.address,
                            status:item.status,
                            superUserName:item.superUserName,
                            userEmail:item.userEmail,
                            userPhone:item.userPhone,
                            verifyStatus:item.verifyStatus,
                            _id:item._id
                        };
                        userList.push(user)
                    });
                    self.tableData = userList;
                }else {

                }
            }).catch(function (err) {

            })
        },
        CrmUserSizeChange(val){
          this.CRMUserSearch.pageSize =val;
          this.getCRMUserList();

        },
        currentChangeCrmUser(val){
            this.CRMUserSearch.currentPage = val;
            this.getCRMUserList();
        },
        handleCurrentChange(val){
            this.cur_page = val;
            this.getData();
        },


        addCrmAgent(ref){
            // this.addAgentFormVisible = false;
            const self = this;
            const postRepeat = {
                apId:this.addAgentForm.apId,
                userEmail:self.addAgentForm.userEmail,
                userPhone:self.addAgentForm.userPhone
            };
            if( this.addAgentForm.referralCode==''){
                this.addAgentForm.referralCode=null;
            }
            self.$refs[ref].validate((valid)=>{
                if(valid){
                    const postData = {
                        apId:self.addAgentForm.apId,
                        userEmail:self.addAgentForm.userEmail,
                        IDName:self.addAgentForm.IDName,
                        referralCode:parseInt(self.addAgentForm.referralCode),
                        userEngName:self.addAgentForm.userEngName,
                        userPhone:self.addAgentForm.userPhone,
                        sex:self.addAgentForm.sex,
                        birthDay:self.moment(self.addAgentForm.birthDay).format('YYYY-MM-DD'),
                        country:self.addAgentForm.country,
                        address:self.addAgentForm.address,
                        setUILocale:self.addAgentForm.setUILocale
                    }
                    self.$ajax({
                        method:'post',
                        url:'/user/add',
                        data:postData
                    }).then(function (res) {
                        if (res.data.retCode==0){
                            self.$message({
                                type:'info',
                                message:'添加成功,请查收邮箱',
                                showCloe:true
                            });
                            self.addAgentFormVisible = false;
                            self.getCRMUserList();
                        }else {
                            self.$message({
                                type:'warning',
                                message:'添加失败',
                                showCloe:true
                            });
                        }
                    }).catch(function (err) {
                        self.$message({
                            type:'info',
                            message:'网络错误',
                            showCloe:true
                        });
                    })

                }else{
                    return false;
                }
            })
        },
        beforeBankHeadPicUserUpload(file){
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt500K = file.size / 1024  < 500;
            console.log("file")
            console.log(file)
            if (!(isPNG||isJPG)) {
                this.$message.error('上传头像图片只能是 JPG 格式或 PNG 格式!isPNG');
            }
            if (!isLt500K) {
                this.$message.error('上传头像图片大小不能超过 500KB!');
            }
            return isJPG||isPNG &&isLt500K;
        },
        handleSuccessUserBankTailPic(res,files){
            this.baseUserBankCard[this.editVisibleUserIndex].bankCardTailPic = files.url;
            this.postBankImg.bankCardTailPic = files.response.data.fileName;
        },
        handleSuccessUserBankHeadPic(res,files){
            this.baseUserBankCard[this.editVisibleUserIndex].bankCardHeadPic = files.url;
            this.postBankImg.bankCardHeadPic = files.response.data.fileName;
        },
        baseInfoShow(index, row) {
            console.log(row)
            const self = this;
            this.editVisibleUserIndex = null;
            self.baseInfoVisible = true;
           this.$ajax({
               method:'get',
               url:'/user/'+row._id
           }).then(function (res) {
               if(res.data.retCode==0){
                   const getUserList = res.data.data;
                   console.log('getUserList')
                   let userEmail = '';
                   if(row.superUserEmail=='平台'){
                       userEmail = '平台'
                   }else{
                       userEmail = row.superUserEmail;
                   }
                   console.log(getUserList)
                   let IDCardHead  = '';
                   let IDCardTail = '';
                   if(res.data.data.IDCard.IDCardHeadPic){
                       IDCardHead = "http://"+getUserList.IDCard.IDCardHeadPic;
                       IDCardTail = "http://"+getUserList.IDCard.IDCardTailPic;

                   }
                   let roles = ''
                   if(getUserList.role=='commonUser'){
                       roles = '普通用户'
                   }else{
                       roles = '未识别用户'
                   }
                   self.baseInfoUserForm = {
                       IDName: getUserList.IDName,
                       userEngName:getUserList.userEngName,
                       superUserEmail:userEmail,
                       userPhone:getUserList.userPhone,
                       addressDetail:getUserList.addressDetail,
                       roles:roles,
                       userEmail:getUserList.userEmail,
                       role:getUserList.role,
                       verifyStatus:getUserList.verifyStatus,
                       sex:getUserList.sex,
                       apId:getUserList.apId,
                       address:getUserList.address,
                       bankCard:[],
                       birthDay:getUserList.birthDay,
                       country:getUserList.country,
                       IDCardHeadPic:IDCardHead,
                       IDCardTailPic:IDCardTail,
                       IDNumber:getUserList.IDCard.IDNumber,
                       status:getUserList.status,
                       _id:getUserList._id,
                       setUILocale:getUserList.setUILocale,
                       superAgentId:getUserList.superAgentId
                   }
                   const bankCardRow = getUserList.bankCard;
                   console.log('bankCardRow')
                   console.log(bankCardRow)
                   const bankCardConfig = [];
                   if(bankCardRow) {
                       bankCardRow.forEach(function (item) {
                           const bank = {
                               userId:row._id,
                               bankId:item.id,
                               bankBranch: item.bankBranch,
                               bankCardHeadPic: 'http://' + item.bankCardHeadPic,
                               bankCardTailPic: 'http://' + item.bankCardTailPic,
                               bankCardNumbers: item.bankCardNumbers,
                               bankCardStatus: item.bankCardStatus,
                               importantCard: item.importantCard,
                               bankName: item.bankName,
                               cardHolder: item.cardHolder
                           };
                           bankCardConfig.push(bank)
                       });
                   }
                   self.baseUserBankCard = bankCardConfig;
               }
           }).catch(function (err) {

           })
        },
        baseInfoEdit(){
            this.baseInfoEditVisible = false;

        },
        saveBaseInfo(){
            console.log(this.baseInfoUserForm);
            // this.baseInfoVisible = false;
                const postData = {
                    IDName: this.baseInfoUserForm.IDName,
                    userId: this.baseInfoUserForm._id,
                    userEngName:this.baseInfoUserForm.userEngName,
                    userPhone:this.baseInfoUserForm.userPhone,
                    userEmail:this.baseInfoUserForm.userEmail,
                    role:this.baseInfoUserForm.role,
                    verifyStatus:this.baseInfoUserForm.verifyStatus,
                    sex:this.baseInfoUserForm.sex,
                    addressDetail:this.baseInfoUserForm.addressDetail,
                    apId:this.baseInfoUserForm.apId,
                    address:this.baseInfoUserForm.address,
                    birthDay:this.baseInfoUserForm.birthDay,
                    country:this.baseInfoUserForm.country,
                    status:this.baseInfoUserForm.status,
                    _id:this.baseInfoUserForm._id,
                    setUILocale:this.baseInfoUserForm.setUILocale,
                    superAgentId:this.baseInfoUserForm.superAgentId
            };
            console.log('postData')
            console.log(postData)
            const self = this;
            this.$ajax({
                method:'post',
                url:'/userBasicInfo/update',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.$message({
                        message:'修改成功',
                        showClose:true,
                        type:'info'
                    });
                    self.baseInfoVisible = false;
                    self.getCRMUserList()
                }else{
                    self.$message({
                        message:'修改失败',
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

        },
        ResetUserPWD(){
            this.baseInfoVisible = false;
            const self = this;
            this.$confirm('您确定要重置CRM用户的密码吗?', '重置密码', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.$ajax({
                    method:'post',
                    url:'/pwdReset/sendEmail',
                    data:{
                        userEmail:self.baseInfoUserForm.userEmail,
                        apId:self.baseInfoUserForm.apId
                    }
                }).then(function (res) {
                    if(res.data.retCode==0){
                        self.$message({
                            type: 'success',
                            message: '重置成功!请确认邮件！',
                            showClose:true
                        });
                    }else{
                        self.$message({
                            type: 'warning',
                            message: '重置失败',
                            showClose:true
                        });
                    }
                }).catch(function (err) {
                    self.$message({
                        type: 'error',
                        message: '网络错误',
                        showClose:true
                    });
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消重置'
                });
            });
        },
        bigIMGUser(row){
            this.imgUser.imgUserShow  = true;
            this.imgUser.imgUserImgBig = row;
        },
        changeBankCard(index,row){
            this.editVisibleUserIndex = index;
            this.postBankImg.bankCardHeadPic = row.bankCardHeadPic;
            this.postBankImg.bankCardTailPic = row.bankCardTailPic;
        },
        cancelBankCard(index,row){
            this.editVisibleUserIndex = null;
            this.$ajax({
                method:'get',
                url:'/user/'+row.userId+'/bankCard/list'
            }).then(function (res) {
                if(res.data.retCode==0){
                    const bankCardRow = res.data.data.data[0].bankCard;
                    console.log('res.data.data.data.bankCard');
                    console.log(res);
                    const bankCardConfig = [];
                    if(bankCardRow) {
                        bankCardRow.forEach(function (item) {
                            const bank = {
                                userId:row.userId,
                                bankBranch: item.bankBranch,
                                bankCardHeadPic: 'http://' + item.bankCardHeadPic,
                                bankCardTailPic: 'http://' + item.bankCardTailPic,
                                bankCardNumbers: item.bankCardNumbers,
                                bankCardStatus: item.bankCardStatus,
                                bankName: item.bankName,
                                importantCard: item.importantCard,
                                cardHolder: item.cardHolder,
                                bankId:item.id

                            };
                            bankCardConfig.push(bank)
                        });
                    }
                    self.bankCardList = bankCardConfig;
                }
            }).catch(function (err) {
            });
        },
        deleteBankCard(index, row){
            // this.$message.error('删除第'+(index+1)+'行');
            const postData  = {
                userId:row.userId,
                bankCardNumbers:row.bankCardNumbers
            };
            const self = this;
            this.$confirm('您确定要删除第'+(index+1)+'张吗?', '删除银行卡', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.$ajax({
                    method:'post',
                    url:'/user/remove/bankCard',
                    data:postData
                }).then(function (res) {
                    console.log(res)
                    if(res.data.retCode==0){
                        self.$message({
                            type: 'success',
                            message: '删除成功',
                            showClose:true
                        });
                        self.cancelBankCard(index,row);
                    }else{
                        self.$message({
                            type: 'warning',
                            message: '删除成功',
                            showClose:true
                        });
                    }
                }).catch(function (err) {
                    console.log(err)
                    self.$message({
                        type: 'error',
                        message: '网络错误',
                        showClose:true
                    });
                })
            }).catch(() => {
                self.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        saveBankCard(index,row){
            const myReg = /(http:)/;
            console.log('this.bankCardPost')
            console.log(this.bankCardPost)
            let headPic = '';
            let tailPic = '';
            if(myReg.test(this.postBankImg.bankCardHeadPic)){
                console.log('headPic hhp')
                console.log(this.postBankImg.bankCardHeadPic)
                headPic = this.postBankImg.bankCardHeadPic.slice(7)
                console.log(headPic)
            }else {
                console.log('headPic hhp')
                console.log(this.postBankImg.bankCardHeadPic)
                headPic = this.postBankImg.bankCardHeadPic;
                console.log(headPic)
            }
            if(myReg.test(this.postBankImg.bankCardTailPic)){
                console.log('tailPic')
                console.log(this.postBankImg.bankCardTailPic)
                tailPic = this.postBankImg.bankCardTailPic.slice(7);
                console.log(tailPic)
            }else{
                console.log('tailPic')
                console.log(this.postBankImg.bankCardTailPic)
                tailPic = this.postBankImg.bankCardTailPic
                console.log(tailPic)
            }
            const postData = {
                _id:row.userId,
                bankId:row.bankId,
                bankBranch:row.bankBranch,
                bankCardNumbers:row.bankCardNumbers,
                bankCardStatus:-1,
                bankCardTailPic:tailPic,
                bankCardHeadPic:headPic,
                bankName:row.bankName,
                cardHolder:row.cardHolder
            };
            const self = this;
            console.log(row)
            this.$ajax({
                method:'post',
                url:'/user/modify/bankCard',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.$message({
                        type:'info',
                        message:'修改成功',
                        showClose:true
                    });
                    self.cancelBankCard(index,row);
                    self.editVisibleUserIndex = null;
                    self.postBankImg = {
                        bankCardTailPic:'',
                        bankCardHeadPic:''
                    }
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
        },

        changeBalance(row) {
            const self = this;
            self.changeBalanceVisible = true;
            self.changeBalanceForm.userId = row._id;
            self.changeBalanceForm.Email = row.userEmail;
            self.changeBalanceForm.Balance = row.money;
            self.changeBalanceForm.Count = '';
            self.changeBalanceForm.changeType = '';
        },
        changeBalanceS(ref){
            const self = this;
            const postData = {
                apId: self.$store.state.domain.domain.domain.apId,
                userId: self.changeBalanceForm.userId,
                deposit: self.changeBalanceForm.Count,
                type: self.changeBalanceForm.changeType,
                desc: self.changeBalanceForm.AdminTip,
            };
            self.$refs[ref].validate((valid)=>{
                if(valid){
                    // console.log(postData);
                    self.$ajax({
                        method: 'post',
                        data: postData,
                        url: '/deposit/sys'
                    }).then(function (res) {
                        console.log(res);
                        if(res.data.retCode === 0){
                            self.$message.success("操作成功");
                            self.getCRMUserList();
                        }else {
                            self.$message.success("操作失败")
                        }
                    }).catch(function (err) {

                    });
                    self.changeBalanceVisible = false;
                }
            })
        },

        jumpUserCrm(index,row){
            const self = this;
            this.$ajax({
                url:'/snooping',
                method:'post',
                data:{
                    userId:row._id,
                    apId:row.apId
                }
            }).then(function (res) {
                if(res.data.retCode===0){
                    console.log(res)
                    console.log(res.data.data.status)
                    if(res.data.data.status===1){
                        const userId = res.data.data._id;
                        const urlPost = res.data.data.bindingDomain+'#/home?'+userId;
                        window.open(urlPost);
                    }else if(res.data.data.status===0){
                        self.$message({
                            message:'用户未激活,请先修改用户状态',
                            type:'warning',
                            showClose:true
                        })
                    }else if(res.data.data.status===-1){
                        self.$message({
                            message:'用户已冻结,请先修改用户状态',
                            type:'warning',
                            showClose:true
                        })
                    }
                    else if(res.data.data.status===2){
                        self.$message({
                            message:'用户已暂停,请先修改用户状态',
                            type:'warning',
                            showClose:true
                        })
                    }
                }else{
                    self.$message({
                        message:'用户已暂停,请先修改用户状态',
                        type:'warning',
                        showClose:true
                    })
                }
            }).catch(function (err) {
                self.$message({
                    message:'网络错误',
                    type:'error',
                    showClose:true
                })
            })
        },
        guestToAgent(row){
            console.log(row)
            this.toAgentVisible = true;
            this.toAgentInfo = {
                userId:row._id,
                IDName:row.IDName,
                apId:row.apId,
                referralCode:this.toAgentInfo.referralCode
            };
            this.getToAgent(row.apId)
        },
        confirmAgent(ref){
            const self = this;
            const postData = {
                superAgentId:this.toAgentInfo.superAgentId,
                agentLevel:this.toAgentInfo.agentLevel,
                userId:this.toAgentInfo.userId,
                apId:this.toAgentInfo.apId,
            };
            console.log('confirmAgent')
            console.log(postData)

            this.$refs[ref].validate((valid)=>{
                if(valid){
                    this.$ajax({
                        url:'/agent/apply/confirm',
                        data:postData,
                        method:'post'
                    }).then(function (res) {
                        self.toAgentVisible = false;
                        if(res.data.retCode==0){
                            console.log(res)
                            self.$alert('这是一段内容', '提示', {
                              message: '升级成功，代理编号：'+res.data.data
                            });
                            self.getCRMUserList();

                        }else {
                            self.$alert('账户或资料未审核通过', '提示', {
                              message:'账户或资料未审核通过 '
                            });
                        }
                    }).catch(function (err) {
                        self.$message({
                            showClose:true,
                            message:'网络错误',
                            type:'error'
                        })
                    })
                }else{
                    return false;
                }
            })
        },

        getToAgent(val){
            const self = this;
            this.$ajax({
                url:"/agent/info/"+val,
                method:'get'
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log(res)
                    let agentRecode = [
                        {
                            label:"1-无上级",
                            agentLevel:null,
                            superAgentId:0
                        }
                    ];
                    res.data.data.forEach(function (item) {
                        let superLevel = ''
                        if(item.agentLevel===1){
                            superLevel = '一级代理'
                        }else if(item.agentLevel===2){
                            superLevel = '二级代理'
                        }else if(item.agentLevel===3){
                            superLevel = '三级代理'
                        }else if (item.agentLevel===4){
                            superLevel = '四级代理'
                        }
                        const agentInfo = {
                            label:item.referralCode+' - '+item.IDName+' - '+superLevel,
                            agentLevel:item.agentLevel,
                            superAgentId:item._id
                        };
                        agentRecode.push(agentInfo)
                    });
                    self.toAgentInfoList = agentRecode;
                    if(res.data.data.agentLevel===5){
                        self.toAgentShow = ''
                    }else{
                        self.toAgentInfo.agentLevel = res.data.data.agentLevel;
                        self.toAgentInfo.superAgentId = res.data.data.superAgentId;
                        console.log(self.toAgentInfo)
                        self.toAgentShow = self.toAgentInfo.agentLevel+'级代理'
                    }

                }
            }).catch(function (err) {

            })
        },
        cancelAgent(ref){
            this.toAgentVisible = false;
            this.toAgentInfo.referralCode = '';
        },
        handleChange(value) {
            // console.log(value);
        }
    }
}
