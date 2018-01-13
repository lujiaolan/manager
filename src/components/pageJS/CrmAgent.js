import { getCityData } from 'commMethods/getCityData'
export default {
    data() {
        let superAgen = '';
        return {
            editVisibleIndex:null,
            imgAgent:{
                imgAgentShow:false,
                imgAgentImgBig:''
            },
            superAgenConfig:{
                superAgentId:'',
                agentLevel:null
            },
            disReferralCode:false,
            disAgentLevel:false,
            levelList:[
                {
                    value:null,
                    label:'代理级别'
                },
                {
                    value:1,
                    label:'一级'
                },
                {
                    value:2,
                    label:'二级'
                },
                {
                    value:3,
                    label:'三级'
                },
                {
                    value:4,
                    label:'四级'
                },
                {
                    value:5,
                    label:'五级'
                }
            ],
            CRMAgentStatus:[
                {
                    value:null,
                    label:'账户状态'
                },
                {
                    value:1,
                    label:'正常',
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
            formLabelWidth: '120px',
            totalCrmAgent:null,
            searchCrmAgent:{
                page:1,
                pageSize:10,
                apId:this.$store.state.domain.domain.domain.apId,
                agentLevel:null,
                address:'',
                referralCode:null,
                agentNameLike:'',
                status:null,
                currentPage:1,
                mt4UserId:null
            },
            searchCrmAgent_rules:{
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
            addAgentFormModel: {
                apId:this.$store.state.domain.domain.domain.apId,
                IDName:'',
                userEmail:"",
                birthDay:'',
                userEngName:"",
                sex:"男",
                agentLevel:"",
                country:"",
                setUILocale:"",
                address:[],
                referralCode:"",
                userPhone:""
            },
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
            addAgent_rules: {
                IDName: [
                    { required: true, message: '请输入中文名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                userEngName: [
                    { required: true, message: '请输入英文名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                userEmail: [
                    {  required: true,
                        validator:(rule,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入邮箱'))
                            } else{
                                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                    this.$ajax({
                                        method:'post',
                                        url:'/user/dumpRepeat',
                                        data:{
                                            apId:this.addAgentFormModel.apId,
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
                                    callback(new Error('请输入有效邮箱!'));
                                }
                            }
                        },
                        trigger: 'blur'
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
                                            if(res.data.data.agentLevel==5){
                                                callback(new Error('等级为五,不能添加代理,请选择别的推荐码'));
                                            }else if(res.data.data.agentLevel==''||res.data.data.agentLevel==null){
                                                callback(new Error('等级为空,无法添加直客'));
                                            }else{
                                                callback()
                                            }
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
                                if(this.addAgentFormModel.agentLevel==''||this.addAgentFormModel.agentLevel==undefined){
                                    callback(new Error('代理等级或推荐码必须要填写'))
                                }else{
                                    if(this.addAgentFormModel.agentLevel===1){
                                       callback()
                                    }else{
                                        callback(new Error('请输入推荐码'))
                                    }
                                }
                            }
                        }
                    }
                ],
                agentLevel: [
                    { required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback()
                            }else{
                                callback();
                            }
                        },
                        trigger: 'change' }
                ],

                userPhone: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入手机号'))
                            }else{
                                if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                    this.$ajax({
                                        method:'post',
                                        url:'/user/dumpRepeat',
                                        data:{
                                            apId:this.addAgentFormModel.apId,
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
                                    callback(new Error('手机号格式错误,请重新输入'))
                                }
                            }
                            },
                        trigger: 'blur'
                    }

                ],
            },

            tableData: [],
            baseInfoVisible: false,
            bankCardList:[],
            bankCardPost:{
                bankCardHeadPic:'',
                bankCardTailPic:''
            },
            baseInfoAgentForm: {
                superUserEmail:'',
                IDName:'',
                addressDetail:'',
                IDNumber:'',
                IDCardHeadPic:'',
                IDCardTailPic:'',
                bankCard:[],
                userEmail:"",
                userEngName:"",
                sex:"",
                agentLevel:"",
                country:"",
                setUILocale:"",
                address:[],
                referralCode:"",
                userPhone:"",
                birthDay:'',
                status:'',
                apId:''
            },
            baseInfoAgentForm_rules:{
                userEmail:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value === ''){
                                callback(new Error('请输入邮箱'))
                            }else{
                                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('邮箱格式不对,请重新输入'))
                                }
                            }
                        },
                        trigger:'blur'
                    }
                ]
            },
            baseInfoEditVisible: true,
            showImg: false,

            selectedOptions: [],
            options: [],
            cur_page: 1,

            // 佣金设置
            agentComsSetVisible: false,
            comsRules: [],
            user_id: '',
            checked: true,
            rule_info: {},
            agentComsSetLevel: '',

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
            }
        }
    },
    created(){
        this.getCrmAgent();
        this.getData();
        console.log("DingConf")

    },
    watch:{
        'addAgentFormModel.agentLevel':function (val) {
            console.log(val)
            if(val===1){
                this.disReferralCode = true;
                this.addAgentFormModel.referralCode = null;
            }else{
                this.disReferralCode = false;
            }
        },
        'addAgentFormModel.referralCode':function (val) {
            if(val){
                this.disAgentLevel = true;
                this.addAgentFormModel.agentLevel = null;
            }else{
                this.disAgentLevel = false;
            }
        }
    },
    methods: {
        // 获取城市
        getData(){
            this.$ajax.get('../../static/city.json'
            ).then(response => {
                if (response.data) {
                    this.options = response.data.info

                }
            });
        },
        addAgentFormshow(){
            this.addAgentFormVisible = true;
            this.addAgentFormModel = {
                apId:this.$store.state.domain.domain.domain.apId,
                    IDName:'',
                    userEmail:"",
                    birthDay:'',
                    userEngName:"",
                    sex:"男",
                    agentLevel:"",
                    country:"",
                    setUILocale:"",
                    address:[],
                    referralCode:"",
                    userPhone:""
            }
        },
        // 代理数据
        getCrmAgent(){
            const self = this;
            let statusList = [];
            console.log('this.searchCrmAgent.status')
            console.log(this.searchCrmAgent.status)
            if(this.searchCrmAgent.status==''||this.searchCrmAgent.status==null||this.searchCrmAgent.status==undefined){
                statusList = [-1,1]
            }if(this.searchCrmAgent.status===-1){
                statusList = [-1]
            }else if(this.searchCrmAgent.status===1){
                statusList = [1]
            }else{
                statusList = [-1,1]
            }
            if(this.searchCrmAgent.referralCode==''){
                this.searchCrmAgent.referralCode = null;
            }
            const postData = {
                page: this.searchCrmAgent.page,
                pageSize: this.searchCrmAgent.pageSize,
                apId: this.searchCrmAgent.apId,
                agentLevel: this.searchCrmAgent.agentLevel,
                address: this.searchCrmAgent.address,
                referralCode: this.searchCrmAgent.referralCode,
                agentNameLike: this.searchCrmAgent.agentNameLike,
                status:statusList,
                currentPage: this.searchCrmAgent.currentPage,
                mt4UserId: this.searchCrmAgent.mt4UserId
            };
            this.$ajax({
                method:'post',
                data:postData,
                url:'/user/list/agent',

            }).then(function (res) {
                console.log("searchCrmAgent");
                console.log(res.data.data.content);
                if (res.data.retCode==0){
                    self.totalCrmAgent = res.data.data.totalAmount;
                    const agentList = [];
                    res.data.data.content.forEach(function (item) {
                        let superEmail = '';
                        let supeInfo = '';
                        if(item.superUserEmail){
                            superEmail = item.superUserEmail;
                            supeInfo = item.superReferralCode+' - '+item.superIDName;
                        }else{
                            superEmail = '平台';
                            supeInfo = '平台';
                        }
                        const agent = {
                            IDName:item.IDName,
                            address:item.address,
                            agentLevel:item.agentLevel,
                            apId:item.apId,
                            commissionAmount:self.accounting.formatMoney(item.commissionAmount,'',2,',','.'),
                            country:item.country,
                            minusAmount:self.accounting.formatMoney(item.minusAmount,'',2,',','.'),
                            money:self.accounting.formatMoney(item.money,'',2,',','.'),
                            mt4Amount:item.mt4Amount,
                            status:item.status,
                            plusAmount: self.accounting.formatMoney(item.plusAmount,'',2,',','.'),
                            referralCode:item.referralCode,
                            superAgentId:item.superAgentId,
                            superIDName:item.superIDName,
                            superUserEmail:superEmail,
                            superUserInfo:supeInfo,
                            superUserName:item.superUserName,
                            userEmail:item.userEmail,
                            userName:item.userName,
                            userPhone:item.userPhone,
                            verifyStatus:item.verifyStatus,
                            _id:item._id
                        };
                        agentList.push(agent);
                    })
                    console.log('agent')
                    console.log(agentList)
                    self.tableData = agentList;
                }
                // console.log("tableData是：");
                // console.log(self.tableData);
            }).catch(function (err) {
            })
        },

        // 分页数据请求
        CrmAgentSizeChange(val){
            this.searchCrmAgent.pageSize = val;
            this.getCrmAgent();
        },
        currentChangeCrmAgent(val){
            this.searchCrmAgent.currentPage = val;
            this.getCrmAgent();
        },

        // 添加CRM代理
        addCrmAgentFrom(ref){
            console.log(this.addAgentFormModel);
            console.log('superAgenConfig');
            console.log(this.superAgenConfig);
            const self = this;
            const postRepeat = {
                apId:this.addAgentFormModel.apId,
                userEmail:self.addAgentFormModel.userEmail,
                userPhone:self.addAgentFormModel.userPhone
            };
            if( this.addAgentFormModel.referralCode==''){
                this.addAgentFormModel.referralCode=null;
            }
            if(this.addAgentFormModel.agentLevel==''){
                this.addAgentFormModel.agentLevel=null;
            }

           this.$refs[ref].validate((valid)=>{
               console.log('superAgenConfig');
               console.log(this.superAgenConfig);
               if(valid){
                   if(self.addAgentFormModel.referralCode==''||self.addAgentFormModel.referralCode==null){
                       const addAgentForm = {
                           apId: self.addAgentFormModel.apId,
                           IDName: self.addAgentFormModel.IDName,
                           userEmail: self.addAgentFormModel.userEmail,
                           birthDay: self.moment(self.addAgentFormModel.birthDay).format('YYYY-MM-DD'),
                           userEngName: self.addAgentFormModel.userEngName,
                           sex: self.addAgentFormModel.sex,
                           referralCode:self.addAgentFormModel.referralCode,
                           agentLevel:self.addAgentFormModel.agentLevel,
                           country: self.addAgentFormModel.country,
                           setUILocale: self.addAgentFormModel.setUILocale,
                           address: self.addAgentFormModel.address,
                           userPhone: self.addAgentFormModel.userPhone

                       };
                       self.$ajax({
                           method:'post',
                           url:'/user/add/agent',
                           data:addAgentForm
                       }).then(function (res) {
                           if(res.data.retCode==0){
                               console.log(res);
                               self.$message({
                                   type:'info',
                                   message:'添加代理成功',
                                   showClose:true
                               });
                               self.addAgentFormVisible =false;
                               self.getCrmAgent();
                           }else {
                               self.$message({
                                   type:'warning',
                                   message:'添加代理失败',
                                   showClose:true
                               });
                           }
                       }).catch(function (err) {
                           self.$message({
                               type:'error',
                               message:'网络错误',
                               showClose:true
                           });
                       })
                   }else{
                       self.$ajax({
                           method:'get',
                           url:'/user/'+self.addAgentFormModel.referralCode+'/superInfo'
                       }).then(function (res) {
                           if(res.data.retCode==0){
                               self.superAgenConfig = res.data.data;
                               let superLevel = null;
                               if(self.superAgenConfig.agentLevel){
                                   superLevel =  self.superAgenConfig.agentLevel+1;
                               }
                               const addAgentForm = {
                                   apId: self.addAgentFormModel.apId,
                                   IDName: self.addAgentFormModel.IDName,
                                   userEmail: self.addAgentFormModel.userEmail,
                                   birthDay: self.addAgentFormModel.birthDay,
                                   userEngName: self.addAgentFormModel.userEngName,
                                   sex: self.addAgentFormModel.sex,
                                   agentLevel:superLevel,
                                   superAgentId:self.superAgenConfig.superAgentId,
                                   country: self.addAgentFormModel.country,
                                   setUILocale: self.addAgentFormModel.setUILocale,
                                   address: self.addAgentFormModel.address,
                                   userPhone: self.addAgentFormModel.userPhone

                               };
                               self.$ajax({
                                   method:'post',
                                   url:'/user/add/agent',
                                   data:addAgentForm
                               }).then(function (res) {
                                   if(res.data.retCode==0){
                                       console.log(res);
                                       self.$message({
                                           type:'info',
                                           message:'添加代理成功',
                                           showClose:true
                                       });
                                       self.addAgentFormVisible =false;
                                       self.getCrmAgent();
                                   }else {
                                       self.$message({
                                           type:'warning',
                                           message:'添加代理失败',
                                           showClose:true
                                       });
                                   }
                               }).catch(function (err) {
                                   self.$message({
                                       type:'error',
                                       message:'网络错误',
                                       showClose:true
                                   });
                               })

                           }else{
                               self.$message({
                                   message:'添加失败',
                                   showClose:true,
                                   type:'warning'
                               })
                           }
                       }).catch(function (err) {
                           self.$message({
                               message:'网络错误',
                               showClose:true,
                               type:"error"
                           })
                       })
                   }

               }else{
                   return false;
               }
           })

            // this.addAgentFormVisible = false;
        },

        baseInfoAgentShow(index, row) {
            const self= this;
            console.log('baseInfoAgentShow')
            console.log(row)
            this.baseInfoAgentForm.superUserEmail = row.superUserEmail;
            console.log(row.superUserEmail)
            console.log( this.baseInfoAgentForm.superUserEmail )
            let superEmail = '';
            if(row.superUserEmail=='平台'){
                superEmail = '平台'
            }else{
                superEmail = row.superUserEmail;
            }
            this.editVisibleIndex = null;
            self.baseInfoVisible = true;
            console.log("row baseInfoAgentForm")
            console.log(this.baseInfoAgentForm)
            this.$ajax({
                method:'get',
                url:'/user/'+row._id
            }).then(function (res) {
                if(res.data.retCode==0){
                    const getUserList = res.data.data;
                    console.log('getUserList');
                    let IDCardHead = '';
                    let IDCardTail = '';
                    if(res.data.data.IDCard.IDCardHeadPic){
                        IDCardHead = 'http://'+getUserList.IDCard.IDCardHeadPic;
                        IDCardTail ='http://'+getUserList.IDCard.IDCardTailPic;
                    }
                    console.log(getUserList);
                    self.baseInfoAgentForm = {
                        IDName:getUserList.IDCard.IDName,
                        IDNumber:getUserList.IDCard.IDNumber,
                        IDCardHeadPic:IDCardHead,
                        addressDetail:getUserList.addressDetail,
                        IDCardTailPic:IDCardTail,
                        userEmail:getUserList.userEmail,
                        userEngName:getUserList.userEngName,
                        superUserEmail:superEmail,
                        sex:getUserList.sex,
                        agentLevel:getUserList.agentLevel,
                        country:getUserList.country,
                        setUILocale:getUserList.setUILocale,
                        address:getUserList.address,
                        bankCard:[],
                        referralCode:getUserList.referralCode,
                        userPhone:getUserList.userPhone,
                        birthDay:getUserList.birthDay,
                        status:getUserList.status,
                        apId:getUserList.apId,
                        _id:getUserList._id
                    };
                    const bankCardRow = getUserList.bankCard;
                    const bankCardConfig = [];
                    if(bankCardRow) {
                        bankCardRow.forEach(function (item) {
                            const bank = {
                                userId:row._id,
                                bankBranch: item.bankBranch,
                                bankCardHeadPic: 'http://' + item.bankCardHeadPic,
                                bankCardTailPic: 'http://' + item.bankCardTailPic,
                                bankCardNumbers: item.bankCardNumbers,
                                bankCardStatus: item.bankCardStatus,
                                bankName: item.bankName,
                                importantCard: item.importantCard,
                                cardHolder: item.cardHolder,
                                bankReason:item.bankReason,
                                id:item.id
                            };
                            bankCardConfig.push(bank)
                        });
                    }
                    self.bankCardList = bankCardConfig;
                    console.log('importantCard')
                    console.log( self.bankCardList)
                }
            }).catch(function (err) {

            })

        },
        baseInfoAgentEdit(){
            this.baseInfoEditVisible = false;
        },
        saveAgentBaseInfo(){
            const userId = this.baseInfoAgentForm._id;
            const self = this;
            // console.log("userId");
            // console.log(userId);
            const postData = {
                userId:userId,
                superUserEmail:self.baseInfoAgentForm.superUserEmail,
                IDName:self.baseInfoAgentForm.IDName,
                userEmail:self.baseInfoAgentForm.userEmail,
                userEngName:self.baseInfoAgentForm.userEngName,
                sex:self.baseInfoAgentForm.sex,
                agentLevel:self.baseInfoAgentForm.agentLevel,
                country:self.baseInfoAgentForm.country,
                address:self.baseInfoAgentForm.address,
                setUILocale:self.baseInfoAgentForm.setUILocale,
                referralCode:self.baseInfoAgentForm.referralCode,
                userPhone:self.baseInfoAgentForm.userPhone,
                birthDay:self.moment(self.baseInfoAgentForm.birthDay).format('YYYY-MM-DD'),
                status:self.baseInfoAgentForm.status,
                apId:self.baseInfoAgentForm.apId
            };
            this.$ajax({
                method:'post',
                url:'/userBasicInfo/update',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.$message({
                        type:'info',
                        message:'修改成功',
                        showClose:true
                    });
                    self.baseInfoVisible = false;
                    self.getCrmAgent();
                }else {
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

        ResetAgentPWD(){
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
                        userEmail:self.baseInfoAgentForm.userEmail,
                        apId:self.baseInfoAgentForm.apId
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
                self.$message({
                    type: 'info',
                    message: '已取消重置',
                    showClose:true
                });
            });
        },
        bigAgentImg(row){
            this.imgAgent.imgAgentShow = true;
            this.imgAgent.imgAgentImgBig = row;

        },
        changeAgentBankCard(index,row){
            this.editVisibleIndex = index;
            this.bankCardPost.bankCardTailPic = row.bankCardTailPic;
            this.bankCardPost.bankCardHeadPic = row.bankCardHeadPic;
        },
        deleteAgentBankCard(index, row){
            // this.$message.error('删除第'+(index+1)+'行');
            const postData = {
                userId:row.userId,
                bankCardNumbers:row.bankCardNumbers
            };
            const self = this;
            this.$confirm('您确定要删除第'+(index+1)+'张银行卡吗?', '删除银行卡', {
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
                        self.cancelAgentBankCark(index,row);
                    }else{
                        self.$message({
                            type: 'warning',
                            message: '删除成功',
                            showClose:true
                        });
                    }
                }).catch(function (err) {
                    // console.log(err)
                    self.$message({
                        type: 'error',
                        message: '网络错误',
                        showClose:true
                    });
                })

            }).catch(() => {
                self.$message({
                    type: 'info',
                    message: '已取消',
                    showClose:true
                });
            });
        },
        saveAgentBankCard(index,row){
            console.log(index,row)
            const myReg = /(http:)/;
            console.log('this.bankCardPost')
            console.log(this.bankCardPost)
            let headPic = '';
            let tailPic = '';
            if(myReg.test(this.bankCardPost.bankCardHeadPic)){
                console.log('headPic hhp')
                console.log(this.bankCardPost.bankCardHeadPic)
                headPic = this.bankCardPost.bankCardHeadPic.slice(7)
                console.log(headPic)
            }else {
                console.log('headPic hhp')
                console.log(this.bankCardPost.bankCardHeadPic)
                headPic = this.bankCardPost.bankCardHeadPic;
                console.log(headPic)
            }
            if(myReg.test(this.bankCardPost.bankCardTailPic)){
                console.log('tailPic')
                console.log(this.bankCardPost.bankCardTailPic)
                tailPic = this.bankCardPost.bankCardTailPic.slice(7);
                console.log(tailPic)
            }else{
                console.log('tailPic')
                console.log(this.bankCardPost.bankCardTailPic)
                tailPic = this.bankCardPost.bankCardTailPic
                console.log(tailPic)
            }
            const postData = {
                _id:row.userId,
                bankId:row.id,
                bankBranch:row.bankBranch,
                bankCardNumbers:row.bankCardNumbers,
                bankCardStatus:-1,
                bankCardTailPic:tailPic,
                bankCardHeadPic:headPic,
                bankName:row.bankName,
                cardHolder:row.cardHolder
            };
            console.log('postData')
            console.log('postData')
            console.log(postData)
            const self = this;
            this.$ajax({
                method:'post',
                url:'/user/modify/bankCard',
                data:postData
            }).then(function (res) {
               if(res.data.retCode==0){
                   self.$message({
                       type:'info',
                       showCloe:true,
                       message:'修改成功'
                   });
                   self.cancelAgentBankCark(index,row);
                   self.editVisibleIndex = null;
                   self.bankCardPost = {
                       bankCardTailPic:'',
                       bankCardHeadPic:''
                   }
               }else{
                   self.$message({
                       type:'warning',
                       showCloe:true,
                       message:'修改失败'
                   })
               }
            }).catch(function (err) {
                // console.log(err)
                self.$message({
                    type:'error',
                    showCloe:true,
                    message:'网络错误'
                })
            })

        },
        handleSuccessAgentBankTailPic(res,files){
            this.bankCardList[this.editVisibleIndex].bankCardTailPic = files.url;
            this.bankCardPost.bankCardTailPic = files.response.data.fileName;
        },
        handleChangAgentBankHeadPic(file){
            console.log("bankCardHeadPic")
            console.log(file)
            this.bankCardList[this.editVisibleIndex].bankCardHeadPic =file.url;
        },
        beforeBankHeadPicUpload(file){
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
        handleSuccessAgentBankHeadPic(res,files){
            console.log('handleSuccessAgentBankHeadPic')
            console.log(files)
            this.bankCardList[this.editVisibleIndex].bankCardHeadPic = files.url;
            this.bankCardPost.bankCardHeadPic = files.response.data.fileName;
        },
        cancelAgentBankCark(index,row){
            console.log(row.userId);
            const self = this;
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
                                importantCard: item.importantCard,
                                bankName: item.bankName,
                                cardHolder: item.cardHolder,
                                id:item.id
                            };
                            bankCardConfig.push(bank)
                        });
                    }
                    self.bankCardList = bankCardConfig;
                }
            }).catch(function (err) {
            });
            this.editVisibleIndex = null;
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
                            self.getCrmAgent();
                        }else {
                            self.$message.success("操作失败")
                        }
                    }).catch(function (err) {

                    });
                    self.changeBalanceVisible = false;
                }
            })
        },

        jumpAgentCrm(index,row){
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

        handleChange(value) {
            // console.log(value);
        },

        // 获取可以赋予给代理的佣金规则
        agentComsSet(row){
            const self = this;
            // 对应行的user_id（用于传给后台）和对应行的代理等级（用于弹框显示代理等级）
            self.user_id = row._id;
            self.agentComsSetLevel = row.agentLevel;
            self.$ajax({
                method:'get',
                url:'/comsRule/relQuery/'+row._id
            }).then(function (res) {
                // console.log("获取可以赋予给代理的佣金规则");
                // console.log(res);
                let obj={};
                let keys=[];//定义一个数组key用来接受交易种类
                if(res.data.retCode === 0){
                    // console.log(res.data.data);
                    if(!res.data.data.length){
                        self.$message({
                            message: "没有可用于赋予代理的佣金规则",
                            type: 'error'
                        });
                    }else {
                        self.agentComsSetVisible = true;
                        // 整理交易种类
                        for(let i = 0 , l = res.data.data.length , key; i < l; i++){
                            key = res.data.data[i].symbolType;
                            if(obj[key]){
                                ++obj[key];
                            }else {
                                obj[key]=0;
                                ++obj[key];
                                keys.push(key);
                            }
                        }
                        // console.log(keys);
                        // 根据对应的交易种类将对应的交易规则归类
                        let comsRulesData = [];
                        for (let j = 0; j < keys.length; j++){
                            let k = 0;
                            comsRulesData[j] = [];
                            for (let i = 0 , l = res.data.data.length , key; i < l; i++){
                                key = res.data.data[i].symbolType;
                                if(key === keys[j]){
                                    comsRulesData[j][k] = res.data.data[i];
                                    k++;
                                }else {
                                    continue;
                                }
                            }
                        }
                        self.comsRules = comsRulesData;
                        // console.log(self.comsRules);
                    }
                }else {
                    self.comsRules = [];
                    self.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            }).catch(function (err) {
                self.comsRules = [];
                self.$message({
                    message: '网络错误',
                    type: 'error'
                });
            })
        },

        show1(event){
            event.cancelBubble = true;
        },
        // 赋予代理佣金设置
        changeVal(val,event) {
            event.cancelBubble = true;
            var self = this;
            self.rule_info = val;
            console.log("赋予代理佣金设置");
            // console.log(self.rule_info);
            var relAddData = {};
            relAddData.symbolType = self.rule_info.symbolType;
            relAddData.ruleId = self.rule_info._id;
            if(self.rule_info.selected === true){ //如果selected为真就表示该请求是移除该规则，所以remove为真
                relAddData.remove = "true";
            }else {
                relAddData.remove = "false";
            }
            // console.log("relAddData");
            // console.log(relAddData);
            self.$ajax({
                method:'post',
                data:relAddData,
                url:'/comsRule/relAdd/' + self.user_id
            }).then(function (res) {
                console.log("赋予代理规则");
                // console.log(res.data);
                if(res.data.retCode === 0){
                    self.refreshAddData();
                    self.$message({
                        message: "设置成功",
                        type: 'success'
                    });
                }else {
                    self.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            }).catch(function (err) {
                self.$message({
                    message: '网络错误',
                    type: 'error'
                });
            })
        },
        // 请求赋予或是删除规则之后，刷新规则数据
        refreshAddData(){
            var self = this;
            self.$ajax({
                method:'get',
                url:'/comsRule/relQuery/'+self.user_id
            }).then(function (res) {
                var obj={};
                var keys=[];//定义一个数组用来接受key
                var comsRulesData = [];
                if(res.data.retCode === 0){
                    for(var i = 0 , l = res.data.data.length , key; i < l; i++){
                        key = res.data.data[i].symbolType;
                        if(obj[key]){
                            ++obj[key];
                        }else {
                            obj[key]=0;
                            ++obj[key];
                            keys.push(key);
                        }
                    }
                    for (var j = 0; j < keys.length; j++){
                        var k = 0;
                        comsRulesData[j] = [];
                        for (var i = 0 , l = res.data.data.length , key; i < l; i++){
                            key = res.data.data[i].symbolType;
                            if(key === keys[j]){
                                comsRulesData[j][k] = res.data.data[i];
                                k++;
                            }else {
                                continue;
                            }
                        }
                    }
                    self.comsRules = comsRulesData;
                }else {
                    self.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            }).catch(function (err) {
                self.$message({
                    message: '网络错误',
                    type: 'error'
                });
            })
        }
    },

}
