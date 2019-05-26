
	
	CONFIG::debug 
	{
	}
	
	/**
	 * Chaos Monkey!
	 * Basically a tool to randomly generate BUTTON_DOWN events, to 
	 * stress-test the game.
	 * @author Fake-Name
	 */
	export class ChaosMonkey
	{	
		
		/*
		Utility to randomly hammer buttons in the hope of generating a crash

		*/
		public  run: boolean
		private  _excludeMenuKeys: boolean;
		private  _catchOutputTextErrors: boolean;
		private  _mainClassPtr:CoC;
		private  _stage:Stage;
		private  debug: boolean;
		private  buttons: any[];

		private  exitKeyCode: number = 123;

		/**
		 * Init the ChaosMonkey
		 * @param   mainClass   Reference to core CoC class which is needed to access the inputManager to 
			  *                 properly synthesize fake key events
		 * @param   debug       Emit debugging trace statements
		 */
		public  ChaosMonkey(mainClass: any, debug: boolean = false)
		{
			this.debug = debug;
			this._excludeMenuKeys = true;
			this._catchOutputTextErrors = false;

			this._mainClassPtr = mainClass;
			this._stage = this._mainClassPtr.stage;
			this._mainClassPtr.testingBlockExiting = false;

		}

		private  randomChoice(inArr: any[]): any
		{
			return inArr[ Math.floor( Math.random() * inArr.length ) ];
		}

		private  initAvailableKeysList(): void
		{
			/*
			 * 83	-- s				-- Display stats if main menu button displayed
			 * 76	-- l				-- Level up if level up button displayed
			 * 112	-- F1				-- Quicksave to slot 1 if menu_data displayed
			 * 113	-- F2				-- Quicksave slot 2
			 * 114	-- F3				-- Quicksave slot 3
			 * 115	-- F4				-- Quicksave slot 4
			 * 116	-- F5				-- Quicksave slot 5
			 * 
			 * 117	-- F6				-- Quickload slot 1
			 * 118	-- F7				-- Quickload slot 2
			 * 119	-- F8				-- Quickload slot 3
			 * 120	-- F9				-- Quickload slot 4
			 * 121	-- F10				-- Quickload slot 5
			 * 
			 * 8	-- Backspace		-- Go to "Main" menu if in game
			 * 68	-- d				-- Open saveload if in game
			 * 65	-- a				-- Open apperance if in game
			 * 78	-- n				-- "no" if button index 1 displays no		<--
			 * 89	-- y				-- "yes" if button index 0 displays yes		<-- These two seem akward
			 * 80	-- p				-- display perks if in game
			 * 
			 * 13/32 -- Enter/Space		-- if button index 0,4,5 or 9 has text of (nevermind, abandon, next, return, back, leave, resume) execute it
			 * 
			 * 36	-- Home				-- Cycle the background of the maintext area
			*/

		var  blockedButtons: any[] = [112,     // Quicksave buttons
											113,
											114,
											115,
											116,

											117,     // Quickload buttons
											118,
											119,
											120,
											121,

											// 83,      // -- Display stats if main menu button displayed
											// 76,      // -- Level up if level up button displayed
											 8,      // -- Go to "Main" menu if in game
											68,      // -- Open saveload if in game
											// 65,      // -- Open apperance if in game
											36];      // -- Cycle the background of the maintext area

			if (this.debug) trace("Getting available key events");
		var  controlMethods: any[];
			
			this.buttons = [];

			controlMethods = this._mainClassPtr.inputManager.GetControlMethods();
			
			if (this.debug) trace(controlMethods);
			if (this.debug) trace(blockedButtons);

			if (this.debug) trace("ControlMethods = ", this.buttons);
			for (var button: string in controlMethods)
			{
				if (controlMethods[button] != exitKeyCode)   // prevent the monkey from exiting itself by blocking it from adding the exit key-code to the key array
				{
					if (!this._excludeMenuKeys)
					{
						this.buttons.push(controlMethods[button]);
					}
					else if (blockedButtons.indexOf(controlMethods[button]) < 0)
					{
						this.buttons.push(controlMethods[button]);
					}
				}

			}

			if (this.debug) trace(this.buttons);
			if (this.debug) trace(blockedButtons)
		}


		CONFIG::debug 
		{
			public  catchGlobalError(event:UncaughtErrorEvent): void
			{
				this.stopMonkey();


				this._mainClassPtr.rawOutputText("<b>OMG ERROR LOL WUT</b>\n\n", true);
				
			var  stackTrace: string = "";
				
				if (event.error is Error)
				{
				var  tempError:Error = event.error as Error;
					stackTrace = tempError.getStackTrace();
					// do something with the error
				}
				else if (event.error is ErrorEvent)
				{
				var  errorEvent:ErrorEvent = event.error as ErrorEvent;
					this._mainClassPtr.rawOutputText("<b>ERROR EVENT WAT</b>\n\n");
					stackTrace += errorEvent + "\n";
					// do something with the error
				}
				else
				{
					this._mainClassPtr.rawOutputText("<b>DURRRRR</b>\n\n");
				}
				
				this._mainClassPtr.rawOutputText("<b>SOMETHING IS BROKEN LOL WAT</b>\n");
				this._mainClassPtr.rawOutputText(stackTrace);

				this._mainClassPtr.rawOutputText("\n\n<b>Preceeding button Events:</b>\n");
				this._mainClassPtr.rawOutputText(CoC_Settings.getButtonEvents());
				this._mainClassPtr.menu();

			}
		}
		
		

		private  attachGlobalErrorHandler(): void
		{
			CONFIG::debug 
			{
				this._mainClassPtr.loaderInfo.uncaughtErrorEvents.addEventListener(UncaughtErrorEvent.UNCAUGHT_ERROR, this.catchGlobalError);
			}
		}

		private  detatchGlobalErrorHandler(): void
		{
			CONFIG::debug 
			{
				this._mainClassPtr.loaderInfo.uncaughtErrorEvents.removeEventListener(UncaughtErrorEvent.UNCAUGHT_ERROR, this.catchGlobalError);
			}
		}
		
		
		
		
		
		

		private  setupExitKey(): void
		{
			
			// IIFE Hack: http://en.wikipedia.org/wiki/Immediately-invoked_function_expression
		var  stopMonkahTempFunc = function(callFunc)
			{ 
				return function(): void { callFunc() }
			}(this.stopMonkey);

			this._mainClassPtr.inputManager.AddBindableControl(
				"StopMonkah",
				"Stop the chaos-monkey running",
				stopMonkahTempFunc
			);

			this._mainClassPtr.inputManager.BindKeyToControl(exitKeyCode, "StopMonkah");
		}


		public  get excludeMenuKeys(): boolean
		{
			return this._excludeMenuKeys;
		}
		
		public  set excludeMenuKeys(flag: boolean): void
		{
			this._excludeMenuKeys = flag;
		}

		public  get throwOnSyntaxError(): boolean
		{
			return this._catchOutputTextErrors;
		}
		
		public  set throwOnSyntaxError(flag: boolean): void
		{
			this._catchOutputTextErrors = flag;
		}

		// This is called by the key-event bound to F12. It does not do any actual teardown
		// it just sets the run flags to false
		// Actual teardown is done on the next EXIT_FRAME event.
		public  stopMonkey(): void
		{
			this._mainClassPtr.testingBlockExiting = false;
			CoC_Settings.haltOnErrors = false;
		}

		// Set up the run vars for the monkey, and attach the gloval error handler.
		private  engageMonkey(): void
		{
			
			CoC_Settings.haltOnErrors = true;
			this._mainClassPtr.testingBlockExiting = true;
			this.attachGlobalErrorHandler()
		}

		// Actual tear-down function. 
		// Called in the EVENT_EXIT handler if testingBlockExiting is set to false.
		private  disengageMonkey(): void
		{
			this._mainClassPtr.inputManager.RemoveExistingKeyBind(this.exitKeyCode);
			this._stage.removeEventListener(Event.EXIT_FRAME, this.throwAMonkeyAtIt);
			this.detatchGlobalErrorHandler()

		}

		public  createChaos(blockSaves: boolean = true): void
		{

			trace("Starting monkey");
			//this._mainClassPtr.encounteredErrorFlag = false;
			this.engageMonkey();
			// Pull in key list from the InputManager
			this.initAvailableKeysList();

			// setup exit handler
			this.setupExitKey();
			
			// Tie the random keypress generator to the EXIT_FRAME event, which
			// runs at the end of each render cycle (it's not *quite* an ON_IDLE event
			// but apparently flash doesn't have a proper ON_IDLE, so what the hell.)
			this._stage.addEventListener(Event.EXIT_FRAME, this.throwAMonkeyAtIt);
		}

		private  oldTime: number = 0;
		private  checkTime(): void
		{
			if (this._mainClassPtr.time.totalTime - this.oldTime < 0)
			{
				this.oldTime = this._mainClassPtr.time.totalTime;
				throw new Error("Time went backwards!!!")
			}
			this.oldTime = this._mainClassPtr.time.totalTime;
		}

		// KeyHandler(e:KeyboardEvent)
		public  throwAMonkeyAtIt(e: any): void
		{

			this.checkTime();
			
			if (!(this._mainClassPtr.testingBlockExiting))
			{
				trace("Stopping Monkey");
				disengageMonkey();
			}
			else
			{
			var  fakeEvent:KeyboardEvent = new KeyboardEvent(KeyboardEvent.KEY_DOWN);

				fakeEvent.keyCode = randomChoice(this.buttons);
				
				if (this.debug) trace("FakeEvent - ", fakeEvent);

				this._mainClassPtr.inputManager.KeyHandler(fakeEvent);

				//this._mainClassPtr.encounteredErrorFlag
			}



		}

	}
