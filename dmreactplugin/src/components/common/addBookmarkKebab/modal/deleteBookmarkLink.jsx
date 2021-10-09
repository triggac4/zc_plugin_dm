import React, { useState, useEffect } from 'react'

import ModalButton from '../../pinnedMessage/button'
import Close from '../../../../assets/img/svg/close.svg'
import AddBookmarkModal from './addBookmarkModal'
import instance from '../../../../utils/apiServices'

const DeleteBookmark = ({ opened, onClose, name }) => {
  //initialLink is the initial bookmark if any
  //opened is a boolean for if the modal should open
  //onClose is to reset the parent components opened value to false

  const [closed, setClose] = useState(opened)
  const [isError, setError] = useState(false)
  const [isDisabled, setDisabled] = useState(false)
  const apiInstance = instance

  useEffect(() => {
    if (opened) {
      setClose(opened)
    }
  }, [opened])
  let [org_id, room_id, loggedInUser_id] = location.pathname
    .split('/')
    .filter((string) => string.length > 11)

  let onClosed = () => {
    setClose(false)
    onClose()
  }

  const close = () => {
    setClose(false)
    onClose()
  }

  const deleteBookmark = async () => {
    try {
      setDisabled(true)
      const response = await apiInstance.bookmark(
        org_id,
        room_id,
        'delete',
        name
      )
      if (response.status <= 200 && response.status <= 299) {
        close()
      } else {
        setError(true)
      }
      setDisabled(false)
    } catch (e) {
      setDisabled(false)
      console.log(e)
    }
  }

  return (
    <AddBookmarkModal onClose={onClosed} close={closed}>
      <div
        className='d-flex flex-column p-4 w-50 gap-3 bg-white rounded-1'
        role='presentation'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div
          className='d-flex justify-content-between text-capitalize align-items-center'
          style={{
            fontSize: '30px',
            fontWeight: '700',
            height: '20px',
          }}
        >
          <div className='writeUp'>Delete Bookmark</div>
          <img
            src={Close}
            alt='close'
            className='d-block h-75'
            role='presentation'
            onClick={close}
          />
        </div>
        <div class='text-start'>
          Are You sure you want to delete this bookmark
        </div>
        <div className='d-flex justify-content-end'>
          <ModalButton onClick={close} close>
            Cancel
          </ModalButton>
          <ModalButton
            onClick={isDisabled ? {} : deleteBookmark}
            close={isDisabled}
          >
            Delete
          </ModalButton>
        </div>
        <div
          className={`${isError ? 'd-block' : 'd-none'} text-danger text-start`}
        >
          something went wrong
        </div>
      </div>
    </AddBookmarkModal>
  )
}

export default DeleteBookmark
