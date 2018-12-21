/**
 * 
 * 资源管理类
 */
class LocalDateManager 
{

	/**
	 * 资源组
	 */
	private items:LevelDateItem[] = [];

	public constructor() 
	{
		this.items = RES.getRes("questions_json");
	}

	private static instance:LocalDateManager;
	//单例
	public static getInstance():LocalDateManager
	{
		if(LocalDateManager.instance == null)
		{
			LocalDateManager.instance = new LocalDateManager();
		}
		return LocalDateManager.instance;
	}

	/**
	 * 当前等级的最大值
	 */
	private KEY_LEVEL_MAX_VALUE:string = "KEY_LEVEL_MAX_VALUE";

	/**
	 * 获得所有等级数据
	 */
	public getAllLevelDate()
	{
		if(this.items == null)
		{
			this.items = RES.getRes("questions_json");
		}
		return this.items;
	}

	/**
	 * 根据等级获得数据
	 */
	public getDateByLevel(level:number)
	{
		if(level < 0)
		{
			level = 0;
		}
		if(level >= this.items.length)
		{
			level = this.items.length - 1;
		}
		return this.items[level];
	}

	private _maxLevel:number
	/**
	 * 获得最大值
	 */
	public get maxLevel():number
	{
		return this._maxLevel;
	}

	/**
	 * 设置最大值
	 */
	public set maxLevel(level:number)
	{
		if(this._maxLevel == level)
		{
			return;
		}
		this._maxLevel = level;
	}

}

/**
 * 等级数据结构
 */
class LevelDateItem
{
	/**
	 * 问题
	 */
	public answer: string;
	/**
	 * 图片路径
	 */
	public img:string;
	/**
	 * 字
	 */
	public word:string;
	/**
	 * 提示
	 */
	public tip:string;
	/**
	 * 内容
	 */
	public content:string;
}