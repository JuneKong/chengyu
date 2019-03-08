var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * 等级选择页面
 */
var GameSeletorPanel = (function (_super) {
    __extends(GameSeletorPanel, _super);
    function GameSeletorPanel() {
        var _this = _super.call(this) || this;
        /**
         * 存放等级按钮
         */
        _this.icons = [];
        /**
         * 当前等级
         */
        _this.curLevel = 0;
        _this.max_value = 400;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.UIComponentHandler, _this);
        _this.skinName = "resource/skins/GameSeletorSkin.exml";
        return _this;
    }
    /**
     * ui资源创建完成后调度
     */
    GameSeletorPanel.prototype.UIComponentHandler = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickBackHandler, this);
        this.local = LocalStorageUtil.getInstance();
        this.createLevels();
    };
    /**
     * 返回
     */
    GameSeletorPanel.prototype.onclickBackHandler = function (e) {
        GameBeginPanel.open();
    };
    /**
     * 创建等级按钮
     */
    GameSeletorPanel.prototype.createLevels = function () {
        //创建地图选项
        var row = 20;
        var col = 10;
        var spanx = 640 / col; //计算行x间隔
        var spany = 1150 / row; //计算列y间隔
        var group_map = new eui.Group(); //地图背景
        group_map.width = 640;
        group_map.height = (spany * 400); //算出最大尺寸
        var countBg = group_map.height / 1150;
        //填充背景
        // this.createBackground(countBg);
        //以正弦曲线绘制关卡图标的路径
        this.createLevelIcon(group_map, spanx, spany);
        //开启位图缓存模式
        // group.cacheAsBitmap = true;
        this.group_levels.addChild(group_map);
        //卷动到最底层
        this.Vscroller = group_map.height - 1150;
        this.group_levels.scrollV = this.Vscroller;
        this.createArrow(group_map);
    };
    /**
     * 创建背景
     * @param 个数
     */
    GameSeletorPanel.prototype.createBackground = function (count) {
        for (var i = 0; i < count; i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1136;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img, 0);
        }
    };
    /**
     * 创建等级图标
     * @param 组
     */
    GameSeletorPanel.prototype.createLevelIcon = function (group, spanx, spany) {
        this.max_Level = this.local.maxLevel;
        //以正弦曲线绘制关卡图标的路径
        for (var i = 0; i < 400; i++) {
            var icon = new GameSeletItem();
            icon.level = i + 1;
            icon.y = spany * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i / 2;
            icon.y = group.height - icon.y - spany;
            if (i == 0) {
                icon.y -= 35;
            }
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.levelTouchHandler, this);
            //依据进度设置关卡显示
            icon.enabled = i < this.max_Level;
            //保存到一个列表中
            this.icons.push(icon);
        }
    };
    /**
     * 创建箭头
     */
    GameSeletorPanel.prototype.createArrow = function (group) {
        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes("PageDownBtn_png");
        this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(this.max_Level - 1).x;
        this.img_arrow.y = group.getChildAt(this.max_Level - 1).y;
        this.curLevel = this.max_Level;
        group.addChild(this.img_arrow);
    };
    /**
     * 更新图标
     */
    GameSeletorPanel.prototype.updateIcon = function (level) {
        var curlevel = level ? level : LocalStorageUtil.getInstance().currentLevel;
        var icon = this.icons[curlevel - 1];
        this.img_arrow.x = icon.x;
        this.img_arrow.y = icon.y;
        this.curLevel = icon.level;
        if (curlevel >= this.local.maxLevel) {
            for (var i = level; i > 0; i--) {
                var icon_1 = this.icons[i - 1];
                icon_1.enabled = true;
            }
        }
    };
    /**
     * 选择等级
     */
    GameSeletorPanel.prototype.levelTouchHandler = function (e) {
        var icon = e.currentTarget;
        if (icon.level != this.curLevel) {
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.curLevel = icon.level;
        }
        else {
            GamePlayPanel.open(icon.level, [GameSeletorPanel]);
        }
        this.local.currentLevel = icon.level;
        if (icon.level > this.local.maxLevel) {
            this.local.maxLevel = icon.level;
        }
    };
    /**
     * 重置按钮状态
     */
    GameSeletorPanel.prototype.resetIcon = function () {
        var max = this.local.maxLevel;
        for (var i = max; i > 0; i--) {
            var icon = this.icons[i - 1];
            icon.enabled = false;
        }
        var original = this.icons[0];
        original.enabled = true;
        this.img_arrow.x = original.x;
        this.img_arrow.y = original.y;
        this.curLevel = original.level;
    };
    /**
     * 更新滚动条的位置
     */
    GameSeletorPanel.prototype.updateVScroller = function () {
        console.log("scroller");
        var cur = LocalStorageUtil.getInstance().currentLevel;
        var levelHeight = this.icons[cur - 1].y;
        this.group_levels.validateNow();
        this.group_levels.scrollV = this.Vscroller - 1000;
    };
    Object.defineProperty(GameSeletorPanel.prototype, "careMessages", {
        /**
         * 需要关系的消息
         */
        get: function () {
            return [MessageType.GAME_RESET, MessageType.NEXT_LEVEL];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 消息回调
     */
    GameSeletorPanel.prototype.updateDate = function (type) {
        switch (type) {
            case MessageType.GAME_RESET:
                this.resetIcon();
                break;
            case MessageType.NEXT_LEVEL:
                this.updateVScroller();
                break;
        }
    };
    /**
     * 打开页面
     */
    GameSeletorPanel.open = function (removeClazz, level) {
        var selector = manager.GameManager.getInstance().addSubMap(GameSeletorPanel, removeClazz);
        //更新等级图标
        selector.updateIcon(level);
    };
    /**
     * 关闭页面
     */
    GameSeletorPanel.close = function () {
        manager.GameManager.getInstance().addSubMap(GameSeletorPanel);
    };
    return GameSeletorPanel;
}(MessageCareComponent));
__reflect(GameSeletorPanel.prototype, "GameSeletorPanel");
