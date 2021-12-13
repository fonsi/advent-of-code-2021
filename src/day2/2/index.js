const demoInstructions = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const parseInstructions = (instructions) => {
    const rows = instructions.split('\n');

    return rows.map(row => row.split(' '));
}

const init = () => {
    const instructions = parseInstructions(demoInstructions);
    const { horizontal, depth } = instructions.reduce((acc, instruction) => {
        const [ direction, amount] = instruction;
        const amountNumber = parseInt(amount);

        switch (direction) {
            case 'up':
                acc.aim -= amountNumber;
                break;
            case 'down':
                acc.aim += amountNumber;
                break;
            case 'forward':
                acc.horizontal += amountNumber;
                acc.depth += amountNumber * acc.aim;
                break;
        }

        return acc;
    }, {
        aim: 0,
        horizontal: 0,
        depth: 0,
    });

    console.log(horizontal * depth);
}

init();