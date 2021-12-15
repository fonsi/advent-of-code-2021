const exampleData = `3,4,3,1,2`;
const daysToProcess = 80;
const resetNumber = 6;
const newNumber = 8;

const stringToNumber = (string) => parseInt(string, 10);

const parseData = (data) => {
    return data.split(',').map(stringToNumber);
}

const init = (data) => {
    let lanternfishes = parseData(data);

    for (let i = 0; i < daysToProcess; i++) {
        let newLanternfishes = []

        lanternfishes.forEach((lanternfish, j) => {
            if (lanternfish === 0) {
                lanternfishes[j] = resetNumber;
                newLanternfishes.push(newNumber);
            } else {
                lanternfishes[j] = lanternfish - 1;
            }
        });

        lanternfishes = [
            ...lanternfishes,
            ...newLanternfishes,
        ]
    }

    console.log(lanternfishes.length);
}

init(exampleData);