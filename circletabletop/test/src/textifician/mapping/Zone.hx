package textifician.mapping ;
import de.polygonal.ds.GraphNode;

/**
 * Indicates a generic zone vincity. Nodes can link to Zones. Once a zone is entered from a given entrance/portal transition, it uses the new scale unit measure.
 *  Zones can contain child zones as well, and use different scalings. This creates a scalable world consisting of multiple zones.
 * 
 * @author Glenn Ko
 */
class Zone implements IXYZ
{
	private var id:String;
	
	public static var DEFAULT_SCALE:Float = 1;
	
	private var label:String;
	private var childNodes:Array<GraphNode<Dynamic>>; // starting locations are Std.is( GraphNode.data, LocationPacket) instead of Zone. 
	private var size:Float;  // radial size if any, zero if Point-based., if sizs ie negative, deemed infinity
	
	private var scale:Float; // pixel scale to actual unit measure you are using upon entering this Zone 
	
	public var x:Float;
	public var y:Float;
	public var z:Float;
	private var parentZone:Zone; // does this zone exist as a child under another zone? If so, the entrance leading into the zone will also lead back out to the parentZOne. This determines the parent coordinate space for this zone.
	
	// CONVENTION: Priority when entering a node with Zone..which starting point to choose?
	// LocationDefinition is FLAG_ENTRANCE into given zone, FInd nearest entrance....haven't entered Zone yet until gone through entrance
	// LocationDefinition is FLAG_KEY and NOT flag_entrance, will fast-forward enter into that Zone based off mapped distance to it from current position.
	// If no current position, than randomly choose 1 location. 
	
	
	
	public function new() 
	{
		
	}
	
	public static function create(label:String, id:String = null):Zone {
		var zone:Zone = new Zone();
		zone.label = label;
		zone.id = id != null ? id : TextificianUtil.getIdFromLabel(label);
		zone.scale = DEFAULT_SCALE;
		return zone;
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
	
	public function addChild(node:GraphNode<Dynamic>):GraphNode<Dynamic> {
		
		return null;
	}
	
	public function removeChild(node:GraphNode<Dynamic>):GraphNode<Dynamic> {
		return null;
	}
	
	public static function setupNew(label:String, id:String=null, x:Float=0, y:Float=0, z:Float=0, size:Float=0, scale:Float=1 ):Zone {
		var newZone:Zone = new Zone();
		newZone.scale = scale;
		newZone.size = size;
		newZone.x = x;
		newZone.y = y;
		newZone.z = z;
		return newZone;
	}
	
}