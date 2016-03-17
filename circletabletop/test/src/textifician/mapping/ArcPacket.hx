package textifician.mapping ;

/**
 * specific data for graph arc
 * @author Glenn Ko
 */
class ArcPacket
{
	// indicates the arc goes through entrance
	public static inline var FLAG_ENTRANCE:Int = (1 << 0);
	public var flags:Int;

	public function new() 
	{
		
	}
	
}