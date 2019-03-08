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
 * 游戏开始页面
 */
var GameBeginPanel = (function (_super) {
    __extends(GameBeginPanel, _super);
    function GameBeginPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.UICompleteHandler, _this);
        _this.skinName = "resource/skins/GameBeginSkin.exml";
        return _this;
    }
    GameBeginPanel.prototype.UICompleteHandler = function () {
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickBeginHandler, this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickSettingHandler, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickResetHandler, this);
    };
    /**
     * 开始游戏
     */
    GameBeginPanel.prototype.onclickBeginHandler = function () {
        SoundManager.getInstance().playClick();
        GameSeletorPanel.open([GameBeginPanel]);
    };
    /**
     * 设置音量
     */
    GameBeginPanel.prototype.onclickSettingHandler = function (e) {
        SoundManager.getInstance().playClick();
        GameSettingPanel.open();
    };
    /**
     * 一键复原
     */
    GameBeginPanel.prototype.onclickResetHandler = function (e) {
        SoundManager.getInstance().playClick();
        GameResetPanel.open();
    };
    /**
     * 打开页面
     */
    GameBeginPanel.open = function (removeClazz) {
        manager.GameManager.getInstance().addSubMap(GameBeginPanel, removeClazz);
    };
    /**
     * 关闭页面
     */
    GameBeginPanel.close = function () {
        manager.GameManager.getInstance().removeSubMap(GameBeginPanel);
    };
    return GameBeginPanel;
}(eui.Component));
__reflect(GameBeginPanel.prototype, "GameBeginPanel");
