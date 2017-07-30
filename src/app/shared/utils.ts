export class Utils {

    public static flipTile(tile){
        tile.tileState = 'flip-out';
        setTimeout(() => tile.tileState = 'flip-in', 300);
    }
    
}