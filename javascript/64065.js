function solution(s) {
    const answer = [];
    
    const sArray = s.replace('{{', '')
                    .replace('}}', '')
                    .split('},{')
    
    const filteredArray = sArray.map((el) => {
        return el.split(',').map((el) => parseInt(el))
    })
    
    const sortArray = filteredArray.sort((a, b) => a.length - b.length)
    
    // 이부분 도움받음 1차시기 절반 클리어
    for (const t of sortArray) {
        answer.push(...t.filter(x => !answer.includes(x)))
    }
    
    // console.log(sortArray)
    
    // 1차시기 코드
//     while (sortArray.length) {
//         let shiftData = sortArray.shift().split(',')
//         let unit = shiftData[0]
//         while (unit === '') unit = shiftData.shift()
        
//         answer.push(parseInt(unit))
//         for (let i = 0; i < sortArray.length; i++) {
//             sortArray[i] = sortArray[i].replace(unit, '')
//         }
//     }
        
    return answer;
}
