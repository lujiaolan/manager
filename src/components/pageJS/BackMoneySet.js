/**
 * Created by Udea-Manager on 2017/9/27.
 */
export default {
    data() {
        return {
            loginLoading: false,
            // 显示添加弹框
            addORSetShow:false,
            // 显示修改弹框
            editORSetShow:false,

            totalBackMoney:null,
            // 添加规则数据字段
            addBackMoneyOR:{
                apId:this.$store.state.domain.domain.domain.apId,
                name:'',
                ruleType:'',
                commissionMoney:'',
                status:true,
                agentLevel:'',
                symbolType:''
            },
            // 修改规则数据字段
            backMoneyEdit:{
                apId:this.$store.state.domain.domain.domain.apId,
                name:'',
                ruleType:'',
                commissionMoney:'',
                status:'',
                agentLevel:'',
                symbolType:'',
                disableEdit: false
            },
            // 品种列表
            symbolTypeList:[],

            fields:{
                agentLevel:{
                    info:{
                        prop:'agentLevel',
                        label:'等级',
                        sortable:false
                    },
                    style:{
                        width:'150',
                        align:'center'
                    }
                },
                ruleType:{
                    info:{
                        prop:'ruleType',
                        label:'返佣标准',
                        sortable:false
                    },
                    filter:{
                        list:[
                            {
                                text:'极差返佣',
                                value:1
                            },
                            {
                                text:'固定返佣',
                                value:2
                            }
                        ],
                        multiple:true
                    },
                    style:{
                        width:'150',
                        align:'center'
                    }
                },
                status:{
                    info:{
                        prop:'status',
                        label:'状态',
                        sortable:false
                    },
                    filter:{
                        list:[
                            {
                                text:'启用',
                                value:true
                            },
                            {
                                text:'禁用',
                                value:false
                            }
                        ],
                        multiple:false
                    },
                    style:{
                        width:'150',
                        align:'center'
                    }
                },
            },
            levelList:[
                {
                    value:1,
                    label:'1级'
                },
                {
                    value:2,
                    label:'2级'
                },
                {
                    value:3,
                    label:'3级'
                },
                {
                    value:4,
                    label:'4级'
                },
                {
                    value:5,
                    label:'5级'
                }
            ],
            optionsRuleType:[
                {
                    value: '',
                    label:'全部',
                },
                {
                    value:1,
                    label:'每手/固定',
                },
                {
                    value:2,
                    label:'极差返佣'
                }
            ],

            // 搜索字段
            searchForm: {
                page:1,
                pageSize:10,
                symbolType:'',
                ruleType:'',
            },
            // 填写规则
            backMoneySet_rules: {
                name: [{
                    required: true,
                    message: '请输入用户名',
                    trigger:'blur'
                }],
                ruleType:[{
                    required: true,
                    type:"number",
                    message:'请选择返佣标准',
                    trigger:'blur'
                }],
                commissionMoney:[{
                    type:"number",
                    required: true,
                    message:'请输入金额',
                    trigger:'blur'
                }],
                agentLevel:[{
                    required: true,
                    message:'请选择等级',
                    type:"number",
                    trigger:'blur'
                }],
                symbolType:[{
                    required: true,
                    message:'请选择交易种类',
                    trigger:'blur'
                }]
            },

            tableData: [],

            // 自动生成规则命名字段
            ruleT: '',
            agentL: '',
            symbolT: '',
            commM: ''

        }
    },

    watch:{
        'addBackMoneyOR.ruleType':  function(val) {
            var ruleT;
            (val === 1)?ruleT="每手/固定":ruleT="极差返佣";
            this.ruleT = ruleT;
            this.addRulesName();
        },
        'addBackMoneyOR.commissionMoney':  function(val) {
            this.commM = val;
            this.addRulesName();
        },
        'addBackMoneyOR.agentLevel':  function(val) {
            var agentL;
            switch(val){
                case 1: agentL='1级'; break;
                case 2: agentL='2级'; break;
                case 3: agentL='3级'; break;
                case 4: agentL='4级'; break;
                case 5: agentL='5级'; break;
            }
            this.agentL = agentL;
            this.addRulesName();
        },
        'addBackMoneyOR.symbolType':  function(val) {
            this.symbolT = val;
            this.addRulesName();
        }
    },
    methods: {
        // 生成默认添加规则名称
        addRulesName(){
            var self = this;
            self.addBackMoneyOR.name = self.agentL + " " + self.ruleT + "-" + self.symbolT + " " + self.commM;
        },

        // 初始化添加规则弹框数据
        resetAddRulesData(){
            this.addBackMoneyOR = {
                apId:this.$store.state.domain.domain.domain.apId,
                name:'',
                ruleType:'',
                commissionMoney:'',
                status:true,
                agentLevel:'',
                symbolType:''
            };
        },

        //  点开添加规则弹框和规则添加确定请求
        addCommissionRules(){
            this.addORSetShow = true;
            this.resetAddRulesData();
        },
        backMoneyAdd(ref){
            const self = this;
            self.$refs[ref].validate((valid)=>{
                if(valid){
                    this.$ajax({
                        method:'post',
                        url:'/comsRule/add',
                        data:self.addBackMoneyOR,
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            self.$message({
                                type:'info',
                                showClose:true,
                                message:'添加成功'
                            });
                            self.addORSetShow = false;
                            self.searchBackMoneySet();
                        }else{
                            self.$message({
                                type:'waring',
                                showClose:true,
                                message:'添加失败'
                            });
                            self.addORSetShow = false;
                        }
                    }).catch(function (err) {
                        // console.log(err);
                        self.$message({
                            type:'error',
                            showClose:true,
                            message:'网络错误'
                        })
                    })
                }else{
                    return false;
                }
            });
            self.resetAddRulesData();
        },
        // 规则删除
        backMoneyDel(row){
            const self = this;
            this.$confirm('您确定要删除'+row.name+'佣金规则吗?','删除规则',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(()=>{
                self.$ajax({
                    method: 'post',
                    data: {ruleId :row._id},
                    url: '/comsRule/delete',
                }).then(function (res) {
                    if(res.data.retCode==0){
                        self.$message({
                            type:'info',
                            showClose:true,
                            message:'删除成功'
                        });
                        self.editORSetShow = false;
                        self.searchBackMoneySet();
                    }else{
                        self.$message({
                            type:'warning',
                            showClose:true,
                            message:'删除失败'
                        });
                        self.editORSetShow = false;
                    }
                }).catch(function (err) {
                    console.log(err);
                    self.$message({
                        type:'error',
                        showClose:true,
                        message:'网络错误'
                    })
                })
            })
        },

        // 规则修改
        backMoneyModify(row){
            this.editORSetShow = true;
            this.backMoneyEdit = row;
        },
        backMoneySetEdit(ref){
            const self = this;
            self.$refs[ref].validate((valid)=>{
                if(valid){
                    self.loginLoading = true;
                    const postData = {
                        ruleId:self.backMoneyEdit._id,
                        name:self.backMoneyEdit.name.trim(),
                        commissionMoney:self.backMoneyEdit.commissionMoney.toString(),
                        status:self.backMoneyEdit.status.toString(),
                        agentLevel: self.backMoneyEdit.agentLevel.toString(),
                        symbolType: self.backMoneyEdit.symbolType,
                        ruleType: self.backMoneyEdit.ruleType.toString(),
                    };
                    // console.log(postData);
                    this.$ajax({
                        method:'post',
                        url:'/comsRule/update',
                        data:postData,
                    }).then(function (res) {
                        console.log('/comsRule/update',res);
                        if(res.data.retCode==0){
                            self.$message({
                                type:'info',
                                showClose:true,
                                message:'修改成功'
                            });
                            self.editORSetShow=false;
                            self.searchBackMoneySet();
                            self.loginLoading = false;
                        }else{
                            self.$message({
                                type:'warning',
                                showClose:true,
                                message:'修改失败'
                            });
                            self.editORSetShow=false;
                            self.loginLoading = false;
                        }
                    }).catch(function (err) {
                        self.$message({
                            type:'error',
                            showClose:true,
                            message:'网络错误'
                        });
                        self.loginLoading = false;
                        console.log('/comsRule/update',err)
                    });
                }else {
                    return false
                }
            })
        },

        // 交易种类数据
        getSymbolType(){
            const self = this;
            this.$ajax({
                method:'post',
                url:'/comsRule/type',
                data:{
                    apId:this.$store.state.domain.domain.domain.apId
                }
            }).then(function (res) {
                // console.log(res);
                if(res.data.retCode==0){
                    self.symbolTypeList.push('全部')
                    res.data.data.forEach(function (item) {
                        self.symbolTypeList.push(item)
                    })
                    // self.symbolTypeList = res.data.data;
                }
            }).catch(function (err) {
                console.log(err);
            })
        },
        // 搜索功能（当没有搜索条件就是请求所有数据）
        searchBackMoneySet(){
            const self = this;
            var postData = {};
            postData.apId = self.$store.state.domain.domain.domain.apId;
            postData.page = self.searchForm.page.toString();
            postData.pageSize = self.searchForm.pageSize.toString();
            postData.ruleType = self.searchForm.ruleType.toString();
            if(self.searchForm.symbolType === '全部'){
                postData.symbolType = '';
            }else {
                postData.symbolType = self.searchForm.symbolType;
            }
            console.log('/comsRule/query',postData);
            if(self.$store.state.domain.domain.domain.apId){
                self.$ajax({
                    method:'post',
                    url:'/comsRule/query',
                    data:postData
                }).then(function (res) {
                    if(res.data.retCode==0){
                        self.totalBackMoney = res.data.data.records;
                        self.tableData = res.data.data.data;
                        for(var i=0;i<self.tableData.length;i++){
                            if(self.tableData[i].refCount > 0){
                                self.tableData[i].disableEdit = true;
                            }else {
                                self.tableData[i].disableEdit = false;
                            }
                        }
                    }else{
                    }
                }).catch(function (err) {

                })
            }
        },
        // 页面显示内容格式化
        formatterRuleType(item){
            return item.ruleType==1?'固定返佣':'极差返佣';
        },
        filterRuleType(value,item){
            return item.ruleType==value;
        },
        formatterStatus(item){
            return item.status==true?'启用':'禁用';
        },
        filterStatus(value,item){
            return item.status==value;
        },
        // 数据分页
        handleSizeChange(val){
            this.searchForm.pageSize = val;
            this.searchBackMoneySet();
        },
        currentChangeBackMoney(val){
            this.searchForm.page = val;
            this.searchBackMoneySet();
        },
        // 关闭弹窗
        cancelBackMoney(){
            this.addORSetShow=false;
            this.editORSetShow=false;
            this.resetAddRulesData();
        },
    },
    created(){
        this.getSymbolType();
        this.searchBackMoneySet();
    }
}
