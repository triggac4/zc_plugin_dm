import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import linkImg from '../../../assets/img/svg/link.svg'
import './dmBookmarkStyle.css'
import DeleteBookmark from './modal/deleteBookmarkLink'

const StyledImg = styled.img`
  height: 70%;
  width: auto;
  display: block;
  box-sizing: border-box;
  padding: 3px;
`
const StyledImgCover = styled.div`
  height: 90%;
  width: auto;
  margin-right: 5px;
`
const StyledAnchor = styled.a`
  color: black;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    color: currentcolor;
  }
`
const StyledDropDown = styled.div`
  position: absolute;
  top: 100%;
  left: 20%;
  max-height: 800px;
  width: 200px;
  overflow-y: auto;
`

const DropDownButtons = ({ name, onClick, bottom }) => {
  const Button = styled.button`
    border-bottom: ${bottom ? 'none' : '1px solid black'};
    width: 100%;
    padding: 10px;
    color: black;
    background-color: white;
    text-align: start;

    &:hover {
      background-color: var(--bg-color-footer);
    }
  `

  return <Button onClick={onClick}>{name}</Button>
}

const ABookmark = ({ link, name, createdAt }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModal, setModal] = useState(false)
  const HoverOutStop = useRef(false)
  const onHoverMouseOut = () => {
    if (HoverOutStop.current) {
    } else {
      setIsOpen(false)
    }
  }
  const onRightClick = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  return (
    <>
      <button
        className='position-relative btn btn-add-bookmark d-flex align-items'
        onContextMenu={onRightClick}
        onMouseLeave={onHoverMouseOut}
      >
        <StyledAnchor href={link} rel='noopener noreferrer' target='_blank'>
          <div className='d-flex align-items-center'>
            <StyledImgCover>
              <StyledImg src={linkImg} alt='link' />
            </StyledImgCover>
            {name}
          </div>
        </StyledAnchor>
        {isOpen ? (
          <StyledDropDown className='dropDown-zindex shadow'>
            <DropDownButtons
              onClick={() => {
                navigator.clipboard.writeText(link)
                setIsOpen(false)
              }}
              name='Copy Link'
            />
            <DropDownButtons
              bottom
              name='Delete'
              onClick={() => setModal(true)}
            />
          </StyledDropDown>
        ) : null}

        <DeleteBookmark
          opened={isModal}
          onClose={() => {
            setModal(false)
          }}
          name={name}
        />
      </button>
    </>
  )
}

export default ABookmark
