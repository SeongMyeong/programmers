// 문제 (0.0) 에서 (N-1, N-1) 로 가는 최단경로를 구하라
// 아이디어
// 직선거리는 100원, 코너하나는 400원 이 들어간다.
// 모든 경로에 대한 탐색을 진행하며, 가장 효과적인 경로를 탐색함
// 단 x -> y, y -> x 로 이동할때는 코너가 필요함
// 진행방향으로 간 다음 3방향이 막혀있으면 그 전 위치에서 다른방향으로 가기
// 자료구조
// 보드: n * n 이차원배열
// 시간복잡도
// 최대 25 ^ 2 < 10,000,000

function solution(board) {
    var answer = 0;

    const direct = 100  // 직선거리 금액
    const corner = 400  // 코너건설 금액
    let price = 0 // 전체 금액

    let yPos = 0 // 초기 시작 지점 y좌표
    let xPos = 0 // 초기 시작 지점 x좌표

    const xStart = setBridge(board, 'x', 0, xPos + 1, 100) // X축 기준으로 시작
    const yStart = setBridge(board, 'y', yPos + 1, 0, 100) // Y축 기준으로 시작

    answer = Math.max(yStart, xStart)

    return answer;
}

// 2022-05-01 3차 시도, max값이 나오긴하는데, position에 대한 로그가 이상하게 나옴
// board: 도면
// direction: 방향
// yIdx: 현재 y 포지션
// xIdx: 현재 x 포지션
// price: 현재까지 건설비용
function setBridge(board, direction, yPos, xPos, price) {
    const endIndex = board.length - 1
    console.log('direction: ', direction, ' / yPos: ', yPos, ' / xPos: ', xPos, ' / price: ', price)
    if (yPos === endIndex && xPos === endIndex) return price

    // 현재 진행방향과 다음 진행 방향에 따라서 price 가 달라짐
    const nextYPos = yPos + 1
    const prevYPos = yPos - 1
    const nextXPos = xPos + 1
    const prevXPos = xPos - 1
    const returnPrice = price

    if (direction === 'y') {
        if (board[nextYPos] && board[nextYPos][xPos] === 0) {
            console.log(1)
            price = Math.max(returnPrice, setBridge(board, 'y', nextYPos, xPos, price + 100))
        }
        if (board[yPos][nextXPos] === 0) {
            console.log(2)
            price = Math.max(returnPrice, setBridge(board, 'x', yPos, nextXPos, price + 600))
        }
        if (board[yPos][prevXPos] === 0) {
            console.log(3)
            price = Math.max(returnPrice, setBridge(board, 'x', yPos, prevXPos, price + 600))
        }
        if (board[nextYPos] && board[nextYPos][nextXPos] === 1 && board[nextYPos][prevXPos] === 1) {
            console.log('y back')
            price = Math.max(returnPrice, setBridge(board, 'y', prevYPos, prevXPos, price - 600))
        }
    }
    else {
        if (board[yPos][nextXPos]) {
            if (board[yPos][nextXPos] === 0) {
                console.log(4)
                price = Math.max(returnPrice, setBridge(board, 'x', yPos, nextXPos, price + 100))
            }
            if (board[nextYPos] && board[nextYPos][xPos] === 0) {
                console.log(5)
                price = Math.max(returnPrice, setBridge(board, 'y', nextYPos, xPos, price + 600))
            }
            if (board[prevYPos] && board[prevYPos][xPos] === 0) {
                console.log(6)
                price = Math.max(returnPrice, setBridge(board, 'y', prevYPos, xPos, price + 600))
            }
        }
    }

    return price
}

// 2022-05-01 2차 시도, 출력값 0 나옴
// 계산이 잘못되는듯?
// board: 도면
// direction: 방향
// yIdx: 현재 y 포지션
// xIdx: 현재 x 포지션
// price: 현재까지 건설비용
// function setBridge(board, direction, yPos, xPos, price) {
//     const xEnd = board.length - 1
//     const yEnd = xEnd

