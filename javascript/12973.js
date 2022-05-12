// 아이디어
// pos를 0부터 시작해서 s 전체를 탐색
// 0부터 시작해서 pos와 pos + 1 이 같다면 둘을 삭제
// 1차시도 시 정확성은 통과했으나, 효율성에서 떨어짐
// 2차시도 stack 및 O(n) 풀이 참조하여 작성

function solution(s) {
    let answer = -1;
    
    let stack = []
    s = s.split('')
    stack.push(s[0])
    
    // 입력이 들어온 s를 탐색
    for (let i = 1; i < s.length; i++) {
        if (stack.length === 0) {   // stack에 아무것도 없으면 s[i]를 추가
            stack.push(s[i])
            continue
        }
        // 비교를 위한 unit은 stack의 가장 위에있는것을 pop
        const unit = stack.pop()
        
        // 만일 unit과 지금 탐색한 s[i]가 다르다면,
        // unit과 s[i]를 다시 stack에 넣고 다음 index에 대해 확인
        if (unit !== s[i]) {
            stack.push(unit)
            stack.push(s[i])
        }
        // 같다면 stack은 이미 pop되어 1개가 사라져있으므로, 후처리 불필요
    }
    
    // stack에 남은것이 없으면, 전부 탐색 완료 후 다 제거되었다는 뜻으로 1 return
    return stack.length === 0 ? 1 : 0
}
