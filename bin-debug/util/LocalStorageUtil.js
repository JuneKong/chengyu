var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 本地缓存
 */
var LocalStorageUtil = (function () {
    function LocalStorageUtil() {
        /**
         * 背景音乐
         */
        this.KEY_MUSIC_VOLUME = "KEY_MUSIC_VOLUME";
        /**
         * 音效
         */
        this.KEY_SOUND_VOLUME = "KEY_SOUND_VOLUME";
        /**
         * 等前最大的等级
         */
        this.KEY_LEVEL_MAX_VALUE = "KEY_LEVEL_MAX_VALUE";
        /**
         * 当前等级
         */
        this.KEY_CURRENT_LEVEL = "KEY_CURRENT_LEVEL";
    }
    //单例
    LocalStorageUtil.getInstance = function () {
        if (LocalStorageUtil.instance == null) {
            LocalStorageUtil.instance = new LocalStorageUtil();
        }
        return LocalStorageUtil.instance;
    };
    /**
     * 读取本地缓存
     */
    LocalStorageUtil.prototype.getItem = function (key) {
        return egret.localStorage.getItem(key);
    };
    LocalStorageUtil.prototype.setItem = function (key, value) {
        egret.localStorage.setItem(key, value);
    };
    Object.defineProperty(LocalStorageUtil.prototype, "musicVolume", {
        /**
         * 获得背景音乐音量
         */
        get: function () {
            var value = this.getItem(this.KEY_MUSIC_VOLUME);
            if (value == null) {
                this.musicVolume = 0.8;
                return 0.8;
            }
            var val = parseFloat(value);
            if (val < 0) {
                val = 0;
            }
            else if (val > 1) {
                val = 1;
            }
            return val;
        },
        /**
         * 设置背景音乐音量
         */
        set: function (value) {
            this.setItem(this.KEY_MUSIC_VOLUME, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalStorageUtil.prototype, "soundVolume", {
        /**
         * 获得音效音量
         */
        get: function () {
            var value = this.getItem(this.KEY_SOUND_VOLUME);
            if (value == null) {
                this.soundVolume = 0.8;
                return 0.8;
            }
            var val = parseFloat(value);
            if (val < 0) {
                val = 0;
            }
            else if (val > 1) {
                val = 1;
            }
            return val;
        },
        /**
         * 设置音效音量
         */
        set: function (value) {
            this.setItem(this.KEY_SOUND_VOLUME, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获得所有数据
     */
    LocalStorageUtil.prototype.allDate = function () {
        return LocalDateManager.getInstance().getAllLevelDate();
    };
    Object.defineProperty(LocalStorageUtil.prototype, "maxLevel", {
        /**
         * 获得最大值
         */
        get: function () {
            var level = this.getItem(this.KEY_LEVEL_MAX_VALUE);
            if (level == "" || level == null) {
                this.maxLevel = 1;
                return 1;
            }
            var val = parseFloat(level);
            val = this.interval(val);
            return val;
        },
        /**
         * 设置最大值
         */
        set: function (level) {
            this.setItem(this.KEY_LEVEL_MAX_VALUE, level.toString());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置的值是否在区间内
     */
    LocalStorageUtil.prototype.interval = function (val) {
        if (val < 0) {
            val = 1;
        }
        else if (val >= this.allDate().length) {
            val = this.allDate().length - 1;
        }
        return val;
    };
    Object.defineProperty(LocalStorageUtil.prototype, "currentLevel", {
        /**
         * 获得当前等级
         */
        get: function () {
            var level = this.getItem(this.KEY_CURRENT_LEVEL);
            if (level == null) {
                this.currentLevel = 1;
                return 1;
            }
            var val = parseFloat(level);
            val = this.interval(val);
            return val;
        },
        /**
         * 设置当前等级
         */
        set: function (level) {
            this.setItem(this.KEY_CURRENT_LEVEL, level.toString());
        },
        enumerable: true,
        configurable: true
    });
    return LocalStorageUtil;
}());
__reflect(LocalStorageUtil.prototype, "LocalStorageUtil");
//# sourceMappingURL=LocalStorageUtil.js.map