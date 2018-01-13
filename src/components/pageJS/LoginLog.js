/**
 * Created by Udea-Manager on 2017/12/18.
 */
export default {
    data(){
        return{
            logSearchForm: {
                userName: '',
                typeRole: 'admin',
                logType: '1',
                startTime: new Date(),
                endTime: new Date(),
                tableData:[]
            },
            logSearchFormRules:{
                startTime:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value === ''){
                                callback(new Error('请选择开始时间'));
                            }else{
                                if(this.logSearchForm.endTime === ''){
                                    callback(new Error('请选择结束时间'))
                                }else{
                                    callback()
                                }
                            }
                        }
                    }
                ],
                endTime:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value === ''){
                                callback(new Error('请选择结束时间'))
                            }else{
                                if(this.logSearchForm.startTime === ''){
                                    callback(new Error('请选择开始时间'))
                                }else{
                                    if(this.logSearchForm.startTime>value){
                                        callback(new Error('开始时间不能大于结束时间'))
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            dateSelect: [
                {
                    value: '当天',
                    active: true
                },
                {
                    value: '昨天',
                    active: false
                },
                {
                    value: '近3天',
                    active: false
                }
            ],
            Pagination:{
                page: 1,
                pageSize: 10
            },

            // 入参
            dateTime: {
                startTime: this.moment(new Date()).format('YYYY-MM-DD 00:00'),
                endTime: this.moment((new Date()).getTime() + 3600 * 1000 * 24).format('YYYY-MM-DD 00:00')
            },
            // 显示
            // showTime: {
            //     startTime: new Date(),
            //     endTime: new Date()
            // }
        }
    },
    methods:{
        getLogData(date){
            let self = this;
            const query = {
                apId: self.$store.state.domain.domain.domain.apId,
                role: self.logSearchForm.typeRole,
                level: self.logSearchForm.logType,
                startTime: date.startTime,
                endTime: date.endTime
            };
            if(self.logSearchForm.userName.trim()){
                query.IDName = self.logSearchForm.userName.trim();
            }
            const pageModel = {
                page: self.Pagination.page,
                pageSize: self.Pagination.pageSize
            };
            const postData = {
                query: query,
                pageModel: pageModel
            };
            console.log("/log/record postData",postData);

            self.$ajax({
                method: 'post',
                data: postData,
                url: '/log/record'
            }).then(function (res) {
                if(res.data.retCode === 0){
                    console.log(res.data.data.rows);
                    self.logSearchForm.tableData = res.data.data.rows;
                    self.logSearchForm.tableData.totalCountApply = res.data.data.total;
                }else {
                    self.$message({
                        type: 'error',
                        message: '请求错误'
                    })
                }
            }).catch(function (err) {
                self.$message({
                    type: 'error',
                    message: '网络错误'
                })
            })
            // end
        },
        listSearch(ref){
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    const endTime = self.logSearchForm.endTime;
                    endTime.setTime(self.logSearchForm.endTime.getTime() + 3600 * 1000 * 24);
                    const dateTime = {
                        startTime: this.moment(self.logSearchForm.startTime).format('YYYY-MM-DD 00:00'),
                        endTime: this.moment(endTime).format('YYYY-MM-DD 00:00'),
                    };
                    self.dateSelect.forEach(function (val) {
                        val.active = false
                    });
                    self.Pagination.page = 1;
                    self.getLogData(dateTime);
                    self.logSearchForm.endTime.setTime(self.logSearchForm.endTime.getTime() - 3600 * 1000 * 24);
                }else {
                    return false
                }
            })
        },

        // 入参设置时间
        setTime(val) {
            const self = this;
            // 当天
            if(val === 1){
                const date = new Date();
                self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD 00:00');
                date.setTime(date.getTime() + 3600 * 1000 * 24 * val);
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD 00:00');
            }
            // 昨天
            if(val === 2){
                const date = new Date();
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD 00:00');
                date.setTime(date.getTime() - 3600 * 1000 * 24 * (val-1));
                self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD 00:00');
            }
            // 近3天
            if(val === 3){
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24);
                self.dateTime.endTime = this.moment(date).format('YYYY-MM-DD 00:00');
                date.setTime(date.getTime() - 3600 * 1000 * 24 * val);
                self.dateTime.startTime = this.moment(date).format('YYYY-MM-DD 00:00');

            }
        },
        // 显示设置时间
        showTime(val){
            const self = this;
            // 当天
            if(val === 1 ){
                const date = new Date();
                self.logSearchForm.endTime = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * (val-1));
                self.logSearchForm.startTime = date;
            }
            // 昨天
            if(val === 2){
                const date = new Date();
                val = val-1;
                date.setTime(date.getTime() - 3600 * 1000 * 24 * val);
                self.logSearchForm.endTime = date;
                self.logSearchForm.startTime = date;
            }
            // 近3天
            if(val === 3) {
                const date = new Date();
                self.logSearchForm.endTime = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * (val-1));
                self.logSearchForm.startTime = date;
            }
        },

        getDateData(item){
            const self = this;
            this.dateSelect.forEach(function (val) {
                if(val.value === item.value){
                    val.active = true
                }else {
                    val.active = false
                }
            });
            if(item.value === '当天'){
                self.setTime(1);
                self.showTime(1);
            }else if(item.value === '昨天'){
                self.setTime(2);
                self.showTime(2);
            }else if(item.value === '近3天') {
                self.setTime(3);
                self.showTime(3);
            }
            console.log('startTime,endTime');
            console.log(self.dateTime.startTime,self.dateTime.endTime);
            this.getLogData(self.dateTime);
        },
        currentChange(val){
            this.logSearchForm.page = val;
            this.getLogData()
        },
        SizeChange(val){
            this.logSearchForm.pageSize = val;
            this.getLogData()
        },
    },
    mounted(){
        this.getLogData(this.dateTime)
    }
}
