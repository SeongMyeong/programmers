// 아이디어
// 현재 위치를 기준으로 상하좌우 가 'P' 일 경우 실패
// 현재 위치를 기준으로 상하좌우 가 'X' 일 경우 패스
// 현재 위치를 기준으로 상하좌우 가 'O' 일 경우 해당 칸을 기준으로 상하좌우 에 사람이 있으면 실패

function solution(places) {
    let answer = [];
    
    for (let i = 0; i < places.length; i++) {
        const board = places[i]
        answer.push(checkBoardPass(board))
    }
    return answer;
}

function checkBoardPass(board) {
    const dy = [1, 0, -1, 0]
    const dx = [0, 1, 0, -1]
    let isPass = 1
    for (let y = 0; y < board.length; y++) {
        if (isPass === 0) break
        
        for (let x = 0; x < board.length; x++) {
            if (isPass === 0) break
            
            if (board[y][x] === 'P') {  // 사람이 앉아있는 상황
                // 상하좌우 확인
                for (let i = 0; i < 4; i++) {
                    const ny = y + dy[i]
                    const nx = x + dx[i]
                    
                    // board 를 벗어나는 경우 continue
                    if (ny < 0 || nx < 0 
                        || ny > board.length - 1 || nx > board.length - 1
                       || board[ny][nx] === 'X') // 상하좌우 칸이 'X'(파티션) 인 경우 continue
                        continue

                    // 상하좌우 칸이 'P' 인 경우 break
                    if (board[ny][nx] === 'P') {
                        isPass = 0
                        break
                    }
                    // 상하좌우 칸이 'O'(뚫림) 인 경우 그 칸을 기준으로 상하좌우 확인
                    if (board[ny][nx] === 'O') {
                        for (let j = 0; j < 4; j++) {
                            const nny = ny + dy[j]
                            const nnx = nx + dx[j]
                            
                            // 그 칸을 기준으로 상하좌우가 board를 벗어나는 경우 continue
                            if (nny < 0 || nnx < 0
                                || nny > board.length - 1 || nnx > board.length - 1
                                || board[nny][nnx] === 'X'
                               ) continue
                            // nny와 nnx 가 이전의 좌표를 가르키는 경우 continue
                            if (nny === ny || nnx === nx) continue
                            // 사람이 앉아있으면 isPass를 0으로 바꾸고 fail
                            if (board[nny][nnx] === 'P') {
                                isPass = 0
                                break
                            }
                        }
                    }
                    
                }
            }
        }
    }
    
    return isPass
}
