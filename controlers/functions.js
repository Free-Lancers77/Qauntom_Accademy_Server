
export const genrateotp=()=>{
    return String(Math.floor(1000 + Math.random() * 9000));
}