/**
 * 
 * 设置
 */
class GameSettingPanel extends eui.Component{
	public constructor() 
	{
		super();
		
		this.once(eui.UIEvent.COMPLETE, this.onUICompleteHandler, this);
		this.skinName = "resource/skins/GameSettingSkin.exml";
	}

	/**
	 * 音乐
	 */
	public btn_music:eui.Button;
	/**
	 * 音效
	 */
	public btn_sound:eui.Button;
	/**
	 * 确定
	 */
	public btn_sure:eui.Button;

	public img_nomusic:eui.Image;
	public img_nosound:eui.Image;

	/**
	 * 缓存
	 */
	private local:LocalStorageUtil;

	private onUICompleteHandler(e:eui.UIEvent):void
	{
		this.horizontalCenter = 0;
		this.verticalCenter = 0;

		this.local = LocalStorageUtil.getInstance();

		this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_musicClickHandler, this);
		this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_soundClickHandler, this);
		this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_sureClickHandler, this);		
	}

	/**
	 * 音乐
	 */
	private btn_musicClickHandler(e:egret.TouchEvent):void
	{
		SoundManager.getInstance().playClick();
		let music = SoundManager.getInstance();
		if(this.img_nomusic.visible)
		{
			music.musicVolume = 0;
		}
		else
		{
			music.musicVolume = 1;
		}
		this.local.musicVolume = music.musicVolume;
		this.img_nomusic.visible = this.local.musicVolume ? true : false;
	}

	/**
	 * 音效
	 */
	private btn_soundClickHandler(e:egret.TouchEvent):void
	{
		SoundManager.getInstance().playClick();
		let sound = SoundManager.getInstance();
		if(this.img_nosound.visible)
		{
			sound.soundVolume = 0;
		}
		else
		{
			sound.soundVolume = 1;
		}
		this.local.soundVolume = sound.soundVolume;
		this.img_nosound.visible = this.local.soundVolume ? true : false;
	}

	/**
	 * 确定
	 */
	private btn_sureClickHandler(e:egret.TouchEvent):void
	{
		SoundManager.getInstance().playClick();
		GameSettingPanel.close();
	}

	/**
	 * 打开页面
	 */
	public static open(removeClazz?:any[]):void
	{
		manager.GameManager.getInstance().addSubMap(GameSettingPanel, removeClazz, true);
	}

	/**
	 * 关闭页面
	 */
	public static close():void
	{
		manager.GameManager.getInstance().removeSubMap(GameSettingPanel);
	}
}