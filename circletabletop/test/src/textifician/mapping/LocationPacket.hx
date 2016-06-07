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
	
	private var reflectType:String = "LocationPacket";
	
	public function getLabel():String {
		return defOverwrites != null && defOverwrites.label != null ? defOverwrites.label : def.label;
	}
	
	public inline function setEmptyDefOverwrites():Void {
		defOverwrites = { };// Type.createEmptyInstance(LocationDefinition);
	}
	
	public function setupNewDefOverwrites(obj:Dynamic):Void {

		defOverwrites = { };// Type.createEmptyInstance(LocationDefinition);
		applyDefOverwrites(obj);
		
	}
	public static inline function getTypeOfPacket(locPacket:LocationPacket):Int {
		return  (locPacket.defOverwrites != null && locPacket.defOverwrites.type != null ? locPacket.defOverwrites.type : locPacket.def.type);
	}
	public static function getCategoryOfPacket(locPacket:LocationPacket):String {
		var type:Int = getTypeOfPacket(locPacket);
		
		switch(type) {
			case LocationDefinition.TYPE_REGION:
				return "region";
			case LocationDefinition.TYPE_PATH:
				return "path";
			case LocationDefinition.TYPE_POINT:
				return "point";
			default:
				return "point";
		}
		
		return "point";
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
	
	public function convertOverwritesToLocationDef():Void { // may be a good option to use for saving space when dealing with hx Serialization 
		if (defOverwrites == null) {
				return;
		}
		if (Std.is(defOverwrites, LocationDefinition)) {
			return;
		}
		
		var obj:Dynamic =  Type.createEmptyInstance(LocationDefinition);
		 // todo: proper clone for non-shallow cases
		 var fields = 	Reflect.fields(defOverwrites);
		for (p in fields) {
			Reflect.setField(obj, p, Reflect.field(defOverwrites, p) );
			//obj[p] = defOverwrites[p];
		}
		defOverwrites = obj;
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