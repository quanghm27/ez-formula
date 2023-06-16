
export function ADD(...args: number[]) {
    return args.reduce((acc, val) => acc + val, 0)
}

export function MULTIPLY(...args: number[]) {
    return args.reduce((acc, val) => acc * val, 1)
}

export function SUBTRACT(...args: number[]) {
    return args.reduce((acc, val) => acc - val)
}

export function DIVISION(...args: number[]) {
    return args.reduce((acc, val) => acc / val)
}
