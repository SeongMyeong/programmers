function solution(n) {
    let answer = '';

    // 해당 숫자가 3으로 나누어 떨어지면, 1의자리수는 4
    // 1이 남으면 1, 2가 남으면 2
    // 따라서 다음 배열로 나타낼 수 있음
    
    /*
        나머지 값으로 변환할 배열 numArr를 생성한다. (0번째 index 4, 1번째 index 1, 2번 째 index 2)
        매개변수 n이 0(false)이 될 때까지 반복문을 실행하는 while을 사용한다.
        answer에 변환한 값을 할당한다.
        나머지 값이 0일 경우 몫에서 1을 뺀 숫자를 n에 할당한다.
        아니라면 몫을 n에 할당한다.
        참조 URL: https://onlydev.tistory.com/63
    */
    const oneTwoFour = ['4','1','2']
    while (n > 0){
        const remainder = n % 3
        answer = oneTwoFour[remainder] + answer;
        n = Math.floor((n - 1)/3) //나누어떨어지지 않을 때에도 -1해도 상관없음
    }
    
    return answer;
}
