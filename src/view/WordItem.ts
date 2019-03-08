/**
 * 
 * 字
 */
class WordItem extends eui.Component
{
	public constructor() 
	{
		super();
		this.once(eui.UIEvent.COMPLETE, this.onUICompleteHandler, this);
		this.skinName = "resource/skins/WordSkin.exml";
	}

	protected lbl_word:eui.Label;

	/**
	 * 资源预加载UI完成时调度
	 */
	private onUICompleteHandler():void
	{
		this.lbl_word.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lbl_wordClickHandler, this);
	}

	protected lbl_wordClickHandler(e:egret.TouchEvent):void
	{
		model.GameModel.getInstance().word = this;
		// model.GameModel.getInstance().updateModel(MessageType.UPDATE_WORD_SHOW);
		this.dispatchEventWith(egret.Event.CHANGE);
	}

	/**
	 * 获得字
	 */
	public getWordText()
	{
		return this.lbl_word.text;
	}

	/**
	 * 设置字
	 */
	public setWordText(text:string)
	{
		if(this.lbl_word)
		{
			this.lbl_word.text = text;
		}
	}
}


/**
 * 答案字
 */
class AnswerWordItem extends WordItem
{
	public constructor()
	{
		super();
	}

	/**
	 * 选中的答案字
	 */
	public selectWord: WordItem = null;

	/**
	 * 需要被设置的字
	 */
	private text:string;

	protected lbl_wordClickHandler():void
	{
		if(this.selectWord)
		{
			this.selectWord.visible = true;
			this.selectWord = null;
			this.text = "";
			this.setWordText(this.text);
		}
	}

	/**
	 * 选中字
	 */
	public answerWordText(word?:WordItem):void
	{
		if(word)
		{
			word.visible = false;	//点击的字隐藏
			this.text = word.getWordText();
			this.setWordText(this.text);
		}
		else
		{
			this.text = "";
			this.setWordText(this.text);
		}
		this.selectWord = word;
	}
}