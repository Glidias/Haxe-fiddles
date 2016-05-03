package textifician.mapping ;

/**
 * Node-specific data ..
 * @author Glenn Ko
 */
class LocationPacket implements IXYZ
{
	public var state:LocationState;
	public var def:LocationDefinition;
	public var defOverwrites:Dynamic; // any property overwrites for locationDefinition. If label is different, will be listed uniquely as well.
	public var x:Float;
	public var y:Float;
	public var z:Float;
	
	public function getLabel():String {
		return defOverwrites != null && defOverwrites.label != null ? defOverwrites.label : def.label;
	}

	public function new() 
	{
		//state = new LocationState();
		//	def = new LocationDefinition();
		//defOverwrites = { };
	}
	
}