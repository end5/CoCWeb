
public  sackDescript(): string
{
	return Appearance.sackDescript(player);
}

public  cockClit(number: number = 0): string {
	if(player.hasCock() && number >= 0 && number < player.cockTotal()) return player.cockDescript(number);
	else return clitDescript();
}

public  chestDesc(): string {
	return player.chestDesc();
}

public  tongueDescript(): string {
	return Appearance.tongueDescription(player);
}
public  wingsDescript(): string {
	return Appearance.wingsDescript(player);
}
public  tailDescript(): string {
	return Appearance.tailDescript(player);
}
public  oneTailDescript(): string {
	return Appearance.oneTailDescript(player);
}

public  ballsDescriptLight(forcedSize: boolean = true): string {
	return Appearance.ballsDescription(forcedSize, true, player);
}

public  ballDescript(): string {
	return Appearance.ballsDescription(false, false, player);
}

public  ballsDescript(): string {
	return Appearance.ballsDescription(false, true, player, true);
}
public  simpleBallsDescript(): string {
	return Appearance.ballsDescription(false, true, player);
}

public  assholeDescript(): string {
	return Appearance.assholeDescript(player);
}
		
public  hipDescript(): string {
	return Appearance.hipDescription(player);
}
public  assDescript(): string {
	return buttDescript();
}
public  buttDescript(): string {
	return Appearance.buttDescription(player);
}

public  nippleDescript(rowNum: number): string {
	return Appearance.nippleDescription(player, rowNum);
}

public  hairDescript(): string {
	return Appearance.hairDescription(player);
}

public  hairOrFur(): string {
	return Appearance.hairOrFur(player);
}

public  clitDescript(): string {
	return Appearance.clitDescription(player);
}

//Vaginas + Descript
public  vaginaDescript(vaginaNum: number = 0): string {
	return Appearance.vaginaDescript(player, vaginaNum);
}

//Allvagina descript
public  allVaginaDescript(): string {
	if (player.vaginas.length == 1) return vaginaDescript(rand(player.vaginas.length - 1));
	if (player.vaginas.length > 1) return (vaginaDescript(rand(player.vaginas.length - 1)) + "s");
	
	CoC_Settings.error("ERROR: allVaginaDescript called with no vaginas.");
	return "ERROR: allVaginaDescript called with no vaginas.";
}

public  cockDescript(cockNum: number = 0): string 
{
	return player.cockDescript(cockNum);
}

public  allBreastsDescript(): string {
	return Appearance.allBreastsDescript(player);
}
	
public  breastDescript(rowNum: number): string
{
	return player.breastDescript(rowNum);
}

public  num2Text(number: number): string {
	return Utils.num2Text(number);
}

public  num2Text2(number: number): string {
	return Utils.num2Text2(number);
}

public  Num2Text(number: number): string {
	return Utils.Num2Text(number);
}
