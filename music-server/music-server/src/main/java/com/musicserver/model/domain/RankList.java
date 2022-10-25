package com.musicserver.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@TableName(value = "rank_list")
@Data
public class RankList implements Serializable {

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("songListId")
    private Long songListId;

    @TableField("consumerId")
    private Long consumerId;

    private Integer score;

}
