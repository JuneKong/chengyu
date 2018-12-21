/**
 * 
 * 本地缓存
 */
class LocalStorageUtil {
	public constructor() 
	{

	}

	private static instance:LocalStorageUtil;
	//单例
	public static getInstance(): LocalStorageUtil
	{
		if(LocalStorageUtil.instance == null)
		{
			LocalStorageUtil.instance = new LocalStorageUtil();
		}
		return LocalStorageUtil.instance;
	}

	/**
	 * 背景音乐
	 */
	private KEY_MUSIC_VOLUME:string = "KEY_MUSIC_VOLUME";

	/**
	 * 音效
	 */
	private KEY_SOUND_VOLUME:string = "KEY_SOUND_VOLUME";

	/**
	 * 等前最大的等级
	 */
	private KEY_LEVEL_MAX_VALUE:string = "KEY_LEVEL_MAX_VALUE";

	/**
	 * 当前等级
	 */
	private KEY_CURRENT_LEVEL:string = "KEY_CURRENT_LEVEL";

	/**
	 * 读取本地缓存
	 */
	private getItem(key:string)
	{
		return egret.localStorage.getItem(key);
	}
	private setItem(key:string, value:string)
	{
		egret.localStorage.setItem(key, value);
	}

	/**
	 * 获得背景音乐音量
	 */
	public get musicVolume():number
	{
		let value: string = this.getItem(this.KEY_MUSIC_VOLUME);

		if(value == null)
		{
			this.musicVolume = 0.8;
			return 0.8;
		}

		let val:number = parseFloat(value);

		if(val < 0)
		{
			val = 0;
		}
		else if(val > 1)
		{
			val = 1;
		}
		return val
	}

	/**
	 * 设置背景音乐音量
	 */
	public set musicVolume(value:number)
	{
		this.setItem(this.KEY_MUSIC_VOLUME, value.toString());
	}

	/**
	 * 获得音效音量
	 */
	public get soundVolume():number
	{
		let value: string = this.getItem(this.KEY_SOUND_VOLUME);

		if(value == null)
		{
			this.soundVolume = 0.8;
			return 0.8;
		}

		let val:number = parseFloat(value);

		if(val < 0)
		{
			val = 0;
		}
		else if(val > 1)
		{
			val = 1;
		}
		return val;
	}

	/**
	 * 设置音效音量
	 */
	public set soundVolume(value:number)
	{
		this.setItem(this.KEY_SOUND_VOLUME, value.toString());
	}

	/**
	 * 获得所有数据
	 */
	private allDate():LevelDateItem[]
	{
		return LocalDateManager.getInstance().getAllLevelDate();
	}

	/**
	 * 获得最大值
	 */
	public get maxLevel():number
	{
		let level:string = this.getItem(this.KEY_LEVEL_MAX_VALUE);
		if(level == "" || level == null)
		{
			this.maxLevel = 1;
			return 1;
		}
		let val:number = parseFloat(level);

		val = this.interval(val);
		return val;
	}

	/**
	 * 设置最大值
	 */
	public set maxLevel(level:number)
	{
		this.setItem(this.KEY_LEVEL_MAX_VALUE, level.toString());
	}

	/**
	 * 设置的值是否在区间内
	 */
	private interval(val):number
	{
		if(val < 0)
		{
			val = 1;
		}
		else if(val >= this.allDate().length)
		{
			val = this.allDate().length - 1;
		}
		return val;
	}

	/**
	 * 获得当前等级
	 */
	public get currentLevel():number
	{
		let level:string = this.getItem(this.KEY_CURRENT_LEVEL);
		if(level == null)
		{
			this.currentLevel = 1;
			return 1;
		}

		let val:number = parseFloat(level);

		val = this.interval(val);
		return val;
	}

	/**
	 * 设置当前等级
	 */
	public set currentLevel(level:number)
	{
		this.setItem(this.KEY_CURRENT_LEVEL, level.toString());
	}


}