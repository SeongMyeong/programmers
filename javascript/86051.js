function solution(numbers) {
    return 45 - numbers.reduce((prev, next) => prev + next);
}
