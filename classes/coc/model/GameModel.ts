
	export class GameModel {
		public  player :Player;
		public  oldStats : Record<string, any>;
		public  time :TimeModel;

		public  flags :DefaultDict;

		//public var debug : boolean;
		// I think this is supposed to be a compile time constant, sorta...
		public  mobile : boolean;

		// TODO: Should this be attached to player instead?
		public  maxHP ;
	}
