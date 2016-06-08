package textifician.mapping;
import de.polygonal.ds.Graph;
import haxe.ds.StringMap;

/**
 * ...
 * @author Glidias
 */
class TextificianWorldBase
{

	// usually eacn node contains either Zone or LocationPacket
	private var graph:Graph<Dynamic>;  
	
	// Any location vincities can be shown here, that makes for good starting locations for the given gameworld.
	private var zones:StringMap<Zone>;
	
	public function new() 
	{
		
	}
	
}