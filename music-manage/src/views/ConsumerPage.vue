<template>
    <div class="container">
        <div class="handle-box">
            <el-button @click="deleteAll">批量删除</el-button>
            <el-input v-model="searchWord" placeholder="筛选用户"></el-input>
        </div>

        <el-table height="700px" border size="small" :data="data" @selection-change="handleSelectionChange"
            stripe="true" highlight-current-row>
            <el-table-column type="selection" width="40" align="center"></el-table-column>
            <el-table-column label="ID" prop="id" width="50" align="center"></el-table-column>
            <el-table-column label="用户头像" width="102" align="center">
                <template v-slot="s">
                    <img :src="HttpManager.attachImageUrl(s.row.avator)" style="width: 80px" />
                </template>
            </el-table-column>
            <el-table-column label="用户名" prop="username" width="80" align="center"></el-table-column>
            <el-table-column label="性别" width="50" align="center">
                <template v-slot="s">
                    <div>{{ changeSex(s.row.sex) }}</div>
                </template>
            </el-table-column>
            <el-table-column label="手机号码" prop="phoneNum" width="120" align="center"></el-table-column>
            <el-table-column label="邮箱" prop="email" width="120" align="center"></el-table-column>
            <el-table-column label="生日" width="120" align="center">
                <template v-slot="scope">
                    <div>{{ getBirth(scope.row.birth) }}</div>
                </template>
            </el-table-column>
            <el-table-column label="签名" prop="introduction"></el-table-column>
            <el-table-column label="地区" prop="location" width="70" align="center"></el-table-column>
            <el-table-column label="收藏" width="90" align="center">
                <template v-slot="scope">
                    <el-button @click="goCollectPage(scope.row.id)">收藏</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template v-slot="scope">
                    <el-button type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" background layout="total, prev, pager, next" :current-page="currentPage"
            :page-size="pageSize" :total="tableData.length" @current-change="handleCurrentChange">
        </el-pagination>
    </div>

    <!-- 删除提示框 -->
    <yin-del-dialog :delVisible="delVisible" @confirm="confirm" @cancelRow="delVisible = $event"></yin-del-dialog>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, computed } from "vue";
import mixin from "@/mixins/mixin";
import { HttpManager } from "@/api";
import { RouterName } from "@/enums";
import YinDelDialog from "@/components/dialog/YinDelDialog.vue";
import { getBirth } from "@/utils";
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'


const userStore = useUserStore()
const { changeSex, routerManager } = mixin();

const tableData = ref([]); // 记录歌曲，用于显示
const tempDate = ref([]); // 记录歌曲，用于搜索时能临时记录一份歌曲列表
const pageSize = ref(15); // 页数
const currentPage = ref(1); // 当前页

// 计算当前表格中的数据
const data = computed(() => {
    return tableData.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
});

const searchWord = ref(""); // 记录输入框输入的内容
watch(searchWord, () => {
    if (searchWord.value === "") {
        tableData.value = tempDate.value;
    } else {
        tableData.value = [];
        for (let item of tempDate.value) {
            if (item.username.includes(searchWord.value)) {
                tableData.value.push(item);
            }
        }
    }
});

getData();

// 获取用户信息
async function getData() {
    tableData.value = [];
    tempDate.value = [];
    const result = (await HttpManager.getAllUser()) as ResponseBody;
    tableData.value = result.data;
    tempDate.value = result.data;
    currentPage.value = 1;
}
// 获取当前页
function handleCurrentChange(val) {
    currentPage.value = val;
}

/**
 * 路由
 */
function goCollectPage(id) {
    const breadcrumbList = reactive([
        {
            path: RouterName.Consumer,
            name: "用户管理",
        },
        {
            path: "",
            name: "收藏信息",
        },
    ]);
    //  proxy.$store.commit("setBreadcrumbList", breadcrumbList);
    userStore.setBreadcrumbList(breadcrumbList.values)
    routerManager(RouterName.Collect, { path: RouterName.Collect, query: { id } });
}

/**
 * 删除
 */
const idx = ref(-1); // 记录当前要删除的行
const multipleSelection = ref([]); // 记录当前要删除的列表
const delVisible = ref(false); // 显示删除框

async function confirm() {
    const result = (await HttpManager.deleteUser(idx.value)) as ResponseBody;
    ElMessage({
        message: result.message,
        type: "info",
    });
    if (result) getData();
    delVisible.value = false;
}
function deleteRow(id) {
    idx.value = id;
    delVisible.value = true;
}
function handleSelectionChange(val) {
    multipleSelection.value = val;

    console.log(val)
}
function deleteAll() {
    for (let item of multipleSelection.value) {
        deleteRow(item.id);
        confirm();
    }
    multipleSelection.value = [];
}

function tableClick(d) {

}
 

</script>

<style  >
/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td {
    background-color: #738beb !important;
    color: #2d3a4b;
    /* color: #f19944; */
    /* 设置文字颜色，可以选择不设置 */
}

/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f1dfb2;
    color: #2d3a4b;
    /* color: #f19944; */
    /* 设置文字颜色，可以选择不设置 */
}


.el-table {
    border-radius: 0 0 10px 10px;
}
</style>

