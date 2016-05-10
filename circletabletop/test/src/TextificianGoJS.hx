package ;
import de.polygonal.ds.Graph;
import haxe.Json;
import haxe.rtti.Meta;
import haxe.rtti.Rtti;
import haxe.Serializer;
import haxe.Unserializer;
import dat.gui.DatUtil;
import textifician.mapping.IndoorLocationSpecs;
import textifician.mapping.LocationDefinition;
import textifician.mapping.LocationPacket;
import textifician.mapping.TextificianUtil;
import textifician.mapping.TextificianWorld;
import tjson.TJSON;

/**
 * ...
 * @author Glenn Ko
 */
class TextificianGoJS
{
	
	

	static public function main()
	{
		
		
		Graph;
		LocationPacket; LocationDefinition; TextificianWorld; TextificianUtil;
		
			//	trace("A");
		//	trace(LocationDefinition._getComponents().toString());
			/*
		var world:TextificianWorld = new TextificianWorld();
		//trace(rtti.fields);
		var location:LocationDefinition =  LocationDefinition.createWithMatchingId("The Quick $brown_fox jumps $100", null, true).setCeilingAmount(2).setupIndoorLocationSpecs(IndoorLocationSpecs.create() );
		
		
		var location2:LocationDefinition = world.getDuplicationLocationDef(location);
		location2.indoorLocationSpecs.testMethod();
		
		trace( Meta.getFields(Type.getClass(location2)) );
		trace( TJSON.parse( TJSON.encode(location2, "fancy") ) );
		*/
		var serializer = new Serializer();
		serializer.useCache = true;
		var nestedArr:Array<Dynamic> = [0, 0, 0];
		var sameArr:Array<Dynamic> = [1, 2, 3, nestedArr];
		var itest = new InstanceTest();
		
	//	serializer.serialize(sameArr);
		
		itest.a = sameArr;
		itest.b = sameArr;
		
		
		trace(itest.a == itest.b);  // assert matching reference
		trace(itest.a != null && itest.a[3] == itest.b[3]);  // assert matching reference
		serializer.serialize(itest);
		
		var unserializer = new Unserializer(serializer.toString());
		itest = unserializer.unserialize();
		trace(itest.a==itest.b);  // assert matching reference
		trace(itest.a[3] == itest.b[3]);  // assert matching reference
		
		var fields;
		
		var somethingGood = DatUtil.setup( new LocationDefinition(), null);
		trace(somethingGood);
	}
	
	public function new() 
	{
		
	}
	
}

class InstanceTest {
	
	 public var a:Array<Dynamic>;
	public var b:Array<Dynamic>;
	
	public function new() 
	{
		
	}
	
}