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
 * 一键复原
 */
var GameResetPanel = (function (_super) {
    __extends(GameResetPanel, _super);
    function GameResetPanel() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.onUICompleteHandler, _this);
        _this.skinName = "resource/skins/GameResetSkin.exml";
        return _this;
    }
    GameResetPanel.prototype.onUICompleteHandler = function (e) {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_cancelClickHandler, this);
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_sureClickHandler, this);
    };
    /**
     * 取消
     */
    GameResetPanel.prototype.btn_cancelClickHandler = function (e) {
        GameResetPanel.close();
    };
    /**
     * 确定
     */
    GameResetPanel.prototype.btn_sureClickHandler = function (e) {
        model.GameModel.getInstance().updateModel(MessageType.GAME_RESET);
        LocalStorageUtil.getInstance().maxLevel = LocalStorageUtil.getInstance().currentLevel = 1;
        this.btn_cancelClickHandler();
    };
    /**
     * 打开页面
     */
    GameResetPanel.open = function (removeClazz) {
        manager.GameManager.getInstance().addSubMap(GameResetPanel, removeClazz, true);
    };
    /**
     * 关闭页面
     */
    GameResetPanel.close = function () {
        manager.GameManager.getInstance().removeSubMap(GameResetPanel);
    };
    return GameResetPanel;
}(eui.Component));
__reflect(GameResetPanel.prototype, "GameResetPanel");
//# sourceMappingURL=GameResetPanel.js.map