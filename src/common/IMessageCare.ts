module common {
	/**
	 * 消息关心接口,需要订阅MessageObserver
	 */
	export interface IMessageCare 
	{
		/**
		 * 需要关心的消息
		 */	
		careMessages:string[];
		/**
		 * 消息回调
		 */
		updateDate: (type:string) => void;
	}
}