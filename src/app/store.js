/**
 * Redux Store (глобальное хранилище приложений)
 * Store-это:
 *  - единый об-кт, в котором хранится всё глобальное сост-е приложения;
 * - источник для компонента;
 * - место, куда отправл-ся actions.
 */

//импортируем ф-ю configurestore from Redux Toolkit
import {configureStore} from '@reduxjs/toolkit'

/**
 * импортируем reducer  конкретной feauture 
 * questReducer - это НЕ весь store, это только часть одной логики (quest).
 * questReducer  создан через createSlice в questSlice.js
 */
import questsReducer from '../features/quest/questsSlice'


/**
 * чем configureStore лучше create Store:
 * -автоматичeски объединяет reducers;
 * -автоматичeски подключает DevTools;
 * -автоматичeски добавляет middleware;
 * -уменьшает кол-во кода.
 *
 * Мы создаем store и экспортируем его, чтобы использовать в <Provider> (main.jsx)
 */
export const store = configureStore({
    /**
     * reducer - это объект, где:
     * ключ - имя части сост-я,
     * значение - reducer, кот-й управляет этой частью
     */

    reducer:{
        /**
         * quests - это имя ветки в глобальном state.
         * В итоге стр-ра state будет такой:
         * state ={
         *  quests: {
         *      list: [...],
         *      filter: 'all
         *  }
         * }
         * 
         * !!! имя ключа испол-ся в useSelector
         * useSelector(state => state.quests)
         * 
         */
        quests: questsReducer,
    }
})