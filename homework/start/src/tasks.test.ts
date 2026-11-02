import { describe, expect, it } from "vitest"
import { createTask, visibleTasks, seedTasks, renameTask, openCount, isBlankTitle } from "./tasks"

// Два теста, с которыми поставляется стартер. Они проходят и не покрывают
// поведение, описанное в ISSUE-7.md.
describe("базовая доска", () => {
    it("создаёт задачу и обрезает название", () => {
        const task = createTask(9, "  Купить хлеб  ")
        expect(task?.title).toBe("Купить хлеб")
    })
    
    it("does not create a task with white type space name", () => {
        expect(createTask(10, "   \t\u00A0 ")).toBeUndefined()
    })

    it("фильтрует готовые задачи", () => {
        expect(visibleTasks(seedTasks, "done").map((task) => task.id)).toEqual([2])
    })
})

describe("R1: renaming task (renameTask)", () => {
    it("cut white space type characters when renaming a task", () => {
        const updated = renameTask(seedTasks, 1, "  New name \t\u00A0 ")
        expect(updated.find((t) => t.id === 1)?.title).toBe("New name")
    })

    it("rejects creating a task with white space type name", () => {
        for (const blank of ["", "   ", "\t\t", "\u00A0", " \t \u00A0 "]) {
            const updated = renameTask(seedTasks, 1, blank)
            expect(updated.find((t) => t.id === 1)?.title).toBe("Сдать лабораторную")
        }
    })
})

describe("R2: filters(hides) tasks with white space type name (visibleTasks)", () => {
    it("does not show white space type string in all и open", () => {
        expect(visibleTasks(seedTasks, "all").map((t) => t.id)).toEqual([1, 2])
        expect(visibleTasks(seedTasks, "open").map((t) => t.id)).toEqual([1])
    })
})

describe("R3: uncompleted tasks counter (openCount)", () => {
    it("does not count tasks with white space type names", () => {
        expect(openCount(seedTasks)).toBe(1)
    })
})


describe("changing requirements: U+200B (zero-width space)", () => {
    it("marks a string of U+200B as white space type string and trims a string with  U+200B ", () => {
        expect(isBlankTitle("\u200B")).toBe(true)
        expect(isBlankTitle(" \u200B \t ")).toBe(true)
        expect(createTask(11, "\u200B\u200B")).toBeUndefined()
        expect(createTask(12, "\u200BTask\u200B")?.title).toBe("Task")
        const updated = renameTask(seedTasks, 1, "\u200B")
        expect(updated.find((t) => t.id === 1)?.title).toBe("Сдать лабораторную")
    })
})
