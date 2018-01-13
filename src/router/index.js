import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden: true
        },
        {
            path: '/Home',
            name: '首页',
            ifSubMenu: false,
            icon: 'icon-home',
            component: require('../components/common/Home.vue'),
            children: [
                {
                    path: '/Home',
                    component: require('../components/page/Home.vue'),
                }
            ]
        },
        {
            path: '/UserManage',
            name: '用户管理',
            ifSubMenu: true,
            icon: 'icon-user',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/CrmAgent',
                    name: 'CRM代理账户',
                    component: require('../components/page/CrmAgent.vue')
                },
                {
                    path:'/CrmUser',
                    name: 'CRM个人账户',
                    component: require('../components/page/CrmUser.vue')
                },
                {
                    path:'/Mt4User',
                    name: 'MT4账户列表',
                    component: require('../components/page/Mt4User.vue')
                },
            ]
        },
        {
            path: '/AuditList',
            name: '审核列表',
            ifSubMenu: true,
            icon: 'icon-audit',
            redirect: '/CrmAudit',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/CrmAudit',
                    name: 'CRM用户审核',
                    component: require('../components/page/CrmAudit.vue')
                },
                // {
                //     path:'/PersonToAgent',
                //     name: '个人转代理审核',
                //     component: require('../components/page/PersonToAgent.vue')
                // },
                {
                    path:'/BankCardAudit',
                    name: '用户银行卡审核',
                    component: require('../components/page/BankCardAudit.vue')
                },
                {
                    path:'/bankAuditDetail',
                    name:'银行卡详情',
                    hidden:true,
                    component:require('../components/page/bankAuditDetail.vue')
                },
                {
                    path:'/OutMoneyAudit',
                    name: '出金审核',
                    component: require('../components/page/OutMoneyAudit.vue')
                },
                {
                    path:'/CommissionAudit',
                    name: '佣金审核',
                    component: require('../components/page/CommissionAudit.vue')
                },
                {
                    path:'/LeverageAudit',
                    name: '杠杆调整审核',
                    component: require('../components/page/LeverageAudit.vue')
                },
            ]
        },
        {
            path: '/TransReport',
            name: '交易报表',
            ifSubMenu: true,
            icon: 'icon-trade',
            redirect: '/HistoryOrder',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/HistoryOrder',
                    name: '平仓报表',
                    component: require('../components/page/HistoryOrder.vue')
                },
                {
                    path:'/CrmDepositForm',
                    name: '资金报表',
                    component: require('../components/page/CrmDepositForm.vue')
                },
                {
                    path:'/RebateForm',
                    name: '返佣报表',
                    component: require('../components/page/RebateForm.vue')
                },
                {
                    path:'/CountForm',
                    name: '统计报表',
                    component: require('../components/page/CountForm.vue')
                },
                {
                    path:'/TeamForm',
                    name: '团队报表',
                    component: require('../components/page/TeamForm.vue')
                },
            ]
        },
        {
            path: '/OpenSetting',
            name: '系统设置',
            ifSubMenu: true,
            icon: 'icon-system',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/OpenSetting',
                    name: '开户控制',
                    component: require('../components/page/OpenSetting.vue')
                },
                {
                    path:'/PayType',
                    name: '支付方式设置',
                    component: require('../components/page/PayType.vue')
                },
                {
                    path:'/OutInMoneySet',
                    name: '出入金设置',
                    component: require('../components/page/OutInMoneySet.vue')
                },
                {
                    path:'/BackMoneySet',
                    name: '返佣设置',
                    component: require('../components/page/BackMoneySet.vue')
                },
                {
                    path:'/EmailSet',
                    name: '邮件管理',
                    component: require('../components/page/EmailSet.vue')
                },

                // {
                //     path:'/MT4Set',
                //     name: 'MT4设置',
                //     component: require('../components/page/MT4Set.vue')
                // },
                {
                    path:'/MassEmail',
                    name:'群发',
                    hidden:true,
                    component:require('../components/page/MassEmail.vue')
                }
            ]
        },
        {
            path: '/LogSearch',
            name: '日志查询',
            ifSubMenu: false,
            icon: 'icon-record',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/LogSearch',
                    component: require('../components/page/LoginLog.vue')
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve),
            hidden: true
        },
        {
            path:'/forgetPwd',
            component:resolve => require(['../components/page/ForgetPwd.vue'],resolve),
            hidden:true
        },
        {
            path: '/CRMAuditEdit',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            hidden: true,
            children:[{
                path: '/CRMAuditEdit',
                component: resolve => require(['../components/page/CRMAuditEdit.vue'], resolve),
            }]
        }
    ]
})
