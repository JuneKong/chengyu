/**
 * 声音管理类
 */
class SoundManager {
	public constructor() 
	{
		
	}

	private static instance:SoundManager;
	//单例
	public static getInstance(): SoundManager
	{
		if(SoundManager.instance == null)
		{
			SoundManager.instance = new SoundManager();
		}
		return SoundManager.instance;
	}

	private _soundVolume:number;
	/**
	 * 获得音效声音
	 */
	public get soundVolume():number
	{
		return this._soundVolume;
	}

	public set soundVolume(value:number)
	{
		if(this._soundVolume == value)
		{
			return;
		}

		if(value < 0)
		{
			value = 0;
		}
		else if(value > 1)
		{
			value = 1;
		}

		this._soundVolume = value;
	}

	private _musicVolume:number;
	/**
	 * 获得音乐声音
	 */
	public get musicVolume():number
	{
		return this._musicVolume;
	}

	public set musicVolume(value:number)
	{
		if(this._musicVolume == value)
		{
			return;
		}
		this._musicVolume = value;
	}

	/**
	 * 当前播放资源名
	 */
	private currentVolumeResourceName:string = null;

	/**
	 * 当前播放频道
	 */
	private currentVolumeChannel:egret.SoundChannel = null;

	/**
	 * 点击声音
	 */
	private click:egret.Sound;
	/**
	 * 背景音乐
	 */
	public bgMusic:egret.Sound;
	/**
	 * 正确声音
	 */
	private right:egret.Sound;
	/**
	 * 字的声音
	 */
	private word:egret.Sound;
	/**
	 * 错误的声音
	 */
	private wrong:egret.Sound

	/**
	 * 加载资源
	 */
	public loadResource()
	{
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
	}

	/**
	 * 播放背景音乐
	 */
	public playMusic():void
	{
		if(this._musicVolume)
		{
			this.currentVolumeChannel = this.bgMusic.play(0,0);
		}
	}

	public stopMusic():void
	{
		if(this.currentVolumeChannel)
		{
			this.currentVolumeChannel.stop();
		}
	}

	/**
	 * 点击音效
	 */
	public playClick():void
	{
		if(this._soundVolume)
		{
			this.click.play(0,1);
		}
	}

	/**
	 * 对的音效
	 */
	public playRight():void
	{
		if(this._soundVolume)
		{
			this.click.play(0,1);
		}
	}

	/**
	 * 字的音效
	 */
	public playWord():void
	{
		if(this._soundVolume)
		{
			this.click.play(0,1);
		}
	}

	/**
	 * 错的音效
	 */
	public playWrong():void
	{
		if(this._soundVolume)
		{
			this.click.play(0,1);
		}
	}
}