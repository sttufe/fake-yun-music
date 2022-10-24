<template>
    <el-form ref="updateForm" label-width="70px" :model="registerForm" :rules="SignUpRules">
        <el-form-item prop="username" label="用户名">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="registerForm.sex">
                <el-radio :label="0">女</el-radio>
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">保密</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%">
            </el-date-picker>
        </el-form-item>
        <el-form-item prop="introduction" label="签名">
            <el-input type="textarea" placeholder="签名" v-model="registerForm.introduction"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="地区">
            <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%">
                <el-option v-for="item in AREA" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机">
            <el-input placeholder="手机" v-model="registerForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
            <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="goBack(-1)">取消</el-button>
            <el-button type="primary" @click="saveMsg()">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, getCurrentInstance, reactive } from "vue";
import mixin from "@/mixins/mixin";
import { AREA, SignUpRules } from "@/enums";
import { HttpManager } from "@/api";
import { getBirth } from "@/utils";
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'


const userStore = useUserStore();
const { goBack } = mixin();

// 注册
const registerForm = ref({
    username: "",
    sex: "",
    phoneNum: "",
    email: "",
    birth: new Date(),
    introduction: "",
    location: "",
    userPic: "",
});
const userId = computed(() => userStore.userId);

async function getUserInfo(id) {
    const result = (await HttpManager.getUserOfId(id)) as ResponseBody;
    registerForm.value.username = result.data[0].username;
    registerForm.value.sex = result.data[0].sex;
    registerForm.value.phoneNum = result.data[0].phoneNum;
    registerForm.value.email = result.data[0].email;
    registerForm.value.birth = result.data[0].birth;
    registerForm.value.introduction = result.data[0].introduction;
    registerForm.value.location = result.data[0].location;
    registerForm.value.userPic = result.data[0].avator;
}

const updateForm = ref()

async function saveMsg() {
    let canRun = true;
    updateForm.value.validate((valid) => {
        if (!valid) return (canRun = false);
    });
    if (!canRun) return;


    const id = userId.value;
    const username = registerForm.value.username;
    const sex = registerForm.value.sex;
    const phoneNum = registerForm.value.phoneNum;
    const email = registerForm.value.email;
    const birth = registerForm.value.birth;
    const introduction = registerForm.value.introduction;
    const location = registerForm.value.location;
    const result = (await HttpManager.updateUserMsg({ id, username, sex, phoneNum, email, birth, introduction, location })) as ResponseBody;
    ElMessage({
        message: result.message,
        type: "info",
    });
    if (result.success) {
        userStore.setUsername(registerForm.value.username)
        goBack(-1);
    }
}

onMounted(() => {
    getUserInfo(userId.value);
});



</script>

<style lang="scss" scoped>
.btn ::v-deep .el-form-item__content {
    display: flex;
    justify-content: center;
}
</style>
