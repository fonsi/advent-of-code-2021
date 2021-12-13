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

        switch (direction) {
            case 'up':
                acc.depth -= parseInt(amount);
                break;
            case 'down':
                acc.depth += parseInt(amount);
                break;
            case 'forward':
                acc.horizontal += parseInt(amount);
                break;
        }

        return acc;
    }, {
        horizontal: 0,
        depth: 0,
    });

    console.log(horizontal * depth);
}

init();