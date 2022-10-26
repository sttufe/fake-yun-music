package com.musicserver.enums;


/**
 * 信息交换模块枚举
 */
public enum MsgActionEnum {
    CONNECT(1,"第一次连接或重连"),
    CHAT(2,"聊天消息"),
    SIGNED(3,"消息签收"),
    KEEPALIVE(4,"客户端保持心跳");

    public final Integer type;
    public final  String content;

    MsgActionEnum(Integer type, String content) {
        this.type = type;
        this.content = content;
    }
}
