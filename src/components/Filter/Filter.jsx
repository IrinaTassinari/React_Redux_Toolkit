/**
 * этот комп-т:
 * - читает данные из Redux (useSelector)
 * - изменяет сост-е в Redux (useDispatch)
 * - не хранит локальн сот-е
 * - будет управлять отображением списка квестов
 */
import { useDispatch, useSelector } from "react-redux"

//импорт action creator для изменения сост-я filter
import {setFilter} from '../../features/quest/questsSlice'

function Filter(){
    //dispatch  -это ф-я, через кот-ю мы отправляем action в Redux Store
    const dispatch = useDispatch()

    //получаем текуший фильтр из Redux Store

    /**
     * useSelector:
     * - получает весь State приложения
     * - с помощью callback получает нужную часть глобального сост-я
     * - подписывает коомпонент на изменения
     * 
     * state.quests.filter - строка:
     * 'all' | 'active' | 'completed' -это три режима фильтрации
      */
    const filter = useSelector(state => state.quests.filter)

    return(
        <div>
            {['all', 'active', 'completed'].map(filterItem => (
                <button 
                    key={filterItem}
                    onClick={()=>dispatch(setFilter(filterItem))}
                    style={{
                        fontWeight: filter === filterItem
                                            ? 'bold'
                                            : 'normal'
                    }}
                    >
                        {filter}
                    </button>
            ))}
        </div>
    )
}
export default Filter