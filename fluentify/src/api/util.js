
export function isValidArrayFormat(content) {
    try {
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) && parsed.every(item => typeof item === 'string');
    } catch (e) {
        return false;
    }
}

// The function selects random element from the array and returns it
export function selectRandom(array) {
    return array[(Math.floor(Math.random() * array.length))]
}