// 아이디어
// absolutes는 절대값이 담겨있음
// signs는 boolean이 담겨있음
// signs[i]가 true 면 absolutes[i]는 양수
// signs[i]가 false 면 absolutes[i]는 음수
// absolutes의 전체 합을 더해서 return
function solution(absolutes, signs) {
    let answer = 0;
    
    const result = absolutes.map((absolute, idx) => {
        answer += signs[idx] ? absolute : -absolute
    })
    
    return answer;
}
