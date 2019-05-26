/**
 * All the variables that have been left around but don't fit into the GlobalVariables file
 */

// import classes.creature;

//Used when save/loading
public  notes: string = "";
// nameBox.maxChars = 54;

//Images for image pack!
//NO! Images now work through ImageManager in GlobalVariables
//var images = new Array();

//System time
public  date:Date = new Date();

//Used to set what each action buttons displays and does. I don't know why it is initialized here.
//var args: any[] = new Array();
//var funcs: any[] = new Array();

//Loeri stuff
//import flash.system.*
 
//if ( ApplicationDomain.currentDomain.hasDefinition("Creature")) trace("Class exists");

//dungeoneering variables
//Setting dungeonLoc = 0 handles this:	public var inDungeon: boolean = false;
public  dungeonLoc: number = 0;

// To save shitting up a lot of code...
public  inRoomedDungeon: boolean = false;
public  inRoomedDungeonResume = undefined;

//Used to restrict random drops from overlapping uniques
public  plotFight: boolean = false;
public  timeQ: number = 0;
public  campQ: boolean = false;

//Possibly redundant, not used anywhere else.
//Input vars
/* Yup, not used at all
public  button0Choice: number = 0;
public  button1Choice: number = 0;
public  button2Choice: number = 0;
public  button3Choice: number = 0;
public  button4Choice: number = 0;
public  button5Choice: number = 0;
public  button6Choice: number = 0;
public  button7Choice: number = 0;
public  button8Choice: number = 0;
public  button9Choice: number = 0;
*/