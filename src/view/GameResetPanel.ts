/**
 * 
 * 一键复原
 */
class GameResetPanel extends eui.Component{
	public constructor() 
	{
		super();
		
		this.once(eui.UIEvent.COMPLETE, this.onUICompleteHandler, this);
		this.skinName = "resource/skins/GameResetSkin.exml";
	}

	/**
	 * 确定
	 */
	public btn_sure:eui.Button;
	/**
	 * 取消
	 */
	public btn_cancel:eui.Button;


	private onUICompleteHandler(e:eui.UIEvent):void
	{
		this.horizontalCenter = 0;
		this.verticalCenter = 0;

		this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_cancelClickHandler, this);
		this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_sureClickHandler, this);		
	}

	/**
	 * 取消
	 */
	private btn_cancelClickHandler(e?:egret.TouchEvent):void
	{
		GameResetPanel.close();
	}

	/**
	 * 确定
	 */
	private btn_sureClickHandler(e:egret.TouchEvent):void
	{
		model.GameModel.getInstance().updateModel(MessageType.GAME_RESET);

		LocalStorageUtil.getInstance().maxLevel = LocalStorageUtil.getInstance().currentLevel = 1;
		this.btn_cancelClickHandler();
	}

	/**
	 * 打开页面
	 */
	public static open(removeClazz?:any[]):void
	{
		manager.GameManager.getInstance().addSubMap(GameResetPanel, removeClazz, true);
	}

	/**
	 * 关闭页面
	 */
	public static close():void
	{
		manager.GameManager.getInstance().removeSubMap(GameResetPanel);
	}
}
