/**
 * - читает данные из Redux Store
 * - не изменяет state напрямую
 * - решает, что и как показывать
 * - передает данные в UI-компоненты
 * 
 * !Важно:
 * Здесь происходит связка Redux state c React UI
 */

// useSelector - хук для ЧТЕНИЯ данных из Redux Store
import { useSelector } from "react-redux";

// Импорт UI-компонентов
import QuestItem from "../../components/QuestItem/QuestItem";
import AddQuest from "../../components/AddQuest/AddQuest";
import Filter from "../../components/Filter/Filter";

function Quests(){
    /**
     * useSelector:
     * - принимает функцию-селектор
     * - получает ВЕСЬ state приложения
     * - возвращает нужную часть state
     * - автоматически подписывает компонент
     */

    const {list, filter} = useSelector(state => {
         /**
         * state - это ВЕСЬ state приложения
         * 
         * state = {
         *  quests: {
         *      list: [...],
         *      filter: 'all' | 'active' | 'completed'
         *  }
         * }
         */
        // Возвращаем только нужный slice

        return state.quests
    })

    // фильтрация квестов
    /**
     * Не меняем redux state 
     * Создаем производные данные для отображения
     */

    const filtredList = list.filter(q => {
        // Если выбран фильтр "active" - показываем невыполненные квесты
        if(filter === 'active') return !q.completed;

        // Если выбран фильтр "completed" - показываем выполненные квесты
        if(filter === 'completed') return q.completed;

        // Если выбран фильтр "all" (по-умолчанию) - показываем все квесты
        if(filter === 'all') return true;
        
    })

    return(
        <div>
            <h1>Redux Quest</h1>
             {/* Компонент для добавления нового квеста (использует useDispatch внутри) */}
            <AddQuest />
             {/* Компонент переключения фильтра (читает filter и dispatch`ит setFilter) */}
            <Filter />
            {
               filtredList.map(q => (
                    <QuestItem kye={q.id} quest={q}/>
               )) 
            }
        </div>
    )
}

export default Quests;