import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login',
            meta:{
              requireAuth:false
            },
            hidden: true
        },
        {
            path: '/Home',
            name: '首页',
            ifSubMenu: false,
            icon: 'icon-home',
            meta:{
                requireAuth:true
            },
            component: require('../components/common/Home.vue'),
            children: [
                {
                    path: '/Home',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/Home.vue'),
                }
            ]
        },
        {
            path:'/loginExpires',
            meta:{
                requireAuth:true
            },
            hidden:true,
            component:require('../components/common/Home.vue'),
            children:[
                {
                    path:'/loginExpires',
                    name:'loginExpires',
                    meta:{
                        requireAuth:false
                    },
                    component:resolve => require(['../components/page/loginExpires.vue'],resolve),
                    hidden:true
                }
            ]
        },
        {
            path: '/UserManage',
            name: '用户管理',
            ifSubMenu: true,
            icon: 'icon-user',
            meta:{
                requireAuth:true
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/CrmAgent',
                    name: 'CRM代理账户',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/CrmAgent.vue')
                },
                {
                    path:'/CrmUser',
                    name: 'CRM个人账户',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/CrmUser.vue')
                },
                {
                    path:'/Mt4User',
                    name: 'MT4账户列表',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/Mt4User.vue')
                },
            ]
        },
        {
            path: '/AuditList',
            name: '审核列表',
            ifSubMenu: true,
            icon: 'icon-audit',
            redirect: '/CapitalAudit',
            meta:{
                requireAuth:true
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/CapitalAudit',
                    name: '资金审核',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/CapitalAudit.vue')
                },
                {
                    path:'/DataAudit',
                    name: '资料审核',
                    meta:{
                        requireAuth:true
                    },
                    component: resolve => require(['../components/page/DataAudit.vue'], resolve)
                },
                {
                    path:'/BankAuditDetail',
                    name: '资料详情审核',
                    hidden:true,
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/BankAuditDetail.vue')
                }
            ]
        },
        {
            path: '/TransReport',
            name: '交易报表',
            ifSubMenu: true,
            icon: 'icon-trade',
            redirect: '/HistoryOrder',
            meta:{
                requireAuth:true
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/HistoryOrder',
                    name: '平仓报表',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/HistoryOrder.vue')
                },
                {
                    path:'/CrmDepositForm',
                    name: '资金报表',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/CrmDepositForm.vue')
                },
                {
                    path:'/RebateForm',
                    name: '返佣报表',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/RebateForm.vue')
                },
                {
                    path:'/CountForm',
                    name: '统计报表',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/CountForm.vue')
                },
                {
                    path:'/TeamForm',
                    name: '团队报表',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/TeamForm.vue')
                },
            ]
        },
        {
            path: '/OpenSetting',
            name: '系统设置',
            ifSubMenu: true,
            icon: 'icon-system',
            meta:{
                requireAuth:true
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/OpenSetting',
                    name: '开户控制',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/OpenSetting.vue')
                },
                {
                    path:'/PayType',
                    name: '支付方式设置',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/PayType.vue')
                },
                {
                    path:'/OutInMoneySet',
                    name: '出入金设置',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/OutInMoneySet.vue')
                },
                {
                    path:'/BackMoneySet',
                    name: '返佣设置',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/BackMoneySet.vue')
                },
                {
                    path:'/EmailSet',
                    name: '邮件管理',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/EmailSet.vue')
                },
                {
                    path:'/CompanyInfo',
                    name: '公司信息设置',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/CompanyInfo.vue')
                },

                {
                    path:'/MT4Set',
                    name: 'MT4数据同步',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/MT4Set.vue')
                },
                {
                    path:'/MassEmail',
                    name:'群发',
                    hidden:true,
                    meta:{
                        requireAuth:true
                    },
                    component:require('../components/page/MassEmail.vue')
                }
            ]
        },
        {
            path: '/LogSearch',
            name: '日志查询',
            ifSubMenu: false,
            icon: 'icon-record',
            meta:{
                requireAuth:true
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/LogSearch',
                    meta:{
                        requireAuth:true
                    },
                    component: require('../components/page/LoginLog.vue')
                }
            ]
        },
        {
            path: '/login',
            meta:{
                requireAuth:false
            },
            component: resolve => require(['../components/page/Login.vue'], resolve),
            hidden: true
        },
        {
            path:'/forgetPwd',
            meta:{
                requireAuth:false
            },
            component:resolve => require(['../components/page/ForgetPwd.vue'],resolve),
            hidden:true
        },
        {
            path: '/CRMAuditEdit',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            hidden: true,
            meta:{
                requireAuth:true
            },
            children:[{
                path: '/CRMAuditEdit',
                meta:{
                    requireAuth:true
                },
                component: resolve => require(['../components/page/CRMAuditEdit.vue'], resolve),
            }]
        }
    ]
})
