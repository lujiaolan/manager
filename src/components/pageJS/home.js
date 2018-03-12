import Schart from 'vue-schart';
import echarts from "echarts"
export default {
    components: {
        Schart
    },
    data: function () {
        return {
            dayAmount: [],
            dataAmount:[],
            Backlog: [],
            cityTotalInfo:[],
            data1:[
                {name:'2012',value:1141},
                {name:'2013',value:1499},
                {name:'2014',value:2260},
                {name:'2015',value:1170},
                {name:'2016',value:970},
                {name:'2017',value:1450}
            ],
            options1: {
                title: '某商店近年营业总额',
                bgColor: '#829dda',
                titleColor: '#ffffff',
                fillColor: '#72f6ff',
                axisColor: '#eeeeee',
                contentColor: '#bbbbbb'
            },

        }
    },
    methods:{
        getBacklogData(){
            const self = this;
            self.$ajax({
                method:'get',
                url:'/statistics/item/ap/' + self.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                // console.log('/statistics/item/ap/ res');
                // console.log(res);
                if(res.data.retCode == 0){
                    self.Backlog = res.data.data;
                    if(!self.Backlog.commissionAmount){
                        self.Backlog.commissionAmount = 0;
                    }
                    if(!self.Backlog.minusAmount){
                        self.Backlog.minusAmount = 0;
                    }
                    if(!self.Backlog.userInfoAmount){
                        self.Backlog.userInfoAmount = 0;
                    }
                    if(!self.Backlog.userBankCardAmount){
                        self.Backlog.userBankCardAmount = 0;
                    }
                    if(!self.Backlog.leverageAmount){
                        self.Backlog.leverageAmount = 0;
                    }
                }else {
                    self.$message.error(res.data.message)
                }
            }).catch(function (err) {
                self.$message.error(err.data.errMsg)
            });
        },
        getDayAmountData(){
            const self = this;
            const postData = {
                apId: self.$store.state.domain.domain.domain.apId,
            };
            console.log('/statistics/all/ap postData');
            // console.log(postData);
            self.$ajax({
                method:'post',
                data: postData,
                url:'/statistics/all/ap'
            }).then(function (res) {
                // console.log(res);
                if(res.data.retCode == 0){
                    self.dayAmount = res.data.data;
                    if(!self.dayAmount.crmAmount){
                        self.dayAmount.crmAmount = 0;
                    }
                    if(!self.dayAmount.transAccount){
                        self.dayAmount.transAccount = 0;
                    }
                    if(!self.dayAmount.mt4Amount){
                        self.dayAmount.mt4Amount = 0;
                    }
                    if(!self.dayAmount.plusAmount){
                        self.dayAmount.plusAmount = self.accounting.formatMoney(0,'',2,',','.');
                    }else {
                        self.dayAmount.plusAmount = self.accounting.formatMoney(self.dayAmount.plusAmount,'',2,',','.');
                    }
                    if(!self.dayAmount.minusAmount){
                        self.dayAmount.minusAmount = self.accounting.formatMoney(0,'',2,',','.');
                    }else {
                        self.dayAmount.minusAmount = self.accounting.formatMoney(self.dayAmount.minusAmount,'',2,',','.');
                    }
                }else {
                    self.$message.error(res.data.message)
                }

            }).catch(function (err) {
                self.$message.error(err.data.errMsg)
            })
        },
        getDataAmountData(){
            const self = this;
            self.$ajax({
                method:'get',
                url:'/statistics/total/ap/' + self.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                // console.log(res);
                if(res.data.retCode == 0){
                    console.log(res.data.data);
                    self.dataAmount = res.data.data;
                    self.dataAmount.minusAmount = self.accounting.formatMoney(self.dataAmount.minusAmount);
                    self.dataAmount.plusAmount = self.accounting.formatMoney(self.dataAmount.plusAmount);
                    self.dataAmount.profitAmount = self.accounting.formatMoney(self.dataAmount.profitAmount);
                }else {
                    self.$message.error(res.data.message)
                }

            }).catch(function (err) {
                self.$message.error(err.data.errMsg)
            })
        },
        getCityTotalInfo(){
            const apId = this.$store.state.domain.domain.domain.apId;
            const self = this;
           if(apId){
               this.$ajax({
                   method:'get',
                   url:'/statistics/ap/'+apId+'/1/customerSource'
               }).then(function (res) {
                   if (res.data.retCode==0){
                       console.log('cityTotalInfo')
                       console.log(res)
                       let cityList = [];
                       res.data.data.content.forEach(function (item) {
                           let cityName = ''
                           if(item._id==null){
                               cityName = '其他';
                           }else{
                               cityName = item._id;
                           }
                           const city = {
                               value:item.count,
                               name:cityName
                           };
                           cityList.push(city)
                       });
                       console.log('cityList')
                       console.log(cityList)
                       self.cityTotalInfo = cityList;

                       var myChart = echarts.init(document.getElementById('main'));
                       myChart.setOption({
                           title : {
                               // text: '南丁格尔玫瑰图',
                               // subtext: '纯属虚构',
                               x:'center'
                           },
                           tooltip : {
                               trigger: 'item',
                               formatter: "{a} <br/>{b} : {c} ({d}%)"
                           },
                           legend: {
                               x : 'center',
                               y : 'bottom',
                               // data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
                           },
                           toolbox: {
                               show : true,
                               feature : {
                                   mark : {show: true},
                                   dataView : {show: false, readOnly: false},
                                   magicType : {
                                       show: true,
                                       type: ['pie']
                                   },
                                   restore : {show: false},
                                   saveAsImage : {show: false}
                               }
                           },
                           calculable : true,
                           series : [
                               {
                                   name:'客户来源',
                                   type:'pie',
                                   // radius : [30, 110],
                                   center : ['65%', '51%'],
                                   roseType : 'area',
                                   data:self.cityTotalInfo
                               }
                           ]
                       });
                   }else{

                   }
               }).catch(function (err) {

               })
           }
        },
    },
    created(){
        this.getBacklogData();
        this.getDayAmountData();
        this.getDataAmountData();
        this.getCityTotalInfo();
    },
    mounted(){
        const self = this;
        console.log('self.cityTotalInfo')
        console.log(self.cityTotalInfo)

    }
}
