function solution(numbers, hand) {
    let answer = '';
    const leftLength = {
        '*': {
            '2': 4,
            '5': 3,
            '8': 2,
            '0': 1
        },
        '1': {
            '2': 1,
            '5': 2,
            '8': 3,
            '0': 4
        },
        '4': {
            '2': 2,
            '5': 1,
            '8': 2,
            '0': 3
        },
        '7': {
            '2': 3,
            '5': 2,
            '8': 1,
            '0': 2
        },
        '2': {
            '2': 0,
            '5': 1,
            '8': 2,
            '0': 3
        },
        '5': {
            '2': 1,
            '5': 0,
            '8': 1,
            '0': 2
        },
        '8': {
            '2': 2,
            '5': 1,
            '8': 0,
            '0': 1
        },
        '0': {
            '2': 3,
            '5': 2,
            '8': 1,
            '0': 0
        }
    }
    const rightLength = {
        '#': {
            '2': 4,
            '5': 3,
            '8': 2,
            '0': 1
        },
        '3': {
            '2': 1,
            '5': 2,
            '8': 3,
            '0': 4
        },
        '6': {
            '2': 2,
            '5': 1,
            '8': 2,
            '0': 3
        },
        '9': {
            '2': 3,
            '5': 2,
            '8': 1,
            '0': 2
        },
        '2': {
            '2': 0,
            '5': 1,
            '8': 2,
            '0': 3
        },
        '5': {
            '2': 1,
            '5': 0,
            '8': 1,
            '0': 2
        },
        '8': {
            '2': 2,
            '5': 1,
            '8': 0,
            '0': 1
        },
        '0': {
            '2': 3,
            '5': 2,
            '8': 1,
            '0': 0
        }
    }
    let nowLeftPos = '*'
    let nowRightPos = '#'
    numbers.map((number) => {
        if (number === 1 || number === 4 || number === 7) { // 숫자가 1, 4, 7일때는 왼손으로 처리
            nowLeftPos = number
            answer += 'L'
        } else if (number === 3 || number === 6 || number === 9) { // 숫자가 3, 6, 9 일때는 오른손으로 처리
            nowRightPos = number
            answer += 'R'
        } else { // 숫자가 가운데에 있을때는 거리를 이용해서 처리
            if (leftLength[`${nowLeftPos}`][`${number}`] < rightLength[`${nowRightPos}`][`${number}`]) {
                nowLeftPos = number
                answer += 'L'
            } else if (leftLength[`${nowLeftPos}`][`${number}`] > rightLength[`${nowRightPos}`][`${number}`]) {
                nowRightPos = number
                answer += 'R'
            } else {
                if (hand === 'left') {
                    nowLeftPos = number
                    answer += 'L'
                } else {
                    nowRightPos = number
                    answer += 'R'
                }
            }
        }
    })
    return answer;
}
