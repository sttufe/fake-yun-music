<template>
    <transition name="aside-fade">
        <div class="yin-current-play" v-if="showAside">
            <h2 class="title">当前播放</h2>
            <div class="control">共 {{ (currentPlayList && currentPlayList.length) || 0 }} 首</div>
            <ul class="menus">
                <li v-for="(item, index) in currentPlayList" :class="{ 'is-play': songId === item.id }" :key="index"
                    @click="playMusic({
                      id: item.id,
                      url: item.url,
                      pic: item.pic,
                      index: index,
                      name: item.name,
                      lyric: item.lyric,
                      currentSongList: currentPlayList,
                    })">
                    {{ getSongTitle(item.name) }}
                </li>
            </ul>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import * as store from '@/store'
import mixin from "@/mixins/mixin";


const useSongStore = store.useSongStore()
const useConfigureStore = store.useConfigureStore()

const { getSongTitle, playMusic } = mixin();

const songId = computed(() => useSongStore.songId); // 音乐 ID
const currentPlayList = computed(() => useSongStore.currentPlayList); // 当前播放
const showAside = computed(() => useConfigureStore.showAside); // 是否显示侧边栏


</script>

<style lang="scss" scoped>
@import "@/assets/css/yin-current-play.scss";
</style>
