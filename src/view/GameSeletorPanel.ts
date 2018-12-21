/**
 * 
 * 等级选择页面
 */
class GameSeletorPanel extends MessageCareComponent
{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.UIComponentHandler,this);
		this.skinName = "resource/skins/GameSeletorSkin.exml";
	}

	public scroller:eui.Scroller;

	/**
	 * 等级按钮组
	 */
	public group_levels:eui.Group;

	public btn_back:eui.Button;

	/**
	 * 存放等级按钮
	 */
	public icons:GameSeletItem[] = [];

	private img_arrow:eui.Image;

	/**
	 * 当前等级
	 */
	private curLevel:number = 0;

	private local:LocalStorageUtil;

	/**
	 * 滚动条位置
	 */
	private Vscroller:number;
	/**
	 * ui资源创建完成后调度
	 */
	public UIComponentHandler()
	{
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickBackHandler,this);

		this.local = LocalStorageUtil.getInstance();
		this.createLevels();
	}

	/**
	 * 返回
	 */
	private onclickBackHandler(e:egret.TouchEvent)
	{
		GameBeginPanel.open();
	}

	private max_value:number = 400;

	private max_Level:number;
	/**
	 * 创建等级按钮
	 */
	private createLevels():void
	{
		//创建地图选项
        var row = 20;
        var col = 10;
        var spanx = 640 / col;      //计算行x间隔
        var spany = 1150 / row;     //计算列y间隔
        var group_map = new eui.Group();//地图背景
        group_map.width = 640;
        group_map.height = (spany * 400);//算出最大尺寸
		let countBg = group_map.height / 1150;
        //填充背景
        // this.createBackground(countBg);

        //以正弦曲线绘制关卡图标的路径
		this.createLevelIcon(group_map, spanx, spany);

        //开启位图缓存模式
        // group.cacheAsBitmap = true;
        this.group_levels.addChild(group_map);
		
		
        //卷动到最底层
		this.Vscroller = group_map.height - 1150;
        this.group_levels.scrollV = this.Vscroller;

		this.createArrow(group_map);
	}


	/**
	 * 创建背景
	 * @param 个数
	 */
	private createBackground(count:number):void
	{
		for (var i = 0; i < count; i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1136;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img, 0);
        }
	}

	/**
	 * 创建等级图标
	 * @param 组
	 */
	private createLevelIcon(group:eui.Group, spanx:number, spany:number):void
	{
		this.max_Level = this.local.maxLevel;
        //以正弦曲线绘制关卡图标的路径
        for (var i = 0; i < 400; i++) {
            var icon = new GameSeletItem();
            icon.level = i + 1;
            icon.y = spany * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i / 2;
            icon.y = group.height - icon.y - spany;
			if(i == 0)
			{
				icon.y -= 35;
			}
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.levelTouchHandler, this);
            //依据进度设置关卡显示
            icon.enabled = i < this.max_Level;
            //保存到一个列表中
            this.icons.push(icon);
        }
	}

	/**
	 * 创建箭头
	 */
	public createArrow(group:eui.Group):void
	{
		this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes("PageDownBtn_png");
        this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(this.max_Level - 1).x;
        this.img_arrow.y = group.getChildAt(this.max_Level - 1).y;
        this.curLevel = this.max_Level;
        group.addChild(this.img_arrow);
	}

	/**
	 * 更新图标
	 */
	public updateIcon(level:number):void
	{
		let curlevel = level ? level : LocalStorageUtil.getInstance().currentLevel;

		let icon = this.icons[curlevel - 1];

		this.img_arrow.x = icon.x;
		this.img_arrow.y = icon.y;
		this.curLevel = icon.level;

		if(curlevel >= this.local.maxLevel)
		{
			for(let i: number = level; i > 0; i--)
			{
				let icon = this.icons[i - 1];
				icon.enabled = true;
			}
		}
	}

	/**
	 * 选择等级
	 */
	private levelTouchHandler(e:egret.TouchEvent){
		var icon = <GameSeletItem>e.currentTarget;
		if(icon.level != this.curLevel)
		{
			this.img_arrow.x = icon.x;
			this.img_arrow.y = icon.y;
			this.curLevel = icon.level;
		}
		else
		{
			GamePlayPanel.open(icon.level,[GameSeletorPanel]);
		}

		this.local.currentLevel = icon.level;
		if(icon.level > this.local.maxLevel)
		{
			this.local.maxLevel = icon.level;
		}
	}

	/**
	 * 重置按钮状态
	 */
	private resetIcon():void
	{
		let max = this.local.maxLevel;
		for(let i:number = max; i > 0; i--)
		{
			let icon = this.icons[i - 1];
			icon.enabled = false;
		}
		let original = this.icons[0];
		original.enabled = true;
		this.img_arrow.x = original.x;
		this.img_arrow.y = original.y;
		this.curLevel = original.level;
	}

	/**
	 * 更新滚动条的位置
	 */
	private updateVScroller():void
	{
		console.log("scroller");
		let cur = LocalStorageUtil.getInstance().currentLevel;
		let levelHeight = this.icons[cur - 1].y;
		this.group_levels.validateNow();
		this.group_levels.scrollV = this.Vscroller - 1000;
	}

	/**
	 * 需要关系的消息
	 */
	public get careMessages():string[]
	{
		return [MessageType.GAME_RESET, MessageType.NEXT_LEVEL];
	}

	/**
	 * 消息回调
	 */
	public updateDate(type:string):void
	{
		switch(type)
		{
			case MessageType.GAME_RESET:
				this.resetIcon();
				break;
			case MessageType.NEXT_LEVEL:
				this.updateVScroller();
				break;
		}
	}

	/**
	 * 打开页面
	 */
	public static open(removeClazz?:any[], level?:number):void
	{
		let selector: GameSeletorPanel = manager.GameManager.getInstance().addSubMap(GameSeletorPanel, removeClazz);
		//更新等级图标
		selector.updateIcon(level);
	} 
	/**
	 * 关闭页面
	 */
	public static close():void
	{
		manager.GameManager.getInstance().addSubMap(GameSeletorPanel);
	}
}