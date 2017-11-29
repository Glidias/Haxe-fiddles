package textifician.mapping ;
import de.polygonal.ds.Graph;
import de.polygonal.ds.GraphArc;
import de.polygonal.ds.GraphArc;
import de.polygonal.ds.GraphNode;
import de.polygonal.ds.Hashable;
import de.polygonal.ds.HashableItem;
import de.polygonal.ds.HashKey;
import de.polygonal.ds.IntHashTable;
import haxe.ds.IntMap;
import haxe.ds.StringMap;
import haxe.io.Error;
import haxe.rtti.Meta;
import haxe.Serializer;
import haxe.Unserializer;
import js.html.Image;
import msignal.Signal.Signal0;
import msignal.Signal.Signal1;
import msignal.Signal.Signal2;
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
class TextificianWorld extends TextificianWorldBase
{
	

	// A library hash of location definitions that you can use under this world
	private var locationDefs:StringMap<LocationDefinition>;
	
	//IntMap<Dynamic>; // 
	public var editableHash:IntMap<Dynamic>; // IntHashTable<Dynamic>;
	
	public var loadedZoneSites:Signal2<Array<Dynamic>, Dynamic> = new Signal2<Array<Dynamic>, Dynamic>();
	

	public function new() 
	{
		super();
		ICharacter; IParty; IFixture; IItem; 
		
		zones = new StringMap<Zone>();
		graph = new Graph();
		locationDefs = new StringMap<LocationDefinition>();
		//locationDefs.set("", 
		
		editableHash = new  IntMap<Dynamic>();//new IntHashTable<Dynamic>(1024);  // lazy instantatition here
		
		// register any viewmodels
		ArcNodeVM;
	}
	
	// for bridging to other editors
	public inline function registerHashEditable(hashable:Hashable, editableContent:Dynamic):Void {
		// new  IntMap<Dynamic>(); // 
		//if (editableHash == null) 
		editableHash.set(hashable.key, editableContent);
	}
	
	public inline function removeHashEditable(hashable:Hashable):Bool {
		//if (editableHash == null)  return false;
		return editableHash.remove(hashable.key);  // editableHash.unset(hashable.key);
	}
	
	public inline function getHashEditable(hashable:Hashable):Dynamic {
		return editableHash.get(hashable.key);
	}
	
	//public function removeEditableNode(node

	public function setupDefaultNew(zone:Zone = null):Void {
		if (zone == null) {
			zone = Zone.create("DefaultZone", "");
		}
		
		
		addZone(zone);
		addLocationDef( LocationDefinition.createWithMatchingId(LocationDefinition.TYPE_POINT,"Point") ); 
		addLocationDef( LocationDefinition.createWithMatchingId(LocationDefinition.TYPE_PATH,"Path") ); 
		addLocationDef( LocationDefinition.createWithMatchingId(LocationDefinition.TYPE_REGION, "Region") );
		
	
	}
	
	public function getLocationDefinitionIds(ignoreHash:Dynamic=null):Array<String> {
		
		var arr:Array<String> = [];
		for (p in locationDefs.keys()) {
			if (ignoreHash == null || !Reflect.field(ignoreHash, p)) {
				arr.push(p);
			}
		}
		return arr;
	}
	
	public function getDefaultLocationDefIdHash():Dynamic {
		return { "Point":true, "Path":true, "Region":true  };
	
	}
	
