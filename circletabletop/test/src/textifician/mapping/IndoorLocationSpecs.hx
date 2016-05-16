package textifician.mapping ;

/**
 * Generic wall/ceiling data for semi-indoor/indoor areas. Can be useful to determine things like bullet penetration and the like..
 * @author Glenn Ko
 */
@:rtti
@:expose
class IndoorLocationSpecs
{
	@inspect() public var wallHeight:Float;
	@inspect() public var wallThickness:Float;
	@inspect() public var wallStrength:Float;
	@inspect() public var ceilingThickness:Float;
	@inspect() public var ceilingStrength:Float;
	
	public static var DEFAULT_WALL_HEIGHT:Float = 1;
	public static var DEFAULT_WALL_THICKNESS:Float = 1;
	public static var DEFAULT_WALL_STRENGTH:Float = 1;
	public static var DEFAULT_CEILING_THICKNESS:Float = 1;
	public static var DEFAULT_CEILING_STRENGTH:Float = 1;

	public function new() 
	{
		wallHeight = DEFAULT_WALL_HEIGHT;
		wallThickness = DEFAULT_WALL_THICKNESS;
		wallStrength = DEFAULT_WALL_STRENGTH;
		ceilingThickness = DEFAULT_WALL_THICKNESS;
		ceilingStrength = DEFAULT_CEILING_STRENGTH;
	}

	/**
	 * Constructor
	 * Use negative values for parameters to set as DEFAULT values
	 * @param	wallHeight
	 * @param	wallThickness
	 * @param	wallStrength
	 * @param	ceilingThickness
	 * @param	ceilingStrength
	 * @return
	 */
	public static function create(wallHeight:Float=-1, wallThickness:Float=-1, wallStrength:Float=-1,  ceilingThickness:Float=-1, ceilingStrength:Float=-1):IndoorLocationSpecs {
		var me:IndoorLocationSpecs = new IndoorLocationSpecs();
		me.wallHeight = wallHeight < 0 ? DEFAULT_WALL_HEIGHT : wallHeight;
		me.wallThickness = wallThickness < 0 ? DEFAULT_WALL_THICKNESS : wallThickness;
		me.wallStrength = wallStrength < 0 ? DEFAULT_WALL_STRENGTH : wallStrength;
		me.ceilingThickness = ceilingThickness < 0 ? DEFAULT_CEILING_THICKNESS : ceilingThickness;
		me.ceilingStrength = ceilingStrength < 0 ? DEFAULT_CEILING_STRENGTH : ceilingStrength;
		
		return me;
	}
	
	public function toString():String {
		return "[IndoorLocationSpecs]";
	}
	
}