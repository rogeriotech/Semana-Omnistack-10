module.exports = function parseStringAsArray(array){
    return array.split(',').map(item => item.trim()) 
}