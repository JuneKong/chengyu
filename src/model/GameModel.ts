module model
{
	export class GameModel extends common.PanelBase{
		public constructor()
		{
			super();
		}

		private static game:GameModel;
		public static getInstance():GameModel
		{
			if(GameModel.game == null)
			{
				GameModel.game = new GameModel();
			}
			return GameModel.game;
		}

		
		private _word:WordItem;
		/**
		 * 获得被点击的字对象
		 */
		public get word():WordItem
		{
			return this._word;
		}

		public set word(value:WordItem)
		{
			if(this._word === value)
			{
				return;
			}
			this._word = value;
		}
	}
}
