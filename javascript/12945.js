// n의 입력이 들어오면, n-1 까지의 수의 합을 return 함
// F(0) - 0, F(1) - 1, F(2) - F(0) + F(1) = 1 ....
function solution(n) {
    let answer = 0;
    let answerArr = [0, 1]
    
    for (let i = 2; i <= n; i++) {
        // answer에 매번 마지막에서 두번째있는 두 값을 더해서 push한다
        // 이 때, 1234567 로 나눈 나머지를 넣지않으면, 정수범위 overflow
        answerArr.push((answerArr[i - 2] + answerArr[i - 1]) % 1234567)
    }

    answer = answerArr[n]
    
    return answer;
}
