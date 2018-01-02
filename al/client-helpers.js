export const randomSeed = 20; // 20 just a temp number for visualization random effect
export const regularComputersQuantity = 95; // 95 computers in office, which marked as "table--90" on GL map
export const computersQuantity = 110; // 110 computers in office, based on GL Map

// Alternative to Server approach
export function createFakeJson() {
    let desksLength = regularComputersQuantity;
    let desks = [];

    for (var i = 1; i < desksLength; i++) {
        desks.push({
            id_1_parent_g: 'krk-table--' + i,
            ip: '172.26.129.' + i
        });
    }
    return desks;
}

export function createRandomNumbers() {
    let randomNumbers = [];
    for (var i = 0; i < randomSeed; i++) {
        randomNumbers[i] = Math.floor(Math.random() * computersQuantity);
    }
    return randomNumbers;
}
