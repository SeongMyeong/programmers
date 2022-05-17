// 실패율은 다음과 같이 정의한다.
// 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
function solution(N, stages) {
    // N = 전체 스테이지의 개수
    // stages = 게임을 이용하는 사용자가 멈춰있는 스테이지의 번호
    
    // 초기 전체 N 스테이지의 개수만큼 Array를 만들고 0으로 할당
    const userNow = new Array(N + 1).fill(0)
    // 현재 전체 인원은 stages.length
    let totalUserCount = stages.length
    
    // 스테이지 인원을 탐색하며 해당 스테이지에 있는 인원수를 +1
    stages.map((stage) => {
        userNow[stage] += 1
    })
    
    const temp = []
    // 전체 스테이지 수 만큼 탐색하면서, temp에 idx와 failRate를 넣는다
    // totalUserCount 해당 스테이지를 포함하여 지나간 인원 수
    // 이전 스테이지에 대기중인 인원은 totalUserCount에서 뺀다
    for (let i = 1; i <= N; i++) {
        temp.push({
            idx: i,
            failRate: parseFloat(userNow[i] / totalUserCount)
        })
        totalUserCount -= userNow[i]
    }
    let answer = [];
    // temp를 failRate를 기준으로 내림차순으로 정렬하고 해당 idx를 answer에 담아 결과 호출
    answer = temp.sort((a, b) => b.failRate - a.failRate).map((t) => t.idx)
    return answer;
}
