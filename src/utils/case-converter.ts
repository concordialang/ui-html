import { camel, pascal, snake, kebab } from 'case';

enum CaseType {
	CAMEL = 'camel',
	PASCAL = 'pascal',
	SNAKE = 'snake',
	KEBAB = 'kebab'
}

export function convertCase(text: string, type: string): string {
    switch (type.toString().trim().toLowerCase()) {
        case CaseType.CAMEL: return camel(text);
        case CaseType.PASCAL: return pascal(text);
        case CaseType.SNAKE: return snake(text);
        case CaseType.KEBAB: return kebab(text);
        default: return text; // do nothing
    }
}
