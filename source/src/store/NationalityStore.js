import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import {
  LOAD_STUDENT_NATIONALITY_STARTED,
  LOAD_STUDENT_NATIONALITY_SUCCESS,
  LOAD_STUDENT_NATIONALITY_ERROR,
  LOAD_NATIONALTIES_STARTED,
  LOAD_NATIONALTIES_SUCCESS,
  LOAD_NATIONALTIES_ERROR,
} from "../actions/NationalityActions";

let studentNationality = null;
let isLoadingStudentNat = false;
let nationalities = [];
let loadingNationalities = false;
const CHANGE_EVENT = "change";

class NationalityStore extends EventEmitter {
  getStore() {
    return { studentNationality, nationalities, loadingNationalities };
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

const nationalityStore = new NationalityStore();
dispatcher.register((action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_STUDENT_NATIONALITY_STARTED: {
      studentNationality = null;
      isLoadingStudentNat = true;
      break;
    }
    case LOAD_STUDENT_NATIONALITY_SUCCESS: {
      studentNationality = payload;
      isLoadingStudentNat = false;
      break;
    }
    case LOAD_STUDENT_NATIONALITY_ERROR: {
      studentNationality = null;
      isLoadingStudentNat = false;
      break;
    }
    case LOAD_NATIONALTIES_STARTED: {
      nationalities = [];
      loadingNationalities = true;
      break;
    }
    case LOAD_NATIONALTIES_SUCCESS: {
      nationalities = payload;
      loadingNationalities = false;
      break;
    }
    case LOAD_NATIONALTIES_ERROR: {
      nationalities = [];
      loadingNationalities = false;
      break;
    }
    default:
      return true;
  }
  nationalityStore.emitChange();
  return true;
});

export default nationalityStore;
