package com.musicserver.model.request;

import lombok.Data;


/**
 * 歌单对应歌曲
 */
@Data
public class SongListRequest {
    private Integer id;

    private String title;

    private String pic;

    private String style;

    private String introduction;
}
