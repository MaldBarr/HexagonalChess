

export function initialSetUp() {
    const arr = [];
    let colorShouldInverse = false;

    for (let i = 1; i <= 64; i++) {
        const square = new Square(i, i % 2 === Number(colorShouldInverse) ? 'var(--primaryDark)' : 'var(--secondary)');
        arr.push(square);
        if (i % 8 === 0) colorShouldInverse = !colorShouldInverse;
    }
    return arr;
}