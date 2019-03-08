var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 进入游戏
 */
var GameEntry = (function () {
    function GameEntry() {
        this.init();
    }
    GameEntry.prototype.init = function () {
        var local = LocalStorageUtil.getInstance();
        SoundManager.getInstance().musicVolume = local.musicVolume;
        SoundManager.getInstance().soundVolume = local.soundVolume;
        GameBeginPanel.open();
    };
    return GameEntry;
}());
__reflect(GameEntry.prototype, "GameEntry");
