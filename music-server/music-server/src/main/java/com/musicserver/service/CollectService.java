package com.musicserver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.musicserver.common.R;
import com.musicserver.model.domain.Collect;
import com.musicserver.model.request.CollectRequest;


public interface CollectService extends IService<Collect> {

    R addCollection(CollectRequest addCollectRequest);

    R existSongId(CollectRequest isCollectRequest);

    R deleteCollect(Integer userId,Integer songId);

    R collectionOfUser(Integer userId);
}
