<template>
    <div class="play-bar" :class="{ show: !toggle }">
        <div class="fold" :class="{ turn: toggle }">
            <yin-icon :icon="iconList.ZHEDIE" @click="toggle = !toggle"></yin-icon>
        </div>
        <!--播放进度-->
        <el-slider class="progress" v-model="nowTime" @change="fun.changeTime" size="small"></el-slider>
        <div class="control-box">
            <div class="info-box">
                <!--歌曲图片-->
                <el-image class="song-bar-img" fit="contain" :src="HttpManager.attachImageUrl(songPic)"
                    @click="fun.goPlayerPage" />
                <!--播放开始结束时间-->
                <div v-if="songId">
                    <div class="song-info">{{ songTitle }} - {{ singerName }}</div>
                    <div class="time-info">{{ startTime }} / {{ endTime }}</div>
                </div>
            </div>
            <div class="song-ctr">
                <yin-icon class="yin-play-show" :icon="playStateList[playStateIndex]" @click="fun.changePlayState">
                </yin-icon>
                <!--上一首-->
                <yin-icon class="yin-play-show" :icon="iconList.SHANGYISHOU" @click="fun.prev"></yin-icon>
                <!--播放-->
                <yin-icon :icon="playBtnIcon" @click="fun.togglePlay"></yin-icon>
                <!--下一首-->
                <yin-icon class="yin-play-show" :icon="iconList.XIAYISHOU" @click="fun.next"></yin-icon>
                <!--音量-->
                <el-dropdown class="yin-play-show" trigger="click">
                    <yin-icon v-if="volume !== 0" :icon="iconList.YINLIANG"></yin-icon>
                    <yin-icon v-else :icon="iconList.JINGYIN"></yin-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-slider class="yin-slider" style="height: 150px; margin: 10px 0" v-model="volume"
                                :vertical="true"></el-slider>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="song-ctr song-edit">
                <!--收藏-->
                <yin-icon class="yin-play-show" :class="{ active: isCollection }"
                    :icon="isCollection ? iconList.like : iconList.dislike" @click="fun.changeCollection"></yin-icon>
                <!--下载-->
                <yin-icon class="yin-play-show" :icon="iconList.download" @click="
                  downloadMusic({
                    songUrl,
                    songName: singerName + '-' + songTitle,
                  })
                "></yin-icon>
                <!--歌曲列表-->
                <yin-icon :icon="iconList.LIEBIAO" @click="fun.changeAside"></yin-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts"  setup>
import { computed, onMounted, ref, watch } from "vue";
import mixin from "@/mixins/mixin";
import YinIcon from "./YinIcon.vue";
import { HttpManager } from "@/api";
import { formatSeconds } from "@/utils";
import { Icon, RouterName } from "@/enums";
import * as store from '@/store';


//const { proxy } = getCurrentInstance() as any;

const ConfigureStore = store.useConfigureStore()
const SongStore = store.useSongStore()
const UserStore = store.useUserStore()


const { routerManager, playMusic, checkStatus, downloadMusic } = mixin();

const isCollection = ref(false); // 是否收藏
const userIdVO = computed(() => UserStore.userId);
const songIdVO = computed(() => SongStore.songId);
const token = computed(() => ConfigureStore.token);
const startTime = ref("00:00");
const endTime = ref("00:00");
const nowTime = ref(0); // 进度条的位置
const toggle = ref(true);
const volume = ref(50);
const playState = ref(Icon.XUNHUAN);
const playStateList = ref([Icon.XUNHUAN, Icon.LUANXU]);
const playStateIndex = ref(0);
const iconList = ref({
    download: Icon.XIAZAI,
    ZHEDIE: Icon.ZHEDIE,
    SHANGYISHOU: Icon.SHANGYISHOU,
    XIAYISHOU: Icon.XIAYISHOU,
    YINLIANG: Icon.YINLIANG1,
    JINGYIN: Icon.JINGYIN,
    LIEBIAO: Icon.LIEBIAO,
    dislike: Icon.Dislike,
    like: Icon.Like,
});

const userId = computed(() => UserStore.userId);
const isPlay = computed(() => SongStore.isPlay);
const playBtnIcon = computed(() => SongStore.playBtnIcon);
const songId = computed(() => SongStore.songId);
const songUrl = computed(() => SongStore.songUrl);
const songTitle = computed(() => SongStore.songTitle);
const singerName = computed(() => SongStore.singerName);
const songPic = computed(() => SongStore.songPic);
const curTime = computed(() => SongStore.curTime);
const duration = computed(() => SongStore.duration);
const currentPlayList = computed(() => SongStore.currentPlayList);
const currentPlayIndex = computed(() => SongStore.currentPlayIndex);
const showAside = computed(() => ConfigureStore.showAside);
const autoNext = computed(() => SongStore.autoNext);

