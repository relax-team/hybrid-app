let config = {
    env: 'dev',     //当前开发环境: local,dev,pro

    ak: "xxx", // 高德地图key
    bk: "xxx", // 百度地图key

    //定位信息
    location: {
        //默认
        defaults: {
            lat: 30.22965,
            lng: 120.192567,
            areaId: "330102",
            province: "浙江省",
            city: "杭州市",
            district: "上城区",
            street: "望江东路",
            source: "default"
        },
        //当前
        current: null,
        //GPS
        gps: null
    }

};

//获取配置文件
Object.assign(config, require(`./env/${config.env}`).default);

export default config;
