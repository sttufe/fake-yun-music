export class ChatContent {
	//消息类型
	private action: number

	//主体
	private chatMsg: ChatMsg

	//扩展
	private extand?: string

	constructor(action: number, chatMsg: ChatMsg, extand?: string) {
		this.action = action
		this.chatMsg = chatMsg
		this.extand = extand
	}

	public getAction(): number {
		return this.action
	}
	public setAction(value: number) {
		this.action = value
	}

	public getChatMsg(): ChatMsg {
		return this.chatMsg
	}
	public setChatMsg(value: ChatMsg) {
		this.chatMsg = value
	}

	public getExtand(): string {
		return this.extand
	}
	public setExtand(value: string) {
		this.extand = value
	}
}

//内部
export class ChatMsg {
	//发送者id
	private senderId: string
	public getSenderId(): string {
		return this.senderId
	}
	public setSenderId(value: string) {
		this.senderId = value
	}

	//接收消息id
	private receiverId: string
	public getReceiverId(): string {
		return this.receiverId
	}
	public setReceiverId(value: string) {
		this.receiverId = value
	}

	//消息内容
	private msg: string
	public getMsg(): string {
		return this.msg
	}
	public setMsg(value: string) {
		this.msg = value
	}
	//标记
	private msgId: string
	public getMsgId(): string {
		return this.msgId
	}
	public setMsgId(value: string) {
		this.msgId = value
	}

	constructor(senderIdr, receiverId, msg, msgId) {
		this.msg = msg
		this.senderId = senderIdr
		this.receiverId = receiverId
		this.msgId = msgId
	}
}
