import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import linkImg from '../../../assets/img/svg/link.svg'
import './dmBookmarkStyle.css'

const StyledImg = styled.img`
  height: 70%;
  width: auto;
  display: block;
  box-sizing: border-box;
  padding: 3px;
`

const StyledImgCover = styled.div`
  height: 100%;
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
const ABookmark = ({ link, name, createdAt }) => {
  const [isOpen, setIsOpen] = useState(false)
  const HoverOutStop = useRef(false)
  const onHoverMouseOut = () => {
    if (HoverOutStop.current) {
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        className='position-relative btn btn-add-bookmark d-flex align-items'
        onClick={() => {
          setIsOpen(!isOpen)
        }}
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
      </button>
    </>
  )
}

export default ABookmark
