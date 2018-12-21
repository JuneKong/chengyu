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
 * 等级按钮
 */
var GameSeletItem = (function (_super) {
    __extends(GameSeletItem, _super);
    function GameSeletItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/GameSeletItemSkin.exml";
        return _this;
    }
    Object.defineProperty(GameSeletItem.prototype, "level", {
        get: function () {
            return parseInt(this.lbl_level.text);
        },
        set: function (val) {
            if (this.lbl_level) {
                this.lbl_level.text = val.toString();
            }
        },
        enumerable: true,
        configurable: true
    });
    return GameSeletItem;
}(eui.Button));
__reflect(GameSeletItem.prototype, "GameSeletItem");
//# sourceMappingURL=GameSeletItem.js.map