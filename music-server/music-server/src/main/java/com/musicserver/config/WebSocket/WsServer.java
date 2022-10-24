package com.musicserver.config.WebSocket;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * 服务端基本配置，通过一个静态单例类，保证启动时候只被加载一次
 */
@Component
public class WsServer {

    /**
     * 单例静态内部类
     */
    public static class SingletionWServer{
        static final WsServer instance = new WsServer();
    }

    public static WsServer getInstance(){
        return SingletionWServer.instance;
    }

    //主线程池
    private EventLoopGroup mainGroup ;
    //从线程 池
    private EventLoopGroup subGroup;
    //服务启动对象
    private ServerBootstrap server;
    private ChannelFuture future;

    public WsServer(){
        mainGroup = new NioEventLoopGroup();
        subGroup = new NioEventLoopGroup();
        server = new ServerBootstrap();
        server.group(mainGroup, subGroup)
                .channel(NioServerSocketChannel.class)
                .childHandler(new WebSocketServerInitializer());//添加自定义初始化处理器
    }

    /**
     * PostConstruct 为 springboot 启动成功过后，
     */
    @PostConstruct
    public void start(){
        future = this.server.bind(9099);
        System.err.println("netty 服务端启动完毕 .....");
    }
}
