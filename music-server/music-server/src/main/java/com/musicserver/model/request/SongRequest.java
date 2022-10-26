package com.musicserver.model.request;

import lombok.Data;

import java.util.Date;

/**
 * 歌曲详情
 */
@Data
public class SongRequest {

    private Integer id;

    private Integer singerId;

    private String name;

    private String introduction;

    private Date createTime;

    private Date updateTime;

    private String pic;

    private String lyric;

    private String url;
}
