<template>
    <div class="header">
        <div class="collapse-btn" @click="collapseChage">
            <el-icon v-if="!collapse">
                <expand />
            </el-icon>
            <el-icon v-else>
                <fold />
            </el-icon>
        </div>
        <div class="logo">{{ nusicName }}</div>
        <div class="header-right">
            <div class="header-user-con">

                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <!-- {{ username }} -->

                        <div class="user-avator">
                            <img
                                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-12%2F20201212212610005.png&refer=http%3A%2F%2Ftupian.qqw21.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668708653&t=bde683345fe540df8d6e4ba0e1d50db9" />
                        </div>
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import mixin from "@/mixins/mixin";
import { Expand, Fold } from "@element-plus/icons-vue";
import emitter from "@/utils/emitter";
import { HttpManager } from "@/api";
import { RouterName, MUSICNAME } from "@/enums";
import { useUserStore } from '@/store'

const { routerManager } = mixin();
const userStore = useUserStore();

const collapse = ref(true);
const username = ref("admin");
const userPic = computed(() => userStore.userPic);
const nusicName = ref(MUSICNAME);

onMounted(() => {
    if (document.body.clientWidth < 1500) {
        collapseChage();
    }
});

// 侧边栏折叠
function collapseChage() {
    collapse.value = !collapse.value;
    emitter.emit("collapse", collapse.value);
}
// 用户名下拉菜单选择事件
function handleCommand(command) {
    if (command === "loginout") {
        localStorage.removeItem("token")
        routerManager(RouterName.SignIn, { path: RouterName.SignIn });
    }
}

</script>
<style scoped>
.header {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #2c3e50;
    background: #ffff;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.3);
}

.collapse-btn {
    display: flex;
    padding: 0 21px;
    cursor: pointer;
}

.header .logo {
    width: 250px;
    font-weight: bold;
}

.header-right {
    position: absolute;
    right: 0;
    padding-right: 30px;
}

.header-user-con {
    display: flex;
    align-items: center;
}

.user-name {
    margin-left: 10px;
}

.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-link {
    cursor: pointer;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
