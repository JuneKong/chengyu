/**
 * 
 * 等级按钮
 */
class GameSeletItem extends eui.Button{
	public constructor() {
		super();
		this.skinName = "resource/skins/GameSeletItemSkin.exml";
	}

	private lbl_level:eui.Label;
	
	public get level():number
	{
		return parseInt(this.lbl_level.text);
	}

	public set level(val:number)
	{
		if(this.lbl_level)
		{
			this.lbl_level.text = val.toString();
		}
	}
}