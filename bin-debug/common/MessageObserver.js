var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var common;
(function (common) {
    /**
     * 消息观察者
     */
    var MessageObserver = (function () {
        /**
         * @param messageCare 消息回调的观察者，注册IMessageCare关心的消息
         * @param autoRemove 若autoRemove为true时，并且IMessageCare是显示对象时，只在添加到舞台时接收消息
         * 对象不再使用时请用destroy方法清除引用
         */
        function MessageObserver(messageCare, autoRemove) {
            if (autoRemove === void 0) { autoRemove = false; }
            var careMessage = messageCare.careMessages;
            if (careMessage == null && careMessage.length == 0) {
                return;
            }
            this.messages = careMessage.concat();
            this.messageCallback = new common.MessageCallback(messageCare.updateDate, messageCare);
            this.autoRemoveWithDisplayObj = autoRemove;
            if (autoRemove) {
                if (messageCare instanceof egret.DisplayObject) {
                    var displayObject = messageCare;
                    //这里注册了ADD_TO_STAGE就不要取消了
                    displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStageHandler, this, false, 1);
                    displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStageHandler, this, false, 1);
                    //未添加到舞台
                    if (displayObject.stage == null) {
                        return;
                    }
                }
                else {
                    //若IMessageCare不是显示对象，继续执行下面的代码关注消息
                }
                var manage = common.MessageManager.getInstance();
                //注册消息
                for (var i = 0, length_1 = careMessage.length; i < length_1; i++) {
                    manage.registerMessage(careMessage[i], messageCare.updateDate, messageCare);
                }
            }
        }
        /**
         * 添加到舞台
         */
        MessageObserver.prototype.addToStageHandler = function (e) {
            if (this.messages != null && this.messages.length > 0) {
                var manage = common.MessageManager.getInstance();
                for (var i = 0, length_2 = this.messages.length; i < length_2; i++) {
                    manage.registerMessage(this.messages[i], this.messageCallback.callback, this.messageCallback.callbackThis);
                }
            }
        };
        /**
         * 移出舞台
         */
        MessageObserver.prototype.removeFromStageHandler = function (e) {
            if (this.messages != null && this.messages.length > 0) {
                var manage = common.MessageManager.getInstance();
                for (var i = 0, length_3 = this.messages.length; i < length_3; i++) {
                    manage.unregisterMessage(this.messages[i], this.messageCallback.callback, this.messageCallback.callbackThis);
                }
            }
        };
        /**
         * 清除注册消息
         */
        MessageObserver.prototype.destroy = function () {
            if (this.autoRemoveWithDisplayObj) {
                var displayObject = this.messageCallback.callbackThis;
                displayObject.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStageHandler, this, false);
                displayObject.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStageHandler, this, false);
                this.autoRemoveWithDisplayObj = false;
            }
            if (this.messages == null) {
                return;
            }
            var manage = common.MessageManager.getInstance();
            for (var i = 0, length_4 = this.messages.length; i < length_4; i++) {
                manage.unregisterMessage(this.messages[i], this.messageCallback.callback, this.messageCallback.callbackThis);
            }
            this.messageCallback.destroy();
            this.messages = null;
            this.messageCallback = null;
        };
        return MessageObserver;
    }());
    common.MessageObserver = MessageObserver;
    __reflect(MessageObserver.prototype, "common.MessageObserver");
})(common || (common = {}));
//# sourceMappingURL=MessageObserver.js.map