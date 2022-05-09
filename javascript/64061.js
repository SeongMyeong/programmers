function solution(board, moves) {
    let answer = 0;
    const bucket = []
    
    moves.map((move, idx) => {  // moves를 전부 호출
        for (let i = 0; i < board.length; i += 1) {
            if (board[i][move - 1] !== 0) { // board[i][move - 1] 칸에 인형이 존재할 때,
                if (bucket.length === 0) {  // bucket 에 담겨있는게 없으면 push
                    bucket.push(board[i][move - 1])
                } else {    // bucket 에 이미 담겨있으면
                    const latestDoll = bucket.pop() // 가장 최근것을 pop
                    if (latestDoll === board[i][move - 1]) {    // 만일 크레인으로 들어올릴 인형과 같다면 answer 에 1 더하기
                        answer += 1
                    } else {
                        // 다르다면 가장 최근것을 다시 push
                        bucket.push(latestDoll)
                        // 크레인으로 들어올릴 인형도 push
                        bucket.push(board[i][move - 1])
                    }
                }
                // 크레인으로 들어올린 위치는 빈곳으로 처리
                board[i][move - 1] = 0
                break
            }
        }
    })
    
    return answer * 2;
}
