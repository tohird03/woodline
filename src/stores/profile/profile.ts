import {makeAutoObservable} from 'mobx';

class ProfileStore {
  profileInfo: any | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setProfileInfo = (profileInfo: any) => {
    this.profileInfo = profileInfo;
  };

  reset = () => {
    this.profileInfo = null;
  };
}

export const profileStore = new ProfileStore();
