package textifician.mapping ;
import de.polygonal.ds.Graph;
import de.polygonal.ds.GraphArc;
import de.polygonal.ds.GraphNode;
import de.polygonal.ds.HashableItem;
import de.polygonal.ds.HashKey;
import haxe.ds.StringMap;
import haxe.rtti.Meta;
import haxe.Serializer;
import haxe.Unserializer;
import textifician.rpg.ICharacter;
import textifician.rpg.IFixture;
import textifician.rpg.IItem;
import textifician.rpg.IParty;
import tjson.TJSON;

/**
 * Main manager class to construct a Textifician world. aka. The Textifician Engine.
 * 
 * A Textfician world is a text-based description of an RPG environment/scene that also includes general tactical/spatial information within it to support text-based tactical RPGs
 * ( which can later also expand to precise 2D/3D RPG visualisations/simulations for scenes, if developers wish to expand on it )
 * 
 * This is done through a basic node-based graph linking different locations together. These locations have detailed tactical information bundled to each node including positional information.
 * 
 * It also allows path-finding across these locations, and estimating the shortest/easiest route to a destination location given the distance/obstacles in the way.
 * It's a tool meant to quickly prototype tactical RPG gameworlds by graphing out locations in general with tactical details, while determining the relative distances between them as you perform the graphing via position referencing. 
 * It also allows you to set up visibility connections between these locations to determine  general fog-of-war/line-of-sight visibility as well between locations. The presence/lack of of cover within locations can variably affect visibility of targets within locations using your own tactical RPG system abstractions.
 * 
 * Currently, points, paths and regions (radial-only at the moment) are supported for mapping out positionings that affects distancing. In the future, more precise region-based locations could be mapped out like polygon, etc., but for now this can be simulated roughly by using connecting location regions to location paths to define boundaries.  After all, the primary purpose of this engine is support basic text-based RPG gameplay with a necessary degree of abstraction. 
 * 
 * What is is not (unique selling point): This is not really an interactive-fiction developer/mapper suite, but a nifty tool you can use to outline your own adventures/rpg environments with necessary details used to conduct tactical combat and also (optionally) manage procedural generation of content. Also, unlike old-school interactive fiction mappers I've seen which tend to restrict players to moving in compass direction steps, the Textifician engine uses it's own method of mapping that is between 1d to 2d (call it "1.5d"), and isn't restricted to cardinal compass directions, but has a full fledged 2d graph built-in to handle automatic pathfinding between locations across paths, points and regions. Because you aren't restricted to fixed cardinal directions, you can use this to map out real locations on Google maps and estimate walking route times, for example. The intent is to provide a fast-travel (automatic route-finding ) means for players to move about, without having to be forced to navigate manually through explicit cardinal compass directions or micromanaging  movement decisions, but provide the necessary abstraction when deciding to explore areas. Generally, if your character has no specific destination to go to because he can't see anything "interesting" yet, he basically wanders around "aimlessly" at first, and the Textifician engine can abstract this away intelligently based on the knowledge state of the exploring character and the graph itself.
 * 
 * @author Glenn Ko
 */
@:expose
class TextificianWorld
{
	
	// usually eacn node contains either Zone or LocationPacket
	private var graph:Graph<Dynamic>;  
	
	// Any location vincities can be shown here, that makes for good starting locations for the given gameworld.
	private var zones:StringMap<Zone>;
	
	// A library hash of location definitions that you can use under this world
	private var locationDefs:StringMap<LocationDefinition>;
	
	
	

	public function new() 
	{
		ICharacter; IParty; IFixture; IItem; 
		
		zones = new StringMap<Zone>();
		graph = new Graph();
		locationDefs = new StringMap<LocationDefinition>();
		//locationDefs.set("", 
	}

	

