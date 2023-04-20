export class UserInfo{
  constructor({userNameSelector, userJobSelector}) {
    this._userNameSelector = userNameSelector;      
    this._userJobSelector = userJobSelector; 
  }

  getUserInfo() {
    this._userData = {};    
    this._userData.name = this._userNameSelector.textContent;
    this._userData.job = this._userJobSelector.textContent;    
    return this._userData;
  }


  setUserInfo = (name, job) => {
    this._userNameSelector.textContent = name;
    this._userJobSelector.textContent = job;
  }
}
