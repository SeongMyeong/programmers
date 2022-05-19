// str1 과 str2 를 두 글자씩 끊어서 다중집합의 원소로 만든다.
// 단, 영문자로 된 글자 쌍만 유효하며 공백/숫자/특수문자는 그 글자쌍을 버린다 -> 앞에서부터 두 글자씩 끊어서 전체 집합을 만든다. 단 두 글자 중 영문자가 아닌 문자가 들어있으면 패스한다
// 유사도 = 교집합크기 / 합집합크기

function solution(str1, str2) {
    let answer = 0;
    const engReg = /^[a-zA-Z]*$/    // 영문자 확인용 정규식
    
    const str1Array = []
    const str2Array = []
    
    for (let i = 0; i < str1.length - 1; i++) {
        const unit = str1[i] + str1[i+1]
        if (engReg.test(unit)) str1Array.push(unit.toUpperCase())
    }
    
    for (let i = 0; i < str2.length - 1; i++) {
        const unit = str2[i] + str2[i+1]
        if (engReg.test(unit)) str2Array.push(unit.toUpperCase())
    }
    
    // 합집합 단순하게 concat하면 중복값을 무시하고 그냥 더해버림
    // 중복에 대한건 max를 해야하므로 concat은 사용하지 못함
    // const unionArray = str1Array.concat(str2Array)
    
    let unionArray = []
    let interSectionArray = []
    
    str1Array.sort()
    str2Array.sort()
    
    while (str1Array.length) {
        const unit = str1Array[0]
        const str1IndexEnd = str1Array.lastIndexOf(unit)
        const str2IndexStart = str2Array.indexOf(unit) // str2Array에서 unit의 시작 index
        const str2IndexEnd = str2Array.lastIndexOf(unit) // str2Array에서 unit의 끝 index
        
        const str1SpliceArray = str1Array.splice(0, str1IndexEnd + 1)
        let str2SpliceArray = []
        if (str2IndexStart !== -1) {
            str2SpliceArray = str2Array.splice(str2IndexStart, str2IndexEnd - str2IndexStart + 1)
        }
        
        if (str1SpliceArray.length >= str2SpliceArray.length) {
            unionArray = unionArray.concat(str1SpliceArray)
            interSectionArray = interSectionArray.concat(str2SpliceArray)
        } else {
            unionArray = unionArray.concat(str2SpliceArray)
            interSectionArray = interSectionArray.concat(str1SpliceArray)
        }
    }
    
    // str1Array를 전부 처리했을 때 str2Array 의 원소가 남아있으면 합집합에 추가한다
    if (str2Array.length) {
        unionArray = unionArray.concat(str2Array)
    }
    
    if (unionArray.length === 0 && interSectionArray.length === 0) answer = 1
    else {
        answer = (interSectionArray.length / unionArray.length)
    }
    
    answer = parseInt(answer * 65536)
    
    return answer;
}
