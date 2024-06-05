import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    if (website && username && password) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const filteredPasswordsList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: filteredPasswordsList})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleShowPasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      searchInput,
      showPasswords,
    } = this.state

    const filteredPasswordsList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-container">
          <form className="add-password-form" onSubmit={this.onAddPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-icon"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-icon"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-icon"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <div className="top-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="top-cont-image"
            />
          </div>
        </div>
        <div className="bottom-container">
          <div className="passwords-header">
            <h1 className="passwords-heading">
              Your Passwords
              <span className="noOfPasswds">
                {filteredPasswordsList.length}
              </span>
            </h1>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              id="showPasswords"
              className="checkbox"
              checked={showPasswords}
              onChange={this.onToggleShowPasswords}
            />
            <label htmlFor="showPasswords" className="checkbox-label">
              Show Passwords
            </label>
          </div>
          {filteredPasswordsList.length === 0 ? (
            <div className="no-passwords-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-list">
              {filteredPasswordsList.map(eachPassword => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  showPassword={showPasswords}
                  deletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
