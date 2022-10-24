import { defineStore } from 'pinia'
import { ref } from 'vue'
const useUserStore = defineStore(
	'user',
	() => {
		const token = ref<boolean>(false)
		const userPic = ref('/img/avatorImages/user.jpg')
		const isPlay = ref(false)
		const url = ref('')
		const id = ref('')
		const breadcrumbList = ref<{ path: String; name: String }[]>([])

		const setUserPic = (v_userPic: string) => {
			userPic.value = v_userPic
		}
		const setIsPlay = (v_isPlay: boolean) => {
			isPlay.value = v_isPlay
		}
		const setUrl = (v_url: string) => {
			url.value = v_url
		}
		const setId = (v_id: string) => {
			id.value = v_id
		}
		const setBreadcrumbList = (
			v_breadcrumbList: { path: String; name: String }[]
		) => {
			breadcrumbList.value = v_breadcrumbList
		}

		const setToken = (vtaken) => {
			token.value = vtaken
		}

		return {
			userPic,
			isPlay,
			url,
			id,
			breadcrumbList,
			token,
			setUserPic,
			setIsPlay,
			setUrl,
			setId,
			setBreadcrumbList,
			setToken,
		}
	},
	{ persist: true }
)

export { useUserStore }
