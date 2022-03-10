export default class UserInfo {
  constructor(name, signature, avatar) {
    this._userName = name;
    this._userSignature = signature;
    this._avatar = avatar;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userSignature.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  getUserInfo() {
    const currentUserInfo = {};
    currentUserInfo.name = this._userName.textContent;
    currentUserInfo.signature = this._userSignature.textContent;
    currentUserInfo.avatar = this._avatar.src;
    return currentUserInfo;
  }
}
