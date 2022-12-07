export function quicksort(list: number[]): number[] {
    if (list.length <= 1) return list;
    const index = Math.floor(list.length / 2);
    const pivot = list[index]
    const less = list.filter((x,i) => i != index && x <= pivot);
    const more = list.filter((x,i) => i != index && x > pivot);
    return [
        ...quicksort(less),
        pivot,
        ...quicksort(more)
    ]
}