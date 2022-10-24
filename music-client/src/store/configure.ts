import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigureStore = defineStore(
	'configure',
	() => {
		//getter
		const token = ref(false)
		const showAside = ref<boolean>(false)
		const searchWord = ref('')
		const activeNavName = ref('')
		const MsgshowAside = ref<boolean>(false)

		//action

		const setToken = (v_token: boolean) => {
			token.value = v_token
		}
		const setActiveNavName = (vActiveNavName: string) => {
			activeNavName.value = vActiveNavName
		}

		const setShowAside = (vshowAside: boolean) => {
			showAside.value = vshowAside
		}
		const setSearchWord = (v_searchWord: string) => {
			searchWord.value = v_searchWord
		}
		const setMsgshowAside = (msgAsideShow) => {
			MsgshowAside.value = msgAsideShow
		}

		return {
			token,
			showAside,
			searchWord,
			activeNavName,
			MsgshowAside,
			setToken,
			setActiveNavName,
			setShowAside,
			setSearchWord,
			setMsgshowAside,
		}
	},

	{
		persist: {
			enabled: true,
		},
	}
)
