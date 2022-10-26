package com.musicserver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.musicserver.model.domain.Banner;


import java.util.List;


public interface BannerService extends IService<Banner> {

    List<Banner> getAllBanner();

}
