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
 * 设置
 */
var GameSettingPanel = (function (_super) {
    __extends(GameSettingPanel, _super);
    function GameSettingPanel() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.onUICompleteHandler, _this);
        _this.skinName = "resource/skins/GameSettingSkin.exml";
        return _this;
    }
    GameSettingPanel.prototype.onUICompleteHandler = function (e) {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.local = LocalStorageUtil.getInstance();
        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_musicClickHandler, this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_soundClickHandler, this);
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_sureClickHandler, this);
    };
    /**
     * 音乐
     */
    GameSettingPanel.prototype.btn_musicClickHandler = function (e) {
        SoundManager.getInstance().playClick();
        var music = SoundManager.getInstance();
        if (this.img_nomusic.visible) {
            music.musicVolume = 0;
        }
        else {
            music.musicVolume = 1;
        }
        this.local.musicVolume = music.musicVolume;
        this.img_nomusic.visible = this.local.musicVolume ? true : false;
    };
    /**
     * 音效
     */
    GameSettingPanel.prototype.btn_soundClickHandler = function (e) {
        SoundManager.getInstance().playClick();
        var sound = SoundManager.getInstance();
        if (this.img_nosound.visible) {
            sound.soundVolume = 0;
        }
        else {
            sound.soundVolume = 1;
        }
        this.local.soundVolume = sound.soundVolume;
        this.img_nosound.visible = this.local.soundVolume ? true : false;
    };
    /**
     * 确定
     */
    GameSettingPanel.prototype.btn_sureClickHandler = function (e) {
        SoundManager.getInstance().playClick();
        GameSettingPanel.close();
    };
    /**
     * 打开页面
     */
    GameSettingPanel.open = function (removeClazz) {
        manager.GameManager.getInstance().addSubMap(GameSettingPanel, removeClazz, true);
    };
    /**
     * 关闭页面
     */
    GameSettingPanel.close = function () {
        manager.GameManager.getInstance().removeSubMap(GameSettingPanel);
    };
    return GameSettingPanel;
}(eui.Component));
__reflect(GameSettingPanel.prototype, "GameSettingPanel");
