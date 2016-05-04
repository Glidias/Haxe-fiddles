package textifician.mapping;


/**
 * Reusable generic location data definition for a Location node's LocationPacket.
 * @author Glenn Ko
 */
@:expose
class LocationDefinition 
{
	public static inline var FLAG_ENTRANCE:Int = (1 << 0);
	public static inline var FLAG_DOOR:Int = (1 << 1);  // indicates openable closable state
	public static inline var FLAG_KEY:Int = (1 << 2);
	public static inline var FLAG_LANDMARK:Int = (1 << 3);
	public static inline var FLAG_ENCLOSED:Int = (1 << 4);  // force flag enclosed
	
	public static inline var TYPE_POINT:Int = 0;
	public static inline var TYPE_PATH:Int = 1;
	public static inline var TYPE_REGION:Int = 2;
	
	public static inline var ENV_WALL_1:Int =  (1 << 0);
	public static inline var ENV_WALL_2:Int =  (1 << 1);
	public static inline var ENV_CEILING_1:Int =  (1 << 2);
	public static inline var ENV_CEILING_2:Int =  (1 << 3);
	//public static inline var ENV_SUNKEN:Int =  (1 << 4);
	
	
	public static inline var LIGHTING_NONE_OR_OUTDOOR:Int =  0;
	public static inline var LIGHTING_DIM:Int =  1;
	public static inline var LIGHTING_NORMAL:Int =  2;
	public static inline var LIGHTING_BRIGHT:Int =  3;
	
	public static inline var DENSITY_NONE:Int = 0;
	public static inline var DENSITY_VERY_SPARSE:Int = 1;
	public static inline var DENSITY_SPARSE:Int = 2;
	public static inline var DENSITY_AVERAGE:Int = 3;
	public static inline var DENSITY_DENSE:Int = 4;
	public static inline var DENSITY_VERY_DENSE:Int = 5;
	
	public static inline var SHELTER_NONE:Int = 0;
	public static inline var SHELTER_SPARSE:Int = 1;
	public static inline var SHELTER_HALF:Int = 2;
	public static inline var SHELTER_FULL:Int = 3;

	@readonly public var id:String;
	
	public var label:String;
	public var description:String;
	@bitmask("FLAG") public var flags:Int;
	public var size:Float; // convention for now: radius for TYPE_REGION, TYPE_POINT N/A, and TYPE_PATH size determines width of path 
	@values("TYPE") public var type:Int;
	
	@bitmask("ENV") public var envFlags:Int;
	public var indoorLocationSpecs:IndoorLocationSpecs;
	@range("LIGHTING") public var defaultLighting:Int;
	
	// procedural generation
	public var generalFixtures:Array<String>;  // array of fixture definitions 
	@range("DENSITY") public var fixtureDensity:Int;  // density of fixtures
	

	// variable that might be useful for point to point distance/breakpoint arc resolution
	public var priorityIndex:Int;
	

	public static function create(type:Int, label:String, id:String=null):LocationDefinition {
		var locDef:LocationDefinition  = new LocationDefinition();
		locDef.type = type;
		locDef.label = label;
		locDef.size = 1;
		if (id != null) {
			locDef.id = id;
		}
		return locDef;
	}
	
	
	public function setSize(val:Float):LocationDefinition {
		size = val;
		return this;
	}
	public function setDescription(val:String):LocationDefinition {
		description = val;
		return this;
	}
	
	public static function createWithMatchingId(type:Int, label:String, id:String = null, doSlugify:Bool=false, camelCase:Bool=false):LocationDefinition {
		var locDef:LocationDefinition  = new LocationDefinition();
		locDef.type = type;
		locDef.label = label;
		locDef.size = 1;
		if (id != null) {
			locDef.id = id;
		}
		else {
			locDef.id = !doSlugify ?  label : slugify(label);
			if (doSlugify && camelCase) {
				locDef.id = camelizeSlug(locDef.id);
			}
		}
		//trace(locDef.id);
		return locDef;
	}
	
	
	
