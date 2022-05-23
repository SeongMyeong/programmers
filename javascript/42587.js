function solution(clothes) {
    let answer = 1
    
    const clothesMap = {}
    
    clothes.map((cloth) => {
        if (!clothesMap[cloth[1]]) {
            clothesMap[cloth[1]] = [cloth[0]]
        } else {
            clothesMap[cloth[1]].push(cloth[0])
        }
    })
    
    // key가 하나밖에 없을 경우, 해당 키의 원소길이가 length가 됨
    if (Object.keys(clothesMap).length === 1) {
        answer = clothesMap[Object.keys(clothesMap)[0]].length
    } else {
        const clothesKeys = Object.keys(clothesMap)
        // 각 옷의 조합을 (안입는경우, 입는경우 n개) 로 따져서
        // 총 length + 1 의 곱셈으로 처리한다음, 마지막에 모두 안입었을 때 는 없으므로 answer - 1
        clothesKeys.map((clothType, idx) => {
            answer *= (clothesMap[clothType].length + 1)
        })
        answer -= 1
    }
    
    return answer
}
