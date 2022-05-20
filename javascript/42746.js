// 1차시기 단순 sort 사용하면 runtime 에러 뜸
// 아이디어
// numbers 들의 원소를 기준으로 가장 앞 값이 큰 순서대로 정렬
// 
function solution(numbers) {
    let answer = '';

    numbers.sort((a, b) => compare(a, b))
    answer = numbers.join('')
    if(answer[0] === '0') return '0'
    return answer;
}

// const getPermutations = function (arr, selectNumber) {
//     const results = [];
//     if (selectNumber === 1) return arr.map((el) => [el]); 
//     // n개중에서 1개 선택할 때(nP1), 바로 모든 배열의 원소 return. 1개선택이므로 순서가 의미없음.

//     arr.forEach((fixed, index, origin) => {
//       const rest = [...origin.slice(0, index), ...origin.slice(index+1)] 
//       // 해당하는 fixed를 제외한 나머지 배열 
//       const permutations = getPermutations(rest, selectNumber - 1); 
//       // 나머지에 대해서 순열을 구한다.
//       const attached = permutations.map((el) => [fixed, ...el]); 
//       //  돌아온 순열에 떼 놓은(fixed) 값 붙이기
//       results.push(...attached); 
//       // 배열 spread syntax 로 모두다 push
//     });

//     return results; // 결과 담긴 results return
// }

// 2차시기용 비교 함수
// function compare (a, b) {
//     const strA = String(a).split('')
//     const strB = String(b).split('')
    
//     // a의 첫자리수가 b의 첫자리수보다 크면 a가 큼
//     if (strA[0] > strB[0]) {
//         return -1
//     }
    
//     const lengthA = strA.length
//     const lengthB = strB.length
    
//     // 둘이 같은 자리수면 int 끼리 비교해서 처리
//     if (lengthA === lengthB) {
//         console.log('자리수 같음: ', a, ' / ', b)
//         if (a > b) return -1
//         else return 1
//     } else {
//         console.log('자리수 다름: ', a, ' / ', b)
//         // 둘이 자리수가 다르다면, 첫째 자리수부터 비교하면서
//         // 같은 자리의 숫자가 큰 것을 리턴
//         while (strA.length) {
//             const numA = strA.shift()
//             // strA는 아직 있는데, strB는 없음
//             // 이제 남아있는 strA의 첫 자리수가, 입력으로 들어온 문자의 첫 자리수보다 크다면 해당 숫자를 리턴
//             if (!strB.length) {
//                 console.log('strB 이제 없음')
//                 if (parseInt(numA) > String(a).split('')[0]) return -1
//                 else return 1
//             }
            
//             const numB = strB.shift()
//             console.log(numA, ' / ', numB)
//             if (parseInt(numA) > parseInt(numB)) {
//                 console.log('parseInt(numA) > parseInt(numB)')
//                 return -1
//             }
//             if (parseInt(numB) > parseInt(numA)) {
//                 console.log('parseInt(numB) > parseInt(numA)')
//                 return 1
//             }
//         }
//         while (strB.length) {
//             const numB = strB.shift()
            
//             if (parseInt(numB) > String(b).split('')[0]) return 1
//         }
        
//         return -1
//     }
// }

// 두번째 자리수 비교 뭐 이런거 없이, 두 수를 붙인다음에 parseInt처리해도 됨
function compare (a, b) {
    const compareA = parseInt(String(a) + String(b))
    const compareB = parseInt(String(b) + String(a))
    
    return compareB - compareA
}
