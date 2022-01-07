import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import {
  LOAD_STUDENT_LIST_STARTED,
  LOAD_STUDENT_LIST_SUCCESS,
  LOAD_STUDENT_LIST_ERROR,
} from "../actions/StudentAction";

let studentList = [];
let isLoading = false;
const CHANGE_EVENT = "change";

class StudentStore extends EventEmitter {
  getStore() {
    return { studentList, isLoading };
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}

const studentStore = new StudentStore();
dispatcher.register((action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_STUDENT_LIST_STARTED: {
      isLoading = true;
      break;
    }
    case LOAD_STUDENT_LIST_SUCCESS: {
      studentList = payload;
      isLoading = false;
      break;
    }
    case LOAD_STUDENT_LIST_ERROR: {
      studentList = [];
      isLoading = false;
      break;
    }
    default:
      return true;
  }
  studentStore.emitChange();
  return true;
});

export default studentStore;
