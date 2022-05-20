function solution(d, budget) {
    let answer = 0;
    let sum = 0
    
    const sortedArray = d.sort((a, b) => a - b)
    
    // // 실패한 케이스
    // for (const t of d) {
    //     if (sum > budget) break
    //     answer += 1
    //     sum += t
    // }
    
    // 성공한 케이스
    for (const t of d) {
        if (budget < t) break
        answer += 1
        budget -= t
    }
    
    return answer;
}

