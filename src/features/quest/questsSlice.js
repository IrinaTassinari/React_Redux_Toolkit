// Slice — логика + состояние + actions в одном месте
// Slice =
// - кусок состояния (initialState)
// - reducers (как менять state)
// - actions (генерируются автоматически)
// questsSlice - это основная логика quests в рамках работы с Redux Toolkit
/**
 * Этот описывает:
 * - как выглядит состояние (state),
 * - как состояние можно изменять (reducers),
 * - какие actions доступны.
 */
// Импортируем createSlice - главный инструмент Redux Toolkit
// Импортируем nanoid - утилита для генерации уникальных id
import { createSlice, nanoid } from "@reduxjs/toolkit";
// initialState - начальное состояние slice
/**
 * initialState - это:
 * - стартовое состояние ветки глобального состояния приложения Redux
 * - увидим при первом запуске приложения
 */
const initialState = {
    /**
     * list - это список всех квестов
     * 
     * Каждый квест будет выглядеть так:
     * {
     *      id: '12314vdfdf',
     *      text: 'Слетать на Луну',
     *      completed: false,
     * }
     */
    list: [],
    /**
     * filter - текущий фильтр отображения квестов
     * 
     * Возможные значения:
     * - all - показать всё
     * - active - показать невыполненные
     * - completed - показать выполненные
     */
    filter: 'all'
}

/**
 * createSlice делает сразу 3 вещи:
 * 1. Создает reducer
 * 2. Создает объект действия
 * 3. Связывает reducer и объект действия по имени
 * 
 * !Важно:
 * Мы более не применяем switch(action.type)
 */
const questsSlice = createSlice({
    /**
     * name - имя slice
     *
     * name используется для:
     * - генерации action.type (например, 'quests/addQuest')
     */
    name: 'quests',
    // initialState - начальное состояние 
    initialState,
    /**
     * reducers - объект с функциями, которые описывают, как менять состояние state 
     */
    reducers:{
        addQuest: {
            // reducer - описывает, как меняется состояние в зависимости от действия
            /**
             * state - текущий state slice
             * action.payload - данные, передаваемые при dispatch
             */
            reducer(state, action){
                /**
                 * !Важно:
                 * Мы сейчас пишем мутабельный код (push)
                 * С помощью Immer Redux Toolkit сделает копию иммутабельного кода автоматически (под капотом)
                 */
                state.list.push(action.payload);
            },
            /**
             * prepare - функция, которая подготавливает payload до reducer
             * 
             * Позволяет:
             * - генерировать id
             * - добавлять дополнительные поля
             */
            prepare(text){
                // text - это то, что мы передаем при dispatch:
                // dispatch(addQuest('Новый квест'))
                return{
                    payload: {
                        id: nanoid(),
                        text: text,
                        completed: false,
                    }
                }
            }
        },
        //toggleQuest - переключение completed
        toggleQuest(state, action) {
            // action.payload - это id квеста, статус которого мы хотим переключить
            const quest = state.list.find(q => q.id === action.payload)
            // Если квест найден - меняем его статус
            if(quest){
                quest.completed = !quest.completed
            }
        },
        // removeQuest - удалять quest из state
        removeQuest(state, action){
            // action.payload - это id квеста, который мы хотим удалить из slice state
            state.list = state.list.filter(q => q.id !== action.payload)
        },
        // меняем режим отображения квестов 
        setFilter(state, action){
            // action.payload - ожидается: 'all' | 'active' | 'completed'
            state.filter = action.payload;
        }
    }
})

/**
 * Redux Toolkit автоматически создал action creators:
 * addQuest,
 * toggleQuest,
 * removeQuest,
 * setFilter
 */
export const { addQuest, toggleQuest, removeQuest, setFilter } = questsSlice.actions;

/**
 * questsSlice.actions = {
 *      addQuest: (payload) => ({
 *          type: 'quests/addQuest',
 *          payload,     
 *     })
 * }
 */
// Экспорт reducer
/**
 * Этот reducer подключается в store.js
 * 
 * reducer:{
         quests: questsReducer,
     }
 */
export default questsSlice.reducer;


// Когда вызывается:
// dispatch(addQuest("New quest"))
// Redux сам создаёт action:
// {
//   type: 'quests/addQuest',
//   payload: {
//     id: 'abc123',
//     text: 'New quest',
//     completed: false
//   }
// }

