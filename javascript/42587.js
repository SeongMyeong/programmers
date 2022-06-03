function solution(priorities, location) {
    let answer = 1;
    const stack = []

    for (let i = 0; i < priorities.length; i++) {
        stack.push({
            priority: priorities[i],
            mine: i === location ? true : false
        })
    }
    
    while(stack.length) {
        const j = stack.shift()
        /*
            1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
            2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
            3. 그렇지 않으면 J를 인쇄합니다.
        */
        const filtered = stack.filter(el => el.priority > j.priority)
        if (filtered.length) {  // J보다 중요도가 높은 문서가 존재함
            stack.push(j)
        } else {    // J보다 중요도가 높은 문서가 존재하지 않음
            // J 가 내 문서라면 break하고 while을 빠져나가며, 아니라면 answer를 1 증가시킨다
            if (j.mine) break
            else answer++
        }
    }

    return answer;
}
