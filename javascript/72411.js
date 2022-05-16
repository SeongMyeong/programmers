// 아이디어
// orders 를 하나씩 탐색한다
// 각 손님의 주문메뉴를 2개이상 ~ 주문한 제품수 까지 경우의 수를 따라서 map에 저장
// 동일한 메뉴명이 존재하면 카운트를 하나 증가시킴
// course는 카운트 수
// result에는 카운트 수 만큼 주문한 제품들을 담아서 사전순 오름차순 return

// 1차시기에 3번 case에서 WX = XW 를 같이 처리하는 방법을 확인하지 못함

function solution(orders, course) {
    let answer = [];
    const orderCountCombination = {}
    
    orders.map((order) => {
        const splitData = order.split('')
        for (let i = 2; i <= splitData.length; i++) {
            const combination = getCombinations(splitData, i)
            combination.map((t) => {
                const orderCase = t.sort().join('')

                if (orderCountCombination[orderCase] === undefined) {
                    orderCountCombination[orderCase] = 1
                } else {
                    orderCountCombination[orderCase] += 1
                }
            })
        }
    })

    Object.keys(orderCountCombination).map((key) => {
        if (orderCountCombination[`${key}`] === 1) {
            delete orderCountCombination[`${key}`]
        }
    })
    // console.log(orderCountCombination)
    const answerObject = {}
    
    for (let i = 0; i < course.length; i++) {
        const keyLength = course[i] // 코스요리의 메뉴 구성 수를 확인하기 위한 key
        answerObject[`${keyLength}`] = {
            arr: [],
            orderCount: 0
        }
        
        const keys = Object.keys(orderCountCombination)
        keys.map((key) => {
            if (key.length === keyLength) { // 현재 order들에 대한 확인
                if (answerObject[`${keyLength}`].orderCount < orderCountCombination[key]) {
                    answerObject[`${keyLength}`] = {
                        arr: [key],
                        orderCount: orderCountCombination[key]
                    }
                } else if (answerObject[`${keyLength}`].orderCount === orderCountCombination[key]) {
                    answerObject[`${keyLength}`].arr.push(key)
                }
            }
        })
    }
    
    Object.keys(answerObject).map((t) => {
        answerObject[t].arr.map((tmp) => {
            answer.push(tmp)
        })
    })

    answer.sort()
    return answer;
}

// 조합을 가져오는 함수
function getCombinations (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
        const combinations = getCombinations(rest, selectNumber - 1); // 나머지에 대해서 조합을 구한다.
        const attached = combinations.map((combination) => [fixed, ...combination]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
        results.push(...attached); // 배열 spread syntax 로 모두 다 push
      });

    return results; // 결과가 담긴 results를 return
};
