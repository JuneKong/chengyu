var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 资源管理类
 */
var LocalDateManager = (function () {
    function LocalDateManager() {
        /**
         * 资源组
         */
        this.items = [];
        /**
         * 当前等级的最大值
         */
        this.KEY_LEVEL_MAX_VALUE = "KEY_LEVEL_MAX_VALUE";
        this.items = RES.getRes("questions_json");
    }
    //单例
    LocalDateManager.getInstance = function () {
        if (LocalDateManager.instance == null) {
            LocalDateManager.instance = new LocalDateManager();
        }
        return LocalDateManager.instance;
    };
    /**
     * 获得所有等级数据
     */
    LocalDateManager.prototype.getAllLevelDate = function () {
        if (this.items == null) {
            this.items = RES.getRes("questions_json");
        }
        return this.items;
    };
    /**
     * 根据等级获得数据
     */
    LocalDateManager.prototype.getDateByLevel = function (level) {
        if (level < 0) {
            level = 0;
        }
        if (level >= this.items.length) {
            level = this.items.length - 1;
        }
        return this.items[level];
    };
    Object.defineProperty(LocalDateManager.prototype, "maxLevel", {
        /**
         * 获得最大值
         */
        get: function () {
            return this._maxLevel;
        },
        /**
         * 设置最大值
         */
        set: function (level) {
            if (this._maxLevel == level) {
                return;
            }
            this._maxLevel = level;
        },
        enumerable: true,
        configurable: true
    });
    return LocalDateManager;
}());
__reflect(LocalDateManager.prototype, "LocalDateManager");
/**
 * 等级数据结构
 */
var LevelDateItem = (function () {
    function LevelDateItem() {
    }
    return LevelDateItem;
}());
__reflect(LevelDateItem.prototype, "LevelDateItem");
