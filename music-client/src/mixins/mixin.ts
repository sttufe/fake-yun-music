import { getCurrentInstance, computed } from 'vue'
import { LocationQueryRaw } from 'vue-router'
import { RouterName } from '@/enums'
import { HttpManager } from '@/api'
import router from '@/router'
import { useSongStore, useUserStore, useConfigureStore } from '@/store'
import { ElMessage } from 'element-plus'
interface routerOptions {
	path?: string
	query?: LocationQueryRaw
}

export default function () {
	//const { proxy } = getCurrentInstance() as any

	const songStore = useSongStore()
	const userStore = useUserStore()
	const configureStore = useConfigureStore()

	const token = computed(() => configureStore.token)

	function getUserSex(sex: number) {
		if (sex === 0) {
			return '女'
		} else if (sex === 1) {
			return '男'
		}
	}

	// 获取歌曲名
	function getSongTitle(str: string) {
		return str.split('-')[1]
	}

	// 获取歌手名
	function getSingerName(str: string) {
		return str.split('-')[0]
	}

	// 判断登录状态
	function checkStatus(status?: boolean) {
		if (!token.value) {
			if (status !== false)
				ElMessage({
					message: '请先登录',
					type: 'warning',
				})
			return false
		}
		return true
	}

	// 播放
	function playMusic({
		id,
		url,
		pic,
		index,
		name,
		lyric,
		currentSongList,
	}: any) {
		const songTitle = getSongTitle(name)
		const singerName = getSingerName(name)
		songStore.playMusic({
			id,
			url,
			pic,
			index,
			songTitle,
			singerName,
			lyric,
			currentSongList,
		})
	}

	// 下载
	async function downloadMusic({ songUrl, songName }: any) {
		if (!songUrl) {
			ElMessage({
				message: '下载链接为空！',
				type: 'error',
			})
			console.error('下载链接为空！')
			return
		}

		const result = (await HttpManager.downloadMusic(songUrl)) as any //Response   ResponseBody
		const eleLink = document.createElement('a')
		eleLink.download = `${songName}.mp3`
		eleLink.style.display = 'none'
		// 字符内容转变成 blob 地址
		const blob = new Blob([result.data])
		eleLink.href = URL.createObjectURL(blob)
		document.body.appendChild(eleLink) // 触发点击
		eleLink.click()
		document.body.removeChild(eleLink) // 移除
	}

	// 导航索引
	function changeIndex(value: string) {
		configureStore.setActiveNavName(value)
	}
	// 路由管理
	function routerManager(
		routerName: string | number,
		options: routerOptions
	) {
		switch (routerName) {
			case RouterName.Search:
				router.push({ path: options.path, query: options.query })
				break
			case RouterName.Home:
			case RouterName.SongSheet:
			case RouterName.SongSheetDetail:
			case RouterName.Singer:
			case RouterName.SingerDetail:
			case RouterName.Personal:
			case RouterName.PersonalData:
			case RouterName.Setting:
			case RouterName.SignIn:
			case RouterName.SignUp:
			case RouterName.SignOut:
			case RouterName.Lyric:
			case RouterName.Error:
			default:
				router.push({ path: options.path })
				break
		}
	}

	function goBack(step = -1) {
		router.go(step)
	}

	return {
		getUserSex,
		getSongTitle,
		getSingerName,
		changeIndex,
		checkStatus,
		playMusic,
		routerManager,
		goBack,
		downloadMusic,
	}
}
