package com.musicserver.common.aop;


import java.lang.annotation.*;

/**
 * module 标记模块
 * operation 操作类型
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface GetParams {
    String module() default "";
    String operation() default "";
}