	public function setupDefaultNew(zone:Zone = null):Void {
		if (zone == null) {
			zone = Zone.create("DefaultZone", "");
		}
		
		
		addZone(zone);
		addLocationDef( LocationDefinition.createWithMatchingId(LocationDefinition.TYPE_POINT,"Point") ); 
		addLocationDef( LocationDefinition.createWithMatchingId(LocationDefinition.TYPE_PATH,"Path") ); 
		addLocationDef( LocationDefinition.createWithMatchingId(LocationDefinition.TYPE_REGION, "Region") );
		
		var a:GraphNode<Dynamic> = graph.addNode( graph.createNode(null) );
		var b:GraphNode<Dynamic> = graph.addNode( graph.createNode(null) );
		graph.addGetSingleArc(a, b).val = 331;
	}
	

	
	public static function serialize(world:TextificianWorld):String {
		var serializer = new Serializer();
		serializer.useCache = true;
		//serializer.useEnumIndex = true;
		serializer.serialize(world);
		
		return serializer.toString();
	}
	public static function unserialize(str:String):TextificianWorld {
		var unserializer = new Unserializer(str);
		return unserializer.unserialize();
	}
	
	public static function configureGlobals(defaultMapScale:Float, smallestMovementUnit:Float):Void {
		Zone.DEFAULT_SCALE = defaultMapScale;
		TextificianUtil.EPSILON = smallestMovementUnit;
	}
	public static function configureGlobalMapScale(defaultMapScale:Float):Void {
		Zone.DEFAULT_SCALE = defaultMapScale;
	}
	public static function configureGlobalSmallestMovementDist(smallestMovementUnit:Float):Void {
		TextificianUtil.EPSILON = smallestMovementUnit;
	}
	
	public function getDuplicationLocationDef(def:LocationDefinition, newId:String = ""):LocationDefinition {
		var serializer = new Serializer();
		serializer.serialize(def);
		var unserializer = new Unserializer(serializer.toString());
		var locDef:LocationDefinition = unserializer.unserialize();
		if (newId != null) {
			locDef.id = newId != "" ? newId :  null;
			
		}
		else {
			locDef.id =  "instance" + HashKey.next();
		}
		return locDef;
	}
	
	public function addLocationNode(def:LocationDefinition, x:Float=0, y:Float=0, z:Float=0, state:LocationState = null, defOverwrites:Dynamic = null):GraphNode<Dynamic> {
		
		var locationPacket:LocationPacket = new LocationPacket();
		locationPacket.def = def;
		locationPacket.state = state;
		locationPacket.x = x;
		locationPacket.y = y;
		locationPacket.z = z;
		locationPacket.defOverwrites = defOverwrites;

		return graph.addNode(graph.createNode(locationPacket));
	}
	public function addZoneNode(zone:Zone):GraphNode<Dynamic> {
		return graph.addNode(graph.createNode(zone));
	}
	
	public function getLocationDef(id:String):LocationDefinition {
		return locationDefs.get(id);
	}
	
	
	
	public function addLocationDef(def:LocationDefinition, forceOverwrite:Bool = false):LocationDefinition {
	
		if (def.id == null) {
			def.id = "instance" + HashKey.next(); 
			if (!forceOverwrite && locationDefs.exists(def.id)) throw "Location Definition of: "+def.id +" already exists!";
			locationDefs.set(def.id, def);
		}
		else {
			var current:LocationDefinition;
			current = locationDefs.get(def.id);
			if (current == null) locationDefs.set(def.id, def);
			else if (forceOverwrite) {
				locationDefs.set(def.id, def);
			}
			else {
				throw "Location Definition of: "+def.id +" already exists!";
			}
		}
		return def;
	}
	
	public function addZone(zone:Zone, forceOverwrite:Bool=false):Zone {
		if (zone.id == null) {
			zone.id = "zone" + HashKey.next(); 
			if (!forceOverwrite && zones.exists(zone.id)) throw "Zone id of: "+zone.id +" already exists!";
			zones.set(zone.id, zone);
		}
		else {
			var current:Zone;
			current = zones.get(zone.id);
			if (current == null) zones.set(zone.id, zone);
			else if (forceOverwrite) {
				zones.set(zone.id, zone);
			}
			else {
				throw "Zone id of: "+zone.id +" already exists!";
			}
		}
		return zone;
	}
	
	public function getZone(id:String=""):Zone {
		return zones.get(id);
	}

	
}