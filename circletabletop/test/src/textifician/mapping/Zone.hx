package textifician.mapping ;
import de.polygonal.ds.GraphNode;

/**
 * Indicates a generic zone vincity. Nodes can link to Zones. Once a zone is entered from a given entrance/portal transition, it uses the new scale unit measure.
 *  Zones can contain child zones as well, and use different scalings. This creates a scalable world consisting of multiple zones.
 * 
 * @author Glenn Ko
 */
@:expose
@:rtti
class Zone implements IXYZ
{
	@inspect({_readonly:true}) public var id:String;
	
	public static var DEFAULT_SCALE:Float = 1;
	
	@inspect private var label:String;
	private var childNodes:Array<GraphNode<Dynamic>>; // starting locations are Std.is( GraphNode.data, LocationPacket) instead of Zone. 
	
	@inspect public var size:Float;  // radial size if any, zero if Point-based., if sizs ie negative, deemed infinity
	@inspect public var scale:Float; // pixel scale to actual unit measure you are using upon entering this Zone 
	
	@inspect({_classes:['position'], _readonly:true}) public var x:Float;
	@inspect({_classes:['position'], _readonly:true}) public var y:Float;
	@inspect({_classes:['position']}) public var z:Float;
	
	@readonly private var parentZone:Zone; // does this zone exist as a child under another zone? If so, the entrance leading into the zone will also lead back out to the parentZOne. This determines the parent coordinate space for this zone.
	
	// CONVENTION: Priority when entering a node with Zone..which starting point to choose?
	// LocationDefinition is FLAG_ENTRANCE into given zone, FInd nearest entrance....wont't entered Zone yet until gone through entrance
	// LocationDefinition is FLAG_KEY and NOT flag_entrance, will fast-forward enter into that Zone based off mapped distance to it from current position.
	// If no current position, than may randomly choose 1 known location among the list. 
	
	
	public function new() 
	{
		scale = 1;
		size = 0;
	}
	
	public static inline var ID_MATCH_LABEL:Int = 0;
	public static inline var ID_SLUGIFY:Int = 1;
	public static inline var ID_CAMELIZE:Int = 2;
	
	public static var IDMODE:Int = ID_MATCH_LABEL;
	
	public static inline function slugify(label:String):String
	{
		
	  return (~/-+$/).replace( (~/^-+/).replace( (~/\-\-+/g).replace(	(~/[^\w\-]+/g).replace( (~/\s+/g).replace( label.toString().toLowerCase(), "-"), ""), "-" ), ''), '');

	}
	
	public static inline function camelizeSlug(slug:String):String { 
		var splitStr = slug.split("-");
		var len = splitStr.length;
		for (i in 1...len) {
			 splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substr(1); 
		}
		return splitStr.join("");
	}
	
	public static function resolveIdWithLabel(label:String):String {
		return IDMODE == ID_SLUGIFY ? slugify(label) : IDMODE == ID_CAMELIZE ? camelizeSlug(slugify(label)) : label;
	}
	
	
	public static function create(label:String, id:String = null):Zone {
		var zone:Zone = new Zone();
		zone.label = label;
		zone.id = id != null ? id : resolveIdWithLabel(label);
		zone.scale = DEFAULT_SCALE;
		zone.childNodes = [];
		zone.size = -1;
		return zone;
	}
	
	public static function setupNew(label:String, id:String=null, x:Float=0, y:Float=0, z:Float=0, scale:Float=1, size:Float=-1  ):Zone {
		var newZone:Zone = Zone.create(label, id);
		newZone.scale = scale;
		newZone.size = size;
		newZone.x = x;
		newZone.y = y;
		newZone.z = z;
		return newZone;
	}
	
	
	public function setScale(scale:Float):Zone {
		this.scale = scale;
		return this;
	}
	public function setSize(size:Float):Zone {
		this.size = size;
		return this;
	}
	public function setPos(x:Float = 0, y:Float=0, z:Float=0 ):Zone {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	public function addChildren(list:Array<GraphNode<Dynamic>>):Zone {
		for ( i in 0...list.length) {
			addChild(list[i]);
		}
		return this;
	}
	
	// TODO:
	public function addChild(node:GraphNode<Dynamic>):GraphNode<Dynamic> {
		
		return null;
	}
	
	public function removeChild(node:GraphNode<Dynamic>):GraphNode<Dynamic> {
		return null;
	}
	

	
}

/*
ABOUT ZONES:
----------
A GraphNode can contain a ZOne instance as it's value instead of a LocationPacket. A ZOne is a much larger macro-region that contains key child location nodes under that Zone. When transitinoing to a different zone, the map apperance and map scale might change as well.

About zone arcs:
-----------------
Arcs coming to/from Zones (unlike going from Location node to another Location node) is treated as a generic descriptive arc only representing the ability to spot that zone from current position (ie. cannot be used for pathfinding or determining actual travel distance/time) as the actual traced path might differ!

Once within zone vincity, specific child locations are made readily available as a list of "adjacient" locations from zone. But the actual pathfinding to these child locations is still done from the current location within the graph to any of these chosen child locations under that zone. (or other methods like navmesh tracing can be done)



Conventions for GUI interface:

Linking conventions:
- If location links to zone, it's a regular descriptive link to that Zone, which should be a "different" Zone. (no full sanity check is used here).
- If Zone links to a Location, represents a location childnode under zone by default. 
- If zone links to another zone, may either indicate a sibling zone or child zone under zone by default....WHich one? Depends on whether UI checkbox for "Create zone arcs as Children" is checked. If it isn't checked, then it's treated as sibling. 

When arcs go from Location to Zone or vice versa or arcs go from Zone to Child Zone, they cannot be mutually directed. Eg. This is because a Location to Zone arc indicates the ability to transition to that "different" Zone (always implied "different")  from current location. A Zone to Location arc already indicates a child location under that ZOne, so, it's already implied that the child location is under that zone and cannot link to that zone as that would contradict the first notion that such an arc indicates "a different zone". 


Diagram conventions:
- All zones are represented as a Point, with a size stroke outline and either alpha 0 or very faint fill upon being selected.
- Prefably, for clean-viewing, such zone arcs could only be visibly shown when the zone (or adjacient nodes to it) is selected. Such arcs should be colored differenmtly as they don't indicate "real" foot paths.

*/