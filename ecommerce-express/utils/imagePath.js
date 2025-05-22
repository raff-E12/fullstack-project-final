const objFun = (obj, path) => {
    const imgPath = obj.image;
    return { ...obj, image: `${path}/${imgPath}` }
}

const arrFun = (arr, path) => {
    return (arr.map(element => {
        return objFun(element, path);
    }))
}

module.exports = ({
    arrFun,
    objFun
})