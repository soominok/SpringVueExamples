<template>
  <div id="board">
    <h2>Board List</h2>
    <!-- 내용 추가하는 것이 필요함.
         내용 등록이 필요하기 때문에 BoardRegisterPage로 써줌-->
    <router-link :to="{ name: 'BoardRegisterPage' }">
      Create New Board
    </router-link>
    <!-- board list가 보여야 하기 때문에 -->
    <!-- 질문~!!! :boards="boards"??? Spring 연결?? DB 연동하기 위해서?? -->
    <board-list :boards="boards"/>
  </div>
</template>

<script>
export default {
  name: 'VuetifyBoardListForm',
  data () {
    return {
      pageNum: 0
    }
  },
  // 들어오는 list에 대한 정보
  props: {
    listArray: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: true,
      default: 10
    }
  },
  methods: {
    nextPage () {
      this.pageNum += 1
    },
    prevPage () {
      this.pageNum -= 1
    }
  },
  computed: {
    pageCount () {
      const listLen = this.listArray.length
      const listSize = this.pageSize
      let page = Math.floor(listLen / listSize)
      if (listLen % listSize > 0) {
        page += 1
      }
      return page
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize
      const end = start + this.pageSize
      return this.listArray.slice(start, end)
    }
  }
}
</script>
