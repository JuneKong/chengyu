var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var common;
(function (common) {
    /**
     * 消息回调
     */
    var MessageCallback = (function () {
        function MessageCallback(callback, callbackThis) {
            this.callback = callback;
            this.callbackThis = callbackThis;
        }
        /**
         * 执行回调
         */
        MessageCallback.prototype.call = function (type) {
            //必须使用call方法传入this，函数才能正确引用this
            this.callback.call(this.callbackThis, type);
        };
        /**
         * 删除引用
         */
        MessageCallback.prototype.destroy = function () {
            this.callback = null;
            this.callbackThis = null;
        };
        return MessageCallback;
    }());
    common.MessageCallback = MessageCallback;
    __reflect(MessageCallback.prototype, "common.MessageCallback");
})(common || (common = {}));
//# sourceMappingURL=MessageCallback.js.map