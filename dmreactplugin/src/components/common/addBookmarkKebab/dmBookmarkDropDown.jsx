import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import link from '../../../assets/img/svg/link.svg'
import AddBookmarkLink from './modal/addBookmarkLink'
import instance from '../../../utils/apiServices'

const StyledDiv = styled.div`
  padding: 10px;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-template-rows: repeat(2, min-content);
  align-items: flex-center;
  justify-items: flex-start;
  line-height: 1;
  column-gap: 5px;

  &:hover {
    background-color: #e1fdf4;
  }
`
const StyledImg = styled.img`
  height: 100%;
  width: auto;
  display: block;
  padding: 5px;
  background-color: white;
  box-sizing: border-box;
`

const StyledImgCover = styled.div`
  height: 100%;
  grid-row: 1 / -1;
  padding: 5px;
`

const AddBookmarkDropDown = ({ onOpenModal, onModalClose }) => {
  const [open, setOpen] = useState(false)
  const [linkComp, setLinks] = useState([])
  const [loading, setLoading] = useState('loading...')
  const [url, setUrl] = useState('')

  let openModal = (value) => {
    setUrl(value)
    setOpen(true)
    onOpenModal(true)
  }
  let closeModal = () => {
    setOpen(false)
    onOpenModal(false)
    onModalClose()
  }
  const apiInstance = instance
  let [org_id, room_id, loggedInUser_id] = location.pathname
    .split('/')
    .filter((string) => string.length > 11)

  useEffect(() => {
    async function getLinks() {
      try {
        const response = await apiInstance.allLinks(org_id, room_id)

        if (response.status == 200) {
          let links = response.data.links
          setLinks(links)
          setLoading('No recent links')
        }
      } catch (e) {
        console.log(e)
      }
    }
    getLinks()
  }, [org_id, room_id])

  const timeConvert = (time) => {
    const timeStamp = new Date(time).toDateString()
    const today = new Date().toDateString()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate - 1)
    let isToday = false
    let isYesterday = false
    if (timeStamp === today) {
      isToday = true
    } else if (timeStamp == yesterday) {
      isYesterday = true
    }
    if (isToday) {
      return 'today ' + timeStamp
    } else if (isYesterday) {
      return 'yesterday ' + timeStamp
    }
    return timeStamp
  }
  const linkComponents = linkComp.map((urls, index) => {
    console.log(urls.timestamp)
    console.log(urls)
    const date = timeConvert(urls.timestamp)
    return (
      <StyledDiv key={index} onClick={() => openModal(urls.link)}>
        <StyledImgCover>
          <StyledImg src={link} alt='link' />
        </StyledImgCover>
        <h6 className='mb-0 pb-0'>{urls.link}</h6>
        <div className='mb-0 pb-0'>{date}</div>
      </StyledDiv>
    )
  })

  return (
    <>
      <div>
        <StyledDiv onClick={() => openModal('')}>
          <StyledImgCover>
            <StyledImg src={link} alt='link' />
          </StyledImgCover>
          <h6 className='mb-0 pb-0'>Add a bookmarks</h6>
          <div className='mb-0 pb-0'>
            Easily find your teams important links
          </div>
        </StyledDiv>
        <AddBookmarkLink opened={open} onClose={closeModal} initialLink={url} />
      </div>
      <div className='border-bottom border-secondary'></div>
      {linkComp.length < 1 ? (
        <p className='pl-3 text-start'>{loading}</p>
      ) : (
        linkComponents
      )}
    </>
  )
}

export default AddBookmarkDropDown
