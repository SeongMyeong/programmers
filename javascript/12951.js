function solution(s) {
    let answer = '';
    
    // 숫자로 시작하는 정규표현식
    const numberReg = /\d/;
    // 소문자로 시작하는 정규표현식
    const lowerCaseReg = /[a-z]/;
    
    answer = s.split(' ')
            .map((str) => {
                // word[0]은 빈 문자열을 만나면 undefined를,  word.charAt(0)은 빈 문자열을 만나면 빈 문자열을 반환한다.
                return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
                // str[0]을 사용하면 undefined 에 대한 처리를 하지 못함.
                // if (numberReg.test(str[0])) {
                //     // if str[0] = 숫자 => 나머지는 다 소문자
                //     const t = str.slice(0, 1)
                //     str = t.concat(str.substring(1).toLowerCase())
                // } else if (lowerCaseReg.test(str[0])) {
                //     // if str[0] = 소문자 => 대문자로 바꾸고 나머지 다 소문자
                //     const t = str.slice(0, 1)
                //     str = t.toUpperCase().concat(str.substring(1).toLowerCase())
                // }
                // return str
            })
            .join(' ')
    
    return answer;
}
