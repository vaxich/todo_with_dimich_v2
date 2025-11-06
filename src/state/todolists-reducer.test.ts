import { FilterValueType, todolistType } from "../App"
import { AddTodoolistAC, changeTodoolistFilterAC, changeTodoolistTitleAC, RemoveTodoolistAC, todolistReducer } from "./todolists-reduser"

test('correct todolist should be removed', () => {
    let todolistId1 = '45434'
    let todolistId2 = '43534'

    const startState: todolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, RemoveTodoolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = '45645645'
    let todolistId2 = '6745463'

    let newTodolistTitle = "New Todolist"

    const startState: todolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, AddTodoolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('All')
})

test("correct todolist should change its name", () => {
    let todolistId1 = '4564645'
    let todolistId2 = '45645645'

    let newTodolistTitle = "New Todolist"

    const startState: todolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    

    const endState = todolistReducer(startState, changeTodoolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be change", () => {
    let todolistId1 = '34343'
    let todolistId2 = '465457'

    let newFilter: FilterValueType = "Completed"

    const startState: todolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    

    const endState = todolistReducer(startState, changeTodoolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})