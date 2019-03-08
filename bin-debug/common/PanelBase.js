var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var common;
(function (common) {
    /**
     * 页面基类
     */
    var PanelBase = (function () {
        function PanelBase() {
        }
        PanelBase.prototype.updateModel = function (type) {
            console.log(type);
            common.MessageManager.getInstance().sendMessage(type);
        };
        return PanelBase;
    }());
    common.PanelBase = PanelBase;
    __reflect(PanelBase.prototype, "common.PanelBase");
})(common || (common = {}));
