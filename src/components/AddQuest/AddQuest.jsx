/**
 * Этот компонент:
 * - использует локальное состояние (useState)
 * - отправляет action в Redux (useDispatch)
 * - не читает данные из Redux Store
 * 
 * !Важно:
 * Redux - это для общих данных
 * useState - для временного состояния UI-компонента
 */

import { useState } from "react";
// useDispatch - хук для отправки действий в Redux
import { useDispatch } from "react-redux";
// action creator для добавления квеста
import { addQuest } from "../../features/quest/questsSlice";



function AddQuest(){
    const [text, setText] = useState('')

    // useDispatch - доступ к ф-и dispatch 
    // Ф-я dispatch - это ф, через которую отправляются actions в redux store
    const dispatch = useDispatch();
    
    // Обработчик добавление квеста
    const handleAdd = () => {
        /**
         * trim - убирает пробелы слева и справа или если нет символов, кроме пробелов, то убирает все пробелы в строке
         */
        if(text.trim()){
            /**
             * dispatch(addQuest(text)):
             * addQuest(text) - создает action (обьект действия)
             * dispatch(...) - отпраляет обьект действия в store
             * reducer - добавляет квест в state
             * redux обновляет UI компоненты
             */
            dispatch(addQuest(text))

            //Очищает поле input
            setText('')
        }
    }

    return (
        <div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder='New Quest...'/>
            <button onClick={handleAdd}>Add new Quest</button>
        </div>
    )

}

export default AddQuest;


// Полный жизненный цикл одного клика
// Нажимаешь Add new Quest
// 1.dispatch(addQuest(text))
// 2.Redux → questsSlice.reducer
// 3.state.list.push(...)
// 4.Store обновился
// 5.useSelector сработал
// 6.UI перерисовался