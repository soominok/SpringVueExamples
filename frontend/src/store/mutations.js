import {
  ADD_TODO,
  REMOVE_TODO,
  CLEAR_ALL,
  successGenRandNum,
  failGenRandNum,
  RESTORE,
  EDIT_TODO,
  SET_EDITING_ID,
  RESET_EDITING_ID,
  TOGGLE_TODO_STATUS,
  SET_FILTER,
  FETCH_BOARD_LIST,
  FETCH_BOARD,
  SET_ACCESS_TOKEN,
  SET_MY_INFO,
  DESTROY_ACCESS_TOKEN,
  DESTROY_MY_INFO,
  CRAWLSTART,
  FINDONE
} from './mutation-types'

// vuex 객체여서 정보 공유를 안해서 cookies를 넣어줘야 함.
import axios from 'axios'
import cookies from 'vue-cookies'

// 위에서 땡겨오는 애들은 []로 해줘야 함.
export default {
  [CRAWLSTART] (state, payload) {
    state.lists = payload
  },
  [FINDONE] (state, payload) {
    state.news = payload
  },
  [ADD_TODO] (state, payload) {
    const { content } = payload
    state.todoItems.push({ id: state.nextTodoId, content, done: false })
    state.nextTodoId++
  },
  [REMOVE_TODO] (state, id) {
    const targetIndex = state.todoItems.findIndex(v => v.id === id)
    state.todoItems.splice(targetIndex, 1)
    // splice(start, count, 대체내용들)
    // 시작위치부터 count 개수만큼 추출해낼건데
    // 뒤에 오는 세번째 인자인 대체내용들로 해당 위치를 채워넣을 수 있다.
    // ex) splice(1, 3, 'a', 'b', 'c') -> 1번재는 abc로 나오게 된다.
  },
  [CLEAR_ALL] (state) {
    console.log('CLEAR_ALL')
    state.todoItems = []
  },
  [successGenRandNum] (state, payload) {
    console.log('payload = ' + payload)
    state.random = payload
  },
  [failGenRandNum] () {
    console.log('Error')
  },
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },
  // 다음값이 뭐가나오는지 볼 수 있게 추가해줘야 함.
  [RESTORE] (state, { todoItems, nextTodoId }) {
    state.todoItems = todoItems
    state.nextTodoId = nextTodoId
  },
  [EDIT_TODO] (state, payload) {
    const { id, content } = payload
    const targetIdx = state.todoItems.findIndex(v => v.id === id)
    const targetTodoItem = state.todoItems[targetIdx]
    // JavaScript에서 ...은 배열 등에서 값을 가져올 때 아직 처리하지 않은게 있다면 남은 모든 것을 가져온다.
    // id로 처리하니까 밑에 문장은 필요 없음.
    // const isEditing = false
    state.todoItems.splice(targetIdx, 1, { ...targetTodoItem, content })
  },
  [SET_EDITING_ID] (state, id) {
    state.editingId = id
  },
  [RESET_EDITING_ID] (state) {
    state.editingId = 0
  },
  [TOGGLE_TODO_STATUS] (state, id) {
    const filtered = state.todoItems.filter(todoItem => {
      return todoItem.id === id
    })

    filtered.forEach(todoItem => {
      todoItem.done = !todoItem.done
    })
  },
  [SET_FILTER] (state, filter) {
    state.filter = filter
  },
  [FETCH_BOARD_LIST] (state, boards) {
    // state.boards에 넘어온 내용을 확인하면 되는 것.
    state.boards = boards
  },
  [FETCH_BOARD] (state, board) {
    state.board = board
  },
  [SET_ACCESS_TOKEN] (state, accessToken) {
  // 액세스 토큰이 있다면,
    if (accessToken) {
      state.accessToken = accessToken
      // 여기서 header를 전송함.
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      console.log('axios Auth: ' + axios.defaults.headers.common.Authorization)

      cookies.set('accessToken', accessToken, '1h')
    }
  },
  [SET_MY_INFO] (state, myinfo) {
    if (myinfo) {
      state.myinfo = myinfo
    }
  },
  [DESTROY_ACCESS_TOKEN] (state) {
    state.accessToken = ''
    delete axios.defaults.headers.common.Authorization
    cookies.remove('accessToken')
  },
  [DESTROY_MY_INFO] (state) {
    state.myinfo = null
  }
}
