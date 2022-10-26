package com.musicserver.common.aop;


import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

import java.lang.reflect.Method;


@Slf4j
@Component
@Aspect //定义关系
public class GetParamsAspect {

    //定义切入点
    @Pointcut("@annotation(com.musicserver.common.aop.GetParams)")
    public void pt1(){
    }


    //注解已经标明从哪里切进去 环绕通知就是 方法开始之前和执行完成都会执行 也是最常用的注解
    @Around("pt1()")
   public Object logParams(ProceedingJoinPoint joinPoint) throws Throwable {
        StopWatch watch=new StopWatch();
        watch.start("begin");

        Object result= joinPoint.proceed();

        record(joinPoint);
        watch.stop();
        watch.prettyPrint();
        return result;
    }

    private  void record(@NotNull ProceedingJoinPoint joinPoint){
        MethodSignature signature=(MethodSignature) joinPoint.getSignature();

        Method method=signature.getMethod();

        GetParams getParams=method.getAnnotation(GetParams.class);

        log.info("=================start===================");
        log.info("module: {}",getParams.module());
        log.info("operation: {}",getParams.operation());


        String className=joinPoint.getTarget().getClass().getName();
        String methodName =signature.getName();

        log.info("className:{} ,methodName:{}",className,methodName);

        Object[] args=joinPoint.getArgs();

        String params= JSON.toJSONString(args[0]);

        log.info("参数: {}",params);
        log.info("=================end===================");

    }

}
