/**
 * Этот компонент:
 * - отображать один квест
 * - получать данные через props
 * - не читает Redux state напрямую
 * - отправляет actions (объект действия) (dispatch)
 */
// useDispatch - хук для отправки действий в Redux
import { useDispatch } from "react-redux";
// action creator для переключения статуса выполнения квеста, удаления квеста
import { toggleQuest, removeQuest } from "../../features/quest/questsSlice";

function QuestItem({quest}){

    const dispatch = useDispatch()

    return(
        <div>
            {/*
            При клике на  span:
              - отправляется объект действия (action) toggleQuest,
              - redux изменяет св-во completed объекта квеста в массиве list,
              - UI автоматически обновляется
              - 
            */}
            <span
                style={{
                    // если квест выполнен, то текст зачеркивается
                    textDecoration: quest.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                }}
                onClick={() => dispatch(toggleQuest(quest.id))}
            >
                {quest.text}
            </span>

             {/*
            При клике на  button:
              - отправляется объект действия (action) removeleQuest,
              - redux удаляет квест из сост-я навсегда,
              - UI автоматически обновляется
              - 
            */}
            <button onClick={() => dispatch(removeQuest(quest.id))}>Delete</button>
        </div>
    )
}

export default QuestItem;