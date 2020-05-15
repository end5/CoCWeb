/**
 * ...
 *
 * @author Gedan
 */
export class Room {
    public RoomName?: string; // Index name
    public RoomDisplayName?: string; // Header text

    public NorthExit?: string;
    public NorthExitCondition?: any;

    public EastExit?: string;
    public EastExitCondition?: any;

    public SouthExit?: string;
    public SouthExitCondition?: any;

    public WestExit?: string;
    public WestExitCondition?: any;

    public RoomFunction?: any;
}
