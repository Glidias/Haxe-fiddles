package textifician.mapping ;

/**
 * Node-specific data ..
 * @author Glenn Ko
 */
@:rtti
@:expose
class LocationPacket implements IXYZ
{
	public var def:LocationDefinition;
	public var defOverwrites:Dynamic; // any property overwrites for locationDefinition. If label is different, will be listed uniquely as well.
	@inspect({_classes:['position'], _readonly:true}) public var x:Float;
	@inspect({_classes:['position'],_readonly:true}) public var y:Float;
	@inspect({_classes:['position']}) public var z:Float;
	@inspect public var state:LocationState;
	
	public function getLabel():String {
		return defOverwrites != null && defOverwrites.label != null ? defOverwrites.label : def.label;
	}
	
	public inline function setEmptyDefOverwrites():Void {
		defOverwrites = Type.createEmptyInstance(LocationDefinition);
	}
	
	public function setupNewDefOverwrites(obj:Dynamic):Void {
		Type.createEmptyInstance
		defOverwrites = { };// Type.createEmptyInstance(LocationDefinition);
		applyDefOverwrites(obj);
		
	}
	
	public inline function applyDefOverwrites(obj:Dynamic):Void {
		if (defOverwrites == null) setEmptyDefOverwrites();
		var fields = 	Reflect.fields(obj);
		for (p in fields) {
			// we assume no need setProperty here..
			Reflect.setField(defOverwrites, p, Reflect.field(obj, p) );
			//obj[p] = defOverwrites[p];
		}
	}
	
	
	public function cloneOverwritesDynamic():Dynamic {
		if (defOverwrites == null) {
				return null;
		
		}
		var obj:Dynamic = { };// Type.createEmptyInstance(LocationDefinition);
		 // todo: proper clone for non-shallow cases
		 var fields = 	Reflect.fields(defOverwrites);
		for (p in fields) {
			Reflect.setField(obj, p, Reflect.field(defOverwrites, p) );
			//obj[p] = defOverwrites[p];
		}
		return obj;
	}

	public function new() 
	{
		//state = new LocationState();
		//	def = new LocationDefinition();
		//defOverwrites = { };
	}
	
}