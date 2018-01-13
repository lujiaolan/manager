/**
 * Created by Udea-Manager on 2017/9/30.
 */
export default {
    data(){
        return {
            searchCRMList:{
                apId:this.$store.state.domain.domain.domain.apId,
                pageSize:10,
                page:1,
                userNameLike:'',
                verifyStatus:null,
                status:[1,2],
                currentPage:1,
            },
            totalCRMInfo:null,
            statesVerify:[
                {value:null,label:'全部审核状态'},
                {value:-1,label:'认证中'},
                {value:0,label:'未认证'},
                {value:1,label:'认证成功'},
                {value:2,label:'认证失败'}
                ],
            tableData:[]
        }
    },
    methods:{
        CRMSizeChange(val){
            this.searchCRMList.pageSize = val;
            this.searchCRMAudit();
        },
        currentChangeCRM(val){
            this.searchCRMList.currentPage =val;
            this.searchCRMAudit();
        },
        searchCRMAudit(){
            let searchList = [];

            const self = this;
           let CRMstatus = '';
           if(this.searchCRMList.verifyStatus===null||this.searchCRMList.verifyStatus===undefined){
               CRMstatus = [1,2,-1,0]
           }else{
               const state = this.searchCRMList.verifyStatus;
               CRMstatus = [state]
           }
           const postData = {
               apId:this.searchCRMList.apId,
               pageSize:this.searchCRMList.pageSize,
               userNameLike:this.searchCRMList.userNameLike,
               verifyStatus:CRMstatus,
               currentPage:this.searchCRMList.currentPage,
               status:this.searchCRMList.status
           };
            console.log("postData");
            console.log(postData);
           if(this.$store.state.domain.domain.domain.apId){
               this.$ajax({
                   url:'/user/userInfo/verify',
                   data:postData,
                   method:'post'
               }).then(function (res) {
                   if(res.data.retCode==0) {
                       console.log(res)
                       self.totalCRMInfo = res.data.data.totalAmount;
                       const changeContent = res.data.data.content;
                       const changeList = [];
                       let searchList = [];
                       console.log('changeContent')
                       console.log(changeContent)
                       let cart = null;
                       if(changeContent.length>0){
                           changeContent.forEach(function (item) {
                               let bankAddress = '';
                               let bankBranch = '';
                               let bankCardHeadPic = '';
                               let bankCardTailPic = '';
                               let bankCardNumbers = '';
                               let bankName = '';
                               let IDCardHeadPic = '';
                               let IDCardTailPic = '';
                               let IDNumber = '';
                               let createTime = '';
                               if(item.bankCard===undefined||item.bankCard.length<=0){
                                   bankAddress = '';
                                   bankBranch = '';
                                   bankCardHeadPic = '未上传';
                                   bankCardTailPic = '未上传';
                                   bankCardNumbers = '';
                                   bankName = '';

                               }else {
                                   for(let i = 0;i<item.bankCard.length;i++){
                                       console.log("item.bankCard")
                                       console.log(item.bankCard)
                                       if(item.bankCard[i].importantCard===1){
                                           cart = i;
                                       }
                                   }
                                   console.log(item.bankCard)
                                   bankAddress = item.bankCard[cart].bankAddress;
                                   bankBranch = item.bankCard[cart].bankBranch;
                                   bankCardHeadPic = '已上传';
                                   bankCardTailPic = '已上传';
                                   bankCardNumbers =  item.bankCard[cart].bankCardNumbers;
                                   bankName  = item.bankCard[cart].bankName;
                                   createTime = item.bankCard[cart].createTime;
                               }
                               if(item.IDCard){
                                   if(item.IDCard.IDCardHeadPic){
                                       IDCardHeadPic = '已上传';
                                       IDCardTailPic = '已上传';
                                   }else{
                                       IDCardHeadPic = '未上传';
                                       IDCardTailPic = '未上传';
                                   }
                                   IDNumber = item.IDCard.IDNumber;
                               }else{
                                   IDCardHeadPic = '未上传';
                                   IDCardTailPic = '未上传';
                                   IDNumber = ''
                               }
                               const b = {
                                   IDCardHeadPic:IDCardHeadPic ,
                                   IDCardTailPic: IDCardTailPic ,
                                   IDNumber:IDNumber,
                                   IDName: item.IDName,
                                   address: item.address,
                                   apId: item.apId,
                                   role: item.role,
                                   bankAddress:bankAddress,
                                   bankBranch:bankBranch,
                                   bankCardHeadPic:bankCardHeadPic,
                                   bankCardTailPic:bankCardTailPic,
                                   bankCardNumbers:bankCardNumbers,
                                   bankName:bankName,
                                   userPhone: item.userPhone,
                                   userEmail: item.userEmail,
                                   birthDay: item.birthDay,
                                   createTime :createTime,
                                   verifyStatus: item.verifyStatus,
                                   reason: item.reason,
                                   auditTime:item.auditTime,
                                   _id:item._id
                               };
                               changeList.push(b);
                           });
                           searchList = changeList;
                           self.tableData = searchList;
                       }else{
                           self.tableData = [];
                       }
                       console.log('searchList')
                       console.log(searchList)
                       console.log('self.tableData')

                       console.log(self.tableData)

                   }

               }).catch(function (err) {

               })
           }
        },
        editCRMAudit(row){
            console.log("row")
            console.log(row)
            this.$router.push('/CRMAuditEdit?crmRowId='+row._id);
        },


        refuseRow(row){
            if(row.verifyStatus == 2){
                return 'refuse-row'
            }else {
                return ''
            }
        }
    },
    mounted(){
        this.searchCRMAudit();
    }
}
