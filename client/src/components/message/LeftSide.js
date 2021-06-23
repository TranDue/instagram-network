import React, { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction'


const LeftSide = () => {
    const { auth, message, online } = useSelector(state => state)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    const history = useHistory()
    const { id } = useParams()

    const pageEnd = useRef()
    const [page, setPage] = useState(0)


    const handleSearch = async e => {
        e.preventDefault()
        if (!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }
            })
        }
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } })
        dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
        return history.push(`/message/${user._id}`)
    }

    const isActive = (user) => {
        if (id === user._id) return 'active';
        return ''
    }

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations({ auth }))
    }, [dispatch, auth, message.firstLoad])

    // Load More
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(p => p + 1)
            }
        }, {
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    }, [setPage])

    useEffect(() => {
        if (message.resultUsers >= (page - 1) * 9 && page > 1) {
            dispatch(getConversations({ auth, page }))
        }
    }, [message.resultUsers, page, auth, dispatch])


    // Check User Online - Offline
    useEffect(() => {
        if (message.firstLoad) {
            dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
        }
    }, [online, message.firstLoad, dispatch])

    return (
        <>
            <form className="message_header" onSubmit={handleSearch} >
                <input type="text" value={search}
                    placeholder="Send to:"
                    onChange={e => setSearch(e.target.value)} />

                <button type="submit" style={{ display: 'none' }}>Search</button>
                <svg aria-label="New Message" class="_8-yf5" fill="#262626" height="24" viewBox="0 0 50 44" width="24">
                    <path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path><path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path><path d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"></path>
                </svg>
            </form>

            <div className="message_chat_list">
                {
                    searchUsers.length !== 0
                        ? <>
                            {
                                searchUsers.map(user => (
                                    <div key={user._id} className={`message_user ${isActive(user)}`}
                                        onClick={() => handleAddUser(user)}>
                                        <UserCard user={user} />
                                    </div>
                                ))
                            }

                        </>
                        : <>
                            {
                                message.users.map(user => (
                                    <div key={user._id} className={`message_user ${isActive(user)}`}
                                        onClick={() => handleAddUser(user)}>
                                        <UserCard user={user} msg={true}>
                                            {
                                                user.online
                                                    ? <i className="fas fa-circle text-success" />
                                                    : auth.user.following.find(item =>
                                                        item._id === user._id
                                                    ) && <i className="fas fa-circle" />

                                            }

                                        </UserCard>
                                    </div>
                                ))
                            }
                        </>
                }

                <button ref={pageEnd} style={{ opacity: 0 }} >Load More</button>
            </div>
        </>
    )
}

export default LeftSide
