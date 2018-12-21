module common {
	/**
	 * 消息观察者
	 */
	export class MessageObserver {

		/**
		 * 消息列表
		 */
		private messages: string[];
		/**
		 * 消息回调
		 */
		private messageCallback: MessageCallback;
		/**
		 * 如果IMessageCare对象是显示对象，将根据显示对象是否在舞台自动添加和移除消息侦听
		 */
		private autoRemoveWithDisplayObj:boolean;

		/**
		 * @param messageCare 消息回调的观察者，注册IMessageCare关心的消息
		 * @param autoRemove 若autoRemove为true时，并且IMessageCare是显示对象时，只在添加到舞台时接收消息
		 * 对象不再使用时请用destroy方法清除引用
		 */
		public constructor(messageCare: IMessageCare, autoRemove:boolean = false) 
		{
			let careMessage:string[] = messageCare.careMessages;
			if(careMessage == null && careMessage.length == 0)
			{
				return;
			}

			this.messages = careMessage.concat();
			this.messageCallback = new MessageCallback(messageCare.updateDate, messageCare);
			this.autoRemoveWithDisplayObj = autoRemove;

			if(autoRemove)
			{
				if(messageCare instanceof egret.DisplayObject)
				{
					let displayObject:egret.DisplayObject = <egret.DisplayObject><any>messageCare;

					//这里注册了ADD_TO_STAGE就不要取消了
					displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStageHandler, this, false, 1);
					displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStageHandler, this, false, 1);

					//未添加到舞台
					if(displayObject.stage == null)
					{
						return;
					}
				}
				else
				{
					//若IMessageCare不是显示对象，继续执行下面的代码关注消息
				}
				let manage:MessageManager = MessageManager.getInstance();
				//注册消息
				for(let i:number = 0, length:number = careMessage.length; i < length; i++)
				{
					manage.registerMessage(careMessage[i], messageCare.updateDate, messageCare);
				}

			}
		}

		/**
		 * 添加到舞台
		 */
		private addToStageHandler(e:egret.Event):void
		{
			if(this.messages != null && this.messages.length > 0)
			{
				let manage: MessageManager = MessageManager.getInstance();
				for(let i:number = 0, length:number = this.messages.length; i < length; i++)
				{
					manage.registerMessage(this.messages[i], this.messageCallback.callback, this.messageCallback.callbackThis);
				}
			}
		}
		/**
		 * 移出舞台
		 */
		private removeFromStageHandler(e:egret.Event):void
		{
			if(this.messages != null && this.messages.length > 0)
			{
				let manage: MessageManager = MessageManager.getInstance();
				for(let i:number = 0, length:number = this.messages.length; i < length; i++)
				{
					manage.unregisterMessage(this.messages[i], this.messageCallback.callback, this.messageCallback.callbackThis);
				}
			}
		}

		/**
		 * 清除注册消息
		 */
		public destroy():void
		{
			if(this.autoRemoveWithDisplayObj)
			{
				let displayObject:egret.DisplayObject = <egret.DisplayObject>this.messageCallback.callbackThis;
				displayObject.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStageHandler, this, false);
				displayObject.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStageHandler, this, false);
			
				this.autoRemoveWithDisplayObj = false;
			}
			if(this.messages == null)
			{
				return;
			}

			let manage: MessageManager = MessageManager.getInstance();

			for(let i:number = 0, length:number = this.messages.length; i < length; i++)
			{
				manage.unregisterMessage(this.messages[i], this.messageCallback.callback, this.messageCallback.callbackThis);
			}

			this.messageCallback.destroy();
			this.messages = null;
			this.messageCallback = null;
		}
	}
}