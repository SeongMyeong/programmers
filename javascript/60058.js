// 입력 p 는 균형잡힌 괄호 문자열
// p를 올바른 괄호 문자열로 변환하여 return
function solution(p) {
    return makeCorrect(p);
}

function makeCorrect (w) {
    // 1. 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다. 
    if (w ==='') return ''
    let leftCurve = 0 // ')'
    let rightCurve = 0 // '('
    let u = ''
    let v = ''
    
    // 2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다. 단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다.
    for (let i = 0; i < w.length; i++) {
        if (w[i] === ')') leftCurve += 1
        if (w[i] === '(') rightCurve += 1
        
        if (leftCurve === rightCurve) {
            u = w.substring(0, i + 1)
            v = w.substring(i + 1, w.length)
            break;
        }
    }
    // 3. 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행합니다. 
    //  3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환합니다. 
    if (isCorrectlyPair(u)) {
        return u + makeCorrect(v)
    } else {
        /*
          4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다. 
           4-1. 빈 문자열에 첫 번째 문자로 '('를 붙입니다. 
           4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다. 
           4-3. ')'를 다시 붙입니다. 
           4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다. 
           4-5. 생성된 문자열을 반환합니다.
        */
        let t = '('
        t = t + makeCorrect(v) + ')'
        u = u.substring(1, u.length - 1)
        let temp = ''
        for (let i = 0; i < u.length; i++) {
            if (u[i] === '(') temp += ')'
            else temp += '('
        }
        return t + temp
    }
}

function isCorrectlyPair (s) {
    const stack = []
    
    if (s[0] === ')') return false
    else {
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '(') {
                stack.push('(')
                continue
            } else {
                if (!stack.pop()) return false
            }
        }
        return true
    }
}
