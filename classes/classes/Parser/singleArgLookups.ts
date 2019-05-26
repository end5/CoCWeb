

		// Lookup dictionary for converting any single argument brackets into it's corresponding string
		// basically [armor] results in the "[armor]" segment of the string being replaced with the
		// results of the corresponding anonymous function, in this case: function(): any {return player.armorName;}
		// tags not present in the singleArgConverters object return an error message.
		//
		//Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.
		
		public  singleArgConverters: Record<string, any> =
		{
				// all the errors related to trying to parse stuff if not present are
				// already handled in the various *Descript() functions.
				// no need to duplicate them.

				// Note: all key strings MUST be ENTIRELY lowercase.

				"agility"					: function(thisPtr: any): any { return "[Agility]"; },
				"armor"						: function(thisPtr: any): any { return kGAMECLASS.player.armorName;},
				"armorname"					: function(thisPtr: any): any { return kGAMECLASS.player.armorName;},
				"ass"						: function(thisPtr: any): any { return kGAMECLASS.buttDescript();},
				"asshole"					: function(thisPtr: any): any { return kGAMECLASS.assholeDescript(); },
				"balls"						: function(thisPtr: any): any { return kGAMECLASS.ballsDescriptLight(); },
				"boyfriend"					: function(thisPtr: any): any { return kGAMECLASS.player.mf("boyfriend", "girlfriend"); },
				"butt"						: function(thisPtr: any): any { return kGAMECLASS.buttDescript();},
				"butthole"					: function(thisPtr: any): any { return kGAMECLASS.assholeDescript();},
				"chest"						: function(thisPtr: any): any { return kGAMECLASS.chestDesc(); },
				"clit"						: function(thisPtr: any): any { return kGAMECLASS.clitDescript(); },
				"cock"						: function(thisPtr: any): any { return kGAMECLASS.player.cockDescript(0);},
				"cockhead"					: function(thisPtr: any): any { return kGAMECLASS.player.cockHead(0);},
				"cocks"						: function(thisPtr: any): any { return kGAMECLASS.player.multiCockDescriptLight(); },
				"cunt"						: function(thisPtr: any): any { return kGAMECLASS.vaginaDescript(); },
				"eachcock"					: function(thisPtr: any): any { return kGAMECLASS.player.sMultiCockDesc();},
				"evade"						: function(thisPtr: any): any { return "[Evade]"; },
				"face"						: function(thisPtr: any): any { return kGAMECLASS.player.face(); },
				"feet"						: function(thisPtr: any): any { return kGAMECLASS.player.feet(); },
				"foot"						: function(thisPtr: any): any { return kGAMECLASS.player.foot(); },
				"fullchest"					: function(thisPtr: any): any { return kGAMECLASS.player.allChestDesc(); },
				"hair"						: function(thisPtr: any): any { return kGAMECLASS.hairDescript(); },
				"hairorfur"					: function(thisPtr: any): any { return kGAMECLASS.hairOrFur(); },
				"he"						: function(thisPtr: any): any { return kGAMECLASS.player.mf("he", "she"); },
				"he2"						: function(thisPtr: any): any { return kGAMECLASS.player2.mf("he", "she"); },
				"him"						: function(thisPtr: any): any { return kGAMECLASS.player.mf("him", "her"); },
				"him2"						: function(thisPtr: any): any { return kGAMECLASS.player2.mf("him", "her"); },
				"himself"					: function(thisPtr: any): any { return kGAMECLASS.player.mf("himself", "herself"); },
				"herself"					: function(thisPtr: any): any { return kGAMECLASS.player.mf("himself", "herself"); },
				"hips"						: function(thisPtr: any): any { return kGAMECLASS.hipDescript();},
				"his"						: function(thisPtr: any): any { return kGAMECLASS.player.mf("his", "her"); },
				"his2"						: function(thisPtr: any): any { return kGAMECLASS.player2.mf("his","her"); },
				"leg"						: function(thisPtr: any): any { return kGAMECLASS.player.leg(); },
				"legs"						: function(thisPtr: any): any { return kGAMECLASS.player.legs(); },
				"man"						: function(thisPtr: any): any { return kGAMECLASS.player.mf("man", "woman"); },
				"men"						: function(thisPtr: any): any { return kGAMECLASS.player.mf("men", "women"); },
				"master"					: function(thisPtr: any): any { return kGAMECLASS.player.mf("master","mistress"); },
				"misdirection"				: function(thisPtr: any): any { return "[Misdirection]"; },
				"multicock"					: function(thisPtr: any): any { return kGAMECLASS.player.multiCockDescriptLight(); },
				"multicockdescriptlight"	: function(thisPtr: any): any { return kGAMECLASS.player.multiCockDescriptLight(); },
				"name"						: function(thisPtr: any): any { return kGAMECLASS.player.short;},
				"nipple"					: function(thisPtr: any): any { return kGAMECLASS.nippleDescript(0);},
				"nipples"					: function(thisPtr: any): any { return kGAMECLASS.nippleDescript(0) + "s";},
				"onecock"					: function(thisPtr: any): any { return kGAMECLASS.player.oMultiCockDesc();},
				"pg"						: function(thisPtr: any): any { return "\n\n";},
				"pussy"						: function(thisPtr: any): any { return kGAMECLASS.vaginaDescript(); },
				"race"						: function(thisPtr: any): any { return kGAMECLASS.player.race(); },
				"sack"						: function(thisPtr: any): any { return kGAMECLASS.sackDescript(); },
				"sheath"					: function(thisPtr: any): any { return kGAMECLASS.player.sheathDescription(); },
				"skin"						: function(thisPtr: any): any { return kGAMECLASS.player.skin(); },
				"skinfurscales"				: function(thisPtr: any): any { return kGAMECLASS.player.skinFurScales(); },
				"teasetext"					: function(thisPtr: any): any { return kGAMECLASS.teaseText(); },
				"tongue"					: function(thisPtr: any): any { return kGAMECLASS.tongueDescript(); },
				"vag"						: function(thisPtr: any): any { return kGAMECLASS.vaginaDescript(); },
				"vagina"					: function(thisPtr: any): any { return kGAMECLASS.vaginaDescript(); },
				"vagorass"					: function(thisPtr: any): any { return (kGAMECLASS.player.hasVagina() ? kGAMECLASS.vaginaDescript() : kGAMECLASS.assholeDescript()); },
				"weapon"					: function(thisPtr: any): any { return kGAMECLASS.player.weaponName;},
				"weaponname"				: function(thisPtr: any): any { return kGAMECLASS.player.weaponName; },
				
				"latexyname"				: function(thisPtr: any): any { return kGAMECLASS.flags[kFLAGS.GOO_NAME]; },
				"bathgirlname"				: function(thisPtr: any): any { return kGAMECLASS.flags[kFLAGS.MILK_NAME]; },
				"cockplural"				: function(thisPtr: any): any { return (kGAMECLASS.player.cocks.length == 1) ? "cock" : "cocks"; },
				"dickplural"				: function(thisPtr: any): any { return (kGAMECLASS.player.cocks.length == 1) ? "dick" : "dicks"; },
				"headplural"				: function(thisPtr: any): any { return (kGAMECLASS.player.cocks.length == 1) ? "head" : "heads"; },
				"prickplural"				: function(thisPtr: any): any { return (kGAMECLASS.player.cocks.length == 1) ? "prick" : "pricks"; },
				"boy"						: function(thisPtr: any): any { return kGAMECLASS.player.mf("boy", "girl"); },
				"guy"						: function(thisPtr: any): any { return kGAMECLASS.player.mf("guy", "girl"); },
				"wings"						: function(thisPtr: any): any { return kGAMECLASS.wingsDescript(); },
				"tail"						: function(thisPtr: any): any { return kGAMECLASS.tailDescript(); },
				"onetail"					: function(thisPtr: any): any { return kGAMECLASS.oneTailDescript(); }

		}
