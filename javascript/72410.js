function solution(new_id) {
    // 2차시도 따로 풀이방법 참고해서 푼것
    let answer = new_id
    .toLowerCase() // 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
    .replace(/[^a-z0-9-_.]/g, '') // 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
    .replace(/\.+/g, '.') // 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다. (+는 1번이상 반복됨을 의미)
    .replace(/^[\.]|[\.]$/g, '') // 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
    .replace(/^$/g, 'a') // 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
    .slice(0, 15)
    .replace(/\.$/g, '') // 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다. 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
    //  7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
    if (answer.length === 1) answer = answer[0].repeat(3) // 1글자이므로, 3번반복
    if (answer.length === 2) answer = answer + answer[1] // 2글자 이므로 기존 answer에 마지막글자만 붙임
    
    // 1차시도 직접짠것 - 4 11 14 16 20 문제에서 fail > 30분 시간초과로 풀이 참조 후 2차시도로 넘김
//     // 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
//     answer = answer.toLowerCase()
    
//     // 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
//     answer = answer.replace(/[^a-z0-9-_.]/g, '')
    
//     // 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
//     while (answer.indexOf('..') !== -1) {
//         answer = answer.replace(/\.\./g, '.')
//     }
    
//     // 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
//     if (answer.indexOf('.') === 0) answer = answer.substr(1, answer.length - 1)
//     if (answer.indexOf('.') === answer.length - 1) answer = answer.slice(0, -1)
    
//     // 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
//     if (answer === '') answer = 'a'
    
//     // 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다. 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
//     if (answer.length >= 16) answer = answer.substring(0, 15)
//     if (answer.indexOf('.') === answer.length - 1) answer = answer.slice(0, -1)
    
//     //  7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
//     while (answer.length <= 2) answer += answer[answer.length-1]
    
    return answer;
}
