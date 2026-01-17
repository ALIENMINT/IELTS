// Authentication Manager
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

export class AuthManager {
  constructor(app) {
    this.auth = getAuth(app);
    this.provider = new GoogleAuthProvider();
    this.currentUser = null;
  }

  async login() {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      this.currentUser = result.user;
      return result.user;
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        // 弹窗被拦截，使用重定向方式
        const { signInWithRedirect } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
        return await signInWithRedirect(this.auth, this.provider);
      }
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.currentUser = null;
    } catch (error) {
      console.error("登出失败:", error);
      throw error;
    }
  }

  onAuthStateChanged(callback) {
    return onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      callback(user);
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

export default AuthManager;
