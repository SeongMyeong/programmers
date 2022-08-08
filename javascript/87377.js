// 아이디어
// line 은 직선들의 배열
// 배열은 (Ax + By + C = 0) 의 형태를 가진 원소들의 집합
// 1. 이 배열들의 조합을 생성
// 2. 각 조합을 교점을 찾는 함수에 대입하여 교점을 구하고 저장
// 3-2. 교점의 최소 -x 값에서 최대 x 값을 구하여 저장
// 3-3. 교점의 최소 -y 값에서 최대 y 값을 구하여 저장
// 4-1. 최소~최대 x, y 에 해당하는 반복문을 통해서 . 을 표시
// 4-2. 교점이 정수가 되는 값을 찾아서 해당 점에 * 표시

function solution(line) {
    let answer = [];
    const crossPointArr = [];
    
    // 1. 이 배열들의 조합을 생성
    const comb = getCombinations(line, 2)
    
    comb.map((el) => {
        const line1 = el[0]
        const line2 = el[1]
        
        // 2. 각 조합을 교점을 찾는 함수에 대입하여 교점을 구하고 저장
        const crossPoint = getCrossPoint(line1, line2)
        if (crossPoint) {
            crossPointArr.push(crossPoint)
        }
    })
    
    let minX = Math.min( ...crossPointArr.map(ele => ele.crossX));
    let maxX = Math.max( ...crossPointArr.map(ele => ele.crossX));
    let minY = Math.min( ...crossPointArr.map(ele => ele.crossY));
    let maxY = Math.max( ...crossPointArr.map(ele => ele.crossY));

    // 4-1. 최소~최대 x, y 에 해당하는 반복문을 통해서 . 을 표시
    answer = Array.from(Array(maxY - minY + 1), _ => Array(maxX - minX + 1).fill('.') )

    // 4-2. 교점이 정수가 되는 값을 찾아서 해당 점에 * 표시
    crossPointArr.map((crossPoint) => {
        answer[maxY - crossPoint.crossY][crossPoint.crossX - minX] = '*'
    })
    
    return answer.map((el) => el.join(''));
}

// a1 과 a2 직선의 교점을 찾는 함수
// https://gaussian37.github.io/math-algorithm-intersection_point/
// params: 두 직선. 두 직선은 직선의 일반형을 나타내며, n 과 m 을 원소로 갖는 object 를 파라미터로 갖는다 (nx + my + z = 0)
// return: 교점의 x, y 값을 return 함
function getCrossPoint([A, B, E], [C, D, F]) {
    if ((A * D) - (B * C) === 0) {
        return false
    }
    
    const crossX = ((B * F) - (E * D)) / ((A * D) - (B * C))
    const crossY = ((E * C) - (A * F)) / ((A * D) - (B * C))
    
    // 정수 일 때만 사용할 것.
    // 정수가 아니면 return false
    return Number.isInteger(crossX) && Number.isInteger(crossY) ? {crossX, crossY} : false
}

const getCombinations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]); 
    // n개중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소 return

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1); 
      // 해당하는 fixed를 제외한 나머지 뒤
      const combinations = getCombinations(rest, selectNumber - 1); 
      // 나머지에 대해서 조합을 구한다.
      const attached = combinations.map((el) => [fixed, ...el]); 
      //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
      results.push(...attached); 
      // 배열 spread syntax 로 모두다 push
    });

    return results; // 결과 담긴 results return
}
