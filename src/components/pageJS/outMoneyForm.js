/**
 * Created by Udea-Manager on 2017/10/26.
 */
import $ from 'jquery';
export default {
    data(){
        return {
            widthDraw:this.$store.state.drawMoney.widthDraw,
            withdrawEditOrAdd:'',
            realStatusDisabled:false,
            outMoneyForm:{
                apId:this.$store.state.domain.domain.domain.apId,
                outMoneyRemindSet:{
                    phone:'',
                    email:''
                },
                withdrawRealTimeRate:null, //入金实时汇率 double
                withdrawRateAdjust:null,// double
                withdrawFixedRate:null,// double
                withdrawAdjustAmount:null,//double
                withdrawMax:null, //double
                withdrawMin:null, //double
                withdrawVerifyStatus:0, //int
                withdrawDebitStatus:0, //int
                 outMoneyRemind:{
                    remindType:'2',
                     remindWay:''
                },
                outMoneyOntimeExRate:'',
                outMoneyExRateReset:{
                    resetType:'+',
                    resetNum:''
                },
                type:1
            },
            optionsAR:[{
                value:'+',
                label:'加'
            },{
                value:'-',
                label:'减'
            }],
            optionsTE:[{
                value:'1',
                label:'手机'
            },{
                value:'2',
                label:'邮箱'
            }],
            typeOutSelect:{
                resetNumColor:{
                    display:'block'
                },
                resetMoneyColor:{
                    display:'none'
                }
            },
            typeOutList:[
                {
                    value:1,
                    label:'调整汇率'
                },
                {
                    value:2,
                    label:'固定汇率'
                }
            ],
            outMoneyForm_rules:{
                "outMoneyExRateReset.resetNum":[{
                    validator:(rules,value,callback) =>{
                        if(value == null||value==''){
                            if(this.outMoneyForm.type===1){
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

                'outMoneyRemind.remindWay':[{
                    required:false,
                    trigger:'blur',
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback()
                        }else{
                            if(this.outMoneyForm.outMoneyRemind.remindType=='2'){
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
                withdrawMin:[{
                    required:false,
                    trigger:'blur',
                    validator:(rules,value,callback) =>{
                        if(value==null||value==''){
                            callback()
                        }else{
                            if(typeof value!=='number'){
                                callback(new Error('输入的必须是数字'))
                            }else{
                              if(this.outMoneyForm.withdrawMax<value){
                                  callback(new Error('设置出金最低不能大于出金最高'))
                              }else{
                                  callback()
                              }
                            }
                        }
                    }
                }],
                withdrawMax:[{
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
                withdrawReplaceRate:[{
                    required:false,
                    trigger:'blur',
                    validator:(rules,value,callback) =>{
                        if(value == null||value==''){
                            if(this.outMoneyForm.type===1){
                                callback(new Error('请输入金额'))
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
                    }
                }],
            }
        }

    },
    watch:{
        'outMoneyForm.type':function (val) {
            console.log(val)
            if(val===2){
                this.typeOutSelect.resetMoneyColor.display='block';
                this.typeOutSelect.resetNumColor.display='none';
            }else{
                this.typeOutSelect.resetMoneyColor.display='none';
                this.typeOutSelect.resetNumColor.display='block';
            }
        },
        'outMoneyForm.outMoneyRemind.remindType':function (val) {
            console.log(val)
            if(val==1){
                this.outMoneyForm.outMoneyRemind.remindWay =  this.outMoneyForm.outMoneyRemindSet.phone;
            }else{
                this.outMoneyForm.outMoneyRemind.remindWay =  this.outMoneyForm.outMoneyRemindSet.email;
            }
        }
    },
    methods:{
        saveOutMoneySet(ref){
            console.log(this.outMoneyForm);
           this.$refs[ref].validate((valid)=>{
               if(valid){
                   let phone = '';
                   let email = '';
                   if (this.outMoneyForm.outMoneyRemind.remindType=='2'){
                       email = this.outMoneyForm.outMoneyRemind.remindWay;
                   }else{
                       phone = this.outMoneyForm.outMoneyRemind.remindWay;
                   }
                   if(this.outMoneyForm.withdrawFixedRate==''){
                       this.outMoneyForm.withdrawFixedRate = null;
                   }
                   if(this.outMoneyForm.withdrawMin==''){
                       this.outMoneyForm.withdrawMin = null;
                   }
                   if(this.outMoneyForm.withdrawMax==''){
                       this.outMoneyForm.withdrawMax = null;
                   }

                   if(this.outMoneyForm.outMoneyExRateReset.resetType=='+'&&this.outMoneyForm.outMoneyExRateReset.resetNum){
                       this.outMoneyForm.withdrawRateAdjust =
                           parseFloat ((this.outMoneyForm.withdrawRealTimeRate+this.outMoneyForm.outMoneyExRateReset.resetNum).toFixed(2));
                       this.outMoneyForm.withdrawAdjustAmount = parseFloat('+'+this.outMoneyForm.outMoneyExRateReset.resetNum);
                   }else if (this.outMoneyForm.outMoneyExRateReset.resetType=='-'&&this.outMoneyForm.outMoneyExRateReset.resetNum){
                       this.outMoneyForm.withdrawRateAdjust =
                           parseFloat((this.outMoneyForm.withdrawRealTimeRate-this.outMoneyForm.outMoneyExRateReset.resetNum).toFixed(2));
                       this.outMoneyForm.withdrawAdjustAmount = parseFloat('-'+this.outMoneyForm.outMoneyExRateReset.resetNum);
                   }else{
                       this.outMoneyForm.withdrawAdjustAmount = null;
                   }
                   let withdrawRateAdjust = null;
                   if(this.outMoneyForm.withdrawRealTimeRate==null||this.outMoneyForm.withdrawRealTimeRate==undefined||this.outMoneyForm.withdrawRealTimeRate==''){
                       withdrawRateAdjust = null;
                   }else{
                       withdrawRateAdjust =this.outMoneyForm.withdrawRateAdjust;
                   }
                   const postData = {
                       apId:this.outMoneyForm.apId,
                       withdrawRealTimeRate:this.outMoneyForm.withdrawRealTimeRate,
                       withdrawRateAdjust:withdrawRateAdjust,
                       withdrawFixedRate:this.outMoneyForm.withdrawFixedRate,
                       withdrawReplaceRate:this.outMoneyForm.withdrawReplaceRate,
                       withdrawMax:this.outMoneyForm.withdrawMax,
                       type:this.outMoneyForm.type,
                       withdrawAdjustAmount:this.outMoneyForm.withdrawAdjustAmount,
                       withdrawMin:this.outMoneyForm.withdrawMin,
                       withdrawVerifyStatus:this.outMoneyForm.withdrawVerifyStatus,
                       withdrawDebitStatus:this.outMoneyForm.withdrawDebitStatus,
                       withdrawNotice: {
                           email:email,
                           phone:phone
                       }
                   };
                   console.log(postData)
                   const self = this;
                   this.$ajax({
                       method:'post',
                       url:'/withdraw/add',
                       data:postData
                   }).then(function (res) {
                       console.log('withdraw')
                       console.log(res)
                       if(res.data.retCode==0){
                           self.$message({
                               message:'编辑成功',
                               showClose:true,
                               type:'info'
                           });
                           if(postData.type===1) {
                               self.widthDraw.outMoneyFlag = false;
                           }else{
                               self.widthDraw.outMoneyFlag = true;
                           }
                           self.$store.dispatch('update_withDraw',{
                               outMoneyFlag:self.widthDraw.outMoneyFlag,
                           })
                           self.getWithdrawConfig();
                           self.getWithdrawRealTimeRate();
                       }else{
                           self.$message({
                               message:'编辑失败',
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
               }else{
                   return false;
               }
           })
        },
        getWithdrawConfig(){
            const apID = this.$store.state.domain.domain.domain.apId;
            const self = this;
            console.log('this.$store.state.drawMoney.drawMoney.outMoneyFlag')
            console.log(this.$store.state.drawMoney.widthDraw.outMoneyFlag);
            if(this.$store.state.drawMoney.widthDraw.outMoneyFlag){
                this.typeOutSelect.resetMoneyColor.display='block';
                this.typeOutSelect.resetNumColor.display='none';
                this.outMoneyForm.type = 2;
            }else{
                this.typeOutSelect.resetMoneyColor.display='none';
                this.typeOutSelect.resetNumColor.display='block';

                this.outMoneyForm.type = 1;
            }
            this.$ajax({
                url:'/'+apID+'/2/financialRule',
                method:'get'
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log(res)
                    let widthConfig = res.data.data.withdrawConfig;
                    if(res.data.data.withdrawConfig){
                        self.withdrawEditOrAdd = '修改';
                        self.outMoneyForm.withdrawMax=widthConfig.withdrawMax;
                        self.outMoneyForm.withdrawMin=widthConfig.withdrawMin;
                        self.outMoneyForm.withdrawReplaceRate=widthConfig.withdrawReplaceRate;
                        self.outMoneyForm.withdrawFixedRate=widthConfig.withdrawFixedRate;
                        self.outMoneyForm.withdrawVerifyStatus=  widthConfig.withdrawVerifyStatus;
                        self.outMoneyForm.withdrawDebitStatus=  widthConfig.withdrawDebitStatus;
                        console.log('widthConfig.withdrawAdjustAmount')
                        console.log( typeof  widthConfig.withdrawAdjustAmount)
                        if(widthConfig.withdrawNotice.email==''&&widthConfig.withdrawNotice.phone){
                            self.outMoneyForm.outMoneyRemind.remindType='1';
                            self.outMoneyForm.outMoneyRemind.remindWay=widthConfig.withdrawNotice.phone;
                            self.outMoneyForm.outMoneyRemindSet.phone=widthConfig.withdrawNotice.phone;
                        }else if(widthConfig.withdrawNotice.email&&widthConfig.withdrawNotice.phone==''){
                            self.outMoneyForm.outMoneyRemind.remindType='2';
                            self.outMoneyForm.outMoneyRemind.remindWay=widthConfig.withdrawNotice.email;
                            self.outMoneyForm.outMoneyRemindSet.email=widthConfig.withdrawNotice.email;
                        }else{
                            self.outMoneyForm.outMoneyRemind.remindType='2';
                            self.outMoneyForm.outMoneyRemind.remindWay=widthConfig.withdrawNotice.email;
                            self.outMoneyForm.outMoneyRemindSet.email=widthConfig.withdrawNotice.email;
                        }

                        if(widthConfig.withdrawAdjustAmount){
                            if (/^-/.test(widthConfig.withdrawAdjustAmount)) {
                                console.log('哈哈好吧')
                                self.outMoneyForm.outMoneyExRateReset.resetType = '-';
                                self.outMoneyForm.outMoneyExRateReset.resetNum = -widthConfig.withdrawAdjustAmount

                            }else{
                                console.log('lll')
                                self.outMoneyForm.outMoneyExRateReset.resetType = '+';
                                self.outMoneyForm.outMoneyExRateReset.resetNum = widthConfig.withdrawAdjustAmount
                            }
                        }else if(widthConfig.withdrawAdjustAmount==0||widthConfig.withdrawAdjustAmount==null){
                            self.outMoneyForm.outMoneyExRateReset.resetType = '+';
                            self.outMoneyForm.outMoneyExRateReset.resetNum = 0;
                        }
                        else {
                            self.outMoneyForm.outMoneyExRateReset.resetType = '+';
                            self.outMoneyForm.outMoneyExRateReset.resetNum = null;
                        }

                    }
                }
            }).catch(function (err) {

            })
        },
        getWithdrawRealTimeRate(){
            const self = this;
            $.get("http://proxy.udea.tech/index/GetHl/getcjhl.html", {
                dataType: 'JSONP',//here
            }, function (data) {
                // alert(data)
                self.outMoneyForm.withdrawRealTimeRate = parseFloat(data);
            })
        },
    },
    created(){
        this.getWithdrawRealTimeRate();
        this.getWithdrawConfig();
    }
}
