/**
 * 一组字
 */
class WordGroup extends eui.Group
{
	public constructor() 
	{
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onUICompleteHandler, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
		
	}

	/**
	 * 字的个数
	 */
	public wordCount:number = 20;

	/**
	 * 存储字
	 */
	private words:WordItem[];

	private onUICompleteHandler(e:eui.UIEvent):void
	{
	}

	/**
	 * 添加到舞台
	 */
	protected onAddToStageHandler():void
	{
		this.addWordChild();
		this.showWords();
		
	}

	/**
	 * 移出舞台
	 */
	protected onRemoveFromStageHandler():void
	{
		this.hideWords();
	}

	/**
	 * 添加字
	 */
	protected addWordChild():void
	{
		// let children: number = this.numChildren;
		// let i:number;
		this.words = [];
		// for(i = 0; i < children; i++)
		// {
		// 	let child:egret.DisplayObject = this.getChildAt(i);
		// 	if(egret.is(child, "WordItem"))
		// 	{
		// 		this.words.push(<any>child);
		// 	}
		// }

		// let index:number = 0;
		while(this.words.length < this.wordCount)
		{
			let word:WordItem = new WordItem();
			this.words.push(word);
			// index++;
		}
	}

	/**
	 * 显示字
	 */
	protected showWords():void
	{
		for(let i:number = 0, length:number = this.words.length; i < length; i++)
		{
			let word:WordItem = this.words[i];
			if(word.parent == null)
			{
				this.addChild(word);
			}
		}
	}

	/**
	 * 隐藏字
	 */
	protected hideWords(): void
    {
        for(let i:number = 0, length:number = this.words.length; i < length; i++)
        {
            if(this.words[i].parent)
            {
                this.removeChild(this.words[i]);
            }
        }
    }
}


/**
 * 答案字组
 */
class AnswerWordGroup extends WordGroup
{
	public constructor() 
	{
		super();
	}

	/**
	 * 添加到舞台
	 */
	protected onAddToStageHandler():void
	{
		this.addWordChild();
		this.showWords();
		
	}

	/**
	 * 移出舞台
	 */
	protected onRemoveFromStageHandler():void
	{
		this.hideWords();
	}

	/**
	 * 答案字的个数
	 */
	public answerCount:number = 4;

	private answer:AnswerWordItem[];
	/**
	 * 添加字
	 */
	protected addWordChild():void
	{
		this.answer = [];

		while(this.answer.length < this.answerCount)
		{
			let word:AnswerWordItem = new AnswerWordItem();
			this.answer.push(word);
		}
	}

	/**
	 * 显示字
	 */
	protected showWords():void
	{
		for(let i:number = 0, length:number = this.answer.length; i < length; i++)
		{
			let word:AnswerWordItem = this.answer[i];
			if(word.parent == null)
			{
				this.addChild(word);
			}
		}
	}

	/**
	 * 隐藏字
	 */
	protected hideWords(): void
    {
        for(let i:number = 0, length:number = this.answer.length; i < length; i++)
        {
            if(this.answer[i].parent)
            {
                this.removeChild(this.answer[i]);
            }
        }
    }

}