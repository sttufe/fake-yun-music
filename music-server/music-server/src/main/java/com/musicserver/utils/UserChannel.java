package com.musicserver.utils;

import io.netty.channel.Channel;

import java.util.HashMap;

public  class UserChannel {

    private static HashMap<String, Channel> manager =new HashMap<>();


    //channel 管理
    public  static void put(String senderId,Channel channel){
        manager.put(senderId,channel);
    }

    //获得一个Channel
    public  static Channel get(String senderId){
        return manager.get(senderId);
    }

    public static boolean containsKey(String key){
        return manager.containsKey(key);
    }

    public static void remove(String key){

        manager.remove(key);
    }


}


