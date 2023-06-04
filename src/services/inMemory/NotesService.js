const { nanoid } = require("nanoid");
const InvariantException = "../../exceptions/InvariantException";
const NotFoundException = "../../exceptions/NotFoundException";

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      id,
      title,
      body,
      tags,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
      return id;
    }

    throw new InvariantException("Catatan gagal ditambahkan");
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((note) => note.id === id)[0];

    if (note) {
      return note;
    }

    throw new NotFoundException("Catatan tidak ditemukan");
  }

  editNoteById(id, { title, body, tags }) {
    const index = findIndexNoteById(id);

    validateIndexNote(index, "memperbaharui");

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = findIndexNoteById(id);

    validateIndexNote(index, "menghapus");

    this._notes.splice(index, 1);
  }

  findIndexNoteById(id) {
    return this._notes.findIndex((note) => note.id === id);
  }

  validateIndexNote(index, message) {
    if (index < 0) {
      throw new NotFoundException(
        `Gagal ${message} catatan. Id ${id} tidak ditemukan`
      );
    }
  }
}

module.exports = NotesService;
