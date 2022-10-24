package com.musicserver.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MsgContent {
    //动作类型
    private  Integer action;

    //聊天内容实体类
    private ChatMsg chatMsg;

    //扩展
    private String extend;


}