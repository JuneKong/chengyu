/**
 * 
 * 成语游戏界面
 */
class GamePlayPanel extends MessageCareComponent
{
	public constructor() 
	{
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onUICompleteHandler, this);
		this.skinName = "resource/skins/GamePlaySkin.exml";
	}

	/**
	 * 返回
	 */
	public btn_return:eui.Button;
	/**
	 * 问题图
	 */
	public img_question:eui.Image;
	/**
	 * 选择字组
	 */
	public group_words:WordGroup;
	/**
	 * 答案字组
	 */
	public group_answer:AnswerWordGroup;


	/**
	 * 界面资源预加载ui完成创建时调度
	 */
	private onUICompleteHandler(e:eui.UIEvent):void
	{
		this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_returnHandler, this);

		// this.init();
		
	}

	/**
	 * 返回
	 */
	private btn_returnHandler(e:egret.TouchEvent):void
	{
		let cur = LocalStorageUtil.getInstance().currentLevel;
		GameSeletorPanel.open([GamePlayPanel], cur);
	}

	private init():void
	{
		let current:number = LocalStorageUtil.getInstance().currentLevel;
		this.initByLevel(current);
	}

	/**
	 * 初始化题目
	 */
	private initByLevel(level:number):void
	{
		//存储当前等级
		LocalStorageUtil.getInstance().currentLevel = level;
		let info:LevelDateItem = this.getLevelInfo(level - 1);
		this.img_question.source = `resource/assets/${info.img}`;

		//生成选择字
		let words:string = info.answer + info.word;
		while(words.length == 10)
		{
			let index = this.random(400);
			if(index != level)
			{
				let data = this.getLevelInfo(index - 1);
				words += data.answer + data.word;
			}
		}

		//随机排序
		let wordList = this.randomSort(words);
		this.showWordGroup(wordList);
		this.showAnswer();
	}

	/**
	 * 显示答案字
	 */
	private showAnswer()
	{
		for(let i:number = 0, length = this.group_answer.numChildren; i < length; i++)
		{
			let answerRect:AnswerWordItem = <AnswerWordItem>this.group_answer.getChildAt(i);
			answerRect.answerWordText();
			answerRect.selectWord = null;
			answerRect.visible = true;
		}
	}

	/**
	 * 显示字组
	 */
	private showWordGroup(words:any[])
	{
		for(let i:number = 0, length = this.group_words.numChildren; i < length; i++)
		{
			let rect = <WordItem>this.group_words.getChildAt(i);
			rect.setWordText(words[i]);
			rect.visible = true;
		}
	}

	/**
	 * 随机排序
	 */
	private randomSort(word:string):any[]
	{
		let arr = [];
		let array = [];
		for(let i:number = 0, length = word.length; i < length; i++)
		{
			arr.push(word.charAt(i));
		}

		while(arr.length > 0)
		{
			let j:number = this.random(arr.length);
			array.push(arr[j]);
			arr.splice(j,1);
		}
		return array;
	}

	/**
	 * 获得等级信息
	 */
	private getLevelInfo(level):LevelDateItem
	{
		let info:LevelDateItem = LocalDateManager.getInstance().getDateByLevel(level);
		return info ? info : null;
	}

	/**
	 * 随机产生数
	 */
	private random(count:number):number
	{
		let r:number = Math.floor(Math.random() * count);
		return r;
	}


	/**
	 * 更新字
	 */
	public updateWordByClick(word:WordItem):void
	{
		let selWord: AnswerWordItem = null;
		
		for(let i:number = 0, length = this.group_answer.numChildren; i < length; i++)
		{
			let answer = <AnswerWordItem>this.group_answer.getChildAt(i);
			if(answer.selectWord == null)
			{
				selWord = answer;
				break;  // 退出for循环，判断selWord
			}
		}

		if(selWord)
		{
			selWord.answerWordText(word);
			let text:string = "";
			for(let i:number = 0, length = this.group_answer.numChildren; i < length; i++)
			{
				let answerText = <AnswerWordItem>this.group_answer.getChildAt(i);
				text += answerText.getWordText();
			}	
			
			let curLevel = LocalStorageUtil.getInstance().currentLevel;
			let info = LocalDateManager.getInstance().getDateByLevel(curLevel - 1);

			if(text == info.answer)
			{
				GameWinPanel.open();
			}
		}
	}

	/**
	 * 需要关心的消息
	 */
	public get careMessages():string[]
	{
		return [MessageType.UPDATE_WORD_SHOW];
	}

	/**
	 * 消息回调
	 */
	public updateDate(type:string):void
	{
		switch(type)
		{
			case MessageType.UPDATE_WORD_SHOW:
				let word:WordItem = model.GameModel.getInstance().word;
				this.updateWordByClick(word);
		}
	}

	/**
	 * 打开页面
	 */
	public static open(curLevel:number, removeClazz?:any[]):void
	{
		let panel:GamePlayPanel = manager.GameManager.getInstance().addSubMap(GamePlayPanel,removeClazz);
		panel.initByLevel(curLevel);
	}

	/**
	 * 关闭页面
	 */
	public static close():void
	{
		manager.GameManager.getInstance().removeSubMap(GamePlayPanel);
	}
}