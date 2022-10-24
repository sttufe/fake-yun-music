<template>
    <div class="search-song">
        <song-list :songList="currentSongList"></song-list>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, watch, onMounted, getCurrentInstance } from "vue";
import { useConfigureStore } from "@/store";
import SongList from "@/components/SongList.vue";
import { HttpManager } from "@/api";
import { ElMessage } from 'element-plus'
import mixin from "@/mixins/mixin";
import { RouterName } from "@/enums";

const { proxy } = getCurrentInstance() as any;

const { routerManager } = mixin();

const configureStore = useConfigureStore();

const currentSongList = ref([]); // 存放的音乐
const searchWord = computed(() => configureStore.searchWord);
watch(searchWord, (value) => {
    searchSong(value);
});

// 搜索音乐
async function searchSong(value) {
    if (!value) {
        currentSongList.value = [];
        return;
    }
    const result = (await HttpManager.getSongOfSingerName(value)) as ResponseBody;
    if (!result.data.length) {
        currentSongList.value = [];
        ElMessage({
            message: "暂时没有相关歌曲",
            type: "warning",
        });
    } else {
        currentSongList.value = result.data;
    }
}

onMounted(() => {
    console.log(proxy.$route)
    searchSong(proxy.$route.query.keywords);

});


</script>
