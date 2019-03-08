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
 * 一组字
 */
var WordGroup = (function (_super) {
    __extends(WordGroup, _super);
    function WordGroup() {
        var _this = _super.call(this) || this;
        /**
         * 字的个数
         */
        _this.wordCount = 20;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onUICompleteHandler, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageHandler, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStageHandler, _this);
        return _this;
    }
    WordGroup.prototype.onUICompleteHandler = function (e) {
    };
    /**
     * 添加到舞台
     */
    WordGroup.prototype.onAddToStageHandler = function () {
        this.addWordChild();
        this.showWords();
    };
    /**
     * 移出舞台
     */
    WordGroup.prototype.onRemoveFromStageHandler = function () {
        this.hideWords();
    };
    /**
     * 添加字
     */
    WordGroup.prototype.addWordChild = function () {
        // let children: number = this.numChildren;
        // let i:number;
        this.words = [];
        // for(i = 0; i < children; i++)
        // {
        // 	let child:egret.DisplayObject = this.getChildAt(i);
        // 	if(egret.is(child, "WordItem"))
        // 	{
        // 		this.words.push(<any>child);
        // 	}
        // }
        // let index:number = 0;
        while (this.words.length < this.wordCount) {
            var word = new WordItem();
            this.words.push(word);
            // index++;
        }
    };
    /**
     * 显示字
     */
    WordGroup.prototype.showWords = function () {
        for (var i = 0, length_1 = this.words.length; i < length_1; i++) {
            var word = this.words[i];
            if (word.parent == null) {
                this.addChild(word);
            }
        }
    };
    /**
     * 隐藏字
     */
    WordGroup.prototype.hideWords = function () {
        for (var i = 0, length_2 = this.words.length; i < length_2; i++) {
            if (this.words[i].parent) {
                this.removeChild(this.words[i]);
            }
        }
    };
    return WordGroup;
}(eui.Group));
__reflect(WordGroup.prototype, "WordGroup");
/**
 * 答案字组
 */
var AnswerWordGroup = (function (_super) {
    __extends(AnswerWordGroup, _super);
    function AnswerWordGroup() {
        var _this = _super.call(this) || this;
        /**
         * 答案字的个数
         */
        _this.answerCount = 4;
        return _this;
    }
    /**
     * 添加到舞台
     */
    AnswerWordGroup.prototype.onAddToStageHandler = function () {
        this.addWordChild();
        this.showWords();
    };
    /**
     * 移出舞台
     */
    AnswerWordGroup.prototype.onRemoveFromStageHandler = function () {
        this.hideWords();
    };
    /**
     * 添加字
     */
    AnswerWordGroup.prototype.addWordChild = function () {
        this.answer = [];
        while (this.answer.length < this.answerCount) {
            var word = new AnswerWordItem();
            this.answer.push(word);
        }
    };
    /**
     * 显示字
     */
    AnswerWordGroup.prototype.showWords = function () {
        for (var i = 0, length_3 = this.answer.length; i < length_3; i++) {
            var word = this.answer[i];
            if (word.parent == null) {
                this.addChild(word);
            }
        }
    };
    /**
     * 隐藏字
     */
    AnswerWordGroup.prototype.hideWords = function () {
        for (var i = 0, length_4 = this.answer.length; i < length_4; i++) {
            if (this.answer[i].parent) {
                this.removeChild(this.answer[i]);
            }
        }
    };
    return AnswerWordGroup;
}(WordGroup));
__reflect(AnswerWordGroup.prototype, "AnswerWordGroup");
