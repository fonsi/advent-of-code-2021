const exampleData = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const stringToNumber = (string) => parseInt(string, 10);
const parseNumbers = (numbers) => numbers.split(',').map(stringToNumber);
const textRowToNumbersArray = (textRow) => textRow.trim().split(/\s+/).map(stringToNumber);
const parseAndFormatBoard = (board) => board.split('\n').map(textRowToNumbersArray);
const parseAndFormatBoards = (boards) => boards.map(parseAndFormatBoard);

const parseData = (data) => {
    const [numbers, ...boards] = data.split('\n\n');
    return [parseNumbers(numbers), parseAndFormatBoards(boards)];
}

const isFullRow = (numbers, row) => row.every(rowItem => numbers.includes(rowItem));

const checkColumns = (numbers, board) => {
    const columnsCount = board[0].length;

    for (let i = 0; i < columnsCount; i++) {
        const isFullColumn = board.every(boardRow => numbers.includes(boardRow[i]));

        if (isFullColumn) {
            return true;
        }
    }

    return false;
}

const isWinner = (numbers, board) => {
    const isWinner = board.some(row => isFullRow(numbers, row));

    if (isWinner) {
        return true;
    }

    return checkColumns(numbers, board);
}

const getUnmarkedSum = (board, revealedNumbers) => {
    const unmarked = board.reduce((acc, boardRow) => {
        return [
            ...acc,
            ...boardRow.filter(rowItem => !revealedNumbers.includes(rowItem)),
        ];
    }, []);

    return unmarked.reduce((acc, item) => {
        return acc + item;
    }, 0);
}

const init = (data) => {
    const [numbers, boards] = parseData(data);

    let winner;
    let revealedNumbers = numbers.slice(0, 4);

    do {
        revealedNumbers = numbers.slice(0, revealedNumbers.length + 1);
        const checkIsWinner = (board) => isWinner(revealedNumbers, board);
        winner = boards.find(checkIsWinner);
    } while (!winner && revealedNumbers.length < numbers.length);

    console.log('Result', getUnmarkedSum(winner, revealedNumbers) * revealedNumbers[revealedNumbers.length - 1]);

}

init(exampleData);