import React, { useState, useEffect } from 'react'

import ModalButton from '../../pinnedMessage/button'
import Close from '../../../../assets/img/svg/close.svg'
import TextField from '../modalTextFields/textField'
import AddBookmarkModal from './addBookmarkModal'
import NameTextField from '../modalTextFields/nameLinkTextField'
import instance from '../../../../utils/apiServices'

const AddBookmarkLink = ({ opened, onClose, initialLink }) => {
  //initialLink is the initial bookmark if any
  //opened is a boolean for if the modal should open
  //onClose is to reset the parent components opened value to false

  const [closed, setClose] = useState(opened)
  const [isLink, setIsLink] = useState(false)
  const [link, setLink] = useState(initialLink)
  const [name, setName] = useState('')
  const [isDisabled, setDisabled] = useState(false)
  const [isError, setError] = useState(false)
  const apiInstance = instance

  let [org_id, room_id, loggedInUser_id] = location.pathname
    .split('/')
    .filter((string) => string.length > 11)

  useEffect(() => {
    if (opened) {
      setClose(opened)
    }
  }, [opened])

  useEffect(() => {
    setLink(initialLink)
    onLinkChange(initialLink)
  }, [initialLink])

  let onClosed = () => {
    setClose(false)
    onClose()
  }

  const onNameChange = (value) => {
    setName(value)
  }

  const close = () => {
    setClose(false)
    onClose()
  }

  const addBookmark = async () => {
    const data = { link, name }
    try {
      setDisabled(true)
      const response = await apiInstance.bookmark(org_id, room_id, 'post', data)
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

  const Button = (
    <>
      <NameTextField label='Name' placeholder='Name' onChange={onNameChange} />
      <div className='d-flex justify-content-end'>
        <ModalButton onClick={close} close>
          Cancel
        </ModalButton>
        <ModalButton onClick={isDisabled ? {} : addBookmark} close={isDisabled}>
          Add
        </ModalButton>
      </div>
      <p className='text-danger'>{isError ? 'something went wrong' : ''}</p>
    </>
  )

  const onLinkChange = (value) => {
    //value is the text value as link textfield changes
    const regex1 =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    const regex2 =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    const isUrl = regex2.test(value)
    setIsLink(isUrl)
    setLink(value)
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
          <div className='writeUp'>Add a Bookmark</div>
          <img
            src={Close}
            alt='close'
            className='d-block h-75'
            role='presentation'
            onClick={close}
          />
        </div>
        <div>
          <TextField
            placeholder='Link'
            value={link}
            label='Link'
            onChange={onLinkChange}
          />
        </div>
        {isLink ? Button : null}
      </div>
    </AddBookmarkModal>
  )
}

export default AddBookmarkLink
