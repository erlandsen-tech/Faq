export class Dict {

    create(key: number, content: number) {
        var map = new Map<number, number>();
        return map;
    }
    add(map: Map<number, number>, key: number, content: number) : Map<number,number>{
        return map.set(key, content);
    }
}
