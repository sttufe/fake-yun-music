<template>
    <div class="upload">
        <el-upload drag :action="uploadUrl()" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <el-icon class="el-icon--upload">
                <upload-filled />
            </el-icon>
            <div class="el-upload__text">将文件拖到此处或点击上传</div>
            <template #tip>
                <p class="el-upload__tip">只能上传 {{ uploadTypes.join("、") }} 文件, 且不超过10M</p>
            </template>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { HttpManager } from "@/api";
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'



export default defineComponent({
    components: {
        UploadFilled,
    },
    setup() {
        const userStore = useUserStore();

        const uploadTypes = ref(["jpg", "jpeg", "png", "gif"]);
        const userId = computed(() => userStore.userId);

        function uploadUrl() {
            return HttpManager.uploadUrl(userId.value);
        }

        function beforeAvatarUpload(file) {
            const ltCode = 2;
            const isLt10M = file.size / 1024 / 1024;
            const isExistFileType = uploadTypes.value.includes(file.type.replace(/image\//, ""));

            if (isLt10M > ltCode || isLt10M <= 0) {
                ElMessage.error(`图片大小范围是 0~${ltCode}MB!`);
            }
            if (!isExistFileType) {
                ElMessage.error(`图片只支持 ${uploadTypes.value.join("、")} 格式!`);
            }

            return isLt10M && isExistFileType;
        }

        function handleAvatarSuccess(response, file) {
            ElMessage({
                message: response.message,
                type: "info",
            });

            if (response.success)
                userStore.setUserPic(response.data)
        }

        return {
            uploadTypes,
            uploadUrl,
            beforeAvatarUpload,
            handleAvatarSuccess,
        };
    },
});
</script>

<style scoped>
.upload {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
