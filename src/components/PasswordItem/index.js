// src/components/PasswordItem/index.js

import React from 'react'
import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPassword, deletePassword} = props
  const {id, website, username, password} = passwordDetails
  const firstLetter = username[0].toUpperCase()

  const onDelete = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <p className="first-letter">{firstLetter}</p>
      <div className="password-details">
        <p className="password-text">{website}</p>
        <p className="password-text">{username}</p>
        {showPassword ? (
          <p className="password-text">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-image"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
