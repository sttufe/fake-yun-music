<template>
    <transition name="aside-fade">
        <div class="msg-drawer" v-if="MsgshowAside">
            <h3 class="title">Netty+Websocket 通信</h3>


            <div class="main">
                <textarea readonly class="textarea" rows="30" v-model="textAre"></textarea>
            </div>

            <div class="div-foot">
                <input class="input" type="text" v-model="sendText">
                <button @click="send">发送</button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import * as store from '@/store'
import Socket from '@/utils/websocket'
import { ChatContent, ChatMsg } from '@/types/ChatContent'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const sendData = ref({})

const useConfigureStore = store.useConfigureStore()
const MsgshowAside = computed(() => useConfigureStore.MsgshowAside); // 是否显示侧边栏

const sendText = ref('')


let soket = null;

let chatMsg: ChatMsg;

let chatContent: ChatContent;

const textAre = ref("")


const senderId = computed(() => userStore.userId)
const receiverId = computed(() => {
    if (senderId.value == "5")
        return 29
    else
        return 5
})




const initSocket = () => {
    soket = new Socket({ url: "ws://localhost:9099/ws", messageCb: handleMessage });
    soket.onopen(() => {
        chatMsg = new ChatMsg(senderId.value, "", "connect", 1);
        chatContent = new ChatContent(1, chatMsg)
        soket.send(chatContent)

    })
}


const send = () => {
    if (senderId.value == "5") { console.log(senderId.value) }
    if (senderId.value == "29") { console.log(senderId.value) }
    chatMsg = new ChatMsg(senderId.value, receiverId.value, "", 1);
    chatMsg.setMsg(sendText.value)
    chatContent = new ChatContent(2, chatMsg)
    soket.send(chatContent)
}

//收到消息时候的回调函数
const handleMessage = (data) => {
    console.log(data)
    textAre.value = textAre.value + data
}
onMounted(() => {
    initSocket();
})


</script>

<style lang="scss" scoped>
@import "@/assets/css/msg-drawer.scss";
</style>
