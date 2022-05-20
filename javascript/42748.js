function solution(array, commands) {
    const answer = [];
    
    commands.map((command) => {
        const startIndex = command[0] // n 번째 부터 시작이므로, 배열내에선 -1
        const endIndex = command[1]
        const sortedIndex = command[2]
        
        // slice => (startIndex, endIndex)
        answer.push(array.slice(startIndex - 1, endIndex).sort((a, b) => a - b)[sortedIndex - 1])
    })
    return answer;
}
