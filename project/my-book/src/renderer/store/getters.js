const getters = {
    token: state => state.user.user_content.token,
    usercontent: state => state.user.user_content,
    userId: state => state.user.user_content.userId,
    userinfo: state => state.user.user_info,
    books_group_all: state => state.book.books_group_all,
    books_in_group: state => state.book.books_in_group,
    id_token: state => state.user.user_content.userId + '_' + state.user.user_content.token,
    search_douban: state => state.book.search_douban,
    search_users: state => state.user.search_users,
    search_comment: state => state.comment.search_comment,
    all_comment: state => state.comment.all_comment,
    self_all_books: state => state.book.self_all_books,
    want_read_count: state => state.user.want_read_count,
    phone_code: state => state.user.phone_code,
}

export default getters