package dat.gui ;
import dat.gui.GUI;
import haxe.rtti.CType;
import haxe.rtti.Meta;
import haxe.rtti.Rtti;

/**
 * Utility to generate field definitions/UI fields for DATGUI from Haxe classes using metadata.
 * 
 * By default, it'll only inspect variable fields with "@inspect" metadata attached to it. 
 * To remove this requirement, add to the options a field for "ignoreInspectMetadata:true".
 * 
 * 
 * @author Glenn Ko
 */
@:expose
class DatUtil
{
	private static function _concatDyn(a1:Array<Dynamic>, a2:Array<Dynamic>):Array<Dynamic> {
		return a1.concat(a2);
	}
	
	public static function setup(instance:Dynamic, classe:Class<Dynamic>=null, options:Dynamic=null):Dynamic 
	{
		if (classe == null) classe = Type.getClass(instance);
		if (options == null) options = { };
		
		var ignoreInspectMeta:Bool = Reflect.field( options, "ignoreInspectMeta");
		var rtti = Rtti.getRtti(classe);
		var meta = Meta.getFields(classe);
		
		var fieldHash = { };
		var fields = rtti.fields;
		var fieldsI = fields.iterator();
		// @bitmask folders 
		// @choices combo list
		// @textarea  display:textarea
		// @range   display:range
		// @step	step:
		// @color   display:color
		
		var cur:Dynamic;
		var curVal:Dynamic;
		var frStatics;
					var frParams:Array<Dynamic>;
				var frValue:Dynamic;
				var frPrefix:String = null;
				
				var frI:Int;
			
		//	cur = {display:"none", "_isLeaf":true, "value":0 };
		//	Reflect.setField(fieldHash, "DATUTIL", cur);
				
		for (f in fieldsI) {
			var fieldMeta = Reflect.field(meta, f.name);
			
			if (TypeApi.isVar(f.type) && (!ignoreInspectMeta ?  fieldMeta!=null && Reflect.hasField( fieldMeta, "inspect") : true ) ) {
				
				cur = Reflect.field(fieldMeta, "inspect");
				
				if (cur == null) {
					cur = { };
				}
				else cur =  cur[0];
				
				curVal = Reflect.hasField(cur, "value") ? Reflect.field(cur, "value") : Reflect.getProperty(instance, f.name);
				var typeStr = CTypeTools.toString(f.type);
				
	
				if (typeStr == "Int" || typeStr=="UInt" || typeStr == "Float") {
					
					if (curVal == null) { 
						curVal = 0;
					}
					Reflect.setField(cur, "value", curVal);
					
					if (typeStr == "Int" || typeStr == "UInt") {  // handle integer case
						
						if (Reflect.hasField(fieldMeta, "bitmask")) {
	
							var bitMaskFolder = { _classes: (Reflect.hasField(cur, "_classes") ? _concatDyn(["bitmask"], Reflect.field(cur, "_classes")) : ["bitmask"] ) }; //
							
							var gotBits = false;
							var bitFieldMeta = Reflect.field(fieldMeta, "bitmask")[0];
							if ( Std.is(bitFieldMeta, String)) {
								frValue = bitFieldMeta;
								frStatics = rtti.statics.iterator();
								for (f in frStatics) {
									frI = f.name.indexOf("_");
									if (frI >= 0) {
										gotBits = true;
										frPrefix = f.name.substring(0, frI);
										if (frPrefix == frValue) {	
											
											Reflect.setField(bitMaskFolder, f.name.substring(frI + 1),  {value:false});
										}
									}
								}
							}
							else { // create default 32 bits
								for (i in 0...32) {
									Reflect.setField(bitMaskFolder, "b"+Std.string(i), {value:false});
								}
								gotBits = true;
							}
							
							if (gotBits) Reflect.setField(fieldHash, f.name, bitMaskFolder);

							//Reflect.setField(fieldHash, f.name, cur);
							
						}
						else {  // regular numeric case for integer data type
							if (!Reflect.hasField(cur, "step") ) {
								Reflect.setField(cur, "step", 1);
							}
							
							if (typeStr == "UInt" && !Reflect.hasField(cur, "min") ) {
								Reflect.setField(cur, "min", 0);
							}
							
							Reflect.setField(fieldHash, f.name, cur);
							Reflect.setField(cur, "_isLeaf", true);
						}
						
					}
					else {  // handle generic number case
						Reflect.setField(fieldHash, f.name, cur);
						Reflect.setField(cur, "_isLeaf", true);
					}
				}
				else if (typeStr == "String") {
					
					if (curVal == null) { 
						curVal = "";
					}
					Reflect.setField(cur, "value", curVal);
					
					
					Reflect.setField(fieldHash, f.name, cur);
					Reflect.setField(cur, "_isLeaf", true);
				}
				else if (typeStr == "Bool") {
					if (curVal == null) { 
						curVal = false;
					}
					Reflect.setField(cur, "value", curVal);
					
					Reflect.setField(fieldHash, f.name, cur);
					Reflect.setField(cur, "_isLeaf", true);
				}
				else {  // nested object case
					var tryInstance = Reflect.getProperty(instance, f.name);
					var instanceAvailable:Bool = true;
					
					if (tryInstance == null) {
						instanceAvailable = false;
						tryInstance = Type.createInstance( Type.resolveClass(typeStr), [] );  //Type.createEmptyInstance(Type.resolveClass(typeStr)); // 
					}
					var nested;
					
					Reflect.setField(fieldHash, f.name, nested=setup(tryInstance, Type.resolveClass(typeStr), f.type) );
					Reflect.setField(nested, "_folded", instanceAvailable ? false : true );
					Reflect.setField(nested, "_classes", ["instance"] );
					
					
				}
				//Reflect.setField(fieldHash, f.name, gui.add(instance, f.name));		
				
	
				
				if (Reflect.hasField(fieldMeta, "range")) {
					// check if choices[0] is a string static "string_" lookup, else woudl be either
					frParams = Reflect.field(fieldMeta, "range");
					
					
					if (frParams != null && frParams.length > 0) {
						frValue = frParams[0];
						
						if (Std.is(frValue, String)) {
							
							var frEnum:Dynamic = {  };
							// set min max based on static lookups
							var min = 1e20;	
							var max = -1e20;
							frStatics = rtti.statics.iterator();
							for (f in frStatics) {
								frI = f.name.indexOf("_");
								if (frI >= 0) {
									frPrefix = f.name.substring(0, frI);
									if (frPrefix == frValue) {
										var v:Float;
										v =  Reflect.field(classe, f.name);
										if (v > max) {
											max = v;
										}
										if (v < min) {
											min = v;
										}
										Reflect.setField(frEnum, f.name.substring(frI + 1), v);
									}
								}
							}
							Reflect.setField(cur, "enumeration", frEnum);
							Reflect.setField(cur, "min", min);
							Reflect.setField(cur, "max", max);
						}
						else {
							Reflect.setField(cur, "min", Reflect.hasField(frValue, "min") ? Reflect.field(frValue, "min") : 0 );
							Reflect.setField(cur, "max", Reflect.hasField(frValue, "max") ? Reflect.field(frValue, "max") : Reflect.field(frValue, "min")+1 );
						}
					}
					
		
				}
				if (Reflect.hasField(fieldMeta, "choices")) {
					// check if choices[0] is a string static "string_" lookup, else would be either assumed Object||Array
					frParams = Reflect.field(fieldMeta, "choices");
			
					if (frParams != null && frParams.length > 0) {
						frValue = frParams[0];
						if (Std.is(frValue, String)) {
							var frChoices:Dynamic = { };
							// set choices based on static lookups
							frStatics = rtti.statics.iterator();
							for (f in frStatics) {
								frI = f.name.indexOf("_");
								if (frI >= 0) {
									frPrefix = f.name.substring(0, frI);
									if (frPrefix == frValue) {
										//trace("SETTING:" + f.name);
										Reflect.setField(frChoices, f.name.substring(frI+1), Reflect.field(classe, f.name) );
									}
								}
							}
							Reflect.setField(cur, "choices", frChoices);
						}
						else {
							Reflect.setField(cur, "choices", frValue);
						}
					}
					
				}
			}
		}
		
		Reflect.setField(fieldHash, "_hxclass", Type.getClassName(classe) );
		return fieldHash;
	}
	
	/*
	public static function setupDatGui(gui:GUI, instance:Dynamic, classe:Class<Dynamic>=null):Dynamic 
	{
		if (classe == null) classe = Type.getClass(instance);
		var rtti = Rtti.getRtti(classe);
		var fieldHash = { };
		var fields = rtti.fields;
		var fieldsI = fields.iterator();
		
		
		for (f in fieldsI) {
			//if (TypeApi.isVar(f.type)) {
				//Reflect.setField(fieldHash, f.name, gui.add(instance, f.name));
			//}
		}
		
		return fieldHash;
	}
	*/
}