<template>
    <yin-login-logo></yin-login-logo>
    <div class="sign">
        <div class="sign-head">
            <span>帐号登录</span>
        </div>
        <el-form ref="register" status-icon :model="registerForm" :rules="SignInRules">
            <el-form-item prop="username">
                <el-input placeholder="用户名" v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="registerForm.password" @keyup.enter="handleLoginIn">
                </el-input>
            </el-form-item>
            <el-form-item class="sign-btn">
                <el-button @click="handleSignUp">注册</el-button>
                <el-button type="primary" @click="handleLoginIn">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import mixin from "@/mixins/mixin";
//import YinLoginLogo from "@/components/layouts/YinLoginLogo.vue";
import { HttpManager } from "@/api";
import { NavName, RouterName, SignInRules } from "@/enums";
import YinLoginLogo from "@/components/layouts/YinLoginLogo.vue";
import { useSongStore, useUserStore, useConfigureStore } from '@/store'
import { ElMessage, FormInstance } from "element-plus";
const songStore = useSongStore()
const userStore = useUserStore()
const configureStore = useConfigureStore()


const { routerManager, changeIndex } = mixin();

// 登录用户名密码
const registerForm = ref({
    username: "012",
    password: "012",
});

const register = ref<FormInstance>()

const handleLoginIn = async () => {
    let canRun = true;
    register.value.validate((valid) => {
        if (!valid) return (canRun = false);
    });
    if (!canRun) return;


    try {
        const username = registerForm.value.username;
        const password = registerForm.value.password;
        console.log(registerForm.value)
        const result = (await HttpManager.signIn({ username, password })) as ResponseBody;
        console.log("handleLoginIn")
        ElMessage({
            message: result.message,
            type: "warning"
        });

        if (result.success) {

            userStore.SetUserId(result.data[0].id);
            userStore.setUsername(result.data[0].username)
            userStore.setUserPic(result.data[0].avator)
            configureStore.setToken(true)
            changeIndex(NavName.Home);
            routerManager(RouterName.Home, { path: RouterName.Home });
        }
    } catch (error) {
        console.error(error);
    }
}

const handleSignUp = () => {
    routerManager(RouterName.SignUp, { path: RouterName.SignUp });
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/sign.scss";
</style>
