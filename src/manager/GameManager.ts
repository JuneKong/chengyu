module manager
{
	/**
	 * 游戏管理类
	 */
	export class GameManager 
	{

		private _stage:egret.DisplayObjectContainer;

		private begin: GameBeginPanel;

		private setting: GameSettingPanel;

		/**
		 * 背景遮罩
		 */
		private bgMask:egret.Sprite;

		public constructor() 
		{
			// this.gameBegin = new GameBeginPanel();
		}

		private static instance:GameManager;
		//单例
		public static getInstance():GameManager
		{
			if(GameManager.instance == null)
			{
				GameManager.instance = new GameManager();
			}
			return GameManager.instance; 
		}

		/**
		 * 设置根舞台
		 */
		public setRootStage(s:egret.DisplayObjectContainer)
		{
			this._stage = s;
		}

		/**
		 * 实例化的显示对象
		 */
		private classDict:any = {};

		/**
		 * 添加子场景
		 * @param clazz 添加的页面
		 * @param removeClazz 移除的页面组
		 * @param modal 是否有背景遮罩
		 */
		public addSubMap(clazz:any, removeClazz?:any[], modal?:boolean):any
		{
			let className:string = egret.getQualifiedClassName(clazz);
			let child:any = this.classDict[className];

			if(child == null)
			{
				child = new clazz();
				this.classDict[className] = child;
			}
			this._stage.addChild(child);

			if(removeClazz)
			{
				removeClazz.forEach((item) => {
					this.removeSubMap(item);
				})
			}

			if(modal && modal == true)
			{
				this.isDrawBgMask = modal;
				this.drawBgMask();
			}

			return child;
		}

		/**
		 * 删除子场景
		 */
		public removeSubMap(clazz:any)
		{
			let className:string = egret.getQualifiedClassName(clazz);
			let instance:egret.DisplayObject = this.classDict[className];
			if(instance == null)
			{
				return;
			}
			if(instance.parent)
			{
				instance.parent.removeChild(instance);
			}

			if(this.isDrawBgMask)
			{
				this.removeBgMask();
			}
		}

		private isDrawBgMask:boolean = false;

		private defaultBgMaskColor:number = 0x0;
		private defaultBgMaskAlpha:number = 0.8;

		/**
		 * 绘制背景遮罩
		 */
		private drawBgMask()
		{
			let num:number = this._stage.numChildren;
			this.bgMask = new egret.Sprite();
			this.bgMask.touchEnabled = true;
			this._stage.addChildAt(this.bgMask, num - 1);

			this.bgMask.graphics.clear();
			this.bgMask.graphics.beginFill(this.defaultBgMaskColor, this.defaultBgMaskAlpha);
			this.bgMask.graphics.drawRect(0, 0, this._stage.width, this._stage.height);
			this.bgMask.graphics.endFill();
		}

		/**
		 * 移除背景遮罩
		 */
		private removeBgMask()
		{
			if(this.bgMask && this.bgMask.parent)
			{
				this.bgMask.parent.removeChild(this.bgMask);
			}
		}
		
	}

}
