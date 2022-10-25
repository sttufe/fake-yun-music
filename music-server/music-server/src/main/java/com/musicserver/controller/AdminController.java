package com.musicserver.controller;


import com.musicserver.common.R;
import com.musicserver.model.request.AdminRequest;
import com.musicserver.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * 后台管理的相关事宜
 */
@Slf4j
@RestController
public class AdminController {
    @Autowired
    private AdminService adminService;

    // 判断是否登录成功
    @PostMapping("/admin/login/status")
    public R loginStatus(@RequestBody AdminRequest adminRequest, HttpSession session) {
        log.error(session.toString());
        return adminService.verityPasswd(adminRequest, session);
    }
}
