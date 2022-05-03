// 문제 (0,0) 에서 (N-1, N-1) 까지 진행하는데에 최소 비용을 구하라
// 해당 칸의 값이 1 이라면 그 칸은 막혀있어 진행할 수 없다
// 아이디어
// 각각 인접한 노드로의 가는 비용을 100, 500으로 갖는 연결선을 만들고
// 다익스트라 알고리즘으로 출구까지 가는데에 최소 비용을 확인한다
// 자료구조
// 일반큐 || 우선순위큐
// 시간복잡도(다익스트라)
// 일반큐 의 경우 O(E*V) = O((N-1)^2*N^2) = O(N^4) = 25^4 = 390000 < 10000000
// 우선순위큐 의 경우 O(E*logV) = O((N-1)^2*logN^2) = O(N*logN)
// BFS
// 다익스트라와 동일

function solution(board) {
    var answer = 1000000000;    // 최소 비용을 계산해야 하므로, answer에 임의의 큰 수를 입력한다
    const dy = [1, 0, -1, 0]
    const dx = [0, 1, 0, -1]
    const boardLength = board.length
    // arr를 0으로 초기화한다(arr은 해당 위치까지 이동하는데에 걸리는 금액이 들어있다)
    // 초기금액은 계산하기 전이므로 0이다
    const arr = Array.from(Array(boardLength), () => Array(boardLength).fill(0))
    const queue = [];   // 우선순위큐 를 사용하지 않고 일반 배열로서 확인(이후 우선순위큐 를 이용해서 할 수 있는방법을 찾아본다)
    const dijkstra = () => {
        queue.push([0, 0, 1, 0]) // (0, 0) 시작해서 오른쪽 이동, 금액은 0원
        queue.push([0, 0, 0, 0]) // (0, 0) 시작해서 아래로 이동, 금액은 0원
        while(queue.length) {
            let now = queue.shift()   // 현재 queue에 저장된 위치좌표 GET
            let y = now[0]    // 현재 y좌표
            let x = now[1]    // 현재 x좌표
            let direction = now[2]    // 현재 진행방향
            let cost = now[3]   // 현재까지 금액

            // 현재 y, x좌표가 마지막(N-1, N-1)일 경우, answer에 현재까지 금액을 기존 answer와 비교해서 낮은 금액을 저장
            if (y === boardLength - 1 && x === boardLength - 1) {
                answer = (answer > cost) ? cost : answer
            }

            // dy, dx 를 이용해서 다음 경로로 진행해야 하므로, 반복문 처리
            // 좌표가 두개인데 이중포문을 사용하지 않는 이유는, 방향은 4가지밖에 존재하지 않기 때문
            for (let i = 0; i < 4; i++) {
                let ny = y + dy[i]    // 다음 y 좌표
                let nx = x + dx[i]    // 다음 x 좌표

                if (ny < 0 || nx < 0    // 현재 y, x 좌표가 0보다 낮거나
                    || ny > boardLength - 1 || nx > boardLength - 1 // board의 크기보다 크거나
                    || board[ny][nx]    // board[ny][nx]의 위치가 1 인 경우(막혀있는 경우)
                ) continue   // 수행하지 않고 다음 수행

                // 추가되는 금액은 만일 같은 축으로 이동하는 경우(0, 2 y축이동 / 1, 3 x축이동) 100원을 추가하며, 다른 축으로 이동하는 경우 코너(500) + 100원을 추가한다
                let charge = (direction === i) ? cost + 100 : cost + 600
                // arr[ny][nx] 가 아직 계산되지 않았거나(방문전)
                // 이전에 arr[ny][nx]에 방문하면서 계산한 금액보다 지금 금액이 작은 경우
                if (!arr[ny][nx] || (arr[ny][nx] >= charge)) {
                    arr[ny][nx] = charge    // 최소금액으로 다시 작성한다
                    queue.push([ny, nx, i, charge])
                }
            }
        }
    }
    dijkstra()
    return answer;
}

// 우선순위 큐 구현
class PriorityQueue {
    constructor() {
        this.queue = [];
        this.lastIndex = 0;
    }

    enQueue(data) {
        this.queue.push(data);

        let parentIndex = this.lastIndex;

        while (true) {
            const childIndex = parentIndex;
            parentIndex = Math.ceil(parentIndex / 2) - 1;

            if (parentIndex < 0) break;

            if (this.queue[parentIndex] < data) {
                this.queue[childIndex] = this.queue[parentIndex];
                this.queue[parentIndex] = data;
            }
        }

        this.lastIndex++;
    }

    deQueue() {
        this.lastIndex--;
        const result = this.queue[0];

        const lastElement = this.queue.pop();

        if (this.queue.length === 0) return lastElement;

        this.queue[0] = lastElement;

        let currentIndex = 0;

        while (true) {
            const leftIndex = currentIndex * 2 + 1;
            const left = this.queue[leftIndex];

            const rightIndex = currentIndex * 2 + 2;
            const right = this.queue[rightIndex];

            const compareIndex = left > right ? leftIndex : rightIndex;
            const compare = this.queue[compareIndex];

            if (this.queue[currentIndex] < compare) {
                this.queue[compareIndex] = this.queue[currentIndex];
                this.queue[currentIndex] = compare;
                currentIndex = compareIndex;
            } else break;
        }

        return result;
    }
}