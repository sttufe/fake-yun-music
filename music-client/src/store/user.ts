import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
	'user',
	() => {
		//变量定义区
		const userId = ref('')
		const userName = ref('')
		const userPic = ref('')

		//ACTION
		const SetUserId = (v_userId: string) => {
			userId.value = v_userId
		}

		const setUsername = (v_username: string) => {
			userName.value = v_username
		}

		const setUserPic = (v_userPic: string) => {
			userPic.value = v_userPic
		}

		const clear = () => {
			userId.value = ''
			userName.value = ''
			userPic.value = ''
		}

		return {
			userId,
			userName,
			userPic,
			SetUserId,
			setUsername,
			setUserPic,
			clear,
		}
	},
	{
		persist: {
			enabled: true,
		},
	}
)
