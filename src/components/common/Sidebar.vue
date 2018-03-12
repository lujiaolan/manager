<template>
    <div class="sidebar">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="(route,index) in $router.options.routes" v-if="!route.hidden">
                <template v-if="!route.ifSubMenu">
                    <el-menu-item :index="route.path">
                        <i :class="'icon '+route.icon"></i>
                        <span :class="'text '+route.icon">{{ route.name }}</span>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-submenu :index="route.path">
                        <template slot="title">
                            <i :class="'icon '+route.icon"></i>
                            <span :class="'text '+route.icon">{{route.name}}</span>
                        </template>
                        <el-menu-item :index="item.path" v-for="(item, index ) in route.children" v-if="!item.hidden" :key="item.path" @click="testSidebar">
                            <i :class="item.icon"></i>
                            <span>{{ item.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </template>
            <span @click="singOut" class="signout" ><i class="icon icon-signout"></i>退出登录</span>
        </el-menu>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                DataAuditVisible: false
            }
        },
        methods:{
            singOut(){
                const self = this;
                this.$confirm('退出操作','确认要退出吗?',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消'
                }).then(()=>{
                    this.$ajax({
                        method: 'get',
                        url: '/logout/' + self.$store.state.user.userinfo.userId
                    }).then(function (res) {
                        self.$router.push('/login');
                    }).catch(function () {

                    });
                    console.log('login');
                }).catch(()=>{

                })

            },

            testSidebar(){
//                const self = this;
                console.log(this.$route.path);
                console.log(this.$route.matched);
                console.log(this.$route);
                if(this.$route.path === '/DataAudit'){
                    this.$store.dispatch('update_tab_active','first');
                }
//                if( this.$route.path === '/DataAudit/RegisterList' ||
//                    this.$route.path === '/DataAudit/CrmAudit' ||
//                    this.$route.path === '/DataAudit/BankCardAudit' ||
//                    this.$route.path === '/DataAudit/LeverageAudit'){
//                    self.DataAuditVisible = true;
//                }else {
//                    self.DataAuditVisible = false;
//                }
            }
        },
        mounted(){
//            this.testSidebar()
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul {
        height: 100%;
    }
    .sidebar > .el-menu{
        background: #2E363F;
    }
    .sidebar>.el-submenu >.el-menu{
        background-color: #2E363F!important;
    }
    .signout{
        margin: 6%;
        color: rgb(170,179,194);
        height: 56px;
        line-height: 56px;
        font-size: 14px;
        /*padding: 0 20px;*/
        cursor: pointer;
    }
    .signout:hover{
        color:#20a0ff;
    }

    .sidebar .el-menu--horizontal.el-menu--dark
    .sidebar .el-submenu .el-menu-item.isActive,
    .sidebar .el-menu-item.isActive {
        color: #20a0ff;
    }

</style>
