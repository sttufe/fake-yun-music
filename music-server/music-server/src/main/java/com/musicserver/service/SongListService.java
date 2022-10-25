package com.musicserver.service;

import com.baomidou.mybatisplus.extension.service.IService;

import com.musicserver.common.R;
import com.musicserver.model.domain.SongList;
import com.musicserver.model.request.SongListRequest;
import org.springframework.web.multipart.MultipartFile;

public interface SongListService extends IService<SongList> {

    R addSongList(SongListRequest addSongListRequest);

    R updateSongListMsg(SongListRequest updateSongListRequest);

    R updateSongListImg(MultipartFile avatorFile, int id);

    R deleteSongList(Integer id);

    R allSongList();

    R likeTitle(String title);

    R likeStyle(String style);
}
