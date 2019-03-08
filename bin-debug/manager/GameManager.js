var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var manager;
(function (manager) {
    /**
     * 游戏管理类
     */
    var GameManager = (function () {
        function GameManager() {
            /**
             * 实例化的现实对象
             */
            this.classDict = {};
            this.isDrawBgMask = false;
            this.defaultBgMaskColor = 0x0;
            this.defaultBgMaskAlpha = 0.8;
            // this.gameBegin = new GameBeginPanel();
        }
        //单例
        GameManager.getInstance = function () {
            if (GameManager.instance == null) {
                GameManager.instance = new GameManager();
            }
            return GameManager.instance;
        };
        /**
         * 设置根舞台
         */
        GameManager.prototype.setRootStage = function (s) {
            this._stage = s;
        };
        /**
         * 添加子场景
         * @param clazz 添加的页面
         * @param removeClazz 移除的页面组
         * @param modal 是否有背景遮罩
         */
        GameManager.prototype.addSubMap = function (clazz, removeClazz, modal) {
            var _this = this;
            var className = egret.getQualifiedClassName(clazz);
            var child = this.classDict[className];
            if (child == null) {
                child = new clazz();
                this.classDict[className] = child;
            }
            this._stage.addChild(child);
            if (removeClazz) {
                removeClazz.forEach(function (item) {
                    _this.removeSubMap(item);
                });
            }
            if (modal && modal == true) {
                this.isDrawBgMask = modal;
                this.drawBgMask();
            }
            return child;
        };
        /**
         * 删除子场景
         */
        GameManager.prototype.removeSubMap = function (clazz) {
            var className = egret.getQualifiedClassName(clazz);
            var instance = this.classDict[className];
            if (instance == null) {
                return;
            }
            if (instance.parent) {
                instance.parent.removeChild(instance);
            }
            if (this.isDrawBgMask) {
                this.removeBgMask();
            }
        };
        /**
         * 绘制背景遮罩
         */
        GameManager.prototype.drawBgMask = function () {
            var num = this._stage.numChildren;
            this.bgMask = new egret.Sprite();
            this.bgMask.touchEnabled = true;
            this._stage.addChildAt(this.bgMask, num - 1);
            this.bgMask.graphics.clear();
            this.bgMask.graphics.beginFill(this.defaultBgMaskColor, this.defaultBgMaskAlpha);
            this.bgMask.graphics.drawRect(0, 0, this._stage.width, this._stage.height);
            this.bgMask.graphics.endFill();
        };
        /**
         * 移除背景遮罩
         */
        GameManager.prototype.removeBgMask = function () {
            if (this.bgMask && this.bgMask.parent) {
                this.bgMask.parent.removeChild(this.bgMask);
            }
        };
        return GameManager;
    }());
    manager.GameManager = GameManager;
    __reflect(GameManager.prototype, "manager.GameManager");
})(manager || (manager = {}));
