import { data } from "autoprefixer";

export default class UserInfo {
    constructor ({name, job, avatar}) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

    setUserInfo(newUserData) {
        this._name.textContent = newUserData.name;
        this._job.textContent = newUserData.about;
    }

    setUserAvatar (data) {
        this._avatar.src = data.avatar;
    }
}