//     "userId",
//     "isPlay", // 播放状态
//     "playBtnIcon", // 播放状态的图标
//     "songId", // 音乐id
//     "songUrl", // 音乐地址
//     "songTitle", // 歌名
//     "singerName", // 歌手名
//     "songPic", // 歌曲图片
//     "curTime", // 当前音乐的播放位置
//     "duration", // 音乐时长
//     "currentPlayList",
//     "currentPlayIndex", // 当前歌曲在歌曲列表的位置
//     "showAside", // 是否显示侧边栏
//     "autoNext", // 用于触发自动播放下一首

//函数  都封装在一起 方便管理
const fun = {
    initCollection: async () => {
        if (!checkStatus(false)) return;

        const userId = userIdVO.value;
        const type = '0';
        const songId = songIdVO.value;
        isCollection.value = ((await HttpManager.isCollection({ userId, type, songId })) as ResponseBody).data;
    },

    changeCollection: async () => {
        if (!checkStatus()) return;

        const userId = userIdVO.value;
        const type = '0'; //这里要看看 不能直接写死
        const songId = songIdVO.value;

        const result = isCollection.value
            ? ((await HttpManager.deleteCollection(userIdVO.value, songIdVO.value)) as ResponseBody)
            : ((await HttpManager.setCollection({ userId, type, songId })) as ResponseBody);
        // (proxy as any).$message({
        //     message: result.message,
        //     type: result.type,
        // });

        if (result.data == true || result.data == false) isCollection.value = result.data;
    },
    // 切换播放状态的图标
    changeAside: () => { ConfigureStore.setShowAside(!ConfigureStore.showAside); ConfigureStore.setMsgshowAside(false) },
    // 控制音乐播放 / 暂停
    togglePlay: () => { SongStore.setIsPlay(SongStore.isPlay ? false : true) },
    changeTime: () => {
        SongStore.setChangeTime(duration.value * (nowTime.value * 0.01))
    },


    changePlayState: () => {
        playStateIndex.value = playStateIndex.value >= playStateList.value.length - 1 ? 0 : ++playStateIndex.value;
        playState.value = playStateList[playStateIndex.value];
    },
    // 上一首
    prev: () => {
        console.log(SongStore.currentPlayList)
        if (playState.value === Icon.LUANXU) {
            let playIndex = Math.floor(Math.random() * currentPlayList.value.length);
            playIndex = playIndex === currentPlayIndex.value ? playIndex + 1 : playIndex;
            SongStore.setCurrentPlayIndex(playIndex)
            fun.toPlay(currentPlayList[playIndex].url);
        } else if (currentPlayIndex.value !== -1 && currentPlayList.value.length > 1) {
            console.log(SongStore.currentPlayIndex)
            console.log(songUrl.value)
            console.log(currentPlayList.value[currentPlayIndex.value])
            if (currentPlayIndex.value > 0) {
                SongStore.setCurrentPlayIndex(currentPlayIndex.value - 1)
                fun.toPlay(currentPlayList.value[currentPlayIndex.value].url);
            } else {
                SongStore.setCurrentPlayIndex(currentPlayList.value.length - 1)
                fun.toPlay(currentPlayList.value[currentPlayIndex.value].url);
            }
        }
    },
    // 下一首
    next: () => {
        if (playState.value === Icon.LUANXU) {
            let playIndex = Math.floor(Math.random() * currentPlayList.value.length);
            playIndex = playIndex === currentPlayIndex.value ? playIndex + 1 : playIndex;

            SongStore.setCurrentPlayIndex(playIndex)

            fun.toPlay(currentPlayList[playIndex].url);
        } else if (currentPlayIndex.value !== -1 && currentPlayList.value.length > 1) {
            if (currentPlayIndex.value < currentPlayList.value.length - 1) {
                SongStore.setCurrentPlayIndex(currentPlayIndex.value + 1)
                console.log(currentPlayIndex.value)
                console.log(songUrl.value)
                fun.toPlay(currentPlayList.value[currentPlayIndex.value].url);
            } else {
                SongStore.setCurrentPlayIndex(0)
                fun.toPlay(currentPlayList[0].url);
            }
        }
    },
    // 选中播放
    toPlay: (url) => {
        if (url && url !== songUrl.value) {
            const song = currentPlayList.value[currentPlayIndex.value];
            playMusic({
                id: song.id,
                url,
                pic: song.pic,
                index: currentPlayIndex.value,
                name: song.name,
                lyric: song.lyric,
                currentSongList: currentPlayList.value,
            });
        }
    },


    goPlayerPage: () => {
        routerManager(RouterName.Lyric, { path: `${RouterName.Lyric}/${songId}` })
    }

}

onMounted(() => {
    if (songIdVO.value) fun.initCollection();
});

watch(songIdVO, () => {
    fun.initCollection();
});
watch(token, (value) => {
    if (!value) isCollection.value = false;
});


watch(volume, () => {
    SongStore.setVolume(volume.value / 100)
})

watch(curTime, () => {
    // console.log(curTime.value)
    startTime.value = formatSeconds(curTime.value);
    endTime.value = formatSeconds(duration.value);

    // console.log(duration.value)
    // 移动进度条
    nowTime.value = (curTime.value / duration.value) * 100;
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/yin-play-bar.scss";
</style>
