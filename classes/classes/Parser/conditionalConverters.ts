		//Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.



		// Possible text arguments in the conditional of a if statement
		// First, there is an attempt to cast the argument to a Number. If that fails,
		// a dictionary lookup is performed to see if the argument is in the conditionalOptions[]
		// object. If that fails, we just fall back to returning 0
		public  conditionalOptions: Record<string, any> =
		{
				"strength"			: function(thisPtr: any): any {return  kGAMECLASS.player.str;},
				"toughness"			: function(thisPtr: any): any {return  kGAMECLASS.player.tou;},
				"speed"				: function(thisPtr: any): any {return  kGAMECLASS.player.spe;},
				"intelligence"		: function(thisPtr: any): any {return  kGAMECLASS.player.inte;},
				"libido"			: function(thisPtr: any): any {return  kGAMECLASS.player.lib;},
				"sensitivity"		: function(thisPtr: any): any {return  kGAMECLASS.player.sens;},
				"corruption"		: function(thisPtr: any): any {return  kGAMECLASS.player.cor;},
				"fatigue"			: function(thisPtr: any): any {return  kGAMECLASS.player.fatigue;},
				"hp"				: function(thisPtr: any): any {return  kGAMECLASS.player.HP;},
				"hour"				: function(thisPtr: any): any {return  kGAMECLASS.model.time.hours;},
				"days"				: function(thisPtr: any): any {return  kGAMECLASS.model.time.days;},
				"tallness"			: function(thisPtr: any): any {return  kGAMECLASS.player.tallness;},
				"hairlength"		: function(thisPtr: any): any {return  kGAMECLASS.player.hairLength;},
				"femininity"		: function(thisPtr: any): any {return  kGAMECLASS.player.femininity;},
				"masculinity"		: function(thisPtr: any): any {return  100 - kGAMECLASS.player.femininity;},
				"cocks"				: function(thisPtr: any): any {return  kGAMECLASS.player.cockTotal();},
				"breastrows"		: function(thisPtr: any): any {return  kGAMECLASS.player.bRows();},
				"biggesttitsize"	: function(thisPtr: any): any {return  kGAMECLASS.player.biggestTitSize();},
				"vagcapacity"		: function(thisPtr: any): any {return  kGAMECLASS.player.vaginalCapacity();},
				"analcapacity"		: function(thisPtr: any): any {return  kGAMECLASS.player.analCapacity();},
				"balls"				: function(thisPtr: any): any {return  kGAMECLASS.player.balls;},
				"cumquantity"		: function(thisPtr: any): any {return  kGAMECLASS.player.cumQ();},
				"biggesttitsize"	: function(thisPtr: any): any {return  kGAMECLASS.player.biggestTitSize();},
				"milkquantity"		: function(thisPtr: any): any {return  kGAMECLASS.player.lactationQ();},
				"hasvagina"			: function(thisPtr: any): any {return  kGAMECLASS.player.hasVagina();},
				"istaur"			: function(thisPtr: any): any {return  kGAMECLASS.player.isTaur();},
				"isnaga"			: function(thisPtr: any): any {return  kGAMECLASS.player.isNaga();},
				"isgoo"				: function(thisPtr: any): any {return  kGAMECLASS.player.isGoo();},
				"isbiped"			: function(thisPtr: any): any {return  kGAMECLASS.player.isBiped();},
				"hasbreasts"		: function(thisPtr: any): any {return  (kGAMECLASS.player.biggestTitSize() >= 1);},
				"hasballs"			: function(thisPtr: any): any {return  (kGAMECLASS.player.balls > 0);},
				"hascock"			: function(thisPtr: any): any {return  kGAMECLASS.player.hasCock();},
				"isherm"			: function(thisPtr: any): any {return  (kGAMECLASS.player.gender == 3);},
				"cumnormal"			: function(thisPtr: any): any {return  (kGAMECLASS.player.cumQ() <= 150);},
				"cummedium"			: function(thisPtr: any): any {return  (kGAMECLASS.player.cumQ() > 150 && kGAMECLASS.player.cumQ() <= 350);},
				"cumhigh"			: function(thisPtr: any): any {return  (kGAMECLASS.player.cumQ() > 350 && kGAMECLASS.player.cumQ() <= 1000);},
				"cumveryhigh"		: function(thisPtr: any): any {return  (kGAMECLASS.player.cumQ() > 1000 && kGAMECLASS.player.cumQ() <= 2500);},
				"cumextreme"		: function(thisPtr: any): any {return  (kGAMECLASS.player.cumQ() > 2500);},
				"issquirter"		: function(thisPtr: any): any {return  (kGAMECLASS.player.wetness() >= 4);},
				"ispregnant"		: function(thisPtr: any): any {return  (kGAMECLASS.player.pregnancyIncubation > 0);},
				"isbuttpregnant"	: function(thisPtr: any): any {return  (kGAMECLASS.player.buttPregnancyIncubation > 0);},
				"hasnipplecunts"	: function(thisPtr: any): any {return  kGAMECLASS.player.hasFuckableNipples();},
				"canfly"			: function(thisPtr: any): any {return  kGAMECLASS.player.canFly();},
				"islactating"		: function(thisPtr: any): any {return  (kGAMECLASS.player.lactationQ() > 0);},
				"true"				: function(thisPtr: any): any {return  true;},
				"false"				: function(thisPtr: any): any {return  false;}
			}
