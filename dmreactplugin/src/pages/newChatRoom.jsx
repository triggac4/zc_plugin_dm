import React, { useEffect, useState, useRef } from 'react'

import DmProfileHeader from '../components/dmProfileHeader'
import BookmarkHeader from '../components/common/addBookmarkKebab/dmBookMark'
import DmChatContainerBox from '../components/ChatContainer/dmChatContainerBox'
import InputBoxField from '../components/dmBoxInputField'
import PinnedMessage from '../components/common/pinnedMessage/dmPinnedMessages'
import instance from '../utils/apiServices'
import { useDispatch } from 'react-redux'
import {
  handleGetRoomInfo,
  handleGetRoomMessages,
} from '../Redux/Actions/dmActions'
import { useSelector } from 'react-redux'
import './newChatRoom.css'
import ProfileSidebar from '../components/profileSidebar/profileSidebar'
import ABookmark from '../components/common/addBookmarkKebab/ABookmark'

// Chat Home Page
const ChatHome = ({ org_id, loggedInUser_id, room_id }) => {
  const [grid, setGrid] = useState('')
  const [none, setNone] = useState('none')
  const [bookmarks, setBookmarks] = useState([])

  const roomsReducer = useSelector(({ roomsReducer }) => roomsReducer)
  const membersReducer = useSelector(({ membersReducer }) => membersReducer)
  const { room_messages } = useSelector(({ roomsReducer }) => roomsReducer)

  const user2_id =
    roomsReducer?.room_info?.room_user_ids !== undefined &&
    roomsReducer?.room_info?.room_user_ids[1]
  const messages = room_messages?.results

  const dispatch = useDispatch()
  const apiInstance = instance

  async function getBookmarks() {
    try {
      const response = await apiInstance.bookmark(org_id, room_id, 'get', {})

      if (response.status <= 200 && response.status <= 299) {
        setBookmarks(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    dispatch(handleGetRoomMessages(org_id, room_id))
    dispatch(handleGetRoomInfo(org_id, room_id))
    getBookmarks()
  }, [dispatch, org_id, loggedInUser_id, room_id, messages])

  const actualUser = membersReducer?.find((member) => member._id === user2_id)

  const bookmark = bookmarks.map((item, index) => {
    return <ABookmark {...item} key={index} />
  })
  return (
    <div className='dm-plugin-full-page' style={{ display: grid }}>
      <div className='dm-newchat-room'>
        <div className='dm-chatroom-header'>
          <DmProfileHeader
            user2_id={user2_id}
            actualUser={actualUser}
            none={none}
            setNone={setNone}
            grid={grid}
            setGrid={setGrid}
          />
          <div className='dm-bookmark-head'>
            <div className='add-bookmark gap-2 d-flex flex-direction-column flex-flow align-items-center px-3 py-1'>
              <PinnedMessage room_id={room_id} actualUser={actualUser} />
              {bookmark}
              <BookmarkHeader
                ref={(ref) => (this.fooRef = ref)}
                data-tip='add bookmark'
              />
            </div>
          </div>
        </div>
        <div className='dm-message-in-out-box w-100 position-relative row align-items-end'>
          <DmChatContainerBox
            user2_id={user2_id}
            room_id={room_id}
            actualUser={actualUser}
          />
        </div>
        <div className='dm-footer-input-field w-100 position-relative'>
          <InputBoxField
            org_id={org_id}
            room_id={room_id}
            loggedInUser_id={loggedInUser_id}
          />
        </div>
      </div>
      <div className='dm-plugin-right-sidebar' style={{ display: none }}>
        <ProfileSidebar
          none={none}
          setNone={setNone}
          grid={grid}
          setGrid={setGrid}
          actualUser={actualUser}
        />
      </div>
    </div>
  )
}
export default ChatHome
