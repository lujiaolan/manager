<template>
    <div class="home-content">
        <div class="home-heard el-card">
            <div class="title-card">
                <div class="title-info-card">
                    <div class="today-total today-crm-guest">
                    </div>
                    <div>
                        <p class="title-info-name">{{ dayAmount.crmAmount }}</p>
                        <p class="today-total-p">今日新增CRM客户</p>
                    </div>
                </div>
                <div class="title-info-card">
                    <div class="today-total today-total-trade"></div>
                    <p class="title-info-name">{{ dayAmount.transAccount }}</p>
                    <p class="today-total-p">今日交易账户总计</p>
                </div>
                <div class="title-info-card">
                    <div class="today-total today-total-apply"></div>
                    <p class="title-info-name">{{ dayAmount.mt4Amount }}</p>
                    <p class="today-total-p">今日申请MT4账户总计</p>
                </div>
                <div class="title-info-card">
                    <div class="today-total today-deposit-total"></div>
                    <p class="title-info-name">{{ dayAmount.plusAmount }}</p>
                    <p class="today-total-p">今日存款总计</p>
                </div>
                <div class="title-info-card">
                    <div class="today-total total-withdraw-today"></div>
                    <p class="title-info-name">{{ dayAmount.minusAmount }}</p>
                    <p class="today-total-p">今日提款总计</p>
                </div>
            </div>
            <div style="overflow: hidden">
                <el-card class="box-card width-59-19 width-3-999">
                    <div class="card-title">
                        <span>数据汇总</span>
                    </div>
                    <div class="card-info">
                        <div class="width-25">
                            <p>代理总计</p>
                            <p>{{ dataAmount.agentAmount }}</p>
                        </div>
                        <div class="width-25">
                            <p>直客总计</p>
                            <p>{{ dataAmount.commonUserAmount }}</p>
                        </div>
                        <div class="width-25">
                            <p>MT4账户总计</p>
                            <p>{{ dataAmount.mt4Amount }}</p>
                        </div>
                        <div class="width-25">
                            <p>出/入金总计</p>
                            <p>{{ dataAmount.minusAmount }} / {{ dataAmount.plusAmount }}</p>
                        </div>
                    </div>
                    <div class="card-info">
                        <div class="width-25">
                            <p>净入金总计</p>
                            <p>{{ dataAmount.plusAmount }}</p>
                        </div>
                        <div class="width-25">
                            <p>返佣总计</p>
                            <p>{{ dataAmount.commissionAmount }}</p>
                        </div>
                        <!--<div class="width-19-33">-->
                            <!--<p>浮动盈亏</p>-->
                            <!--<p>{{ dataAmount.minusAmount }}</p>-->
                        <!--</div>-->
                        <!--<div class="width-19-33">-->
                            <!--<p>持仓量(手)</p>-->
                            <!--<p>{{ dataAmount.minusAmount }}</p>-->
                        <!--</div>-->
                        <div class="width-25">
                            <p>总盈亏</p>
                            <p>{{ dataAmount.profitAmount }}</p>
                        </div>
                        <div class="width-25">
                            <p>交易总量</p>
                            <p>{{ dataAmount.volumeAmount }} 手</p>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card width-38-41">
                    <div class="card-title">
                        <span>待办事项</span>
                    </div>
                    <div class="card-info">
                        <div class="width-33">
                            <p>出金审核</p>
                            <p>{{ Backlog.minusAmount }}</p>
                        </div>
                        <div class="width-33">
                            <p>佣金审核</p>
                            <p>{{ Backlog.commissionAmount }}</p>
                        </div>
                        <div class="width-33">
                            <p>用户审核</p>
                            <p>{{ Backlog.userInfoAmount }}</p>
                        </div>
                    </div>
                    <div class="card-info">
                        <div class="width-33">
                            <p>用户银行卡审核</p>
                            <p>{{ Backlog.userBankCardAmount }}</p>
                        </div>
                        <div class="width-33">
                            <p>杠杆调整审核</p>
                            <p>{{ Backlog.leverageAmount }}</p>
                        </div>
                        <div class="width-33">
                            <p>转出账户审核</p>
                            <p>{{ Backlog.userBankCardAmount }}</p>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="foot-content">
            <el-card class="box-card width-54">
                <div class="card-title">
                    <span>交易分析图表</span>
                </div>
                    <schart canvasId="bar" width="500" height="300" :data="data1" type="bar" :options="options1"></schart>
            </el-card>
            <el-card class="box-card width-44 margin-left-2">
                <div class="card-title">
                    <span>客户来源统计</span>
                </div>
                <div id="main"  :style="{width:'500px',height:'300px'}"></div>
            </el-card>
        </div>
        <div class="recommendUrl-header">
            <div class="recommendText-head">
                <div class="recommenText">
                    推<br/>
                    广<br/>
                    开<br/>
                    户<br/>
                    <div class="link_img"></div>
                </div>
            </div>
            <div class="recommendUrl">
                <div>
                    <img src="../../../static/img/QRCode.png"/>
                    <p>
                        直客
                    </p>
                    <p>
                        http://localhost:9090/#/RealAccount?8668
                    </p>
                </div>
                <div>
                    <img src="../../../static/img/QRCode.png"/>
                    <p>
                        代理
                    </p>
                    <p>
                        http://localhost:9091/#/AgentAccount?8668
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Home')
</script>
<style lang="less" scoped="">
    .today-total{
        height: 48px;
        width: 33%;
        margin: 2px 23px;
        float: left;
    }
    .foot-content{
        margin-left: 0.6%;
    }
    .today-crm-guest{
        background: url(/static/img/today-crm-guest.png) no-repeat;
    }
    .today-deposit-total{
        background: url(/static/img/today-deposit-total.png) no-repeat;
    }
    .today-total-apply{
        background: url(/static/img/today-total-apply.png) no-repeat;
    }
      .today-total-trade{
        background: url(/static/img/today-total-trade.png) no-repeat;
    }
    .total-withdraw-today{
        background: url(/static/img/total-withdraw-today.png) no-repeat;
    }
   .today-total-p{
       float: right;
       margin: -3px 15px 22px;
   }
    .home-heard{
        margin: 8px;
        padding: 20px;
    }
    .recommendUrl-header{
        text-align: center;
        font-size: 12px;
        position: fixed;
        float:left;
        top: 35%;
        width: 14%;
        right:-12.3%;
        display: inline;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        background: transparent;
    }
    .recommendUrl-header:hover{
        right: 0;
    }

    .recommenText{
        vertical-align:middle;
        color: white;
    }
    .recommenText img{
        margin-top: 9px;
    }
    .recommenText .link_img{
        background:url("../../../static/img/link_left.png") no-repeat;
        height: 10px;
        width: 10px;
        margin-left: 13px;
        margin-top:10px;
    }
    .recommendUrl-header:hover>.recommendText-head>.recommenText>.link_img{
        background:url("../../../static/img/link_right.png") no-repeat;
    }
    .recommendText-head{
        background: #0099e6;
        width: 11%;
        padding: 12px 2px;
        top: 15%;
        display: inline;
        float: left;
        right: 13%;
    }
    .recommendUrl img{
        width: 132px;
        height: 132px;
        padding: 12px;
    }
    .recommendUrl {
        border: 1px solid rgb(209, 229, 229);
        float: left;
        display: inline;
        background: white;
    }
    @media screen and (max-width:1200px) {
        .recommendUrl-header {
            width: 36%;
            right: -33%;
        }

        .recommendUrl-header:hover {
            right: -14%;
        }

        .recommendText-head {
            width: 7%;
            /*right: -33%;*/
        }
    }

</style>
