export const SUCCESS = (type)=> {
    return ['@@YID',type,'SUCCESS'].join('/')
}
export const FAILURE = (type)=> {
    return ['@@YID',type,'FAILURE'].join('/')
}
export const REQUEST = (type)=> {
    return ['@@YID',type,'REQUEST'].join('/')
}
export const NOTFOUND = (type)=> {
    return ['@@YID',type,'NOTFOUND'].join('/')
}