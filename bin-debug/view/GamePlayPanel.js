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
 * 成语游戏界面
 */
var GamePlayPanel = (function (_super) {
    __extends(GamePlayPanel, _super);
    function GamePlayPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onUICompleteHandler, _this);
        _this.skinName = "resource/skins/GamePlaySkin.exml";
        return _this;
    }
    /**
     * 界面资源预加载ui完成创建时调度
     */
    GamePlayPanel.prototype.onUICompleteHandler = function (e) {
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_returnHandler, this);
        // this.init();
    };
    /**
     * 返回
     */
    GamePlayPanel.prototype.btn_returnHandler = function (e) {
        var cur = LocalStorageUtil.getInstance().currentLevel;
        GameSeletorPanel.open([GamePlayPanel], cur);
    };
    GamePlayPanel.prototype.init = function () {
        var current = LocalStorageUtil.getInstance().currentLevel;
        this.initByLevel(current);
    };
    /**
     * 初始化题目
     */
    GamePlayPanel.prototype.initByLevel = function (level) {
        //存储当前等级
        LocalStorageUtil.getInstance().currentLevel = level;
        var info = this.getLevelInfo(level - 1);
        this.img_question.source = "resource/assets/" + info.img;
        //生成选择字
        var words = info.answer + info.word;
        while (words.length == 10) {
            var index = this.random(400);
            if (index != level) {
                var data = this.getLevelInfo(index - 1);
                words += data.answer + data.word;
            }
        }
        //随机排序
        var wordList = this.randomSort(words);
        this.showWordGroup(wordList);
        this.showAnswer();
    };
    /**
     * 显示答案字
     */
    GamePlayPanel.prototype.showAnswer = function () {
        for (var i = 0, length_1 = this.group_answer.numChildren; i < length_1; i++) {
            var answerRect = this.group_answer.getChildAt(i);
            answerRect.answerWordText();
            answerRect.selectWord = null;
            answerRect.visible = true;
        }
    };
    /**
     * 显示字组
     */
    GamePlayPanel.prototype.showWordGroup = function (words) {
        for (var i = 0, length_2 = this.group_words.numChildren; i < length_2; i++) {
            var rect = this.group_words.getChildAt(i);
            rect.setWordText(words[i]);
            rect.visible = true;
        }
    };
    /**
     * 随机排序
     */
    GamePlayPanel.prototype.randomSort = function (word) {
        var arr = [];
        var array = [];
        for (var i = 0, length_3 = word.length; i < length_3; i++) {
            arr.push(word.charAt(i));
        }
        while (arr.length > 0) {
            var j = this.random(arr.length);
            array.push(arr[j]);
            arr.splice(j, 1);
        }
        return array;
    };
    /**
     * 获得等级信息
     */
    GamePlayPanel.prototype.getLevelInfo = function (level) {
        var info = LocalDateManager.getInstance().getDateByLevel(level);
        return info ? info : null;
    };
    /**
     * 随机产生数
     */
    GamePlayPanel.prototype.random = function (count) {
        var r = Math.floor(Math.random() * count);
        return r;
    };
    /**
     * 更新字
     */
    GamePlayPanel.prototype.updateWordByClick = function (word) {
        var selWord = null;
        for (var i = 0, length_4 = this.group_answer.numChildren; i < length_4; i++) {
            var answer = this.group_answer.getChildAt(i);
            if (answer.selectWord == null) {
                selWord = answer;
                break; // 退出for循环，判断selWord
            }
        }
        if (selWord) {
            selWord.answerWordText(word);
            var text = "";
            for (var i = 0, length_5 = this.group_answer.numChildren; i < length_5; i++) {
                var answerText = this.group_answer.getChildAt(i);
                text += answerText.getWordText();
            }
            var curLevel = LocalStorageUtil.getInstance().currentLevel;
            var info = LocalDateManager.getInstance().getDateByLevel(curLevel - 1);
            if (text == info.answer) {
                GameWinPanel.open();
            }
        }
    };
    Object.defineProperty(GamePlayPanel.prototype, "careMessages", {
        /**
         * 需要关心的消息
         */
        get: function () {
            return [MessageType.UPDATE_WORD_SHOW];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 消息回调
     */
    GamePlayPanel.prototype.updateDate = function (type) {
        switch (type) {
            case MessageType.UPDATE_WORD_SHOW:
                var word = model.GameModel.getInstance().word;
                this.updateWordByClick(word);
        }
    };
    /**
     * 打开页面
     */
    GamePlayPanel.open = function (curLevel, removeClazz) {
        var panel = manager.GameManager.getInstance().addSubMap(GamePlayPanel, removeClazz);
        panel.initByLevel(curLevel);
    };
    /**
     * 关闭页面
     */
    GamePlayPanel.close = function () {
        manager.GameManager.getInstance().removeSubMap(GamePlayPanel);
    };
    return GamePlayPanel;
}(MessageCareComponent));
__reflect(GamePlayPanel.prototype, "GamePlayPanel");
//# sourceMappingURL=GamePlayPanel.js.map