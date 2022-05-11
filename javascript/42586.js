// 아이디어
// progresses 가 비어있을 때 까지 계속해서 탐색
// 매일매일 progresses[i]는 speeds[i] 만큼 더해서 계산
// progresses[i]가 100 이상이 되면 progresses의 맨 앞에서부터 shift하고 count를 증가
function solution(progresses, speeds) {
    let answer = [];
    
    // progresses 가 비어있을 때 까지 계속해서 반복
    while (progresses.length) {
        
        // 하루하루 지나면 progresses[i] 에 speeds[i]를 더해서 적립
        for (let i = 0; i < progresses.length; i++) {
            if (progresses[i] < 100) progresses[i] += speeds[i]
        }

        let cnt = 0
        // 만일 이전 기능이 완료되었을 경우(100 이상) progresses[0]과 speeds[0] 제거를 반복
        // 이후 기능이 완료되어있다면 반복해서 제거하며 cnt 값을 1씩 증가시킨다
        while (progresses[0] >= 100) {
            progresses.shift()
            speeds.shift()
            cnt += 1
        }
        // cnt값이 0이 아니라면 완료된 기능이 있다는 뜻으로 answer에 push
        if (cnt !== 0) answer.push(cnt)
    }
    return answer;
}
