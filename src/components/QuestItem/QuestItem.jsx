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
            <span
                style={{
                    textDecoration: quest.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                }}
                onClick={() => dispatch(toggleQuest(quest.id))}
            >
                {quest.text}
            </span>
            <button onClick={() => dispatch(removeQuest(quest.id))}>Delete</button>
        </div>
    )
}

export default QuestItem;