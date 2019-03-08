var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息类型
 */
var MessageType = (function () {
    function MessageType() {
    }
    /**
     * 一键复原
     */
    MessageType.GAME_RESET = "GAME_RESET";
    /**
     * 更新显示字
     */
    MessageType.UPDATE_WORD_SHOW = "UPDATE_WORD_SHOW";
    /**
     * 下一关
     */
    MessageType.NEXT_LEVEL = "NEXT_LEVEL";
    return MessageType;
}());
__reflect(MessageType.prototype, "MessageType");
