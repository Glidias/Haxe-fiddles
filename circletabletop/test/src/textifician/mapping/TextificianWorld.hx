package textifician.mapping ;
import de.polygonal.ds.Graph;
import de.polygonal.ds.GraphNode;
import haxe.ds.StringMap;
import textifician.rpg.ICharacter;
import textifician.rpg.IParty;

/**
 * Main manager class to construct a Textifician world. 
 * A Textfician world is a text-based description of an RPG environment/scene that also includes tactical/spatial information within it.
 * This is done through a basic node-based graph linking different locations together.
 * 
 * @author Glenn Ko
 */
class TextificianWorld
{
	
	// usually eacn node contains either Zone or LocationPacket
	private var graph:Graph<GraphNode<Dynamic>>;  
	
	// Any location vincities can be shown here, that makes for good starting locations for the given gameworld.
	private var zones:Array<Zone>;
	
	// A library hash of location definitions that you can use under this world
	private var locationDefs:StringMap<LocationDefinition>;

	public function new() 
	{
		ICharacter; IParty;
		
	}
	
	
	
	
	
}