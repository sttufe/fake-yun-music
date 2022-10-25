package com.musicserver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.musicserver.common.R;
import com.musicserver.model.domain.Comment;
import com.musicserver.model.request.CommentRequest;


public interface CommentService extends IService<Comment> {

    R addComment(CommentRequest addCommentRequest);

    R updateCommentMsg(CommentRequest upCommentRequest);

    R deleteComment(Integer id);

    R commentOfSongId(Integer songId);

    R commentOfSongListId(Integer songListId);

}
