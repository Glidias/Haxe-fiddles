package textifician.mapping ;
import de.polygonal.ds.GraphNode;

/**
 * ...
 * @author Glenn Ko
 */
class LocationState
{
	public var visibleNodesFromHere:Array<GraphNode<Dynamic>>;
	public var thingsHere:Array<Dynamic>;  // store any uniquely defined things here for existing node
	public var notes:String; // any custom notes can go here
	public var customData:Dynamic; // custom data extenesion stuff goes here if needed
	
	public function new() 
	{
		
	}
	
}