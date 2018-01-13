/**
 * Created by Udea-Manager on 2017/10/26.
 */
import innerTurnForm from '../page/innerTurnForm.vue';
import outMoneyForm from '../page/outMoneyForm.vue';
import $ from 'jquery';
export default{
    components:{
        innerTurnForm,
        outMoneyForm

    },
    data(){
        return{
            defaultMoney:'',
            realTimeRateStatusDisabled:false,
            depositeditOrAdd:'',
            activeNameSet:'first',
            optionsAR:[{
                value:'+',
                label:'加'
            },{
                value:'-',
                label:'减'
            }],
            optionsDraw:[{
                value:'1',
                label:'手机'
            },{
                value:'2',
                label:'邮箱'
            }],
            typeSelect:{
                resetNumColor:{
                    display:'none'
                },
                resetMoneyColor:{
                    display:'block'
                },
            },
            inMoneyForm:{
                depositNoticeSet:{
                    email:'',
                    phone:''
                },
                apId:this.$store.state.domain.domain.domain.apId,
                depositAdjustAmount:null, //入金调整金额数值(加,减) double
                depositReplaceRate:null,  // 实时汇率获取失败后替代值 double
                depositRealTimeRate:null, //入金实时汇率
                depositRateAdjust:null, // 入金汇率调整后的值
                depositFixedRate:null, //入金固定汇率
                depositMax:null,
                depositMin:null,
                depositNotice:{
                    remindType:'2',
                    remindWay:''
                },
                inMoneyExRateReset:{
                    resetType:'+',
                    resetNum:''
                },
                type:1
            },
            typeList:[
                {
                    value:1,
                    label:'调整汇率'
                },
                {
                    value:2,
                    label:'固定汇率'
                }
            ]

            ,
            inMoneyForm_rules:{
                "inMoneyExRateReset.resetNum":[{
                    required:false,
                    validator:(rules,value,callback) =>{
                        if(value == null||value==''){
                            if(this.inMoneyForm.type===1){
                                callback()
                            }else{
                                callback()
                            }
                        }else{
                            if(typeof value!=='number'){
                                callback(new Error('输入的必须是数字'))
                            }else{
                                callback()
                            }
                        }
                    },
                    trigger:'blur'
                }],
                depositReplaceRate:[{
                    required:false,
                    validator:(rules,value,callback) =>{
                        if(value ==null||value==''){
                           if(this.inMoneyForm.type===1){
                               callback(new Error('请输入失败时要取的汇率'))
                           }else{
                               callback()
                           }
                        }else{
                            if(typeof value!=='number'){
                                callback(new Error('输入的必须是数字'))
                            }else{
                                callback()
                            }
                        }
                    },
                    trigger:'blur'
                }],
                'depositNotice.remindWay':[{
                    required:false,
                    trigger:'blur',
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback()
                        }else{
                            if(this.inMoneyForm.depositNotice.remindType=='2'){
                                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                    callback();
                                }else{
                                    callback(new Error('请输入有效的邮箱'))
                                }
                            }else{
                                if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入正确的手机号'))
                                }
                            }
                        }
                    }
                }],
                depositMin:[{
                    required:false,
                    trigger:'blur',
                    validator:(rules,value,callback) =>{
                        if(value==null||value==''){
                            callback()
                        }else{
                            if(typeof value!=='number'){
                                callback(new Error('输入的必须是数字'))
                            }else{
                                if(this.inMoneyForm.depositMax<value){
                                    callback(new Error('设置入金最低不能高于入金最低'))
                                }else {
                                    callback()
                                }
                            }
                        }
                    }
                }],
                depositMax:[{
                    required:false,
                    trigger:'blur',
                    validator:(rules,value,callback) =>{
                        if(value==null||value==''){
                            callback()
                        }else{
                            if(typeof value!=='number'){
                                callback(new Error('输入的必须是数字'))
                            }else{
                              callback()
                            }
                        }
                    }
                }],
                depositFixedRate:[{
                    required:false,
                    trigger:'blur',
                    validator:(rules,value,callback) =>{
                        if(value ==null||value==''){
                            callback()
                        }else{
                            if(typeof value!=='number'){
                                callback(new Error('输入的必须是数字'))
                            }else{
                                callback()
                            }
                        }
                    }
                }],
            }
        }
    },
    watch:{
        'inMoneyForm.type':function (val) {
            console.log(val)
            if(val===2){
                this.typeSelect.resetMoneyColor.display='none';
                this.typeSelect.resetNumColor.display='block';
            }else{

                this.typeSelect.resetMoneyColor.display='block';
                this.typeSelect.resetNumColor.display='none';
            }
        },
        'inMoneyForm.depositNotice.remindType':function (val) {
            console.log(val)
            if(val==2){
                this.inMoneyForm.depositNotice.remindWay = this.inMoneyForm.depositNoticeSet.email
            }else{
                this.inMoneyForm.depositNotice.remindWay = this.inMoneyForm.depositNoticeSet.phone
            }
        }

    },
    methods:{
        saveInMoneySet(ref){
           console.log( this.inMoneyForm);
            let userPhone ='';
            let userEmail = '';
            if(this.inMoneyForm.depositReplaceRate==''){
                this.inMoneyForm.depositReplaceRate = null;
            }
           if(this.inMoneyForm.depositFixedRate==''){
               this.inMoneyForm.depositFixedRate = null;
           }
           if(this.inMoneyForm.depositMin==''){
               this.inMoneyForm.depositMin=null;
           }
           if(this.inMoneyForm.depositMax==''){
               this.inMoneyForm.depositMax = null;
           }
            if(this.inMoneyForm.inMoneyExRateReset.resetType=='+'&&this.inMoneyForm.inMoneyExRateReset.resetNum){
                this.inMoneyForm.depositRateAdjust =
                    parseFloat((this.inMoneyForm.inMoneyExRateReset.resetNum+this.inMoneyForm.depositRealTimeRate).toFixed(2));
                this.inMoneyForm.depositAdjustAmount = parseFloat(this.inMoneyForm.inMoneyExRateReset.resetNum);
            }
            else if(this.inMoneyForm.inMoneyExRateReset.resetType=='-'&&this.inMoneyForm.inMoneyExRateReset.resetNum){
                this.inMoneyForm.depositRateAdjust =
                    parseFloat ((this.inMoneyForm.depositRealTimeRate-this.inMoneyForm.inMoneyExRateReset.resetNum).toFixed(2));
                this.inMoneyForm.depositAdjustAmount = - parseFloat(this.inMoneyForm.inMoneyExRateReset.resetNum);
            }else{
                this.inMoneyForm.withdrawAdjustAmount = null;
                this.inMoneyForm.depositRateAdjust = null;
            }
            if(this.inMoneyForm.depositNotice.remindType=='2'){
                userEmail = this.inMoneyForm.depositNotice.remindWay;
            }else{
                userPhone = this.inMoneyForm.depositNotice.remindWay;
            }
            let  depositRateAdjust = null;
            if (this.inMoneyForm.depositRealTimeRate==null||this.inMoneyForm.depositRealTimeRate==undefined||this.inMoneyForm.depositRealTimeRate==''){
                depositRateAdjust = null;
            }else {
                depositRateAdjust = this.inMoneyForm.depositRateAdjust;
            }
            console.log( " this.inMoneyForm.depositRateAdjust");
            console.log( typeof this.inMoneyForm.depositRateAdjust);
           const postData = {
               apId:this.inMoneyForm.apId,
               type:this.inMoneyForm.type,
               depositReplaceRate:this.inMoneyForm.depositReplaceRate,
               depositRealTimeRate:this.inMoneyForm.depositRealTimeRate,
               depositRateAdjust:depositRateAdjust,
               depositFixedRate:this.inMoneyForm.depositFixedRate,
               depositMax:this.inMoneyForm.depositMax,
               depositMin:this.inMoneyForm.depositMin,
               depositAdjustAmount :this.inMoneyForm.depositAdjustAmount,
               depositNotice: {
                   email:userEmail,
                   phone:userPhone
               }
           };
           console.log("postData")
           console.log(postData)
            const self = this;
            this.$refs[ref].validate((valid)=>{
               if(valid){
                   self.$ajax({
                       method:'post',
                       url:'/deposit/add',
                       data:postData
                   }).then(function (res) {
                       if(res.data.retCode==0){
                           self.$message({
                               type:'info',
                               message:'编辑成功',
                               showClose:true
                           });
                           self.getdepositConfig();
                       }else{
                           self.$message({
                               type:'warning',
                               message:'编辑失败',
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
        activeClickSet(val){
            if(val.label=="入金设置"){
                this.getdepositConfig();
                this.getExchangeRate();
            }else if(val.label=="出金设置"){
                this.$refs.withdrawSet.getWithdrawConfig()
            }else{
                this.$refs.innerTransSet.getInnerTransConfig();
            }
        }
        ,
        getExchangeRate(){
            const self = this;
            $.get("http://proxy.udea.tech/index/GetHl/gethl.html", {
                dataType: 'JSONP',//here
            }, function (data) {
                // alert(data)
                self.inMoneyForm.depositRealTimeRate = parseFloat(data);
            })
        },
        getdepositConfig(){
            const apId = this.$store.state.domain.domain.domain.apId;
            const self = this;
           if(apId){
               this.$ajax({
                   method:'get',
                   url:'/'+apId+'/1/financialRule'
               }).then(function (res) {
                   if(res.data.retCode==0){
                       console.log(res);
                       console.log("resetNum");
                       let depositConfig = res.data.data.depositConfig;
                       if(res.data.data.depositConfig){
                           self.depositeditOrAdd = '修改';
                           console.log(depositConfig.depositRealTimeRate-depositConfig.depositRateAdjust);
                           self.inMoneyForm.depositMax =  depositConfig.depositMax;
                           self.inMoneyForm.depositMin =  depositConfig.depositMin;
                           self.inMoneyForm.depositFixedRate =  depositConfig.depositFixedRate;
                           self.inMoneyForm.depositRateAdjust =  depositConfig.depositRateAdjust;
                           self.inMoneyForm.depositReplaceRate =  depositConfig.depositReplaceRate;
                           if(depositConfig.depositNotice.email==''&&depositConfig.depositNotice.phone){
                               self.inMoneyForm.depositNotice.remindType = '1';
                               self.inMoneyForm.depositNotice.remindWay = depositConfig.depositNotice.phone;
                               self.inMoneyForm.depositNoticeSet.phone = depositConfig.depositNotice.phone;
                           }else if(depositConfig.depositNotice.email&&depositConfig.depositNotice.phone==''){
                               self.inMoneyForm.depositNotice.remindType = '2';
                               self.inMoneyForm.depositNotice.remindWay = depositConfig.depositNotice.email;
                               self.inMoneyForm.depositNoticeSet.email = depositConfig.depositNotice.email;
                           }else{
                               self.inMoneyForm.depositNotice.remindType = '1';
                               self.inMoneyForm.depositNotice.remindWay = depositConfig.depositNotice.email;
                               self.inMoneyForm.depositNoticeSet.email = depositConfig.depositNotice.email;
                           }
                           console.log('depositConfig.depositAdjustAmount.substring(0)')
                           console.log('depositConfig.depositAdjustAmount')
                           console.log(depositConfig.depositAdjustAmount)
                           // console.log( depositConfig.depositAdjustAmount.substr(0,1))
                           if(depositConfig.depositAdjustAmount){
                               // const reset = depositConfig.depositAdjustAmount.substr(0,1);
                               console.log('depositConfig.depositAdjustAmount')
                               console.log(depositConfig.depositAdjustAmount)

                               if (/^-/.test(depositConfig.depositAdjustAmount)) {
                                   console.log('哈哈好吧')
                                   self.inMoneyForm.inMoneyExRateReset.resetType = '-';
                                   self.inMoneyForm.inMoneyExRateReset.resetNum=-depositConfig.depositAdjustAmount


                               }else{
                                   console.log('lll')
                                   self.inMoneyForm.inMoneyExRateReset.resetType = '+';
                                   self.inMoneyForm.inMoneyExRateReset.resetNum = depositConfig.depositAdjustAmount
                               }
                           }else if(depositConfig.depositAdjustAmount==0||depositConfig.depositAdjustAmount==null){
                               console.log('depositConfig.depositAdjustAmount')
                               console.log(depositConfig.depositAdjustAmount)
                               self.inMoneyForm.inMoneyExRateReset.resetType = '+';
                               self.inMoneyForm.inMoneyExRateReset.resetNum = 0;
                           }
                           else {
                               self.inMoneyForm.inMoneyExRateReset.resetType = '+';
                               self.inMoneyForm.inMoneyExRateReset.resetNum = null;
                           }
                       }

                   }
               }).catch(function (err) {

               })
           }
        }
    },
    mounted(){
        this.getdepositConfig();
        this.getExchangeRate();
    }
}
