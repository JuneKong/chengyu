module common {
	/**
	 * 消息管理类
	 */
	export class MessageManager {

		private callbacks: any;

		public constructor() 
		{
			this.callbacks = {};
		}


		private static message:MessageManager;

		public static getInstance():MessageManager
		{
			if(MessageManager.message == null)
			{
				MessageManager.message = new MessageManager();
			}
			return MessageManager.message;
		}

		/**
		 * 注册消息回调
		 */
		public registerMessage(type:string, callback:(type:string) => void, callbackThis:any):void
		{
			let calls: Array<MessageCallback> = this.callbacks[type];

			if(calls == null)
			{
				calls = new Array<MessageCallback>();
				this.callbacks[type] = calls;
			}

			calls.push(new MessageCallback(callback, callbackThis));
		}

		/**
		 * 取消注册消息回调
		 */
		public unregisterMessage(type:string, callback:(type:string) => void, callbackThis:any):void
		{
			let calls: Array<MessageCallback> = this.callbacks[type];

			if(calls == null)
			{
				return;
			}

			for(let i:number = 0, length:number = calls.length; i < length; i++)
			{
				let call:MessageCallback = calls[i];
				if(call.callback == callback && call.callbackThis == callbackThis)
				{
					calls.splice(i, 1);
					break;
				}
			}
		}

		/**
		 * 广播消息
		 */
		public sendMessage(type:string):void
		{
			let calls: Array<MessageCallback> = this.callbacks[type];
			
			if(calls == null || calls.length == 0)
			{
				console.log("null");
				return;
			}

			for(let i:number = 0, length:number = calls.length; i < length; i++)
			{
				let call:MessageCallback = calls[i];
				call.call(type);
			}
		}
	}
}