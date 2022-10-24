<template>
    <audio :src="HttpManager.attachImageUrl(songUrl)" :controls="true" :ref="player" preload="true" @canplay="canplay"
        @timeupdate="timeupdate" @ended="ended">
        <!--（1）属性：controls，preload（2）事件：canplay，timeupdate，ended（3）方法：play()，pause() -->
        <!--controls：向用户显示音频控件（播放/暂停/进度条/音量）   直接写为true 没有什么问题-->
        <!--preload：属性规定是否在页面加载后载入音频-->
        <!--canplay：当音频/视频处于加载过程中时，会发生的事件-->
        <!--timeupdate：当目前的播放位置已更改时-->
        <!--ended：当目前的播放列表已结束时-->
    </audio>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useSongStore } from '@/store'
import { HttpManager } from "@/api";
import { Icon } from '@/enums'



const songStore = useSongStore()
const divRef = ref<HTMLAudioElement>();
const player = (el: any) => {
    divRef.value = el;
};

//conputed  直接从store取值  因为computed 是响应式的 所以并不需要定义为ref 
const songUrl = computed(() => songStore.songUrl); // 音乐链接
const isPlay = computed(() => songStore.isPlay); // 播放状态
const volume = computed(() => songStore.volume); // 音量
const changeTime = computed(() => songStore.changeTime); // 指定播放时刻
const autoNext = computed(() => songStore.autoNext); // 用于触发自动播放下一首
// 监听播放还是暂停
watch(isPlay, () => togglePlay());
// 跳到指定时刻播放
watch(changeTime, () => {
    //divRef   为当前播放的音频 currentTime 为播放到哪了
    divRef.value.currentTime = changeTime.value
});
// 声音同理
watch(volume, (value) => (divRef.value.volume = value));

// 开始 / 暂停
const togglePlay = () => {
    //切换播放的图标 其实也可以不用放到这里处理，但是为了方便直接在这里修改了
    console.log(isPlay.value)
    isPlay.value ? divRef.value.play() : divRef.value.pause();
    isPlay.value ? songStore.setPlayBtnIcon(Icon.ZANTING) : songStore.setPlayBtnIcon(Icon.BOFANG);

}
// 获取歌曲链接后准备播放
const canplay = () => {

    //  记录音乐时长
    songStore.setDuration(divRef.value.duration)
    //  开始播放
    divRef.value.play();
    songStore.setIsPlay(true)
}
// 音乐播放时记录音乐的播放位置
const timeupdate = () => {
    songStore.setCurTime(divRef.value.currentTime)
}
// 音乐播放结束时触发
const ended = () => {
    songStore.setIsPlay(false);
    songStore.setCurTime(0);
    songStore.setAutoNext(!autoNext.value);
}


</script>

<style scoped>
audio {
    display: none;
}
</style>
