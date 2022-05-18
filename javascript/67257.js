// 1차시도 맨 앞에 (-) operator 가 있을 때, 발생하는 문제에 대한 처리 오류
/*
s = s.replace(수식, 결과)

// 1차시도 맨 앞에 (-) operator 가 있을 때, 발생하는 문제에 대한 처리 오류
function solution(expression) {
    let answer = 0;
    const answerArray = []
    const reg = /\d/
    const operationArray = ['+', '-', '*']
    const operatorsPermutations = getPermutations(operationArray, 3)
    
    // 순열을 하나씩 순서대로 처리하며 계산값을 누적함
    operatorsPermutations.map((permutation) => {
        answer = expression
        permutation.map((operator) => {
            // console.log(answer.indexOf(operator))
            // let pos = answer.indexOf(operator)
            let pos = getAllIndexes(answer, operator)
            console.log(pos)
            let leftPos = pos.shift()
            let rightPos = leftPos
            
            while (pos !== -1 && pos !== 0) {
                while (reg.test(answer[--leftPos])){}
                while (reg.test(answer[++rightPos])){}
                
                answer = answer.replace(
                    answer.substring(leftPos + 1, rightPos), calc(answer.substring(leftPos + 1, rightPos))
                )
                console.log(answer)
                pos = answer.indexOf(operator)
            }
        })
        console.log('last answer: ', answer)
        answerArray.push(answer)
    })
    
    answerArray.sort((a, b) => Math.abs(b) - Math.abs(a))
    // console.log(answerArray)
    return answerArray;
}

function getAllIndexes(arr, val) {
    const indexes = []
    let i = -1;
    while ((i = arr.indexOf(val, i+1)) !== -1){
        indexes.push(i);
    }
    return indexes;
}

const calc = function (expression) {
    // console.log(expression)
    if (expression.indexOf('+') !== -1) {
        console.log('plus')
        return parseInt(expression.split('+')[0]) + parseInt(expression.split('+')[1])
    }
    if (expression.indexOf('-') !== -1) {
        console.log('minus')
        return parseInt(expression.split('-')[0]) - parseInt(expression.split('-')[1])
    }
    if (expression.indexOf('*') !== -1) {
        console.log('multi')
        return parseInt(expression.split('*')[0]) * parseInt(expression.split('*')[1])
    }
}

function getPermutations (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]); 
    // n개중에서 1개 선택할 때(nP1), 바로 모든 배열의 원소 return. 1개선택이므로 순서가 의미없음.

    arr.forEach((fixed, index, origin) => {
      const rest = [...origin.slice(0, index), ...origin.slice(index+1)] 
      // 해당하는 fixed를 제외한 나머지 배열 
      const permutations = getPermutations(rest, selectNumber - 1); 
      // 나머지에 대해서 순열을 구한다.
      const attached = permutations.map((el) => [fixed, ...el]); 
      //  돌아온 순열에 떼 놓은(fixed) 값 붙이기
      results.push(...attached); 
      // 배열 spread syntax 로 모두다 push
    });

    return results; // 결과 담긴 results return
}
*/

// 2차시도 정답지 확인
function solution(expression) {
    var answer = 0;
    const mathExp = ['*','+','-']   // operator 조합을 위한 배열
    let priorityArr = Permutation(mathExp, 3)   // operator로 나올 수 있는 조합
    const calculated = []
    
    for(const priority of priorityArr){
        const expressionArr = expression.split(/(\D)/)  // 문자로 split 함
        for(const exp of priority){
            while(expressionArr.includes(exp)){
                // 현재 배열에서 operator의 첫 index를 찾음
                const index =  expressionArr.indexOf(exp)
                // 해당 index를 기준으로 하여 계산을 한다음 배열 재배치
                // splice (index - 1, 3, eval ~)
                // index 기준 이전 숫자부터 3개를
                // eval(숫자 operator 숫자) 로 처리
                expressionArr.splice(index-1, 3, eval(expressionArr.slice(index-1,index+2).join('')))
            }
        }
        calculated.push(Math.abs(expressionArr[0]))
    }
    answer = Math.max(...calculated)
    return answer
}

function Permutation(arr, r) {
    const result = []
    if (r === 1) return arr.map((num) => [num])
    arr.forEach((fixed, index, org) => {
        const rest = [...org.slice(0, index), ...org.slice(index + 1)]
        const permutation = Permutation(rest, r - 1)
        const attached = permutation.map((numbers) => [fixed, ...numbers])
        result.push(...attached)
    })
    return result
}
