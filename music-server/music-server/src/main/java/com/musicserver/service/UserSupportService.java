package com.musicserver.service;

import com.baomidou.mybatisplus.extension.service.IService;

import com.musicserver.common.R;
import com.musicserver.model.domain.UserSupport;
import com.musicserver.model.request.UserSupportRequest;


public interface UserSupportService extends IService<UserSupport> {

    R isUserSupportComment(UserSupportRequest userSupportRequest);

    R insertCommentSupport(UserSupportRequest userSupportRequest);

    R deleteCommentSupport(UserSupportRequest userSupportRequest);
}
