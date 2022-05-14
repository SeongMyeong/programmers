function solution(nums) {
    let answer = 0;
    
    // 현재 입력이 들어온 숫자 배열을 가지고 3개짜리 순열조합을 생성
    const combinationsArray = getCombinations(nums, 3)
    
    // 생성된 조합을 이용해서 하나씩 탐색
    combinationsArray.map((combination) => {
        // 해당 조합의 모든 숫자를 더하여 num을 계산하고
        const num = combination.reduce((previousValue, currentValue) => previousValue + currentValue)
        // num이 primeNumber라면 answer에 1을 더함
        if (isPrimeNumber(num)) answer += 1
    })
    
    return answer;
}

// 순열조합 구하는 함수
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
}

// 소수 여부 확인
function isPrimeNumber(n){
	if (n === 1) return false;
	for (let i = 2; i < n; i++){
		if (n%i === 0) return false;
	}
	return true;
}
