module common {
	/**
	 * 页面基类
	 */
	export class PanelBase {
		public constructor() {
		}

		public updateModel(type:string):void
		{
			console.log(type);
			MessageManager.getInstance().sendMessage(type);
		}
	}
}