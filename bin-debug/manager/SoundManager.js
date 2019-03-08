var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 声音管理类
 */
var SoundManager = (function () {
    function SoundManager() {
        /**
         * 当前播放资源名
         */
        this.currentVolumeResourceName = null;
        /**
         * 当前播放频道
         */
        this.currentVolumeChannel = null;
    }
    //单例
    SoundManager.getInstance = function () {
        if (SoundManager.instance == null) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    };
    Object.defineProperty(SoundManager.prototype, "soundVolume", {
        /**
         * 获得音效声音
         */
        get: function () {
            return this._soundVolume;
        },
        set: function (value) {
            if (this._soundVolume == value) {
                return;
            }
            if (value < 0) {
                value = 0;
            }
            else if (value > 1) {
                value = 1;
            }
            this._soundVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "musicVolume", {
        /**
         * 获得音乐声音
         */
        get: function () {
            return this._musicVolume;
        },
        set: function (value) {
            if (this._musicVolume == value) {
                return;
            }
            this._musicVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载资源
     */
    SoundManager.prototype.loadResource = function () {
        this.click = new egret.Sound();
        this.click.load("resource/assets/sound/buttonclick.mp3");
        this.bgMusic = new egret.Sound();
        this.bgMusic.load("resource/assets/sound/Music.mp3");
        this.right = new egret.Sound();
        this.right.load("resource/assets/sound/right.mp3");
        this.word = new egret.Sound();
        this.word.load("resource/assets/sound/type_word.mp3");
        this.wrong = new egret.Sound();
        this.wrong.load("resource/assets/sound/wrong.mp3");
    };
    /**
     * 播放背景音乐
     */
    SoundManager.prototype.playMusic = function () {
        if (this._musicVolume) {
            this.currentVolumeChannel = this.bgMusic.play(0, 0);
        }
    };
    SoundManager.prototype.stopMusic = function () {
        if (this.currentVolumeChannel) {
            this.currentVolumeChannel.stop();
        }
    };
    /**
     * 点击音效
     */
    SoundManager.prototype.playClick = function () {
        if (this._soundVolume) {
            this.click.play(0, 1);
        }
    };
    /**
     * 对的音效
     */
    SoundManager.prototype.playRight = function () {
        if (this._soundVolume) {
            this.click.play(0, 1);
        }
    };
    /**
     * 字的音效
     */
    SoundManager.prototype.playWord = function () {
        if (this._soundVolume) {
            this.click.play(0, 1);
        }
    };
    /**
     * 错的音效
     */
    SoundManager.prototype.playWrong = function () {
        if (this._soundVolume) {
            this.click.play(0, 1);
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
