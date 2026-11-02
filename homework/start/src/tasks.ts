export type Filter = "all" | "open" | "done"

export interface Task {
    id: number
    title: string
    done: boolean
}

/**
 * Доска в том виде, в каком она приходит из хранилища. Строку 3 сохранила старая
 * форма ещё до issue #7: это название из одних пробелов, и оно всё ещё здесь.
 */
export const seedTasks: Task[] = [
    { id: 1, title: "Сдать лабораторную", done: false },
    { id: 2, title: "Купить продукты", done: true },
    { id: 3, title: "   ", done: false },
]

export function normalizeTitle(title: string): string {
    return title.replace(/^[\s\u00A0\u200B\u200C\u200D\uFEFF]+|[\s\u00A0\u200B\u200C\u200D\uFEFF]+$/g, "")
}

/** Доска считает название без непробельных символов отсутствующим названием. */
export function isBlankTitle(title: string): boolean {
    return normalizeTitle(title).length === 0
}

/**
 * Создание задачи. Форма создания проверяла название всегда — проблема в пути
 * переименования ниже: старая форма сохраняла название без проверки.
 */
export function createTask(id: number, title: string): Task | undefined {
    const trimmed = normalizeTitle(title)
    if (trimmed.length === 0) return undefined
    return { id, title: trimmed, done: false }
}

/** Переименование существующей задачи. Пустое название отклоняется — issue #7. */
export function renameTask(tasks: Task[], id: number, title: string): Task[] {
    const trimmed = normalizeTitle(title)
    if (trimmed.length === 0) return tasks
    return tasks.map((task) => (task.id === id ? { ...task, title: trimmed } : task))
}

export function visibleTasks(tasks: Task[], filter: Filter): Task[] {
    const titled = tasks.filter((task) => !isBlankTitle(task.title))
    if (filter === "open") return titled.filter((task) => !task.done)
    if (filter === "done") return titled.filter((task) => task.done)
    return titled
}

/**
 * Счётчик в шапке. Считает только открытые задачи с непустым названием:
 * унаследованная пустая строка не должна увеличивать число «Открытых».
 */
export function openCount(tasks: Task[]): number {
    return tasks.filter((task) => !task.done && !isBlankTitle(task.title)).length
}
