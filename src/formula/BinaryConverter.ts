export const convertToBinary = (n:number):string => {
    if (n===0) return "0";
    let bin:number[] = [];
    while(n !== 0) {
        if (n%2 === 0) {
            bin.push(0);
        } else {
            bin.push(1);
        }
        n = Math.floor(n/2);
    }
    return bin.reverse().toString().replaceAll(",", "")
}

