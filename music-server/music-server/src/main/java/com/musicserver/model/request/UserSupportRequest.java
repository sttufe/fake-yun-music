package com.musicserver.model.request;

import lombok.Data;


@Data
public class UserSupportRequest {
    Integer id;
    Integer commentId;
    Integer userId;
}
