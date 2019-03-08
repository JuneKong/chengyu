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
 * 实现页面消息关心的Component的子级
 */
var MessageCareComponent = (function (_super) {
    __extends(MessageCareComponent, _super);
    function MessageCareComponent() {
        var _this = _super.call(this) || this;
        var messages = _this.careMessages;
        if (messages != null && messages.length > 0) {
            _this.observer = new common.MessageObserver(_this, true);
        }
        return _this;
    }
    Object.defineProperty(MessageCareComponent.prototype, "careMessages", {
        /**
         * 需要关系的消息
         */
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 消息回调
     */
    MessageCareComponent.prototype.updateDate = function (type) {
    };
    return MessageCareComponent;
}(eui.Component));
__reflect(MessageCareComponent.prototype, "MessageCareComponent", ["common.IMessageCare"]);
