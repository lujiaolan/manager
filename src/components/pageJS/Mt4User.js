export default {
    data() {
        return {
            MT4Loading:false,
            MT4SyncDisabled:false,
            totalMyInfo:null,
            accountTypeDisabled:false,
            userEmailAble:true,
            multipleMT4:[],
            addMT4Visible: false,
            addMT4SameVisible: false,
            canApplyMt4:null,
            searchMT4List:{
                apId:this.$store.state.domain.domain.domain.apId,
                mt4UserNameLike:'',
                pageSize:10,
                currentPage:1,
                mt4UserId:null
            },
            addMt4FormSame:{
                apId: '',
                IDName:'',
                accountType:'' ,
                UserID: null,
                UserPhone: '',
                UserEmail: '',
                UserComment: '',
                UserLeverage: '',
                UserGroupName: '',
                UserPwd: ''
            },

            resetMT4PwdData:{
                apId:this.$store.state.domain.domain.domain.apId,
                UserLoginID:'',
                userEmail:'',
                UserInvestPwdCheck:1
            },
            groupTypeList:[
                {
                    value:'realTransferRules',
                    label:'个人'
                },
                {
                    value:'agentAccountRules',
                    label:'代理'
                }],
            MT4TypeList:[
                {
                    value:'1',
                    label:'主账号'
                },
                {
                    value:'0',
                    label:'标准账户'
                }],
            leverList:[
                {
                    value:10,
                    label:'1:10'
                },
                {
                    value:20,
                    label:'1:20'
                },
                {
                    value:50,
                    label:'1:50'
                },
                {
                    value:100,
                    label:'1:100'
                },
                {
                    value:200,
                    label:'1:200'
                },
                {
                    value:400,
                    label:'1:400'
                },
                {
                    value:500,
                    label:'1:500'
                },
                {
                    value:800,
                    label:'1:800'
                }
            ],
            groudMT4List:[],
            addMt4Form: {
                apId: this.$store.state.domain.domain.domain.apId,
                IDName:'',
                accountType:'realTransferRules' ,
                UserID: '',
                UserPhone: '',
                role: 'commonUser',
                UserEmail: '',
                UserComment: '',
                UserLeverage: '',
                UserSendreports: 1,
                UserGroupName: '',
                UserPwd: 'qwe123'
            },
            addMt4FormSameRules:{
                UserPwd: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入密码'))
                            }else {
                                if(/^(\w){6,20}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入6-20个字母或数字组成的密码'))
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserID: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('无法申请MT4账号'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserGroupName: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请选择分组'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserLeverage: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==undefined){
                                callback(new Error('请选择杠杆比例'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                type: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==undefined){
                                callback(new Error('请选择账户类型'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur',
                    }
                ]
            },
            addMT4Rules: {
                UserPwd: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入密码'))
                            }else {
                                if(/^(\w){6,20}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入6-20个字母或数字组成的密码'))
                                }
                            }
                        },
                      trigger: 'blur'
                    }
                ],
                UserID: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null){
                                callback(new Error('无法申请MT4账号,请重新选择账户属性'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserGroupName: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请选择分组'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserLeverage: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==undefined){
                                callback(new Error('请选择杠杆比例'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                IDName: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入姓名'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur',
                        }
                ],
                UserEmail: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                          if(value){
                              if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                  this.$ajax({
                                      method:'post',
                                      url:'/user/dumpRepeat',
                                      data:{
                                          apId:this.$store.state.domain.domain.domain.apId,
                                          userEmail:value
                                      }
                                  }).then(function (res) {
                                      if(res.data.retCode==0){
                                          callback()
                                      }else{
                                          callback(new Error('邮箱已经存在CRM,请创建同名账户'))
                                      }
                                  }).catch(function (err) {
                                      callback(new Error('邮箱已经存在CRM,请创建同名账户'))
                                  })
                              }else{
                                  callback(new Error('请输入有效的邮箱'))
                              }

                          } else{
                              callback()
                          }
                        },
                        trigger: 'blur' }
                ],
                UserPhone: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback()
                            }  else{
                                if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                    this.$ajax({
                                        method:'post',
                                        url:'/user/dumpRepeat',
                                        data:{
                                            apId:this.addMt4Form.apId,
                                            userPhone:value
                                        }
                                    }).then(function (res) {
                                        if(res.data.retCode==0){
                                            callback()
                                        }else {
                                            callback(new Error('手机号被占用,请重新输入手机号'))
                                        }
                                    }).catch(function (err) {
                                        callback(new Error('手机号被占用,请重新输入手机号'))
                                    })
                                }else{

                                    callback(new Error('手机号格式错误,请重新输入'))
                                }
                            }
                        },
                        trigger: 'blur' }
                ],
            },
            syncForm:{
                chooseValue: '',
                select_syncId: ''
            },
            syncOneVisible: false,

            tableData: [],
            resetPwdVisible: false,
            changeAttributeVisible: false,
            changeAttributeForm: {
                accountType:'',
                IDName:'',
                apId:'',
                UserEnableStatus:null,
                UserLoginID:null,
                UserGroupName:'',
                UserLeverage:null,
                UserIRD:null,
                UserPhone:'',
                UserEnable:null,
                UserEnableReadonly:null,
            },
            baseInfoVisible: false,
            baseInfoForm: {
                ZhName: '',
                EnName: '',
                Email: '',
                Phone: '',
                AgentLever: '',
                RebateType: '',
                Country: '',
                faceLanguage: '',
                BDay: '',
                Addr: '',
                HigherLever: '',
                refId: '',
            },
            baseInfoEditVisible: true,
            baseBankCard: [],
            showImg: false,

            changeBalanceVisible: false,
            changeBalanceForm: {
                Name: '',
                Phone: '',
                Email: '',
                Balance: '',
                changeTYpe: '',
                Count: '',
                AdminTip: '',
            },
            changeAttributeRules:{
                UserIRD: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(this.userEmailAble===true){
                                callback()
                            }else{
                                if(value){
                                    if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                        this.$ajax({
                                            method:'post',
                                            url:'/user/dumpRepeat',
                                            data:{
                                                apId:this.$store.state.domain.domain.domain.apId,
                                                userEmail:value
                                            }
                                        }).then(function (res) {
                                            if(res.data.retCode==0){
                                                callback()
                                            }else{
                                                callback(new Error('邮箱已经存在CRM,请创建同名账户'))
                                            }
                                        }).catch(function (err) {
                                            callback(new Error('邮箱已经存在CRM,请创建同名账户'))
                                        })
                                    }else{
                                        callback(new Error('请输入有效的邮箱'))
                                    }

                                } else{
                                    callback()
                                }
                            }
                        },
                        trigger: 'blur' }
                ],
                accountType:[
                    {
                        require:false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null||value==undefined){
                                callback(new Error('请选择账户属性'))
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                UserPhone: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(this.changeAttributeForm.UserPhone){
                                callback()
                            }else{
                                if(value==''||value==undefined){
                                    callback()
                                }  else{
                                    if(this.changeAttributeForm.UserPhone){
                                        if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                            this.$ajax({
                                                method:'post',
                                                url:'/user/dumpRepeat',
                                                data:{
                                                    apId:this.changeAttributeForm.apId,
                                                    userPhone:value
                                                }
                                            }).then(function (res) {
                                                if(res.data.retCode==0){
                                                    callback()
                                                }else {
                                                    callback(new Error('手机号被占用,请重新输入手机号'))
                                                }
                                            }).catch(function (err) {
                                                callback(new Error('手机号被占用,请重新输入手机号'))
                                            })
                                        }else{

                                            callback(new Error('手机号格式错误,请重新输入'))
                                        }
                                    }else{
                                        callback(new Error('不能修改用户手机号,请填写手机号'))
                                    }
                                }
                            }
                        },
                        trigger: 'blur' }
                ]
            }
        }
    },
    watch:{
        'addMt4Form.accountType':function (val) {
            console.log(val)
            if(val=='agentAccountRules'){
                console.log(val)
                this.addMt4Form.role = 'agent';
                this.getMt4MaxAccount();

            }else if(val=='realTransferRules'){
                this.addMt4Form.role = 'commonUser';
                this.getMt4MaxAccount();
            }
        }
    },
    methods: {
        getMt4MaxAccount(){
            const self = this;
            const postData = {
                apId:this.addMt4Form.apId,
                type:this.addMt4Form.accountType
            };
            this.$ajax({
                method:'post',
                url:'/ap/mt4Config/mt4MaxAccount',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log(res)
                    if(self.addMt4Form.accountType=='agentAccountRules'){
                        if(res.data.data.agentAccountRulesMaxNum){
                            self.addMt4Form.UserID = res.data.data.agentAccountRulesMaxNum+1;
                        }else{
                            self.addMt4Form.UserID = null;
                        }

                    }else if(self.addMt4Form.accountType== 'realTransferRules'){
                       if(res.data.data.realTransferRulesMaxNum){
                           self.addMt4Form.UserID = res.data.data.realTransferRulesMaxNum+1;
                       }else{
                           self.addMt4Form.UserID = null;
                       }
                    }
                    console.log(self.addMt4Form.UserID)

                }
            }).catch(function (err) {

            })
        },
        MT4SizeChange(val){
            this.searchMT4List.pageSize = val;
            this.mt4UserList();
        },
        currentChangeMT4(val){

            this.searchMT4List.currentPage = val;
            this.mt4UserList();
        },
        cancelSameAddMt4(ref){
           this.addMT4SameVisible = false;
            this.$refs[ref].resetFields();
        },

        addMT4(ref){
            const self = this;
            console.log(this.addMt4Form)
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        url:'http://120.77.234.9:8080/crm/mt4/add',
                        method:'post',
                        data:this.addMt4Form
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            console.log(res)
                            self.$message({
                                message:'申请成功,账户为:'+res.data.data.mt4UserId,
                                showClose:true,
                                type:'info'
                            });
                                self.addMT4Visible = false;
                                self.mt4UserList();
                                self.$refs[ref].resetFields();
                        }else{
                            self.$message({
                                message:'申请失败',
                                showClose:true,
                                type:'warning'
                            });
                            self.$refs[ref].resetFields();
                            self.addMT4Visible = false;
                        }
                    }).catch(function (err) {
                        console.log(err)
                        self.$message({
                            message:'网络错误',
                            showClose:true,
                            type:'error'
                        });
                        self.$refs[ref].resetFields();
                        self.addMT4Visible = false;
                    })
                }else {
                    return false;
                }
            })

        },
        adddSameMT4(ref){
            const self = this;
            console.log(this.addMt4FormSame)
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        url:'/mt4/add/sameNameAccount',
                        method:'post',
                        data:this.addMt4FormSame
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            console.log(res)
                            self.$message({
                                message:'申请成功,账号为:'+res.data.data.mt4UserId,
                                type:'info',
                                showClose:true
                            })
                            self.addMT4SameVisible = false;
                            self.mt4UserList();
                            self.$refs[ref].resetFields();
                        }else{
                            self.$message({
                                message:'申请失败',
                                type:'warning',
                                showClose:true
                            });
                            self.addMT4SameVisible = false;
                            self.mt4UserList();
                        }
                    }).catch(function (err) {
                        self.$message({
                            message:'网络错误',
                            type:'error',
                            showClose:true
                        });
                        self.addMT4SameVisible = false;
                    })
                }else {
                    return false;
                }
            })
        },

        cancelMT4Add(ref){
            this.$refs[ref].resetFields();
            this.addMT4Visible = false
        },
        chooseSyncType(val){
            // console.log(val);
            if(val === 1){
                this.syncOneVisible = true;
            }else {
                this.syncOneVisible = false;
            }
        },
        syncMT4Visible(){

            const self = this;
            self.MT4Loading = true;
            self. MT4SyncDisabled = true;
            // this.$message({
            //     type:'info',
            //     showClose:true,
            //     message:'接口没给我'
            // });
            // console.log(this.$store.state.domain.domain.domain.apId);
            self.$ajax({
                method:'get',
                url:'/ap/group/sync/' + self.$store.state.domain.domain.domain.apId,
                // headers: {'Authorization': 'Bearer ' + this.$store.state.user.userinfo.token},
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode === 0){
                    self.$ajax({
                        method: 'get',
                        url: '/ap/users/sync/' + self.$store.state.domain.domain.domain.apId
                    }).then(function (res) {
                        // console.log('同步客户');
                        console.log(res);
                        if(res.data.retCode === 0){
                            self.$message({
                                type: 'success',
                                message: '用户同步成功'
                            });
                            self.MT4Loading = false;
                            self. MT4SyncDisabled = false;
                            self.mt4UserList();
                        }else {
                            self.$message({
                                type: 'error',
                                message: '用户同步没有成功'
                            })
                            self.MT4Loading = false;
                            self. MT4SyncDisabled = false;
                        }
                    }).catch(function (res) {
                        self.$message({
                            type: 'error',
                            message: '网络错误'
                        })
                        self.MT4Loading = false;
                        self. MT4SyncDisabled = false;
                    })
                }else {
                    self.$message({
                        type: 'error',
                        message: '同步组没有成功'
                    })
                    self.MT4Loading = false;
                    self. MT4SyncDisabled = false;
                }
            }).catch(function (res) {
                self.$message({
                    type: 'error',
                    message: '网络错误'
                })
                self.MT4Loading = false;
                self. MT4SyncDisabled = false;
            })
        },
        resetPwd(){
            const self = this;
            this.$ajax({
                method:'post',
                url:'/mt4/mt4Pwd/pwdReset',
                data:this.resetMT4PwdData
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.$message({
                        message:'修改成功,请查收邮箱',
                        type:'info',
                        showClose:true
                    });
                    self.resetPwdVisible = false;
                    self.mt4UserList();

                }else{
                    self.$message({
                        message:'修改失败',
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
        resetMT4Pwd(row){
            this.resetPwdVisible = true;
            this.resetMT4PwdData = {
                apId:this.resetMT4PwdData.apId,
                UserLoginID:row.mt4UserId,
                userEmail:row.UserEmail,
                UserInvestPwdCheck:1
            };
            console.log(row)
        },
        changeAttrCancel(){
            this.changeAttributeVisible = false;
            this.userEmailAble = true;
            this.mt4UserList();
        },
        changeAttribute(index, row) {
            console.log(row);
            console.log(row.UserEmail);
            this.changeAttributeForm.accountType = '';
            if(row.UserEmail){
                this.userEmailAble = true;
            }else {
                this.userEmailAble = false;
            }
            this.getApGroupList();
            if(row.accountType=='realTransferRules'){
                this.accountTypeDisabled = true;
                this.changeAttributeForm.accountType = 'realTransferRules';
            }else{
                this.accountTypeDisabled = true;
                this.changeAttributeForm.accountType = 'agentAccountRules';
            }
            this.changeAttributeVisible = true;
            this.changeAttributeForm = {
                accountType:row.accountType,
                apId:row.apId,
                IDName:row.User,
                UserLoginID:row.mt4UserId,
                UserGroupName:row.UserGroupName,
                UserLeverage:row.UserLeverage,
                UserIRD:row.UserEmail,
                UserPhone:row.UserPhone,
                UserEnable:row.UserEnable,
                UserEnableReadonly:row.UserEnableReadonly,
            }
        },
        changeAttributeS(ref){
            const self = this;
            let role = ''
            if(this.changeAttributeForm.accountType=='realTransferRules'){
                role = 'commonUser';
            }else {
                role = 'agent';
            }
            const postData = {
                apId:this.changeAttributeForm.apId,
                UserLoginID:this.changeAttributeForm.UserLoginID,
                UserGroupName:this.changeAttributeForm.UserGroupName,
                UserLeverage:this.changeAttributeForm.UserLeverage,
                UserIRD:this.changeAttributeForm.UserIRD,
                IDName:this.changeAttributeForm.IDName,
                UserPhone:this.changeAttributeForm.UserPhone,
                UserEnable:this.changeAttributeForm.UserEnable,
                UserEnableReadonly:this.changeAttributeForm.UserEnableReadonly,
                role:role
            };
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        method:'post',
                        url:'/modify/mt4',
                        data: postData
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            self.$message({
                                message:'调整属性成功',
                                type:'info',
                                showClose:true
                            });
                            self.mt4UserList();
                            self.changeAttributeVisible = false;
                        }else{
                            self.$message({
                                message:'调整属性失败',
                                type:'warning',
                                showClose:true
                            });
                            self.mt4UserList();
                            self.changeAttributeVisible = false;
                        }
                    }).catch(function (err) {
                        self.$message({
                            message:'网络错误',
                            type:'error',
                            showClose:true
                        });
                    })
                }else{
                    return false;
                }
            })

        },
        mt4UserList(){
            const self = this;
            if(this.searchMT4List.mt4UserId==''){
                this.searchMT4List.mt4UserId=null;
            }
            this.$ajax({
                method:'post',
                url:'/list/mt4User',
                data:this.searchMT4List
            }).then(function (res) {
                console.log("getMT4ApplyList");
                console.log(res.data.data.content);
                console.log(res.data.data.totalAmount);
                self.tableData  =res.data.data.content;
                self.totalMyInfo = res.data.data.totalAmount;
            }).catch(function (err) {
                console.log(err);
            })
        },
        handleSelectionChange(val){
            this.multipleMT4 =val;
            console.log( 'this.multipleMT4');
            console.log(this.multipleMT4)
        },
        createMT4(){
            this.addMT4Visible = true;
            this.getApGroupList();
            this.getMt4MaxAccount();
        },
        sigleSyncMt4(row){
            const self = this;
            this.$confirm('您确定要同步'+row.mt4UserId+'这个账号吗?','同步账户',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                const postData = {
                    apId:row.apId,
                    mt4UserId:row.mt4UserId.toString()
                };
                console.log(row)
                console.log(postData)
                self.$ajax({
                    method:'post',
                    url:'/ap/user/sync',
                    data:postData
                }).then(function (res) {
                    if(res.data.retCode===0){
                        self.$message({
                            message:'同步成功',
                            type:'info',
                            showClose:true
                        })
                    }else{
                        self.$message({
                            message:'同步失败',
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
            }).catch(()=>{
                // self.$message({
                //     message:'取消同步',
                //     type:'success',
                //     showClose:true
                // })
            })
        },
        createSameMT4(row){
            console.log(row)
            const self = this;
            this.$ajax({
                method:'get',
                url:'/mt4User/'+row.userId+'/canApplyMt4',
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.canApplyMt4 = 5 - res.data.data.mt4UserNumber;
                    self.getApGroupList();
                    self.addMt4FormSame = {
                        userId:row.userId,
                        UserEmail:row.UserEmail,
                        UserGroupName:row.UserGroupName,
                        // IDName:row.IDName,
                        UserLeverage:row.UserLeverage,
                        UserPwd:'',
                        apId:row.apId
                    };
                    self.addMT4SameVisible = true;
                }else{
                    self.$message({
                        message:'同名账户已经达到最大限制',
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
        getApGroupList(){
            let apGroupList = [];
           if(this.$store.state.domain.domain.domain.apId){
               this.$ajax({
                   method:'get',
                   url:'/ap/group/'+this.$store.state.domain.domain.domain.apId
               }).then(function (res) {
                   if(res.data.retCode===0){
                       console.log(res.data.data)
                       for(let i=0;i<res.data.data.length;i++){
                           apGroupList.push(res.data.data[i])
                       }
                       // apGroupList.push(res.data.data);
                   }
               })
               this.$ajax({
                   method:'get',
                   url:'/ap/group/default/'+this.$store.state.domain.domain.domain.apId,
               }).then(function (res) {
                   if(res.data.retCode===0){
                       console.log(res.data.data)
                       apGroupList.push(res.data.data);

                   }
               })

        }
            this.groudMT4List = apGroupList;
           console.log('apGroupList')
           console.log(apGroupList)
        }

    },
    mounted(){
        this.mt4UserList();
        console.log('this.$store.state.domain.domain.domain');
        console.log(this.$store.state.domain.domain.domain)
    }
}
