package textifician.mapping ;

/**
 * Reusable generic location data definition for a Location node's LocationPacket.
 * @author Glenn Ko
 */
class LocationDefinition
{
	public static inline var FLAG_ENTRANCE:Int = (1 << 0);
	public static inline var FLAG_KEY:Int = (1 << 1);
	public static inline var FLAG_LANDMARK:Int = (1 << 2);
	
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
	
	public static inline var CROWDEDNESS_NONE:Int = 0;
	public static inline var CROWDEDNESS_VERY_SPARSE:Int = 1;
	public static inline var CROWDEDNESS_SPARSE:Int = 2;
	public static inline var CROWDEDNESS_AVERAGE:Int = 3;
	public static inline var CROWDEDNESS_DENSE:Int = 4;
	public static inline var CROWDEDNESS_VERY_DENSE:Int = 5;

	public var id:String;
	
	public var label:String;
	public var description:String;
	public var flags:Int;
	public var size:Float;
	public var type:Int;
	
	public var envFlags:Int;
	public var indoorLocationSpecs:IndoorLocationSpecs;
	public var defaultLighting:Int;
	
	// procedural generation
	public var generalFixtures:Array<String>;  // array of fixture definitions 
	public var crowdedness:Int;  // density of fixtures
	
	// variable that might be useful for point to point distance/breakpoint arc resolution
	public var priorityIndex:Int;
	
	public function new() 
	{
		
	}
	
}