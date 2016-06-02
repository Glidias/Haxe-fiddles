package textifician.mapping ;
import de.polygonal.core.fmt.NumberFormat;
import tjson.TJSON;

/**
 * specific data for graph arc. Conventionally for Textifician, all Arc information (including the value packet itself) is optional.
 * @author Glenn Ko
 */
@:rtti
@:expose
class ArcPacket
{
	// cardinal directions and their reverse complements (negative int value flip)
	public static inline var CARDINAL_AUTO:Int = 0;  // default setting to let engine infer cardinal direction based off map position. 
	public static inline var CARDINAL_EAST:Int = 1;
	public static inline var CARDINAL_SOUTH_EAST:Int = 2;
	public static inline var CARDINAL_SOUTH:Int = 3;
	public static inline var CARDINAL_SOUTH_WEST:Int = 4;
	public static inline var CARDINAL_UP:Int = 5;	
	public static inline var CARDINAL_WEST:Int = -1;
	public static inline var CARDINAL_NORTH_WEST:Int = -2;
	public static inline var CARDINAL_NORTH:Int = -3;
	public static inline var CARDINAL_NORTH_EAST:Int = -4;	
	public static inline var CARDINAL_DOWN:Int = -5;	

	
	// arc flags
	public static inline var FLAG_VISIBILITY_ONLY:Int = (1 << 0);  // indicates visibliity-only arc, and cannot be  traveled-to by foot
	public static inline var FLAG_TELEPORT:Int = (1 << 1);  // if marked, can be traveled-to by teleportation. But FLAG_VISIBILIITY_ONLY must also be set to assert visibility as well through portal...otherwise, it's deemed as a portal that cannot be seen through
	
	
	@inspect({_sync:"getSync_equal"}) @bitmask("FLAG")  public var flags:Int;
	@inspect({_sync:"getSync_equal"}) public var label:String; 
	@inspect({display:"textarea", _sync:"getSync_equal"}) public var description:String;
	@inspect({display:"selector", _sync:"getSync_flipInt"}) @choices("CARDINAL") public var cardinal:Int;
	//@inspect public var pathBreakpoint:Float;
	@inspect({_sync:"getSync_newInstance"}) public var pathArcInfo:PathArcInfo;  // optional arc information, mainly for path arcs
	
	public function toString():String {
		return "[ArcPacket]";
	}

	public function new() 
	{
		
	}
	
	
	
	public static inline function getSync_equal(val:Dynamic, oldValue:Dynamic):Dynamic {
		return val;
	}
	public static inline function getSync_ratioComplement(val:Dynamic, oldValue:Dynamic):Dynamic {
		var str = Std.string(val);
		var dotIndex = str.indexOf(".");
		var numDecimalPlaces = str.substr(dotIndex + 1).length;
		//trace(numDecimalPlaces);
		val = 1 - val;
		return NumberFormat.toFixed(val,numDecimalPlaces);
	}
	public static inline function getSync_flipInt(val:Dynamic, oldValue:Dynamic):Dynamic {
		return -val;
	}
	public static inline function getSync_newInstance(val:Dynamic, oldValue:Dynamic):Dynamic {
		return val != null ?  oldValue==null ? Type.getClass(val)!= null ? Type.createInstance( Type.getClass(val), [] ) : _tjsonParse(val) : val : null;
	}
	public static inline function getSync_newEmptyInstance(val:Dynamic, oldValue:Dynamic):Dynamic {
		return val != null ?  oldValue=null ? Type.getClass(val)!= null ?  Type.createEmptyInstance( Type.getClass(val) ) : _tjsonParse(val) : val : null;
	}
	
	private static inline function _tjsonParse(val:Dynamic):Dynamic {
		return TJSON.parse( TJSON.encode(val) ); 
	}

	
}

@:rtti
@:expose
class PathArcInfo {
	// Between 2 different path points where the locations are "different", what percentage along along it does it consider as breaking into new location?
	@inspect({_sync:"getSync_ratioComplement", step:0.01, value:0.5, display:"range", min:0, max:1 } ) public var breakpoint:Float;  
	@inspect({_sync:"getSync_equal"})  public var customDistance:Float;  // use this to overwrite default value for custom distance
	public function new() 
	{
		
	}
	
}