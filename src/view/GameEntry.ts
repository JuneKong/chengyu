/**
 * 
 * 进入游戏
 */
class GameEntry 
{
	public constructor() 
	{
		this.init();
	}

	private init():void
	{
		let local = LocalStorageUtil.getInstance();
        SoundManager.getInstance().musicVolume = local.musicVolume;
        SoundManager.getInstance().soundVolume = local.soundVolume;
        
        GameBeginPanel.open();
	}
}