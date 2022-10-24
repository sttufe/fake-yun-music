<template>
    <div class="search-song-list">
        <play-list :playList="playList" path="song-sheet-detail"></play-list>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, watch, onMounted, getCurrentInstance } from "vue";
import PlayList from "@/components/PlayList.vue";
import { HttpManager } from "@/api";
import { useConfigureStore } from '@/store'
import { ElMessage } from "element-plus"

const configureStore = useConfigureStore();

const playList = ref([]);
const searchWord = computed(() => configureStore.searchWord);
watch(searchWord, (value) => {
    getSearchList(value);
});

async function getSearchList(value) {
    if (!value) return;
    const result = (await HttpManager.getSongListOfLikeTitle(value)) as ResponseBody;
    if (!result.data.length) {
        ElMessage({
            message: "暂无该歌曲内容",
            type: "warning",
        });
    } else {
        playList.value = result.data;
    }
}

onMounted(() => {
    getSearchList(searchWord.value)

});


</script>
