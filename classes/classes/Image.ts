	/**
	 * ...
	 * @author Yoffy
	 */
	export class Image 
	{
		private  _id: string;
		private  _url: string
		private  _width: number;
		private  _height: number;		
		
		public  Image(id: string, url: string, w: number, h: number) 
		{
			_id = id;
			_url = url;
			_width = w;
			_height = h;
		}
		
		public  get id(): string 
		{
			return _id;
		}
		
		public  get url(): string 
		{
			return _url;
		}
		
		public  get width(): number 
		{
			return _width;
		}
		
		public  get height(): number 
		{
			return _height;
		}
		
	}

