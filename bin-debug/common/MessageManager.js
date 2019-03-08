var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var common;
(function (common) {
    /**
     * 消息管理类
     */
    var MessageManager = (function () {
        function MessageManager() {
            this.callbacks = {};
        }
        MessageManager.getInstance = function () {
            if (MessageManager.message == null) {
                MessageManager.message = new MessageManager();
            }
            return MessageManager.message;
        };
        /**
         * 注册消息回调
         */
        MessageManager.prototype.registerMessage = function (type, callback, callbackThis) {
            var calls = this.callbacks[type];
            if (calls == null) {
                calls = new Array();
                this.callbacks[type] = calls;
            }
            calls.push(new common.MessageCallback(callback, callbackThis));
        };
        /**
         * 取消注册消息回调
         */
        MessageManager.prototype.unregisterMessage = function (type, callback, callbackThis) {
            var calls = this.callbacks[type];
            if (calls == null) {
                return;
            }
            for (var i = 0, length_1 = calls.length; i < length_1; i++) {
                var call = calls[i];
                if (call.callback == callback && call.callbackThis == callbackThis) {
                    calls.splice(i, 1);
                    break;
                }
            }
        };
        /**
         * 广播消息
         */
        MessageManager.prototype.sendMessage = function (type) {
            var calls = this.callbacks[type];
            if (calls == null || calls.length == 0) {
                console.log("null");
                return;
            }
            for (var i = 0, length_2 = calls.length; i < length_2; i++) {
                var call = calls[i];
                call.call(type);
            }
        };
        return MessageManager;
    }());
    common.MessageManager = MessageManager;
    __reflect(MessageManager.prototype, "common.MessageManager");
})(common || (common = {}));
