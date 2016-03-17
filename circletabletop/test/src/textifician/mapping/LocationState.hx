package textifician.mapping ;
import de.polygonal.ds.GraphNode;

/**
 * ...
 * @author Glenn Ko
 */
class LocationState
{
	public static inline var FLAG_LOCKED:Int = (1 << 0);
	
	public var visibleNodesFromHere:Array<GraphNode<Dynamic>>;
	public var thingsHere:Array<Dynamic>;  // store any uniquely defined things here for existing node
	public var notes:String; // any custom notes can go here
	public var flags:Int; // common state flags can go here with regards to mapping/path-finding
	public var customData:Dynamic; // custom data extenesion stuff goes here if needed

	
	public function new() 
	{
		
	}
	
}