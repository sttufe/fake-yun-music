import { defineStore } from 'pinia'
import { Icon } from '@/enums'
import { ref } from 'vue'

export const useSongStore = defineStore(
	'song',
	() => {
		//getter
		/** 音乐信息 */
		const songId = ref('') // 音乐 ID
		const songTitle = ref('') // 歌名
		const songUrl = ref('') // 音乐 URL
		const songPic = ref(`/img/songPic/tubiao.jpg`) // 歌曲图片
		const singerName = ref('') //  歌手名
		const lyric = ref<[]>([]) // 处理后的歌词数据

		/** 音乐播放信息 */
		const isPlay = ref(false) // 播放状态
		const playBtnIcon = ref(Icon.BOFANG) // 播放状态的图标
		const volume = ref(0) // 音量
		const duration = ref(0) // 音乐时长
		const curTime = ref(0) // 当前音乐的播放位置
		const changeTime = ref(0) // 指定播放时刻
		const autoNext = ref(true) // 用于触发自动播放下一首

		/** 音乐列表信息 */
		const currentPlayList = ref<[]>([]) // 当前播放列表
		const songDetails = ref(null) // 单个歌单信息
		const currentPlayIndex = ref(-1) // 当前歌曲在歌曲列表的位置

		//action
		const setSongId = (v_songId: string) => {
			songId.value = v_songId
		}
		const setSongTitle = (v_songTitle: string) => {
			songTitle.value = v_songTitle
		}
		const setSongUrl = (v_songUrl: string) => {
			songUrl.value = v_songUrl
		}
		const setSongPic = (v_songPic: string) => {
			songPic.value = v_songPic
		}
		const setSingerName = (v_singerName: string) => {
			singerName.value = v_singerName
		}
		const setAutoNext = (v_autoNext: boolean) => {
			autoNext.value = v_autoNext
		}
		const setLyric = (v_lyric: []) => {
			lyric.value = v_lyric
		}

		const setIsPlay = (v_isPlay: boolean) => {
			isPlay.value = v_isPlay
		}
		const setPlayBtnIcon = (v_playBtnIcon: any) => {
			playBtnIcon.value = v_playBtnIcon
		}
		const setVolume = (v_volume: any) => {
			volume.value = v_volume
		}
		const setDuration = (v_duration: any) => {
			duration.value = v_duration
		}
		const setCurTime = (v_curTime: any) => {
			curTime.value = v_curTime
		}
		const setChangeTime = (v_changeTime: any) => {
			changeTime.value = v_changeTime
		}

		const setCurrentPlayList = (v_currentPlayList: any) => {
			currentPlayList.value = v_currentPlayList
		}
		const setSongDetails = (v_songDetails: any) => {
			songDetails.value = v_songDetails
		}

		const setCurrentPlayIndex = (v_currentPlayIndex: any) => {
			currentPlayIndex.value = v_currentPlayIndex
		}

		const playMusic = ({
			id,
			url,
			pic,
			index,
			songTitle,
			singerName,
			lyric,
			currentSongList,
		}: any) => {
			setSongId(id)
			setSongUrl(url)
			setSongPic(pic)
			setCurrentPlayIndex(index)
			setSongTitle(songTitle)
			setSingerName(singerName)
			setLyric(lyric)
			setCurrentPlayList(currentSongList)
		}

		return {
			songId,
			songTitle,
			songUrl,
			songPic,
			singerName,
			lyric,
			isPlay,
			playBtnIcon,
			volume,
			duration,
			curTime,
			changeTime,
			autoNext,
			currentPlayList,
			songDetails,
			currentPlayIndex,
			setSongId,
			setSongTitle,
			setSongUrl,
			setSongPic,
			setSingerName,
			setAutoNext,
			setLyric,
			setIsPlay,
			setPlayBtnIcon,
			setVolume,
			setDuration,
			setCurTime,
			setChangeTime,
			setCurrentPlayList,
			setSongDetails,
			setCurrentPlayIndex,
			playMusic,
		}
	},
	{
		persist: {
			enabled: true,
		},
	}
)
