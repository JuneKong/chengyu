module common {
	/**
	 * 消息回调
	 */
	export class MessageCallback {
		/**
		 * 回调函数
		 */
		public callback: (type:string) => void;
		/**
		 * 回调的this
		 */
		public callbackThis: any;

		public constructor(callback: (type:string) => void, callbackThis:any) 
		{
			this.callback = callback;
			this.callbackThis = callbackThis;
		}

		/**
		 * 执行回调
		 */
		public call(type:string)
		{
			//必须使用call方法传入this，函数才能正确引用this
			this.callback.call(this.callbackThis,type);
		}

		/**
		 * 删除引用
		 */
		public destroy():void
		{
			this.callback = null;
			this.callbackThis = null;
		}
	}
}