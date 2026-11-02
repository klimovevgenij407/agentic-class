#SPEC

## Requirement

As a user of taskboard i want you to remove possibility of renaming any task to any white space type string(white space, tabs, e.t.c) and show warning in case of that string. All existing tasks of that type must be invisible and not be counted.

## Aceptance test

- R1: When function renameTask is called with white space type string the function rejects that name and does not changes old name of that task. The app shows this warning "Название не может быть пустым" in UI.
- R2: Function visibleTasks does not return white space type string, including alreaydy saved tasks.
- R3: Function openCount conuts only uncompleted task with name of non-white space type string.

## Non-goals

- Do not change design or style.
- Do no remove any existing task with white space type name(filter when counting or displaying).
- Do not add new libraries and do not change build configs.

## Files in scope

- `src/tasks.ts`
- `src/App.tsx`

## Definition of done

- `nmp test` passes all tests
- `nmp run build` does not return any errors
- `git diff` show changes only in `src/tasks.ts` and `src/App.tsx`
