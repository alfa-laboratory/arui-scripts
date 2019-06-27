export enum YesNoEnum {
    Yes = 'Yes',
    No = 'No'
}

export function isSmaller(a: number, b: number) {
    a = a * 10_000;
    b = b * 10_000;
    return a > b ? YesNoEnum.Yes : YesNoEnum.No
}

export const constObject = {
    name: 'someString'
} as const;