	public function setLocationDefinitionIds(arr:Array<String>):Void {
		var newStrMap:StringMap<LocationDefinition> = new StringMap<LocationDefinition>();
		var len = arr.length;
		for (i in 0...len) {
			var locDef:LocationDefinition = getLocationDef(arr[i]);
			if (locDef != null) {
				newStrMap.set(locDef.id, locDef);
			}
			else trace("Warning!! LocationDefinition search for:" + arr[i] + " is empty!");
		}
		
		locationDefs = newStrMap;
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
	

	
	public function loadSites():Signal2<Array<Dynamic>, Dynamic> {
		var node = graph.getNodeList();
		var zone:Zone = null;
	
		while (node != null) {
			if (Std.is(node.val, Zone)) {
				zone = node.val;
				break;
			}
			node = node.next;
		}
		if (zone == null) {
			trace("Failed to locate zone for loading sites!");
			return loadedZoneSites;
		}
		

		var img = new Image();
		
		img.onload = function() {
			loadedZoneSites.dispatch( getSites(zone, img.naturalWidth, img.naturalHeight), { width:img.naturalWidth, height:img.naturalHeight, x:zone.x, y:zone.y } );
		};
		img.src = zone.imageURL;
		
		/*
		var arr:Array<Dynamic>  = [];
		var nodeArr:Array<GraphNode<Dynamic>> = [];
		
		node = h;
		while (node != null) {
			if (Std.is(node.val, LocationPacket)) {
				var locPacket:LocationPacket = node.val;
				arr.push({x:locPacket.x, y:locPacket.y, value: (locPacket.defOverwrites != null && locPacket.defOverwrites.size != null ?  locPacket.defOverwrites.size : locPacket.def.size) });
			}
			node = node.next;
		}
		*/
		
		return loadedZoneSites;
	}
	
	public function getSites(zone:Zone, zw:Int, zh:Int):Dynamic {
		var node = graph.getNodeList();
		var ox = zone.x - zw * .5;
		var oy = zone.y - zh * .5;
		var arr = [];
		while (node != null) {
			if (Std.is(node.val, LocationPacket)) {
				var locPacket:LocationPacket = node.val;
				arr.push({x:(locPacket.x-ox), y:(locPacket.y-oy), value: (locPacket.defOverwrites != null && locPacket.defOverwrites.size != null ?  locPacket.defOverwrites.size : locPacket.def.size) });
			}
			node = node.next;
		}
		return {
			children: arr
		};
	}
	
	
	
	public function getGOGraphData(goTypeSizes:Array<Dynamic>, defaultPictureOpacity:Float=.5):GoGraphData {
		var obj:Dynamic;
		var dataGraph:Dynamic = graph.serialize(returnSelf);
		var goGraphData:GoGraphData = { nodes:[], links:[] };
		
		
		
		var node = graph.getNodeList();
		var count:Int = 0;
		var nodeArr:Array<GraphNode<Dynamic>> = [];
		while (node != null) {
			if (Std.is(node.val, LocationPacket)) {
				var locPacket:LocationPacket = node.val;
				goGraphData.nodes.push( obj = { loc:new GoPoint(locPacket.x, locPacket.y),  key:count, locid:locPacket.def.id, isProto:false, text: locPacket.getLabel(), category:LocationPacket.getCategoryOfPacket(locPacket),  size:goTypeSizes[LocationPacket.getTypeOfPacket(locPacket)], _node:node } );
			}
			else if (Std.is(node.val, Zone)) {  
				var zone:Zone  = node.val;
				goGraphData.nodes.push( obj = { loc:new GoPoint(zone.x, zone.y), key:count, locid:"", zoneid:false, isProto:false,  text:zone.label,  pictureOpacity:defaultPictureOpacity, pictureSrc:zone.imageURL, category:"zone", size:goTypeSizes[LocationDefinition.TYPE_POINT], _node:node } );
				
			}
			else {
				throw ("Could not resolve data type of node val:"+node.val);
				goGraphData.nodes.push(node.val);
			}
			registerHashEditable( node, obj);
			count++;
			nodeArr.push(node);
			node = node.next;
		}
		
		var arcList:Array<Int> = dataGraph.arcs;
		var len:Int = arcList.length;
		var i:Int = 0;
		
		while (i < len) {
			var fromInt:Int = arcList[i];
			var toInt:Int = arcList[i + 1];
			var theArc:GraphArc<Dynamic> = nodeArr[fromInt].getArc(nodeArr[toInt]);
			
			goGraphData.links.push( obj={ key:getUniqueHashKey(), _arc:theArc, from:fromInt, to:toInt } );
			registerHashEditable(theArc, obj);
			i += 2;
		}
		

		
		return goGraphData;
	}
	
	public function saveWorld():String {
		var serializer = new Serializer();
		serializer.useCache = true;
		//serializer.useEnumIndex = true;
		serializer.serialize(locationDefs);
		serializer.serialize(zones);
		
		var graphData = graph.serialize(returnSelf);
		
	//	trace("Serialzing..",graphData);
		serializer.serialize(graphData);
		
		
		return serializer.toString();
	}
	
	public function loadWorld(worldStr:String):Void {
		var unserializer:Unserializer = new Unserializer(worldStr);
		locationDefs = unserializer.unserialize();
		zones = unserializer.unserialize();
		
		var graphData = unserializer.unserialize();
		graph = new Graph();
		graph.unserialize(graphData, returnSelf);
		editableHash = new  IntMap<Dynamic>();
	}
	
	
	
	private function returnSelf(self:Dynamic):Dynamic {
		if ( Std.is(self, LocationPacket) || Std.is(self, Zone)) {
		
		}
		else throw "Should be valid instance type:"+self;
		return self;
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
	
	public function getUniqueHashKey():UInt {
		return HashKey.next();
	}
	
	public function getLocationDef(id:String):LocationDefinition {
		return locationDefs.get(id);
	}
	
	public function removeLocationDef(def:LocationDefinition):Bool {
		return locationDefs.remove(def.id);
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

typedef GoGraphData = {
	 var nodes:Array<Dynamic>;
	 var links:Array<Dynamic>;
}

@:native("go.Point")
extern class GoPoint {
	
	public function new(x:Float, y:Float) {
		
	}
	
}