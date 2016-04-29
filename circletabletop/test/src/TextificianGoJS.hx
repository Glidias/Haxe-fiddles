package ;
import de.polygonal.ds.Graph;
import haxe.Json;
import haxe.rtti.Meta;
import haxe.Serializer;
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
		
		

	}
	
	public function new() 
	{
		
	}
	
}