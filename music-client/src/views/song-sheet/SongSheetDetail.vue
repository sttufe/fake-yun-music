<template>
    <el-container>
        <el-aside class="album-slide">
            <el-image class="album-img" fit="contain" :src="HttpManager.attachImageUrl(songDetails.pic)" />
            <h3 class="album-info">{{ songDetails.title }}</h3>
        </el-aside>
        <el-main class="album-main">
            <h1>简介</h1>
            <p>{{ songDetails.introduction }}</p>
            <!--评分-->
            <div class="album-score">
                <div>
                    <h3>歌单评分</h3>
                    <el-rate v-model="nowRank" allow-half disabled></el-rate>
                </div>
                <span>{{ nowRank * 2 }}</span>
                <div>
                    <h3>{{ assistText }} {{ nowScore * 2 }}</h3>
                    <el-rate allow-half v-model="nowScore" :disabled="disabledRank" @click="pushValue()"></el-rate>
                </div>
            </div>
            <!--歌曲-->
            <song-list class="album-body" :songList="currentSongList"></song-list>
            <comment :playId="nowSongListId" :type="1"></comment>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import * as  store from '@/store'
import mixin from "@/mixins/mixin";
import SongList from "@/components/SongList.vue";
import Comment from "@/components/Comment.vue";
import { HttpManager } from "@/api";

const songStore = store.useSongStore()
const userStore = store.useUserStore()
const { checkStatus } = mixin();

const currentSongList = ref([]); // 存放的音乐
const nowSongListId = ref(""); // 歌单 ID
const nowScore = ref(0);
const nowRank = ref(0);
const disabledRank = ref(false);
const assistText = ref("评价");
// const evaluateList = ref(["很差", "较差", "还行", "推荐", "力推"]);
const songDetails = computed(() => songStore.songDetails); // 单个歌单信息
const nowUserId = computed(() => userStore.userId);

console.log(songStore)
nowSongListId.value = (songDetails.value).id; // 给歌单ID赋值

// 收集歌单里面的歌曲
const getSongId = async (id) => {
    const result = (await HttpManager.getListSongOfSongId(id)) as ResponseBody;
    // 获取歌单里的歌曲信息
    for (const item of result.data) {
        // 获取单里的歌曲
        const resultSong = (await HttpManager.getSongOfId(item.songId)) as ResponseBody;
        currentSongList.value.push(resultSong.data[0]);
    }
}
// 获取评分
const getRank = async (id) => {
    const result = (await HttpManager.getRankOfSongListId(id)) as ResponseBody;
    nowRank.value = result.data / 2;
}
const getUserRank = async (userId, songListId) => {
    const result = (await HttpManager.getUserRank(userId, songListId)) as ResponseBody;
    nowScore.value = result.data / 2;
    disabledRank.value = true;
    assistText.value = "已评价";
}
// 提交评分
const pushValue = async () => {
    if (disabledRank.value || !checkStatus()) return;

    const songListId = nowSongListId.value;
    const consumerId = nowUserId.value;
    const score = nowScore.value * 2;

    try {
        const result = (await HttpManager.setRank({ songListId, consumerId, score })) as ResponseBody;
        // $message({
        //     message: result.message,
        //     type: result.type,
        // });

        if (result.success) {
            getRank(nowSongListId.value);
            disabledRank.value = true;
            assistText.value = "已评价";
        }
    } catch (error) {
        console.error(error);
    }
}


getUserRank(nowUserId.value, nowSongListId.value);
getRank(nowSongListId.value); // 获取评分
getSongId(nowSongListId.value); // 获取歌单里面的歌曲ID


const rank = computed(() => {
    nowRank.value as number
})

const score = computed(() => {
    nowScore.value as number
})




</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.album-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;

    .album-img {
        height: 250px;
        width: 250px;
        border-radius: 10%;
    }

    .album-info {
        width: 70%;
        padding-top: 2rem;
    }
}

.album-main {
    h1 {
        font-size: 22px;
    }

    p {
        color: rgba(0, 0, 0, 0.5);
        margin: 10px 0 20px 0px;
    }

    /*歌单打分*/
    .album-score {
        display: flex;
        align-items: center;
        margin: 1vw;

        h3 {
            margin: 10px 0;
        }

        span {
            font-size: 60px;
        }

        &>div:last-child {
            margin-left: 10%;
        }
    }

    .album-body {
        margin: 20px 0 20px 0px;
    }
}

@media screen and (min-width: $sm) {
    .album-slide {
        position: fixed;
        width: 400px;
    }

    .album-main {
        min-width: 600px;
        padding-right: 10vw;
        margin-left: 400px;
    }
}

@media screen and (max-width: $sm) {
    .album-slide {
        display: none;
    }
}
</style>
