/**
 * 实现页面消息关心的Component的子级
 */
class MessageCareComponent extends eui.Component implements common.IMessageCare{
	
	/**
	 * 消息者
	 */
	private observer: common.MessageObserver;
	public constructor() {
		super();

		let messages:string[] = this.careMessages;
		if(messages != null && messages.length > 0)
		{
			this.observer = new common.MessageObserver(this, true);
		}
	}

	/**
	 * 需要关系的消息
	 */
	public get careMessages():string[]
	{
		return null;
	}

	/**
	 * 消息回调
	 */
	public updateDate(type:string):void
	{

	}
}