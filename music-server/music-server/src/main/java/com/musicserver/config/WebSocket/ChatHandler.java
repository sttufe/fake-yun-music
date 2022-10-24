package com.musicserver.config.WebSocket;

import com.alibaba.fastjson2.JSON;

import com.musicserver.common.R;
import com.musicserver.entity.MsgContent;
import com.musicserver.utils.UserChannel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.util.concurrent.GlobalEventExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ChatHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {




    private static ChannelGroup clients = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg)   {
        // 获取客户端传输过来的消息


        String content = msg.text();
        if(!content.contains("ping"))
        {
            MsgContent msgContent= JSON.parseObject(content, MsgContent.class);
            //聊天信息
            String sendMsg=msgContent.getChatMsg().getMsg();
            //发送人
            String sender=msgContent.getChatMsg().getSenderId();
            //接收人
            String receiver = msgContent.getChatMsg().getReceiverId();

            switch (msgContent.getAction()){

                //建立连接
                case 1:
                {
                    System.out.println(msgContent.getAction());
                    //只能在这里去关联因为其它地方拿不到信息 这里能拿到发送人的信息
                    //当前是否已经有这个channel了 没有添加进去
                    if(!UserChannel.containsKey(sender)){
                        UserChannel.put(sender,ctx.channel());
                    }else
                    {
                        //当前用户绑定了失效或者多个channel更新为最新的channel->>如果允许一个用户可以多地登录并使用俩天功能可以这里开启
                        while(!UserChannel.containsKey(sender)){UserChannel.remove(sender);}
                        UserChannel.put(sender,ctx.channel());
                    }
                    break;

                }


                //2正常聊天
                case 2:{
                    try{
                        if(UserChannel.containsKey(receiver)){//查询当前用户是否已经有可用的Channel
                            System.out.println("2-1");
                            clients.find(UserChannel.get(receiver).id()).writeAndFlush( new TextWebSocketFrame( JSON.toJSONString(R.success("ok",sendMsg))));
                            System.out.println("action:2->"+UserChannel.get(receiver).id()+":已经执行。");
                        }else{
                            System.out.println("2-2");
                            clients.find(UserChannel.get(sender).id()).writeAndFlush( new TextWebSocketFrame( JSON.toJSONString(R.success("用户已经离线,或不存在。",sendMsg))));

                        }
                    }catch (Exception e){e.printStackTrace();}
                    finally {
                        break;
                    }

                }

            }

        }
    }

    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        // 当客户端连接服务端之后，获取客户端的channel，并且放到ChannelGroup中去进行管理
        clients.add(ctx.channel());
    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        // 这步是多余的，当断开连接时候ChannelGroup会自动移除对应的channel
        clients.remove(ctx.channel());

    }

    @Override
    public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
        super.channelRegistered(ctx);
        log.info("{}: 注册！",ctx.channel().id());

    }

    @Override
    public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
        super.channelUnregistered(ctx);

    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        super.channelActive(ctx);

    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        super.channelInactive(ctx);

    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        super.channelReadComplete(ctx);
       // log.info("{}:读取完成。",ctx.channel().id());

    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        super.userEventTriggered(ctx, evt);
    }

    @Override
    public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
        super.channelWritabilityChanged(ctx);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        super.exceptionCaught(ctx, cause);
        ctx.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(R.error(cause.getMessage()))));
    }
}
