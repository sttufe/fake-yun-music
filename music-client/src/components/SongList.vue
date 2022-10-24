<template>
    <div class="content">
        <el-table highlight-current-row :data="dataList" @row-click="handleClick">
            <el-table-column prop="songName" label="歌曲" />
            <el-table-column prop="singerName" label="歌手" />
            <el-table-column prop="introduction" label="专辑" />
            <el-table-column label="编辑" width="80" align="center">
                <template #default="scope">
                    <el-dropdown>
                        <el-icon @click="handleEdit(scope.row)">
                            <MoreFilled />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :icon="Download" @click="
                                  downloadMusic({
                                    songUrl: scope.row.url,
                                    songName: scope.row.name,
                                  })
                                ">下载</el-dropdown-item>
                                <el-dropdown-item :icon="Delete" v-if="show"
                                    @click="deleteCollection({ id: scope.row.id })">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, reactive } from "vue";
import mixin from "@/mixins/mixin";
import { MoreFilled, Delete, Download } from "@element-plus/icons-vue";
import { HttpManager } from "@/api";
import { Icon } from "@/enums";
import { useSongStore, useUserStore } from '@/store'
import { ElMessage } from 'element-plus'

const { getSongTitle, getSingerName, playMusic, checkStatus, downloadMusic } = mixin();

const props = defineProps({
    songList: { type: Array },
    show: { default: false }

})
const emits = defineEmits(['changeData'])

const { songList } = toRefs(props);

const iconList = reactive({
    dislike: Icon.Dislike,
    like: Icon.Like,
});
const userStore = useUserStore()
const songStore = useSongStore()
const songUrl = computed(() => songStore.songUrl);
const singerName = computed(() => songStore.singerName);
const songTitle = computed(() => songStore.songTitle);
const dataList = computed(() => {
    const list = [];
    songList.value.forEach((item: any, index) => {
        item["songName"] = getSongTitle(item.name);
        item["singerName"] = getSingerName(item.name);
        item["index"] = index;
        list.push(item);
    });
    return list;
});

function handleClick(row) {
    playMusic({
        id: row.id,
        url: row.url,
        pic: row.pic,
        index: row.index,
        name: row.name,
        lyric: row.lyric,
        currentSongList: songList.value,
    });
}

function handleEdit(row) {
    console.log("row", row);
}

const userId = computed(() => userStore.userId);

async function deleteCollection({ id }) {
    if (!checkStatus()) return;

    const result = (await HttpManager.deleteCollection(userId.value, id)) as ResponseBody;
    ElMessage({
        message: result.message,
        type: 'info',
    });

    if (result.data === false) emits("changeData", result.data);
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.content {
    background-color: $color-white;
    border-radius: $border-radius-songlist;
    padding: 10px;
}

.content:deep(.el-table__row.current-row) {
    color: $color-black;
    font-weight: bold;
}

.content:deep(.el-table__row) {
    cursor: pointer;
}

.icon {
    @include icon(1.2em, $color-black);
}
</style>
