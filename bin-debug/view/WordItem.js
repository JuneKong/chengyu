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
 * 字
 */
var WordItem = (function (_super) {
    __extends(WordItem, _super);
    function WordItem() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.onUICompleteHandler, _this);
        _this.skinName = "resource/skins/WordSkin.exml";
        return _this;
    }
    /**
     * 资源预加载UI完成时调度
     */
    WordItem.prototype.onUICompleteHandler = function () {
        this.lbl_word.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lbl_wordClickHandler, this);
    };
    WordItem.prototype.lbl_wordClickHandler = function (e) {
        model.GameModel.getInstance().word = this;
        model.GameModel.getInstance().updateModel(MessageType.UPDATE_WORD_SHOW);
    };
    /**
     * 获得字
     */
    WordItem.prototype.getWordText = function () {
        return this.lbl_word.text;
    };
    /**
     * 设置字
     */
    WordItem.prototype.setWordText = function (text) {
        if (this.lbl_word) {
            this.lbl_word.text = text;
        }
    };
    return WordItem;
}(eui.Component));
__reflect(WordItem.prototype, "WordItem");
/**
 * 答案字
 */
var AnswerWordItem = (function (_super) {
    __extends(AnswerWordItem, _super);
    function AnswerWordItem() {
        var _this = _super.call(this) || this;
        /**
         * 选中的答案字
         */
        _this.selectWord = null;
        return _this;
    }
    AnswerWordItem.prototype.lbl_wordClickHandler = function () {
        if (this.selectWord) {
            this.selectWord.visible = true;
            this.selectWord = null;
            this.text = "";
            this.setWordText(this.text);
        }
    };
    /**
     * 选中字
     */
    AnswerWordItem.prototype.answerWordText = function (word) {
        if (word) {
            word.visible = false; //点击的字隐藏
            this.text = word.getWordText();
            this.setWordText(this.text);
        }
        else {
            this.text = "";
            this.setWordText(this.text);
        }
        this.selectWord = word;
    };
    return AnswerWordItem;
}(WordItem));
__reflect(AnswerWordItem.prototype, "AnswerWordItem");
//# sourceMappingURL=WordItem.js.map