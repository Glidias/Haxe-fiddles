package textifician.mapping ;

/**
 * specific data for graph arc
 * @author Glenn Ko
 */
@:expose
class ArcPacket
{
	// starting from x=1 direction
	public static inline var CARDINAL_EAST:Int = 0;
	public static inline var CARDINAL_SOUTH_EAST:Int = 1;
	public static inline var CARDINAL_SOUTH:Int = 2;
	public static inline var CARDINAL_SOUTH_WEST:Int = 3;
	public static inline var CARDINAL_WEST:Int = 4;
	public static inline var CARDINAL_NORTH_WEST:Int = 5;
	public static inline var CARDINAL_NORTH:Int = 6;
	public static inline var CARDINAL_NORTH_EAST:Int = 7;	
	
	// arc flags
	public static inline var FLAG_ENTRANCE:Int = (1 << 0); // indicates the arc goes through entrance
	
	public var flags:Int;
	public var label:Dynamic; // any custom label, might be String or cardinal integer direction
	public var breakVisibility:Int;  // breaks visibility at >= arc distance amount of 1, 2, etc. 2 is usually the default value.. 0 indicates no break vis.
	

	public function new() 
	{
		
	}
	
}