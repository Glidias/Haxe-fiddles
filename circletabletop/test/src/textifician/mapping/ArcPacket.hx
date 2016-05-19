package textifician.mapping ;

/**
 * specific data for graph arc. Conventionally for Textifician, all Arc information (including the value packet itself) is optional.
 * @author Glenn Ko
 */
@:rtti
@:expose
class ArcPacket
{
	// starting from x=1 direction
	public static inline var CARDINAL_AUTO:Int = 0;  // default setting to let engine infer cardinal direction based off map position.
	public static inline var CARDINAL_EAST:Int = 1;
	public static inline var CARDINAL_SOUTH_EAST:Int = 2;
	public static inline var CARDINAL_SOUTH:Int = 3;
	public static inline var CARDINAL_SOUTH_WEST:Int = 4;
	public static inline var CARDINAL_WEST:Int = 5;
	public static inline var CARDINAL_NORTH_WEST:Int = 6;
	public static inline var CARDINAL_NORTH:Int = 7;
	public static inline var CARDINAL_NORTH_EAST:Int = 8;	
	public static inline var CARDINAL_UP:Int = 9;	
	public static inline var CARDINAL_DOWN:Int = 10;	
	
	// arc flags
	public static inline var FLAG_VISIBILITY_ONLY:Int = (1 << 0);  // indicates visibliity-only arc, and cannot be  traveled-to by foot
	public static inline var FLAG_TELEPORT:Int = (1 << 1);  // if marked, can be traveled-to by teleportation. But FLAG_VISIBILIITY_ONLY must also be set to assert visibility as well through portal...otherwise, it's deemed as a portal that cannot be seen through
	
	
	@inspect() @bitmask("FLAG")  public var flags:Int;
	@inspect() public var label:String; 
	@inspect({display:"textarea"}) public var description:String;
	@inspect({display:"selector"}) @choices("CARDINAL") public var cardinal:Int;
	//@inspect public var pathBreakpoint:Float;
	@inspect public var pathArcInfo:PathArcInfo;  // optional arc information, mainly for path arcs
	

	public function new() 
	{
		
	}
	
}

@:rtti
@:expose
class PathArcInfo {
	// Between 2 different path points where the locations are "different", what percentage along along it does it consider as breaking into new location?
	@inspect( { step:0.0001, value:0.5, display:"range", min:0, max:1 } ) public var breakpoint:Float;  
	@inspect public var customDistance:Float;  // use this to overwrite default value for custom distance
}