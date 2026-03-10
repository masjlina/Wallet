export function buildPatch(data) {
    return Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );
}