/**
 * 游戏开始页面
 */
class GameBeginPanel extends eui.Component{
	
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.UICompleteHandler,this);	
		this.skinName = "resource/skins/GameBeginSkin.exml";
	}
	
	/**
	 * 开始
	 */
	public btn_begin:eui.Button;
	/**
	 * 设置
	 */
	public btn_setting:eui.Button;
	/**
	 * 一键复原
	 */
	public btn_reset:eui.Button;


	private UICompleteHandler()
	{
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickBeginHandler,this);
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickSettingHandler,this);
		this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickResetHandler,this);		
	}

	/**
	 * 开始游戏
	 */
	private onclickBeginHandler(){
		SoundManager.getInstance().playClick();
		GameSeletorPanel.open([GameBeginPanel]);
	}

	/**
	 * 设置音量
	 */
	private onclickSettingHandler(e:egret.TouchEvent):void
	{
		SoundManager.getInstance().playClick();
		GameSettingPanel.open();
	}

	/**
	 * 一键复原
	 */
	private onclickResetHandler(e:egret.TouchEvent):void
	{
		SoundManager.getInstance().playClick();
		GameResetPanel.open();
	}

	/**
	 * 打开页面
	 */
	public static open(removeClazz?:any[]):void
	{
		manager.GameManager.getInstance().addSubMap(GameBeginPanel,removeClazz);
	}

	/**
	 * 关闭页面
	 */
	public static close():void
	{
		manager.GameManager.getInstance().removeSubMap(GameBeginPanel);
	}
}