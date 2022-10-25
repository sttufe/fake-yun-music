package com.musicserver.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.musicserver.model.domain.Song;
import org.springframework.stereotype.Repository;

@Repository
public interface SongMapper extends BaseMapper<Song> {

}
