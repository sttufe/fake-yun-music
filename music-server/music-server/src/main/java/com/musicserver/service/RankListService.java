package com.musicserver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.musicserver.common.R;
import com.musicserver.model.domain.RankList;
import com.musicserver.model.request.RankListRequest;


public interface RankListService extends IService<RankList> {

    R addRank(RankListRequest rankListAddRequest);

    R rankOfSongListId(Long songListId);

    R getUserRank(Long consumerId, Long songListId);

}
