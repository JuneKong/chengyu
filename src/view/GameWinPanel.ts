/**
 * 过关页面
 */
class GameWinPanel extends eui.Component{
	public constructor() 
	{
		super();
		this.once(eui.UIEvent.COMPLETE, this.onUICompleteHandler, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
		this.skinName = "resource/skins/GameWinSkin.exml";
	}

	/**
	 * 下一关
	 */
	public btn_next:eui.Button;
	/**
	 * 解释
	 */
	public lbl_explain:eui.Label;
	/**
	 * 出处
	 */
	public lbl_origin:eui.Label;

	public localUtil:LocalStorageUtil;

	private onUICompleteHandler(e:eui.UIEvent):void
	{
		this.horizontalCenter = 6;
		this.verticalCenter = 280;

		this.localUtil = LocalStorageUtil.getInstance();

		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_nextClickHandler, this);
			
	}

	/**
	 * 添加到舞台
	 */
	private onAddToStageHandler():void
	{
		this.init();
	}

	/**
	 * 移出舞台
	 */
	private onRemoveFromStageHandler():void
	{
		
	}

	private curLevel:number;

	private init():void
	{
		this.curLevel = this.localUtil.currentLevel;
		let info:LevelDateItem = LocalDateManager.getInstance().getDateByLevel(this.curLevel - 1);
		this.lbl_explain.text = info.tip;
		this.lbl_origin.text = info.content;
	}

	/**
	 * 下一关
	 */
	private btn_nextClickHandler(e:egret.TouchEvent):void
	{
		let next = this.curLevel + 1;
		let max = this.localUtil.maxLevel;
		this.localUtil.currentLevel = next;

		if(next > max)
		{
			this.localUtil.maxLevel = next;
		}

		GamePlayPanel.open(next, [GameWinPanel]);
		model.GameModel.getInstance().updateModel(MessageType.NEXT_LEVEL);
	}

	
	/**
	 * 打开页面
	 */
	public static open(removeClazz?:any[]):void
	{
		manager.GameManager.getInstance().addSubMap(GameWinPanel, removeClazz, true);
	}

	/**
	 * 关闭页面
	 */
	public static close():void
	{
		manager.GameManager.getInstance().removeSubMap(GameWinPanel);
	}
}
