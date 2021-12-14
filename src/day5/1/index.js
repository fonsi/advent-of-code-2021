const exampleData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const stringToNumber = (string) => parseInt(string, 10);

const isHorizontal = (line) => line.y1 === line.y2;
const isVertical = (line) => line.x1 === line.x2;
const isHorizontalOrVertical = (line) => isHorizontal(line) || isVertical(line);

const generateConsecutiveCoordinates = (point1, point2) => {
    const startPoint = Math.min(point1, point2);
    const endPoint = Math.max(point1, point2);
    const points = [];

    for (let i = startPoint; i <= endPoint; i++) {
        points.push(i);
    }

    return points;
}

const generateLinePoints = (line) => {
    if (isHorizontal(line)) {
        const consecutivePoints = generateConsecutiveCoordinates(line.x1, line.x2);
        return consecutivePoints.reduce((acc, coordinate) => {
             return [
                 ...acc,
                 `${coordinate}-${line.y1}`,
             ]
        }, []);
    } else {
        const consecutivePoints = generateConsecutiveCoordinates(line.y1, line.y2);
        return consecutivePoints.reduce((acc, coordinate) => {
            return [
                ...acc,
                `${line.x1}-${coordinate}`,
            ]
        }, []);
    }
}

const getCoveredPoints = (linesPoints) => {
    return linesPoints.reduce((acc, linePoints) => {
        linePoints.forEach(point => {
            acc[point] = acc[point] ? acc[point] + 1 : 1;
        });

        return acc;
    }, {});
}

const countDangerousPoints = (points) => Object.values(points).filter(val => val >= 2).length;

const parseData = (data) => {
    const lines = data.split('\n');
    return lines.map(line => {
        const [initPoint, endPoint] = line.split(' -> ');
        const initPointCoordinates = initPoint.split(',');
        const endPointCoordinates = endPoint.split(',');

        return {
            x1: stringToNumber(initPointCoordinates[0]),
            y1: stringToNumber(initPointCoordinates[1]),
            x2: stringToNumber(endPointCoordinates[0]),
            y2: stringToNumber(endPointCoordinates[1]),
        }
    });
}

const init = (data) => {
    const lines = parseData(data).filter(isHorizontalOrVertical);
    const linesPoints = lines.map(generateLinePoints);
    const coveredPoints = getCoveredPoints(linesPoints);
    const dangerousPoints = countDangerousPoints(coveredPoints);

    console.log(dangerousPoints);
}

init(exampleData);