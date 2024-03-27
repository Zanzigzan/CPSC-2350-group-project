
export function isValidArrayFormat(content) {
    try {
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) && parsed.every(item => typeof item === 'string');
    } catch (e) {
        return false;
    }
}