//     let returnPrice = price

//     // 현재 y 와 x 의 위치가 맨 끝이라면 price값을 리턴
//     if (yPos === yEnd && xPos === xEnd) return price

//     let yCorner = 0
//     let yStraight = 0
//     let xCorner = 0
//     let xStraight = 0

//     // y 방향으로 진행중
//     if (direction === 'y') {
//         if (board[yPos + 1][xPos] && board[yPos + 1][xPos] === 0) {
//             yStraight = setBridge(board, 'y', yPos + 1, xPos, price + 100)
//         }
//         if (board[yPos][xPos + 1] && board[yPos][xPos + 1] === 0) {
//             yCorner = setBridge(board, 'x', yPos, xPos + 1, price + 500)
//         }
//         if (board[yPos][xPos - 1] && board[yPos][xPos - 1] === 0) {
//             yCorner = setBridge(board, 'x', yPos, xPos - 1, price + 500)
//         }
//     } else {    // x 방향으로 왔음
//         if (board[yPos][xPos + 1] && board[yPos][xPos + 1] === 0) {
//             xStraight = setBridge(board, 'x', yPos, xPos + 1, price + 100)
//         }
//         if (board[yPos + 1][xPos] && board[yPos + 1][xPos] === 0) {
//             xCorner = setBridge(board, 'x', yPos + 1, xPos, price + 500)
//         }
//         if (board[yPos - 1] && board[yPos - 1][xPos] && board[yPos - 1][xPos] === 0) {
//             xCorner = setBridge(board, 'x', yPos - 1, xPos, price + 500)
//         }
//     }

//     return Math.max(yCorner, yStraight, xCorner, xStraight)
// }

// 2022-05-01 1차 시도, Maximum call stack 나옴
// board: 도면
// direction: 방향
// yIdx: 현재 y 포지션
// xIdx: 현재 x 포지션
// price: 현재까지 건설비용
// function setBridge(board, direction, yPos, xPos, price) {
//     const dy = [1, 0, -1, 0]    // Y축 이동
//     const dx = [0, 1, 0, -1]    // X축 이동
//     const xEnd = board.length - 1
//     const yEnd = xEnd

//     let returnPrice = price

//     // 현재 y 와 x 의 위치가 맨 끝이라면 price값을 리턴
//     if (yPos === yEnd && xPos === xEnd) return price

//     // 현재 위치가 1 이라면(막혀있다면) 처리
//     if (board[yPos][xPos] === 1) return price

//     let yCorner = 0
//     let yStraight = 0
//     let xCorner = 0
//     let xStraight = 0

//     // 각 이동경로(x, y) 를 따라서 1칸씩 이동
//     for (let i = 0; i < 4; i++) {
//         for (let j = 0; j < 4; j++) {
//             const nextYPos = yPos + dy[j]
//             const nextXPos = xPos + dx[i]

//             // y 방향으로 왔는데
//             if (direction === 'y') {
//                 // 진행방향이 막혀있으면, 커브길돌아야함
//                 if (board[nextYPos][xPos] && board[nextYPos][xPos] === 1) {
//                     yCorner = setBridge(board, 'x', yPos, nextXPos, price + 500)
//                 } else {
//                     yStraight = setBridge(board, 'y', nextYPos, xPos, price + 100)
//                 }
//             } else {    // x 방향으로 왔음
//                 // 진행방향이 막혀있으면, 커브길돌아야함
//                 if (board[yPos][nextXPos] && board[yPos][nextXPos] === 1) {
//                     xCorner = setBridge(board, 'y', nextYPos, xPos, price + 500)
//                 } else {
//                     xStraight = setBridge(board, 'x', yPos, nextXPos, price + 100)
//                 }
//             }
//         }
//     }
//     return Math.max(yCorner, yStraight, xCorner, xStraight)
// }