	public static inline function slugify(label:String):String
	{
		
	  return (~/-+$/).replace( (~/^-+/).replace( (~/\-\-+/g).replace(	(~/[^\w\-]+/g).replace( (~/\s+/g).replace( label.toString().toLowerCase(), "-"), ""), "-" ), ''), '');
	  
	  /*
		.replace(~/\s+/g, '-')           // Replace spaces with -
		
		.replace(~/[^\w\-]+/g, '')       // Remove all non-word chars
		
		.replace(~/\-\-+/g, '-')         // Replace multiple - with single -
		
		.replace(~/^-+/, '')             // Trim - from start of text
		
		.replace(~/-+$/, '');            // Trim - from end of text
		
		*/
	}
	
	

	
	public static inline function camelizeSlug(slug:String):String { 
		var splitStr = slug.split("-");
		var len = splitStr.length;
		for (i in 1...len) {
			 splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substr(1); 
		}
		return splitStr.join("");
	}
	
	
	/**
	 * Useful method to automatically define a door entrance location
	 * @param	val  Defaulted to true for door state. If set to false, un-sets the door state, which can be useful when "blowing up/smashing down" doors.
	 * @param	implyEntrance  Defaulted to true. If "val" state setting of door is true, will imply to be an entrance as well.
	 * @return
	 */
	public function makeDoor(val:Bool = true, implyEntrance:Bool=true):LocationDefinition {
		if (val) {
			flags |= implyEntrance ? FLAG_ENTRANCE : 0;
			flags |= FLAG_DOOR;
		}
		else {   
			flags &= ~FLAG_DOOR;
		}
		return this;
	}
	
	public function makeEntrance(val:Bool=true):LocationDefinition {
		if (val) {
			flags |= FLAG_ENTRANCE;
		}
		else {
			flags &= ~FLAG_ENTRANCE;
		}
		return this;
	}
	
	public function makeKey(val:Bool=true):LocationDefinition {
		if (val) {
			flags |= FLAG_KEY;
		}
		else {
			flags &= ~FLAG_KEY;
		}
		return this;
	}
	
	public function makeLandmark(val:Bool=true):LocationDefinition {
		if (val) {
			flags |= FLAG_LANDMARK;
		}
		else {
			flags &= ~FLAG_LANDMARK;
		}
		return this;
	}
	
	private inline function resetShelterFlags():Void {
		envFlags &= ~(ENV_WALL_1|ENV_WALL_2|ENV_CEILING_1|ENV_CEILING_2);
	}
	private inline function resetShelterWallFlags():Void {
		envFlags &= ~(ENV_WALL_1|ENV_WALL_2);
	}
	private inline function resetShelterCeilingFlags():Void {
		envFlags &= ~(ENV_CEILING_1|ENV_CEILING_2);
	}
	
	public function makeFullyIndoor():LocationDefinition {
		resetShelterFlags();
		envFlags |= (ENV_WALL_1|ENV_WALL_2|ENV_CEILING_1|ENV_CEILING_2);
		return this;
	}
	
	public function makeFullyOutdoor():LocationDefinition {
		resetShelterFlags();
		return this;
	}
	
	public function setupIndoorLocationSpecs(locationSpecs:IndoorLocationSpecs):LocationDefinition {
		indoorLocationSpecs = locationSpecs;
		return this;
	}
	
	/**
	 * 
	 * @param	wallAmount	Amount of wall cover.  Uses SHELTER_ values. A value of 0 none, 1 sparse, 2 half, or 3 for full
	 * @param	ceilingAmount Amount of ceiling cover. Uses SHELTER_ values. A value of 0 none, 1 sparse, 2 half, or 3 for full
	 * @return
	 */
	public function setupShelterAmounts(wallAmount:Int, ceilingAmount:Int):LocationDefinition {
		resetShelterFlags();
		envFlags |= wallAmount == 0 ? 0 : wallAmount == 1 ? ENV_WALL_1 : wallAmount == 2 ? ENV_WALL_2 : (ENV_WALL_1 | ENV_WALL_2);
		envFlags |= ceilingAmount == 0 ? 0 : ceilingAmount == 1 ? ENV_CEILING_1 : ceilingAmount == 2 ? ENV_CEILING_2 : (ENV_CEILING_1 | ENV_CEILING_2);
		return this;
	}
	
	public function setWallAmount(wallAmount:Int):LocationDefinition {
		resetShelterWallFlags();
		envFlags |= wallAmount == 0 ? 0 : wallAmount == 1 ? ENV_WALL_1 : wallAmount == 2 ? ENV_WALL_2 : (ENV_WALL_1 | ENV_WALL_2);
		return this;
	}
	
	public function setCeilingAmount(ceilingAmount:Int):LocationDefinition {
		resetShelterCeilingFlags();
		envFlags |= ceilingAmount == 0 ? 0 : ceilingAmount == 1 ? ENV_CEILING_1 : ceilingAmount == 2 ? ENV_CEILING_2 : (ENV_CEILING_1 | ENV_CEILING_2);
		return this;
	}
	
	public function new() 
	{
		
	}
	
}

