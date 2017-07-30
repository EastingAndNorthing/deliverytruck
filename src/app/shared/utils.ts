export class Utils {

    public static httpfy(url) {
        if (!/^(f|ht)tps?:\/\//i.test(url)) {
            url = "http://" + url;
        }
        return url;
    }
    
}