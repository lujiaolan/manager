import ajax from "../../utils/ajax/ajax";

export default {
    data(){
        return{
            MT4Set: 'first',
            changeGroupVisible: false,
            Mt4ListForm: [
                {
                    MT4GroupType: 'MT4分组',
                    groupName: '',
                    updateTime: '',
                    changeVisible: false,
                },
                {
                    MT4GroupType: '默认分组',
                    groupName: '',
                    updateTime: '',
                    changeVisible: true,
                }
            ],
            symbolListForm:[],
            changeGroupFrom:{
                name: '',
                group: ''
            },
            changeGroupFromRules: {
                group: [{
                    required: true,
                    trigger: 'blur',
                    message: '请选择组别'
                }]
            },
            groupFrom:[]
        }
    },
    methods:{
        // 获取默认分组数据
        getDefaultGroup(){
            const self = this;
            this.$ajax({
                method: 'get',
                url: '/ap/group/default/' + this.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                console.log('同步默认分组数据');
                console.log(res);
                if(res.data.retCode === 0){
                    self.Mt4ListForm[1].groupName = res.data.data;
                }else {
                    self.$message.success('同步默认组没有成功');
                }
            })
        },
        // 获取MT4组别的数据
        getGroupData(){
            const self = this;
            this.$ajax({
                method: 'get',
                url: '/ap/group/' + this.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                console.log('获取组别数据');
                console.log(res);
                if(res.data.retCode === 0){
                    let val = '';
                    let groupObj = {};
                    res.data.data.forEach(function (item) {
                        val = val + item + "、";
                        groupObj = {
                            label : item
                        };
                        self.groupFrom.push(groupObj);
                    });
                    self.Mt4ListForm[0].groupName = val;
                    self.getDefaultGroup();
                    console.log(self.Mt4ListForm[0].groupName);
                }else {
                    self.$message.error('获取组别数据失败');
                }
            });
        },
        // 同步MT4组别数据
        syncGroupData(){
            console.log('同步mt4组别数据');
            const self = this;
            self.$ajax({
                method:'get',
                url:'/ap/group/sync/' + self.$store.state.domain.domain.domain.apId,
            }).then(function (res) {
                if(res.data.retCode == 0) {
                    self.$message.success('同步MT4组别数据成功');
                    self.getGroupData();
                }else {
                    self.$message.error('同步组没有成功');
                }
            }).catch(function () {
                self.$message.error('网络报错');
            })
        },
        // 修改默认组
        changeGroup(row){
            this.changeGroupFrom.name = row.groupName;
            this.changeGroupVisible = true
        },
        changeGroupConfirm(ref){
            console.log('ref');
            console.log(ref);
            const self = this;
            const postData = {
                apId: this.$store.state.domain.domain.domain.apId,
                groupName: this.changeGroupFrom.group
            };

            this.$refs[ref].validate((valid) => {
                if(valid){
                    console.log('/ap/group/default postData');
                    console.log(postData);
                    this.$ajax({
                        method: 'post',
                        data: postData,
                        url: '/ap/group/default'
                    }).then(function (res) {
                        if(res.data.retCode === 0){
                            console.log(res);
                            self.getDefaultGroup();
                        }else {
                            self.$message.success('修改默认组失败')
                        }
                    })
                }
            });
            self.changeGroupVisible = false
        },

        // 同步按钮的事件
        syncSymbolListData(){
            const self = this;
            const postData = {
                apId: this.$store.state.domain.domain.domain.apId
            };
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/comsRule/syncSymbolType'
            }).then(function (res) {
                if(res.data.retCode === 0){
                    self.$message.success('同步交易品种组别数据成功');
                    self.getSymbolListData();
                }else {
                    self.$message.error('同步交易品种报错');
                }
            }).catch(function () {
                self.$message.error('网络报错')
            });
        },

        // 获取交易类型和交易品种的数据
        getSymbolListData(){
            const self = this;
            self.$ajax({
                method: 'get',
                url: '/comsRule/typeAndVar/' + self.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                console.log('/comsRule/typeAndVar/apId res');
                console.log(res);
                if(res.data.retCode === 0){
                    if(res.data.data.data === ''){
                        self.$message({
                            message: "没有交易种类和交易品种",
                            type: 'info'
                        });
                    }else {
                        const symbolArr = [];
                        for (let key in res.data.data.data){
                            let value = '';
                            let obj = {};
                            res.data.data.data[key].forEach(function (val) {
                                value = value + val + ',';
                                obj.type = key;
                            });
                            obj.symbolVariety = value;
                            obj.time = res.data.data.time;
                            symbolArr.push(obj);
                        }
                        self.symbolListForm = symbolArr;
                    }
                }else {
                    self.$message.error(res.data.data.errMsg)
                }
            }).catch(function (err) {
            })
        },

        changeTab(val){
            console.log(val.name);
            if(val.name === 'second'){
                this.getSymbolListData();
            }else {
                this.getGroupData();
            }
        }
    },
    mounted(){
        this.getGroupData();
    }
}
