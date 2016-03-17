package textifician.rpg ;
import textifician.mapping.IXYZ;
import textifician.rpg.ICharacter;

/**
 * Marker class to denote a party of characters
 * @author Glenn Ko
 */
interface IParty extends IXYZ
{
	public var name:String;  // convention: if name is left blank, usually picks the first character in the party as his "{Name}'s Party"
	public var characters:Array<ICharacter>;
	
}