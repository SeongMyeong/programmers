function solution(numbers) {
    let answer = 0;
    
    // 이미 체크했는지 확인
    const checkNumArr = []
    // 소수인지 확인
    const primeNumArr = []
    
    const numberArr = numbers.split('')
    const permutationArr = []
    for (let i = 1; i <= numberArr.length; i++) {
        const permuteArr = getPermutations(numberArr, i)
        
        while (permuteArr.length) {
            const temp = parseInt(permuteArr.shift().join(''))
            if (permutationArr.indexOf(temp) === -1) {
                permutationArr.push(temp)    
            }
        }
    }
    permutationArr.sort()
    
    for (let i = 2; i <= permutationArr[permutationArr.length - 1]; i++) {
        if (isPrime(i)) primeNumArr.push(i)
    }
    
    permutationArr.map((permutate) => {
        if (primeNumArr.indexOf(permutate) !== -1) {
            checkNumArr.push(permutate)
        }
    })
    
    // console.log(checkNumArr)
    
    answer = checkNumArr.length
    return answer;
}

// 제곱근으로 Prime Number 구하는 방식 - 제곱근을 기준으로 하여 대칭적으로 발생함(https://velog.io/@tmpks5/Algorithm-%EC%86%8C%EC%88%98%EB%A5%BC-%ED%8C%90%EB%B3%84%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-%EC%A0%9C%EA%B3%B1%EA%B7%BC-%EB%82%98%EB%88%84%EA%B8%B0)
function isPrime(num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

// 일반적인 Prime Number 구하는 방식 - 10초이상 타임아웃 발생
function isPrime(num, startNum) {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
}
    
const getPermutations = function (arr, selectNumber) {
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
