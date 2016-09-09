/**
 * Created by zhoubo on 16/9/7.
 */

/** 访问微博服务接口的地址 */

export const KEY_ACCESS_TOKEN = "access_token";

export const API_SERVER = "https://api.weibo.com/2";

export const READ_USER = "/users/show.json";

export const READ_friends = "/friendships/groups.json";

// 获取当前登录用户及其所关注（授权）用户的最新微博
export const public_timeline = "/statuses/public_timeline.json";