package textifician.mapping;

/**
 * View model definition for GraphArc itself, mainly used for editor only
 * @author Glenn Ko
 */
@:rtti
@:expose
class ArcNodeVM
{
	@inspect( { _sync:"getSync_newInstance", _classes:['primaryArc'] } ) public var val:ArcPacket;
	//public var cost:Float;   // this may be considered

	public function new() 
	{
		
	}
	
}