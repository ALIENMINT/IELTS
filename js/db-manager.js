// Database Manager
import { getFirestore, collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export class DBManager {
  constructor(app, userId, projectName = 'ielts3') {
    this.db = getFirestore(app);
    this.userId = userId;
    this.projectName = projectName; // 项目名称，用于数据隔离
  }

  // Todolist 相关操作
  async addTask(text) {
    try {
      const result = await addDoc(
        collection(this.db, "users", this.userId, this.projectName, "tasks"),
        {
          text: text,
          completed: false,
          createdAt: Date.now()
        }
      );
      return result.id;
    } catch (error) {
      console.error("添加任务失败:", error);
      throw error;
    }
  }

  onTasksSnapshot(callback) {
    const q = query(
      collection(this.db, "users", this.userId, this.projectName, "tasks"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(tasks);
    });
  }

  async updateTask(taskId, updates) {
    try {
      await updateDoc(
        doc(this.db, "users", this.userId, this.projectName, "tasks", taskId),
        updates
      );
    } catch (error) {
      console.error("更新任务失败:", error);
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      await deleteDoc(doc(this.db, "users", this.userId, this.projectName, "tasks", taskId));
    } catch (error) {
      console.error("删除任务失败:", error);
      throw error;
    }
  }

  // IELTS 相关操作
  async saveAnalysisData(date, data) {
    try {
      const docRef = doc(this.db, "users", this.userId, this.projectName, "ielts_data", date);
      await updateDoc(docRef, data);
    } catch (error) {
      // 文档不存在，则创建
      try {
        await addDoc(
          collection(this.db, "users", this.userId, this.projectName, "ielts_data"),
          {
            date: date,
            ...data
          }
        );
      } catch (innerError) {
        console.error("保存IELTS数据失败:", innerError);
        throw innerError;
      }
    }
  }

  onAnalysisDataSnapshot(callback) {
    const q = query(
      collection(this.db, "users", this.userId, this.projectName, "ielts_data"),
      orderBy("date", "desc")
    );
    return onSnapshot(q, (snapshot) => {
      const data = {};
      snapshot.docs.forEach(doc => {
        const docData = doc.data();
        data[docData.date] = docData;
      });
      callback(data);
    });
  }

  async getAnalysisData(date) {
    try {
      const snapshot = await getDocs(
        collection(this.db, "users", this.userId, this.projectName, "ielts_data")
      );
      const found = snapshot.docs.find(d => d.data().date === date);
      return found ? found.data() : null;
    } catch (error) {
      console.error("获取数据失败:", error);
      return null;
    }
  }
}

export default DBManager;
