import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import {
  LOAD_STUDENT_FAMILY_STARTED,
  LOAD_STUDENT_FAMILY_SUCCESS,
  LOAD_STUDENT_FAMILY_ERROR,
} from "../actions/FamilyInfoActions";

let familyList = [];
let isLoadingFamily = false;
const CHANGE_EVENT = "change";

class FamilyStore extends EventEmitter {
  getStore() {
    return { isLoadingFamily, familyList };
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

const familyStore = new FamilyStore();
dispatcher.register((action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_STUDENT_FAMILY_STARTED: {
      familyList = [];
      isLoadingFamily = true;
      break;
    }
    case LOAD_STUDENT_FAMILY_SUCCESS: {
      familyList = payload;
      isLoadingFamily = false;
      break;
    }
    case LOAD_STUDENT_FAMILY_ERROR: {
      familyList = [];
      isLoadingFamily = false;
      break;
    }
    default:
      return true;
  }
  familyStore.emitChange();
  return true;
});

export default familyStore;
