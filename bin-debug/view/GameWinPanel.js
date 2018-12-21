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
 * 过关页面
 */
var GameWinPanel = (function (_super) {
    __extends(GameWinPanel, _super);
    function GameWinPanel() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.onUICompleteHandler, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageHandler, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStageHandler, _this);
        _this.skinName = "resource/skins/GameWinSkin.exml";
        return _this;
    }
    GameWinPanel.prototype.onUICompleteHandler = function (e) {
        this.horizontalCenter = 6;
        this.verticalCenter = 280;
        this.localUtil = LocalStorageUtil.getInstance();
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_nextClickHandler, this);
    };
    /**
     * 添加到舞台
     */
    GameWinPanel.prototype.onAddToStageHandler = function () {
        this.init();
    };
    /**
     * 移出舞台
     */
    GameWinPanel.prototype.onRemoveFromStageHandler = function () {
    };
    GameWinPanel.prototype.init = function () {
        this.curLevel = this.localUtil.currentLevel;
        var info = LocalDateManager.getInstance().getDateByLevel(this.curLevel - 1);
        this.lbl_explain.text = info.tip;
        this.lbl_origin.text = info.content;
    };
    /**
     * 下一关
     */
    GameWinPanel.prototype.btn_nextClickHandler = function (e) {
        var next = this.curLevel + 1;
        var max = this.localUtil.maxLevel;
        this.localUtil.currentLevel = next;
        if (next > max) {
            this.localUtil.maxLevel = next;
        }
        GamePlayPanel.open(next, [GameWinPanel]);
        model.GameModel.getInstance().updateModel(MessageType.NEXT_LEVEL);
    };
    /**
     * 打开页面
     */
    GameWinPanel.open = function (removeClazz) {
        manager.GameManager.getInstance().addSubMap(GameWinPanel, removeClazz, true);
    };
    /**
     * 关闭页面
     */
    GameWinPanel.close = function () {
        manager.GameManager.getInstance().removeSubMap(GameWinPanel);
    };
    return GameWinPanel;
}(eui.Component));
__reflect(GameWinPanel.prototype, "GameWinPanel");
//# sourceMappingURL=GameWinPanel.js.map