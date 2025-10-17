

export function generateCode() : string {
    let code:string = ""
    for (let i:number = 0; i < 5; i++) {
        code += Math.floor(Math.random() * 10)
    }
    
    return code as string;
}

export function generateID() : number {

    let ID = "";
    for (let i:number = 0; i < 8; i++) {
        ID += `${Math.floor(Math.random() * 10)}` 
    }
    
    return Number(ID) as number
}

