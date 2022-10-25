package com.musicserver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.musicserver.common.R;
import com.musicserver.model.domain.Admin;
import com.musicserver.model.request.AdminRequest;

import javax.servlet.http.HttpSession;

public interface AdminService extends IService<Admin> {

    R verityPasswd(AdminRequest adminRequest, HttpSession session);
}
